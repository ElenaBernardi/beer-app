import {BeerType} from "../model/Beer";

export interface IBeerFilters{
    type?: BeerType;
    day?: string;
    from?: string;
    to?: string;
    isLaudable: boolean;
}
