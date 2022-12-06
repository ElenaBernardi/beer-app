// Beers array must be order by day descendent
export function retrieveLaudableDays(beers: IRes[]){
    const curr = beers.shift() as IRes
    const days = isLaudable(undefined, curr, beers, []);
    return {days, total: days.length};
}
function isLaudable(next: IRes | undefined, curr: IRes, array: IRes[], laudable: string[]) {
    console.log('curr', next, curr, array, laudable);
    if (curr && curr.quantity != 0) {
        if (!next?.quantity || curr.quantity > next.quantity) {
            const d = array.find(day => day.quantity >= curr.quantity)
            if (!d) {
                if (array.length) {
                    const newCurr = array.shift() as IRes
                    laudable.push(curr.day)
                    isLaudable(curr, newCurr, array, laudable)
                } else {
                    laudable.push(curr.day)
                }
            }
        }
    }
    const newCurr = array.shift() as IRes
    if (newCurr) {
        isLaudable(curr, newCurr, array, laudable)
    }

    return laudable;

}

export function dateIsValid(dateStr) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    if (dateStr.match(regex) === null) {
        return false;
    }

    const date = new Date(dateStr);

    const timestamp = date.getTime();

    if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
        return false;
    }

    return date.toISOString().startsWith(dateStr);
}

export interface IRes {
    quantity: number,
    day: string
}
