import {BeerType} from "../domain/model/Beer";
import {dateIsValid} from "../domain/service/BeerService";

export class BeerFilters {
    type?: BeerType;
    day?: string;
    from?: string;
    to?: string;
    isLaudable?: boolean;

    constructor(filters) {
        this.type = filters?.type;
        this.day = filters?.day;
        this.from = filters?.from;
        this.to = filters?.to;
        this.isLaudable = filters?.isLaudable;
    }

    validate() {
        if (this.isLaudable && this.from && this.to && dateIsValid(this.from) && dateIsValid(this.to)) {
            const from = new Date(this.from);
            const to = new Date(this.to);
            return from < to;
        }
        if (this.isLaudable && !(this.from && this.to)) {
            return false;
        }
        if ((this.from && !this.to) || !this.from && this.to) {
            return false
        }
        if (!this.day && !(this.from && this.to)) {
            return false;
        }
        if (this.from && this.to && dateIsValid(this.from) && dateIsValid(this.to)) {
            const from = new Date(this.from);
            const to = new Date(this.to);
            return from < to;
        }
        if (this.day && !dateIsValid(this.day)) {
            return false;
        }
        if (this.type && !Object.values(BeerType).includes(this.type)) {
            return false;
        }
        return true;
    }
}
