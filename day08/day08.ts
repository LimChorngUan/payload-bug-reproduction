import { append, uniq } from "ramda";

const file = Bun.file("input.txt");
const text = await file.text();

const input = text.split("\n").map((line) => line.split(""));

type Coord = [number, number];
type frequencyMap = Record<string, Coord[]>;
const createFrequencyMap = (matrix: string[][]): frequencyMap => {
	const map: frequencyMap = {};

	for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix[i].length; j++) {
			const curr = matrix[i][j];

			if (curr === ".") continue;
			map[curr] = map[curr] ? append([i, j], map[curr]) : [[i, j]];
		}
	}

	return map;
};
const F_MAP = createFrequencyMap(input);

const createAntinodes = (
	coord1: Coord,
	coord2: Coord,
	max: number,
): Coord[] => {
	const [x1, y1] = coord1;
	const [x2, y2] = coord2;
	const dx = Math.abs(x2 - x1);
	const dy = y2 - y1;

	let i = 0;
	const anitnodes: Coord[] = [];

	while (x1 - dx * i >= 0 || x1 + dx * i < max) {
		anitnodes.push([x1 - dx * i, y1 - dy * i], [x1 + dx * i, y1 + dy * i]);

		console.log(anitnodes);

		i++;
	}
	return anitnodes;
};

const allAntinodes = (coords: Coord[], matrixLength: number): Coord[] => {
	const antinodes: Coord[] = [];

	for (let i = 0; i < coords.length - 1; i++) {
		for (let j = i; j < coords.length - 1; j++) {
			if (i === j + 1) continue;
			antinodes.push(
				...createAntinodes(coords[i], coords[j + 1], matrixLength),
			);
		}
	}
	return antinodes;
};

const p2 = uniq(
	Object.values(F_MAP)
		.flatMap((fs) => allAntinodes(fs, input.length))
		.filter(
			([x, y]) =>
				!(x < 0 || y < 0 || x >= input.length || y >= input[0].length),
		),
).length;

console.log("p1", p2);
