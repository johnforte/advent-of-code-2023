const file = await Bun.file("input.txt");
const body = await file.text();

let total = 0;

for (const [idx, line] of body.split("\n").entries()) {
    if(line.trim().length === 0){
        continue;
    }
    const cardId = idx +1;
    let [card, winingNums] = line.replace(`Card ${cardId}:`,"").split('|');
    card = card.trim().split(" ").filter((el)=>el.length > 0);
    winingNums = winingNums.trim().split(" ").filter((el)=>el.length > 0);
    let score = 0;
    for(const el of card){
        if(winingNums.includes(el)){
            if(score > 1){
                score = score *2;
            }else {
                score++;
            }
        }
    }
    total+=score;
}
console.log(total);
