// What a messy code

import { difference, reverse } from "ramda";

const file = Bun.file("input.txt");
const text = await file.text();

const [rulesTxt, inputTxt] = text.split("\n\n");
const rules: number[][] = rulesTxt
	.split("\n")
	.map((line) => line.split("|").map(Number));
const input: number[][] = inputTxt
	.split("\n")
	.map((line) => line.split(",").map(Number));

type RuleMap = Record<number, number[]>;
const last = difference(
	rules.map((rule) => rule[1]),
	rules.map((rule) => rule[0]),
)[0];
const RULE_MAP: RuleMap = rules.reduce(
	(acc, curr) => ({
		...acc,
		[curr[0]]: !acc[curr[0]] ? [curr[1]] : [...acc[curr[0]], curr[1]],
	}),
	{} as RuleMap,
);
RULE_MAP[last] = [];
console.log(RULE_MAP);

const isOrderCorrect = (orders: number[]): boolean => {
	for (let i = 0; i < orders.length - 1; i++) {
		const curr = orders[i];
		const next = orders[i + 1];

		if (!RULE_MAP[curr].includes(next)) return false;
	}

	return true;
};

const p1 = input
	.filter(isOrderCorrect)
	.reduce((acc, curr) => acc + curr[Math.floor(curr.length / 2)], 0);

const p2 = input
	.filter((x) => !isOrderCorrect(x))
	.map((x) =>
		reverse(
			x.sort((a, b) => {
				if (RULE_MAP[a].includes(b)) return 0;
				return -1;
			}),
		),
	)
	.reduce((acc, curr) => acc + curr[Math.floor(curr.length / 2)], 0);

console.log("p1", p1);
console.log("p2", p2);
