// @.@

import { uniq, adjust, update, clone } from "ramda";

type Dir = "up" | "down" | "left" | "right";
type Coord = [number, number, Dir];

const STEP: Record<Dir, Coord> = {
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

const p1 = uniq(
	walk(MAP, START_COORD, []).visitedCoords.map((coord) => [coord[0], coord[1]]),
).length;

console.log("p1", p1);

let obstacleCount = 0;
for (let i = 0; i < MAP.length; i++) {
	for (let j = 0; j < MAP[0].length; j++) {
		if (MAP[i][j] === "#" || MAP[i][j] === "^") continue;

		const newMap = adjust(i, (row) => update(j, "#", row), clone(MAP));

		if (walk(newMap, START_COORD, []).loop === true) {
			obstacleCount++;
		}
	}
}

console.log("p2", obstacleCount);
