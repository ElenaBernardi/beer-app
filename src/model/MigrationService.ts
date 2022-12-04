import BeerModel, {Beer, BeerType} from "./Beer";

const items = [
    new Beer(BeerType.BIONDA, 2, '2022-12-01'),
    new Beer(BeerType.BIONDA, 3, '2022-12-02'),
    new Beer(BeerType.BIONDA, 0, '2022-12-03'),
    new Beer(BeerType.BIONDA, 5, '2022-12-04'),
    new Beer(BeerType.BIONDA, 2, '2022-12-05'),
    new Beer(BeerType.ROSSA, 3, '2022-12-01'),
    new Beer(BeerType.ROSSA, 3, '2022-12-02'),
    new Beer(BeerType.ROSSA, 4, '2022-12-03'),
    new Beer(BeerType.ROSSA, 0, '2022-12-04'),
    new Beer(BeerType.ROSSA, 2, '2022-12-05'),
    new Beer(BeerType.STOUT, 0, '2022-12-01'),
    new Beer(BeerType.STOUT, 0, '2022-12-02'),
    new Beer(BeerType.STOUT, 4, '2022-12-03'),
    new Beer(BeerType.STOUT, 1, '2022-12-04'),
    new Beer(BeerType.STOUT, 6, '2022-12-05'),

] as Beer[]

export function doMigration(){
    items.forEach(item => {
        const beerModel = new BeerModel(item);
        beerModel.save((err, result) => {
            if (err) return console.error(err);
            console.log(result.id + " saved to beer collection.");
        })
    })
}
