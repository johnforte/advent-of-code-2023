const file = await Bun.file("input.txt");
const body = await file.text();

const limits = {
	red: 12,
	green: 13,
	blue: 14,
};

const getNumber = (line) => {
	const [num] = line.split(" ").map((_) => _.trim());
	return Number(num);
};

let sum = 0;

for (const line of body.split("\n")) {
	if (line.trim().length === 0) {
		continue;
	}
	const [_, games] = line.split(":");
	const game = games
		.replaceAll(";", ",")
		.split(",")
		.map((_) => _.trim());
	let red_max = 0;
	let green_max = 0;
	let blue_max = 0;
	for (const el of game) {
		if (el.endsWith("blue")) {
			const num = getNumber(el);
			if (num > blue_max) {
				blue_max = num;
			}
		} else if (el.endsWith("green")) {
			const num = getNumber(el);
			if (num > green_max) {
				green_max = num;
			}
		} else if (el.endsWith("red")) {
			const num = getNumber(el);
			if (num > red_max) {
				red_max = num;
			}
		}
	}
	sum += red_max * green_max * blue_max;
}
console.log(sum);
