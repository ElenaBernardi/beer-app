import * as mongoose from "mongoose";
import {model} from "mongoose";
import {IsDefined, IsEnum, IsString, Length, Validate} from "class-validator";

const Schema = mongoose.Schema;

export interface IBeer {
    type: BeerType;
    quantity: number;
    productionDate: Date;
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
    // createdAt: {type: Number, required: true},
    // updatedAt: {type: Number, required: true}
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
}
