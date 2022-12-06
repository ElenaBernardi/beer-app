import {Beer, BeerType} from "../../src/domain/model/Beer";
import server from "../../src/server";
import request from "supertest";
import {BeerFilters} from "../../src/web/BeerFilter";

describe("Beer filters validate", () => {

    test("valid filters", async () => {
       const filters = new BeerFilters({day: "2022-12-01", type: BeerType.ROSSA });
        expect(filters.validate()).toBeTruthy();
    })
    test("valid filters", async () => {
        const filters = new BeerFilters({from: "2022-12-01",to: "2022-12-03", type: BeerType.ROSSA });
        expect(filters.validate()).toBeTruthy();
    })
    test("invalid filters", async () => {
        const filters = new BeerFilters({from: "2022-12-01",to: "2022-12-01", type: BeerType.ROSSA });
        expect(filters.validate()).toBeFalsy();
    })
    test("invalid filters", async () => {
        const filters = new BeerFilters({day: "2022-12-01",to: "2022-12-01", type: BeerType.ROSSA });
        expect(filters.validate()).toBeFalsy();
    })
    test("invalid filters", async () => {
        const filters = new BeerFilters({from: "2022-12-03",to: "2022-12-01", type: BeerType.ROSSA });
        expect(filters.validate()).toBeFalsy();
    })
    test("invalid filters", async () => {
        const filters = new BeerFilters({type: BeerType.ROSSA });
        expect(filters.validate()).toBeFalsy();
    })
    test("invalid filters", async () => {
        const filters = new BeerFilters({day: "2022-12-03", type: "ROSA" });
        expect(filters.validate()).toBeFalsy();
    })
    test("invalid filters", async () => {
        const filters = new BeerFilters({isLaudable: true, day: "2022-12-03", type: "ROSA" });
        expect(filters.validate()).toBeFalsy();
    })
    test("invalid filters", async () => {
        const filters = new BeerFilters({isLaudable: true, from: "2022-12-03", to: "2022-12-01", type: "ROSA" });
        expect(filters.validate()).toBeFalsy();
    })
    test("invalid filters", async () => {
        const filters = new BeerFilters({day: "2022-12-32" });
        expect(filters.validate()).toBeFalsy();
    })
})
