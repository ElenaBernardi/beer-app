import Router from "koa-router";
import {Beer} from "../../domain/model/Beer";
import {BeerFilters} from "../BeerFilter";
import {QueryBuilder} from "../../storage/QueryBuilder";
import {doMigration} from "../../domain/service/MigrationService";
import {Context} from "koa";
import {validate} from "class-validator";
import {mongoRepository} from "../../storage/mongo";
import {dateIsValid, retrieveLaudableDays} from "../../domain/service/BeerService";


const router = new Router();

// Retrieve Beers
/**
 * Retrieve Beers or Laudable days
 * @param filters {@link IBeerFilters}
 * return beers list {@link Beer[]} or {days: string[], total: number} if you want laudable days
 */
router.post(`/beer/search`, async (ctx) => {
    try {
        const filters = new BeerFilters(ctx?.request?.body);
        console.log('validate', filters.validate())
        if (filters.validate()) {
            const query = QueryBuilder.buildQuery(filters);
            if (query != null) {
                let beers = await mongoRepository.fetch(query);
                if (filters.isLaudable) {
                    ctx.body = retrieveLaudableDays(beers);
                } else {
                    ctx.body = beers;
                }
            }
        } else {
            ctx.response.status = 400;
            return ctx;
        }
    } catch (err) {
        console.error(err);
    }
});


// Create a new Beer
/**
 * Create a new Beer
 *
 * @param beer {@link Beer}
 *
 */
router.post(`/beer`, async (ctx: Context) => {
    try {
        const validatorOptions = {};

        const beer = new Beer();
        const body = ctx?.request?.body as any;
        beer.productionDate = body?.productionDate;
        beer.type = body?.type;
        beer.quantity = body?.quantity;
        const errors = await validate(beer, validatorOptions)
        if (errors.length > 0 || !dateIsValid(beer.productionDate)) {
            ctx.status = 400;
            ctx.body = {
                status: 'error',
                data: errors
            };
            return ctx;
        }
        ctx.response.body = await mongoRepository.add(beer);
        ctx.response.status = 201;
        return ctx;

    } catch (err) {
        console.error(err);
        ctx.respose.status = 500;
        return ctx;
    }
});

/**
 * Migrate DB with exercise beers
 */
router.get('/migration/beer', async (ctx) => {
    try {
        await doMigration().then(u => {
            ctx.response.body = u;
            return ctx;
        }).catch(x => {
            ctx.response.status = 500;
            return ctx
        });
    } catch (err) {
        console.log(err);
        ctx.response.status = 500;
    }
})

export default router;
