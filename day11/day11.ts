const file = Bun.file("input.txt");
const text = await file.text();
const input: number[] = text.split(" ").map(Number);

const changeStone = (n: number): number[] => {
	if (n === 0) return [1];

	if (n.toString().length % 2 === 0) {
		const nStr = n.toString();
		const half = nStr.length / 2;
		const first = Number(nStr.slice(0, half));
		const sec = Number(nStr.slice(half));

		return [first, sec];
	}

	return [n * 2024];
};

const blink = (input: number[], times: number): number[] => {
	let stones = [...input];

	for (let i = 0; i < times; i++) {
		stones = stones.flatMap((stone) => changeStone(stone));
	}

	return stones;
};

const p1 = blink(input, 25)
console.log('p1', p1);
