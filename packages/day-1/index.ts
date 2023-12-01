const file = await Bun.file("input.txt");
const body = await file.text();
let sum = 0;
for(const line of body.split('\n')){
    if(line.trim().length === 0){
        continue;
    }
    const matches = [...line.matchAll(/(\d)/g)];
    if(matches.length > 1){
        sum+=Number(`${matches[0][0]}${matches[matches.length-1][0]}`);
    }else if(matches.length === 1){
        const number = matches[0][0];
        sum += Number(`${number}${number}`);
    }
}
console.log(sum);
