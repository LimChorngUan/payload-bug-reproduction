// roll eyes

import { map, reverse, transpose, compose, splitAt } from "ramda";

const file = Bun.file("input.txt");
const text = await file.text();

const matrix: string[][] = text.split("\n").map((line) => line.split(""));
const flipHorizontal = map(reverse);
const diagonalLeft = (matrix: string[][]): string[][] =>
	matrix.map((row, i) => row.map((_, j) => matrix[(i + j) % row.length][j]));
const diagonalRight = (matrix: string[][]): string[][] =>
	matrix.map((row, i) =>
		row.map(
			(_, j) => matrix[(i + j + row.length) % row.length][row.length - 1 - j],
		),
	);
const splitDiagonal = (matrix: string[][]): string[][] =>
	matrix.flatMap((row, i) => splitAt(row.length - i, row));

const transforms = [
	(matrix: string[][]) => matrix,
	flipHorizontal,
	transpose,
	compose(flipHorizontal, transpose),
	compose(splitDiagonal, diagonalLeft),
	compose(flipHorizontal, splitDiagonal, diagonalLeft),
	compose(splitDiagonal, diagonalRight),
	compose(flipHorizontal, splitDiagonal, diagonalRight),
];

const p1 = transforms
	.flatMap((transform) => transform(matrix).map((line) => line.join("")))
	.map((str) => str.match(/(XMAS)/g))
	.filter(Boolean)
	.flat().length;

console.log("p1", p1);
