import beer, {Beer, BeerType} from "../../src/domain/model/Beer";
import {validate} from "class-validator";
import server from "../../src/server";
import request from "supertest"
import {dateIsValid, IRes, retrieveLaudableDays} from "../../src/domain/service/BeerService";
import beforeEach from "node:test";


describe("Beer Service", () => {
    test("beer is laudable, 1 element", async () => {
        const beers = [
            {quantity: 2, day: "2022-12-01"}
        ] as IRes[]
        expect(retrieveLaudableDays(beers).total > 0).toBeTruthy();
    })
    test("beer is not laudable, 0 quantity", async () => {
        const beers = [
            {quantity: 0, day: "2022-12-01"}
        ] as IRes[]
        expect(retrieveLaudableDays(beers).total > 0).toBeFalsy();
    })
    test("one beer is laudable, 2 elements", async () => {
        const beers = [
            {quantity: 2, day: "2022-12-02"},
            {quantity: 0, day: "2022-12-01"}
        ] as IRes[]
        expect(retrieveLaudableDays(beers).total > 0).toBeTruthy();
    })
    test("not laudable, quantity equals", async () => {
        const beers = [
            {quantity: 2, day: "2022-12-02"},
            {quantity: 2, day: "2022-12-01"}
        ] as IRes[]
        expect(retrieveLaudableDays(beers).total > 0).toBeFalsy();
    })
    test("one beer laudable, quantity greater than next", async () => {
        const beers = [
            {quantity: 2, day: "2022-12-02"},
            {quantity: 3, day: "2022-12-01"}
        ] as IRes[]
        expect(retrieveLaudableDays(beers).total > 0).toBeTruthy();
    })
    test("not laudable, quantity greater than next but minor or equal than before", async () => {
        const beers = [
            {quantity: 2, day: "2022-12-03"},
            {quantity: 3, day: "2022-12-02"},
            {quantity: 3, day: "2022-12-01"}
        ] as IRes[]

        expect(retrieveLaudableDays(beers).total > 0).toBeFalsy();
    })

    test("date valid", async () => {
        expect(dateIsValid("2022-12-01")).toBeTruthy();
    })
    test("date null", async () => {
        expect(dateIsValid("")).toBeFalsy();
    })
    test("date not valid", async () => {
        expect(dateIsValid("2022-12-32")).toBeFalsy();
    })
    test("date invalid, no '-'", async () => {
        expect(dateIsValid("20221201")).toBeFalsy();
    })
    test("date invalid with numbers", async () => {
        expect(dateIsValid("2022-12-1")).toBeFalsy();
    })
    test("date invalid with chars", async () => {
        expect(dateIsValid("aaaa-aa-aa")).toBeFalsy();
    })

})
