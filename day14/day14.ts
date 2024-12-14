const file = Bun.file("input.txt");
const text = await file.text();

const regex = /p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/;
const input: [number, number][][] = text.split("\n").map((line) => {
	const match = regex.exec(line);

	if (match) {
		const p: [number, number] = [
			Number.parseInt(match[1], 10),
			Number.parseInt(match[2], 10),
		];
		const v: [number, number] = [
			Number.parseInt(match[3], 10),
			Number.parseInt(match[4], 10),
		];

		return [p, v];
	}
	return [
		[0, 0],
		[0, 0],
	];
});

const MAX_X = 101;
const MAX_Y = 103;

const walk = (
	[x0, y0]: [number, number],
	[dx, dy]: [number, number],
	t: number,
	[xMax, yMax]: [number, number],
): [number, number] => {
	const x = (x0 + dx * t) % xMax;
	const y = (y0 + dy * t) % yMax;

	const calFinalP = (n: number, nMax: number): number => {
		if (n < 0) return nMax + n;
		if (n > nMax) return n - nMax;
		return n;
	};

	return [calFinalP(x, xMax), calFinalP(y, yMax)];
};

const countSafetyFactor = (
	finalPs: number[][],
	maxX: number,
	maxY: number,
): number => {
	const [midX, midY] = [Math.floor(maxX / 2), Math.floor(maxY / 2)];

	let q1 = 0;
	let q2 = 0;
	let q3 = 0;
	let q4 = 0;

	for (let i = 0; i < finalPs.length; i++) {
		const [x, y] = finalPs[i];

		if (x < midX && y < midY) q1++;
		else if (x > midX && y < midY) q2++;
		else if (x < midX && y > midY) q3++;
		else if (x > midX && y > midY) q4++;
	}

	return q1 * q2 * q3 * q4;
};

const p1 = countSafetyFactor(
	input.map((line) => walk(line[0], line[1], 100, [MAX_X, MAX_Y])),
	MAX_X,
	MAX_Y,
);
console.log("p1", p1);

const draw = (ps: number[][], maxX: number, maxY: number) => {
	const paint: string[][] = Array(maxY)
		.fill(null)
		.map(() => Array(maxX).fill("."));

	for (let y = 0; y < maxY; y++) {
		for (let x = 0; x < maxX; x++) {
			if (ps.findIndex((p) => p[0] === x && p[1] === y) !== -1)
				paint[y][x] = "X";
		}
	}

	return paint.map((row) => row.join("")).join("\n");
};

let sec = 5096;
const outputPath = "./output.txt";

while (sec < 10000) {
	const p2 = input.map((line) => walk(line[0], line[1], sec, [MAX_X, MAX_Y]));
	const paintP2 = draw(p2, MAX_X, MAX_Y);

	const file = Bun.file("output.txt");
	const prev = await file.text();
	const output = `${prev}\n\n sec ${sec}\n${paintP2}`;

	await Bun.write(outputPath, output);
	sec += 101;
}
