import { serialize, deserialize } from "./serializer.js";

function testCase(nums: number[]) {
    const simple = nums.join(",");
    const compact = serialize(nums);
    const restored = deserialize(compact);

    const ratio = simple.length / compact.length;
    console.log("N =", nums.length,
                "| Исходная длина:", simple.length,
                "| Сжатая длина:", compact.length,
                "| Коэф.:", ratio.toFixed(2));
    console.assert(nums.every(n => restored.has(n)), "Ошибка восстановления");
}

testCase([1, 2, 3]);
testCase([300]);

const rnd = (n: number) => Array.from({ length: n }, () => 1 + Math.floor(Math.random() * 300));
testCase(rnd(50));
testCase(rnd(100));
testCase(rnd(500));
testCase(rnd(1000));
