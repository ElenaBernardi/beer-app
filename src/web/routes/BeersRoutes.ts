import Router from "koa-router";
import BeerModel, {Beer} from "../../model/Beer";
import {IBeerFilters} from "../BeerFilter";
import {QueryBuilder} from "../../model/QueryBuilder";


const router = new Router();

interface IRes {
    quantity: number,
    day: string
}

// Retrieve Beers
router.post(`/beer/search`, async (ctx) => {
    try {
        const filters = ctx?.request?.body as IBeerFilters;
        const query = QueryBuilder.buildQuery(filters);
        if (query != null) {
            let s = await BeerModel.aggregate(query);
            if (filters.isLaudable) {
                s = s as { quantity: number, day: string }[];
                const curr = s.shift() as IRes
                ctx.body = isLaudable(undefined, curr, s, []);

            } else {
                ctx.body = s;
            }
        }
    } catch (err) {
        console.error(err);
    }
});

function isLaudable(succ: IRes | undefined, curr: IRes, array: IRes[], laudable: string[]) {
    if (curr.quantity != 0) {
        if (!succ?.quantity || curr.quantity > succ.quantity) {
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

// Create a new Beer
router.post(`/beer`, async (ctx) => {
    try {
        const beer = ctx?.request?.body as Beer;
        // const beer = new Beer(iBeer?.type, iBeer?.quantity,iBeer?.productionDate );
        const beerModel = new BeerModel(beer);
        beerModel.save((err, result) => {
            if (err) return console.error(err);
            console.log(result.id + " saved to bookstore collection.");
        })
        ctx.response.status = 201;

    } catch (err) {
        console.error(err);
    }
});
export default router;
