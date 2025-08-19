function toBase64(bytes: Uint8Array): string {
    return Buffer.from(bytes).toString("base64");
}

function fromBase64(str: string): Uint8Array {
    return new Uint8Array(Buffer.from(str, "base64"));
}

export function serialize(nums: number[]): string {
    const unique = Array.from(new Set(nums)).sort((a, b) => a - b);

    const bits = new Uint8Array(Math.ceil(300 / 8));
    for (let n of unique) {
        if (n < 1 || n > 300) throw new Error("Число вне диапазона 1..300");
        const idx = n - 1;
        bits[idx >> 3] |= 1 << (7 - (idx % 8));
    }
    const bitmask = "B" + toBase64(bits);

    const deltas: number[] = [];
    for (let i = 0; i < unique.length; i++) {
        deltas.push(i === 0 ? unique[i] : unique[i] - unique[i - 1]);
    }
    const deltaEnc = "D" + toBase64(new Uint8Array(deltas));

    return (bitmask.length < deltaEnc.length ? bitmask : deltaEnc);
}

export function deserialize(s: string): Set<number> {
    if (s.startsWith("B")) {
        const bytes = fromBase64(s.slice(1));
        const result = new Set<number>();
        for (let i = 0; i < 300; i++) {
            if (bytes[i >> 3] & (1 << (7 - (i % 8)))) result.add(i + 1);
        }
        return result;
    } else if (s.startsWith("D")) {
        const bytes = fromBase64(s.slice(1));
        const nums: number[] = [];
        let current = 0;
        for (let b of bytes) {
            current += b;
            nums.push(current);
        }
        return new Set(nums);
    } else {
        throw new Error("Неизвестный формат");
    }
}
