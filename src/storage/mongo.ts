import BeerModel, {Beer} from "../domain/model/Beer";

export let mongoRepository = {
    add: (beer: Beer) => {
        const beerModel = new BeerModel(beer);
        return beerModel.save().then(t => true).catch(u => false);
    },
    fetch: (query) => {
        return BeerModel.aggregate(query);
    }
}
