// @.@ Too lazy to cleanup the code

import { uniq, splitAt, all, transpose, adjust, update, clone } from "ramda";

type Dir = "up" | "down" | "left" | "right";
type Coord = [number, number, Dir];

const STEP: Record<Dir, [number, number]> = {
	up: [-1, 0],
	down: [1, 0],
	left: [0, -1],
	right: [0, 1],
};
const RIGHT_TURN: Record<Dir, Dir> = {
	up: "right",
	down: "left",
	left: "up",
	right: "down",
};

const file = Bun.file("input.txt");
const text = await file.text();

const findStartCoord = (map: string[][]): Coord => {
	for (let i = 0; i < map.length; i++) {
		const guard = map[i].findIndex((x) => x === "^");

		if (guard !== -1) return [i, guard, "up"];
	}
	return [-1, -1, "up"];
};

const MAP: string[][] = text.split("\n").map((line) => line.split(""));
const START_COORD = findStartCoord(MAP);

const walk = (
	map: string[][],
	coord: Coord,
	visitedCoords: string[],
): {
	visitedCoords: string[];
	loop: boolean;
} => {
	const [currX, currY, currD] = coord;
	const [nextX, nextY] = [currX + STEP[currD][0], currY + STEP[currD][1]];

	const coordStr = coord.join(",");
	const newVisitedCoords = visitedCoords.concat(coordStr);

	if (nextX < 0 || nextY < 0 || nextX >= map[0].length || nextY >= map.length)
		return {
			visitedCoords: newVisitedCoords,
			loop: false,
		};

	if (visitedCoords.includes(coordStr)) {
		return {
			visitedCoords: newVisitedCoords,
			loop: true,
		};
	}

	if (map[nextX][nextY] === "#")
		return walk(map, [currX, currY, RIGHT_TURN[currD]], visitedCoords);

	return walk(map, [nextX, nextY, currD], newVisitedCoords);
};

const visitedCoords: Coord[] = walk(MAP, START_COORD, [])
	.visitedCoords.map((coord) => coord.split(","))
	.map((coord) => [Number(coord[0]), Number(coord[1]), coord[2]]);

const p1 = uniq(visitedCoords.map((coord) => [coord[0], [coord[1]]])).length;
console.log("p1", p1);

const findLoop = (map: string[][], startCoord: Coord): boolean => {
	const [x, y, dir] = startCoord;
	const [nextX, nextY] = [x + STEP[dir][0], y + STEP[dir][1]];

	if (nextX < 0 || nextY < 0 || nextX >= map[0].length || nextY >= map.length)
		return false;

	if (map[nextX][nextY] === "#") return false;

	if (dir === "up" && all((el) => el !== "#", splitAt(y, map[x])[1]))
		return false;
	if (dir === "down" && all((el) => el !== "#", splitAt(y, map[x])[0]))
		return false;
	if (
		dir === "right" &&
		all((el) => el !== "#", splitAt(y, transpose(map)[x])[0])
	)
		return false;
	if (
		dir === "left" &&
		all((el) => el !== "#", splitAt(y, transpose(map)[x])[1])
	)
		return false;

	const newMap = adjust(nextX, (row) => update(nextY, "#", row), clone(map));

	return walk(newMap, startCoord, []).loop;
};

const p2 = visitedCoords
	.map((coord) => findLoop(MAP, coord))
	.filter(Boolean).length;
console.log("p2", p2);
