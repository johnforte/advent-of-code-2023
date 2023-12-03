const file = await Bun.file("input.txt");
const body = await file.text();

const symbols = ['@','%','$','/','#','+','-','=','*','&'];
let symbolLines = {};
let sum = 0;


for (const [idx, line] of body.split("\n").entries()) {
    if (line.trim().length === 0) {
        continue;
    }
    const symbolIdxs= [];
    for(const symbol of symbols){
        let indexOccurence = line.indexOf(symbol, 0);
        while(indexOccurence >= 0) {
            symbolIdxs.push(indexOccurence+1);
            indexOccurence = line.indexOf(symbol, indexOccurence + 1);
        }
    }
    symbolLines= {
        ...symbolLines,
        [idx]: symbolIdxs
    }
}
for (const [idx, line] of body.split("\n").entries()) {
    if (line.trim().length === 0) {
        continue;
    }
    const matches = line.matchAll(/(\d+)/g);
    if(matches.length === 0){
        continue;
    }
    for (const match of matches) {
        const matchEnd = match.index+match[0].length;
        if(symbolLines[idx].filter((el)=>el === match.index || el ===matchEnd+1).length > 0){
            sum+=Number(match[0]);
        }else if(symbolLines[idx+1] && symbolLines[idx+1].filter((el)=>el === match.index || (match.index <=el && matchEnd+1 >=el)).length > 0){
            sum+=Number(match[0]);
        }else if(symbolLines[idx-1] && symbolLines[idx-1].filter((el)=>el === match.index || el === matchEnd || (match.index <=el && matchEnd+1 >=el)).length > 0){
            sum+=Number(match[0]);
        }
    }
}
console.log(sum);
