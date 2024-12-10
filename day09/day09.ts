import { findIndex, findLastIndex, sum, slice } from "ramda";

const file = Bun.file("input.txt");
const text = await file.text();

const createDiskMap = (input: string): string[] => {
	const diskMap: string[] = [];

	for (let i = 0; i < input.length; i += 2) {
		const fileCount = Number(input[i]);
		const spaceCount = Number(input[i + 1]);

		if (fileCount > 0) diskMap.push(Array(fileCount).fill((i / 2).toString()));
		if (spaceCount > 0) diskMap.push(Array(spaceCount).fill("."));
	}

	return diskMap.flat();
};

const move1 = (input: string[]): string[] => {
	const arr = [...input];
	let firstSpace = findIndex((c) => c === ".", arr);
	let lastFile = findLastIndex((c) => c !== ".", arr);

	if (firstSpace === -1) return arr;

	while (firstSpace < lastFile) {
		arr[firstSpace] = arr[lastFile];
		arr[lastFile] = ".";

		firstSpace = findIndex((c) => c === ".", arr);
		lastFile = findLastIndex((c) => c !== ".", arr);
	}

	return arr;
};

const findSpacesI = (input: string[], n: number): number => {
	let spaceCount = 0;

	for (let i = 0; i < input.length; i++) {
		if (input[i] === ".") {
			spaceCount++;

			if (spaceCount >= n) return i + 1 - n;
		} else {
			spaceCount = 0;
		}
	}

	return -1;
};

const move2 = (input: string[], maxId: number): string[] => {
	let arr = [...input];

	for (let id = maxId; id >= 0; id--) {
		const fileI = findIndex((c) => c === id.toString(), arr);
		const fileCount = arr.filter((c) => {
			return c === id.toString();
		}).length;
		const spacesI = findSpacesI(arr, fileCount);

		if (fileI < spacesI) continue;
		if (spacesI === -1) continue;

		arr = arr.map((c, i) => {
			if (i >= spacesI && i < spacesI + fileCount) return id.toString();
			if (i >= fileI && i < fileI + fileCount) return ".";
			return c;
		});
	}

	return arr;
};

const checkSum = (input: string[]): number =>
	sum(input.filter((c) => c !== ".").map((c, i) => Number(c) * i));

const p2 = sum(
	move2(
		createDiskMap(text),
		text.length % 2 === 0 ? text.length / 2 - 1 : Math.floor(text.length / 2),
	).map((el, i) => (el === "." ? 0 : Number(el) * i)),
);

console.log("p2", p2);
