import BeerModel, {Beer, BeerType} from "../model/Beer";
import {mongoRepository} from "../../storage/mongo";
import {throws} from "assert";

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

export async function doMigration() {
    const beers =[];
    for (let item of items) {
        const c = await mongoRepository.add(item);
        beers.push(c);
    }
    return beers;
}
