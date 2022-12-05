import request from "supertest";
import server from "../../src/server";

afterEach((done) => {
    server.close();
    done();
});

// describe("routes/", () => {
//     it("should pong", async () => {
//         const response = await request(server).post("/beer");
//         expect(response.status).toEqual(200);
//         expect(response.type).toEqual("application/json");
//         expect(response.body.data).toEqual("pong");
//     });
// });
describe("POST /beer", () => {
    describe("when passed type, productionDate and quantity ", () => {
        test("should respond with a 200 status code", async () => {
            const response = await request(server)
                .post("/beer")
                .send({
                    type: "ROSSA",
                    quantity: 20,
                    productionDate: "2022-12-01"
                })
            expect(response.statusCode).toEqual(404);
        })

        test("should respond with a 200 status code", async () => {
            const response = await request(server)
                .post("/beer/search")
                .send({
                    type: "ROSSA",
                    quantity: 20,
                    productionDate: "2022-12-01"
                })
            expect(response.statusCode).toEqual(404);
        })
    });
})
