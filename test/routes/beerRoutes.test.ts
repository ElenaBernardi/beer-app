import beer, {Beer, BeerType} from "../../src/domain/model/Beer";
import {validate} from "class-validator";
import server from "../../src/server";
import request from "supertest"


describe("POST /beer", () => {
    let beerRequest: Beer;
    const validatorOptions = {};

    beforeEach(() => {
        beerRequest = new Beer(BeerType.ROSSA, 20, "2022-12-01");
    });
    afterEach((done) => {
        server.close();
        done();
    });
    test("should respond with a 400 status code, quantity not present", async () => {
        const response = await request(server)
            .post("/beer")
            .send({
                type: BeerType.ROSSA,
                productionDate: "2022-12-01"
            })
        expect(response.statusCode).toEqual(400);
    })
    test("should respond with a 400 status code, type not present", async () => {
        const response = await request(server)
            .post("/beer")
            .send({
                quantity: 23,
                productionDate: "2022-12-01"
            })
        expect(response.statusCode).toEqual(400);
    })
    test("should respond with a 400 status code, productionDate not present", async () => {
        const response = await request(server)
            .post("/beer")
            .send({
                type: BeerType.ROSSA,
                quantity: 23,
            })
        expect(response.statusCode).toEqual(400);
    })
    test('expected request', async () => {
        expect(beerRequest.type).toBeDefined();
        expect(beerRequest.quantity).toBeDefined();
        expect(beerRequest.productionDate).toBeDefined();

    })
    test('must be an enum', async () => {
        // @ts-ignore
        beerRequest.type = "TYPE";
        expect(
            await validate(beerRequest, validatorOptions)
        ).toHaveLength(1);
    });
    test('must have a length of 10 characters', async () => {
        beerRequest.productionDate = "a".repeat(11);
        console.log('qwerty',await validate(beerRequest, validatorOptions))
        expect(
            await validate(beerRequest, validatorOptions)
        ).toHaveLength(1);
    });
})
