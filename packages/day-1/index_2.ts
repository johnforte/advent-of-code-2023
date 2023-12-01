const file = await Bun.file("input.txt");
const body = await file.text();

const convertStrsToNum = (str: string): string => {
	const stringNums = {
		one: "on1e",
		two: "tw2o",
		three: "thre3e",
		four: "fou4r",
		five: "fiv5e",
		six: "si6x",
		seven: "sev7en",
		eight: "eigh8t",
		nine: "nin9e",
	};
	let updatedStr = str;
	for (const el of Object.keys(stringNums)) {
		updatedStr = updatedStr.replaceAll(el, stringNums[el]);
	}
	return updatedStr;
};

let sum = 0;
for (const line of body.split("\n")) {
	if (line.trim().length === 0) {
		continue;
	}
	const newLine = convertStrsToNum(line);
	const matches = [...newLine.matchAll(/(\d)/g)];
	if (matches.length > 1) {
		sum += Number(`${matches[0][0]}${matches[matches.length - 1][0]}`);
	} else if (matches.length === 1) {
		const number = matches[0][0];
		sum += Number(`${number}${number}`);
	}
}
console.log(sum);
