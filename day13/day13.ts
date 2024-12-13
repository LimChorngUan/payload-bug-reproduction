import { any, sum } from "ramda";

const file = Bun.file("input.txt");
const text = await file.text();

const input: [number, number][][] = text.split("\n\n").map((block) =>
	block.split("\n").map((line) => {
		const regex = /X[+=](\d+),\s*Y[+=](\d+)/g;
		const match = regex.exec(line);

		return match
			? [Number.parseInt(match[1]), Number.parseInt(match[2])]
			: [0, 0];
	}),
);

const solveSystemEq = (
	A: [number, number],
	B: [number, number],
	T: [number, number],
) => {
	const [a1, a2] = A;
	const [b1, b2] = B;
	const [t1, t2] = T;

	const mul1 = a2;
	const mul2 = a1;

	const eq1 = [a1 * mul1, b1 * mul1, t1 * mul1];
	const eq2 = [a2 * mul2, b2 * mul2, t2 * mul2];

	const yCoeff = eq2[1] - eq1[1];
	const result = eq2[2] - eq1[2];

	const y = result / yCoeff;
	const x = (t1 - b1 * y) / a1;

	return [x, y];
};

const countPrize = (input: [number, number][], p: number) => {
	const A = input[0];
	const B = input[1];
	const T = input[2].map((n) => n + (p === 1 ? 0 : 10000000000000)) as [
		number,
		number,
	];

	const res = solveSystemEq(A, B, T);

	if (p === 1) {
		if (
			any((n) => !Number.isInteger(n), res) ||
			any((n) => n < 0, res) ||
			any((n) => n > 100, res)
		)
			return 0;
	} else {
		if (any((n) => !Number.isInteger(n), res) || any((n) => n < 0, res))
			return 0;
	}

	return sum([res[0] * 3, res[1]]);
};

const countTotalPrize = (input: [number, number][][], p: number) =>
	sum(input.map((el) => countPrize(el, p)));

const [p1, p2] = [countTotalPrize(input, 1), countTotalPrize(input, 2)];

console.log("p1", p1);
console.log("p2", p2);
