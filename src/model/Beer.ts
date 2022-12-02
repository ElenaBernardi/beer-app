import * as mongoose from "mongoose";
import {model} from "mongoose";

const Schema = mongoose.Schema;

export interface IBeer {
    type: BeerType;
    quantity: number;
    productionDate: Date;
    createdAt: number;
    updatedAt: number;
}

export enum BeerType {
    ROSSA = 'ROSSA',
    BIONDA = 'BIONDA',
    STOUT = 'STOUT'
}


const beerSchema = new Schema<IBeer>({
    type: {type: String, enum: BeerType, required: true},
    quantity: {type: Number, required: true},
    productionDate: {type: Date, required: true},
    createdAt: {type: Number, required: true},
    updatedAt: {type: Number, required: true}
});

const BeerModel = model<IBeer>('Beer', beerSchema);
export default BeerModel;

export class Beer {
    id?: string;
    type: BeerType;
    quantity: number;
    productionDate: Date;
    createdAt?: number;
    updatedAt?: number;


    constructor(type: BeerType, quantity: number, productionDate: Date) {
        this.type = type;
        this.quantity = quantity;
        this.productionDate = productionDate;
        this.createdAt = Date.now();
        this.updatedAt = Date.now();
    }
}
