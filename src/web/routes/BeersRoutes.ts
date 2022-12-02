import Router from "koa-router";
import BeerModel, {Beer, BeerType, IBeer} from "../../model/Beer";

const router = new Router();

router.get(`/`, async (ctx) => {
    try {
       const s = await BeerModel.find({});
        console.log('result', s);
        ctx.body = s;
    } catch (err) {
        console.error(err);
    }
});
router.post(`/beer`, async (ctx) => {
    try {
        const iBeer = ctx?.request?.body as IBeer;
        const beer = new Beer(iBeer?.type, iBeer?.quantity,iBeer?.productionDate );
        const beerModel = new BeerModel(beer);
        beerModel.save((err, result)=> {
            if (err) return console.error(err);
            console.log(result.id+ " saved to bookstore collection.");
        })
        ctx.body = {
            status: "success",
        };

    } catch (err) {
        console.error(err);
    }
});
export default router;
