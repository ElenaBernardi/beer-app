import * as mongoose from "mongoose";
import {model} from "mongoose";
import {IsDefined, IsEnum, IsString, Length} from "class-validator";

const Schema = mongoose.Schema;

export interface IBeer {
    _id?: string;
    type: BeerType;
    quantity: number;
    productionDate: Date;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
}

export enum BeerType {
    ROSSA = 'ROSSA',
    BIONDA = 'BIONDA',
    STOUT = 'STOUT'
}


const beerSchema = new Schema<IBeer>({
    type: {type: String, enum: BeerType, required: true},
    quantity: {type: Number, required: true},
    productionDate: {type: Date, required: true}
}, {
    timestamps: true
});

const BeerModel = model<IBeer>('Beer', beerSchema);
export default BeerModel;

export class Beer {
    id?: string;
    @IsDefined()
    @IsEnum(BeerType)
    type: BeerType;
    @IsDefined()
    quantity: number;
    @IsDefined()
    @IsString()
    @Length(10, 10)
    productionDate: string;
    createdAt?: Date;
    updatedAt?: Date;


    constructor(type?: BeerType, quantity?: number, productionDate?: string) {
        this.type = type;
        this.quantity = quantity;
        this.productionDate = productionDate;
    }

    static createNewBeer(beer: IBeer){
        const newBeer = new Beer(beer.type, beer.quantity, beer.productionDate.toISOString().split("T")[0]);
        newBeer.id = beer._id;
        newBeer.createdAt = beer.createdAt;
        newBeer.updatedAt = beer.updatedAt;
        return newBeer;
    }
}
