const chai = require("chai");
const chaihttp = require("chai-http");

const should = chai.should();

chai.use(chaihttp);

const app = require("../app");

describe("Testing for question", (suite) => {
    suite.timeout(0);
    it("GET all Question", (done) => {
        chai.request(app).get("/api/users/question").end((err, res) => {
            res.should.have.status(200);
            // res.body.should.be.a('array');
            // res.body.length.should.be.eql(0);
            // res.should.have.keys("message", "data", "status");
            done();
        });
    });
});
