import { transpose, sum, zip, count } from "ramda";

const file = Bun.file("input.txt");
const text = await file.text();

const input: number[][] = transpose(
	text.split("\n").map((line) => line.split(" ").filter(Boolean).map(Number)),
);

const col1 = input[0].sort();
const col2 = input[1].sort();

const p1 = sum(zip(col1, col2).map(([a, b]) => Math.abs(a - b)));
const p2 = sum(col1.map((a) => a * count((b) => a === b, col2)));

console.log("p1", p1);
console.log("p2", p2);
