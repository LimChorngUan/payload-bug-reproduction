import { sum} from "ramda";

const file = Bun.file("input.txt");
const text = await file.text();

const findValids = (text: string): number[][] =>
	text
		.split("mul(")
		.flatMap((str) => str.match(/^(\d+,\d+)\)/g))
		.filter((str) => str !== null)
		.map((str) => str.slice(0, -1))
		.map((str) => str.split(",").map(Number));

const getRes = (valids: number[][]) => sum(valids.map(([x, y]) => x * y));

const p1 = getRes(findValids(text));
const p2 = getRes(
	findValids(
		text
			.split("do")
			.filter((str) => !str.startsWith("n't"))
			.join(""),
	),
);

console.log("p1", p1);
console.log("p2", p2);
