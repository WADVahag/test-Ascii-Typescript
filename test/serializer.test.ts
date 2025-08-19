import { serialize, deserialize } from "../src/serializer.js";

function assertEqual(a: any, b: any) {
    if (JSON.stringify([...a]) !== JSON.stringify([...b])) {
        throw new Error("Множества не совпадают");
    }
}

const samples = [
    [1, 2, 3],
    [300],
    Array.from({length: 9}, (_, i) => i+1),
    Array.from({length: 90}, (_, i) => i+10),
    Array.from({length: 201}, (_, i) => i+100),
    Array.from({length: 900}, (_, i) => (i % 300) + 1),
];

for (const arr of samples) {
    const enc = serialize(arr);
    const dec = deserialize(enc);
    assertEqual(new Set(arr), dec);
}

console.log("✅ Все тесты пройдены");
