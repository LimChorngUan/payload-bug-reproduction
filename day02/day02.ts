import { count, remove } from "ramda";

const file = Bun.file("input.txt");
const text = await file.text();

const input: number[][] = text
	.split("\n")
	.map((line) => line.split(" ").filter(Boolean).map(Number));

const isSafe = (report: number[]): boolean => {
	const slope: "asc" | "desc" = report[0] < report[1] ? "asc" : "desc";

	for (let i = 0; i < report.length - 1; i++) {
		const diff =
			slope === "asc" ? report[i + 1] - report[i] : report[i] - report[i + 1];

		if (diff < 1 || diff > 3) {
			return false;
		}
	}

	return true;
};

const createCombiInput = (report: number[]): number[][] => {
	const input: number[][] = [];

	for (let i = 0; i < report.length; i++) {
		input.push(remove(i, 1, report));
	}

	return input;
};

const countSafeReportAfterDampener = (input: number[][]): number => {
	const unsafeReports = input.filter((report) => !isSafe(report));

	const afterDampenerSafeReportCounts: number[] = unsafeReports.map(
		(originalReport) =>
			count(
				Boolean,
				createCombiInput(originalReport).map((newReport) => isSafe(newReport)),
			),
	);

	return count(Boolean, afterDampenerSafeReportCounts);
};

const p1 = count(
	Boolean,
	input.map((report) => isSafe(report)),
);
const p2 = p1 + countSafeReportAfterDampener(input);

console.log("p1", p1);
console.log("p2", p2);
