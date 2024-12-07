import { sum } from "ramda";

const file = Bun.file("input.txt");
const text = await file.text();

const input: number[][] = text
	.split("\n")
	.map((line) => line.split(": "))
	.map((line) => [Number(line[0])].concat(line[1].split(" ").map(Number)));

const generateCombis2 = (length: number): string[][] => {
	const combinations: string[][] = [];
	const total = 1 << length;

	for (let i = 0; i < total; i++) {
		const combo: string[] = [];
		for (let j = 0; j < length; j++) {
			combo.push(i & (1 << j) ? "*" : "+");
		}
		combinations.push(combo);
	}

	return combinations;
};

const generateCombis3 = (length: number): string[][] => {
	const combinations: string[][] = [];
	const total = 3 ** length;

	for (let i = 0; i < total; i++) {
		const combo: string[] = [];
		let num = i;

		for (let j = 0; j < length; j++) {
			const remainder = num % 3;
			if (remainder === 0) combo.push("+");
			else if (remainder === 1) combo.push("*");
			else combo.push("||");
			num = Math.floor(num / 3);
		}

		combinations.push(combo);
	}

	return combinations;
};

const test1 = ([target, ...numbers]: number[]): boolean => {
	const ops = generateCombis2(numbers.length - 1);

	for (let i = 0; i < ops.length; i++) {
		const res = ops[i].reduce(
			(acc, op, j) =>
				op === "+" ? acc + numbers[j + 1] : acc * numbers[j + 1],
			numbers[0],
		);

		if (res === target) return true;
	}

	return false;
};

const test2 = ([target, ...numbers]: number[]): boolean => {
	const ops = generateCombis3(numbers.length - 1);

	for (let i = 0; i < ops.length; i++) {
		const res = ops[i].reduce(
			(acc, op, j) =>
				op === "+"
					? acc + numbers[j + 1]
					: op === "*"
						? acc * numbers[j + 1]
						: Number(acc.toString().concat(numbers[j + 1].toString())),
			numbers[0],
		);

		if (res === target) return true;
	}

	return false;
};

const p1 = sum(input.filter((eq) => test1(eq)).map((el) => el[0]));
const p2 = sum(input.filter((eq) => test2(eq)).map((el) => el[0]));

console.log("p1", p1);
console.log("p2", p2);
