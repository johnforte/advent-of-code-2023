const file = await Bun.file("input.txt");
const body = await file.text();

const limits = {
    red: 12,
    green: 13,
    blue: 14
}

const getNumber = (line)=>{
    const [num] = line.split(" ").map((_)=>_.trim());
    return Number(num);
}

let gamesUnderLimits =[];

for (const line of body.split("\n")) {
    if (line.trim().length === 0) {
        continue;
    }
    const gameId = Number(/Game (\d+?):/.exec(line)[1]);
    const [_, games] = line.split(":");
    const game = games.replaceAll(";",',').split(',').map((_)=>_.trim());
    let isOutOfTotal = false;
    for(const el of game){
        let red_total = 0;
        let blue_total = 0;
        let green_total =0;
        if(el.endsWith("blue")){
            const num = getNumber(el);
            blue_total += num;
            if(blue_total > limits.blue){
                isOutOfTotal= true;
                break;
            }
        }else if(el.endsWith("green")){
            const num = getNumber(el);
            green_total += num;
            if(green_total > limits.green){
                isOutOfTotal= true;
                break;
            }
        }else if(el.endsWith("red")){
            const num = getNumber(el);
            red_total += num;
            if(red_total > limits.red){
                isOutOfTotal= true;
                break;
            }
        }
    }
    if(!isOutOfTotal){
        gamesUnderLimits.push(gameId);
    }
}
console.log(gamesUnderLimits);
console.log(gamesUnderLimits.reduce((previousValue, currentValue)=>previousValue+currentValue, 0));
