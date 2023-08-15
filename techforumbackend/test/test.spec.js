const chai = require("chai");
const chaihttp = require("chai-http");

const should = chai.should();

chai.use(chaihttp);

const app = require("../app");

describe("Testing for question", () => {
    it("GET /users/question/", (done) => {
        chai.request(app).get("/users/question/").end((err, res) => {
            res.should.have.status(404);
        });
    });
});
