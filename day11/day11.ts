import { sum } from "ramda";

const file = Bun.file("input.txt");
const text = await file.text();
const input: number[] = text.split(" ").map(Number);

const blink = (input: number[], times: number): number => {
	let stonesMap = new Map(
		Object.entries(
			input.reduce(
				(acc, curr) => ({
					...acc,
					[curr]: 1,
				}),
				{} as Record<number, number>,
			),
		),
	);

	for (let i = 0; i < times; i++) {
		const newMap: Map<number, number> = new Map();

		for (const [stone, count] of Object.entries(
			Object.fromEntries(stonesMap),
		)) {
			if (Number(stone) === 0) {
				newMap.set(1, count + (newMap.get(1) ?? 0));
			} else if (stone.length % 2 === 0) {
				const half = stone.length / 2;
				const first = Number(stone.slice(0, half));
				const sec = Number(stone.slice(half));

				newMap.set(first, count + (newMap.get(first) ?? 0));
				newMap.set(sec, count + (newMap.get(sec) ?? 0));
			} else {
				const mul = Number(stone) * 2024;
				newMap.set(mul, count + (newMap.get(mul) ?? 0));
			}
		}

		stonesMap = newMap;
	}

	return sum(Object.values(Object.fromEntries(stonesMap)));
};

const p1 = blink(input, 25);
const p2 = blink(input, 75);

console.log("p1", p1);
console.log("p2", p2);
