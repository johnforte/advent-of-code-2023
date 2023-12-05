const file = await Bun.file("input.txt");
const body = await file.text();

const cardsCopy = {};

for (const [idx, line] of body.split("\n").entries()) {
    if(line.trim().length === 0){
        continue;
    }
    const cardId = idx +1;
    if(!(cardId in cardsCopy)){
        cardsCopy[cardId]=1;
    }else{
        cardsCopy[cardId]=cardsCopy[cardId]+1;
    }
    let [card, winingNums] = line.replace(`Card ${cardId}:`,"").split('|');
    card = card.trim().split(" ").filter((el)=>el.length > 0);
    winingNums = winingNums.trim().split(" ").filter((el)=>el.length > 0);
    let wins = 0;
    for(const el of card){
        if(winingNums.includes(el)){
            wins++;
        }
    }
    const copiesOfCard = cardsCopy[cardId];
    for(let i=1; i<=wins; i++){
        const key = cardId+i;
        if(key in cardsCopy){
            cardsCopy[key] = cardsCopy[key] + copiesOfCard;
        }else{
            cardsCopy[key]=copiesOfCard;
        }
    }
}
console.log(Object.values(cardsCopy).reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
));
