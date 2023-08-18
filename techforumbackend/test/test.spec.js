const chai = require("chai");
const chaihttp = require("chai-http");
const request = require("supertest");
const should = chai.should();

chai.use(chaihttp);

const app = require("../app");

describe("Question module API testing", (suite) => {
  describe("GET /api/users/question", (suite) => {
    // it("it should not GET all question", (done) => {
    //   chai
    //     .request(app)
    //     .get("/api/users/question")
    //     .end((err, res) => {
    //       res.should.have.status(404);
    //       res.body.should.be.a("object");
    //       res.body.should.have.property("status");
    //       res.body.should.have.property("status").eq("Fail");
    //       res.body.should.have.property("message");
    //       res.body.should.have.property("message").eq("Data Not Found");
    //       done();
    //     });
    // });
    it("it should GET all the question", (done) => {
      chai
        .request(app)
        .get("/api/users/question")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("status");
          res.body.should.have.property("status").eq("Success");
          res.body.should.have.property("message");
          res.body.should.have
            .property("message")
            .eq("Questions Readed successfully");
          res.body.should.have.property("data");
          res.body.data.should.be.a("array");
          done();
        });
    });
  });

  describe("POST /api/users/question", (suite) => {
    it("it should not post question without the body", (done) => {
      const question = {
        // userId: "64392880c4475de3e920adab",
        // question: "1:Unit testing nodejs module using mocha and chai",
        // tags: ["chai", "mocha"],
      };

      chai
        .request(app)
        .post("/api/users/question")
        .send(question)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("status").eq("Fail");
          res.body.should.have.property("error").eq("Data Not found");
          done();
        });
    });
    it("it should not post question without an userId field", (done) => {
      const question = {
        // userId: "64392880c4475de3e920adab",
        question: "1:Unit testing nodejs module using mocha and chai",
        tags: ["chai", "mocha"],
      };

      chai
        .request(app)
        .post("/api/users/question")
        .send(question)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("status").eq("Fail");
          res.body.should.have.property("error").eq("userId can't be null");
          done();
        });
    });
    it("it should not post question if the userId value is empty", (done) => {
      const question = {
        userId: "",
        question: "1:Unit testing nodejs module using mocha and chai",
        tags: ["chai", "mocha"],
      };

      chai
        .request(app)
        .post("/api/users/question")
        .send(question)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("status").eq("Fail");
          res.body.should.have.property("error").eq("userId can't be empty");
          done();
        });
    });
    it("it should not post question if the userId length is not equal to 24", (done) => {
      const question = {
        userId: "64392880c447",
        question: "1:Unit testing nodejs module using mocha and chai",
        tags: ["chai", "mocha"],
      };

      chai
        .request(app)
        .post("/api/users/question")
        .send(question)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("status").eq("Fail");
          res.body.should.have.property("error").eq("Invalid userId");
          done();
        });
    });
    it("it should not post question without an question field", (done) => {
      const question = {
        userId: "64392880c4475de3e920adab",
        // question: "1:Unit testing nodejs module using mocha and chai",
        tags: ["chai", "mocha"],
      };

      chai
        .request(app)
        .post("/api/users/question")
        .send(question)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("status").eq("Fail");
          res.body.should.have.property("error").eq("question can't be null");
          done();
        });
    });
    it("it should not post question if the question value is empty", (done) => {
      const question = {
        userId: "64392880c4475de3e920adab",
        question: "",
        tags: ["chai", "mocha"],
      };

      chai
        .request(app)
        .post("/api/users/question")
        .send(question)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("status").eq("Fail");
          res.body.should.have.property("error").eq("question can't be empty");
          done();
        });
    });

    const authenticatedUser = request.agent(app);
    const user = {
      emailId: "tilakv72@gmail.com",
      password: "Tilak@72",
    };
    before((done) => {
      authenticatedUser
        .post("/api/users/signin")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it("it should not post question if the questionDescribe value is empty", (done) => {
      const question = {
        userId: "64392880c4475de3e920adab",
        question: "1:Unit testing nodejs module using mocha and chai",
        questionDescribe: "",
        tags: ["chai", "mocha"],
      };

      authenticatedUser
        .post("/api/users/question")
        .send(question)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.have.property("status").eq("Fail");
            res.body.should.have
              .property("error")
              .eq("Question Describe can't be empty");
          done();
        });
    });
    it("it should not post question if the tags value is empty", (done) => {
      const question = {
        userId: "64392880c4475de3e920adab",
        question: "1:Unit testing nodejs module using mocha and chai",
        questionDescribe: "What I want to do is to create a unit test file which will take test t…",
        tags: [],
      };

      authenticatedUser
        .post("/api/users/question")
        .send(question)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("status").eq("Fail");
          res.body.should.have.property("error").eq("Tags can't be empty");
          done();
        });
    });
    it("it should not post question if the tags is not array", (done) => {
      const question = {
        userId: "64392880c4475de3e920adab",
        question: "1:Unit testing nodejs module using mocha and chai",
        questionDescribe: "What I want to do is to create a unit test file which will take test t…",
        tags: "sdfs",
      };

      authenticatedUser
        .post("/api/users/question")
        .send(question)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("status").eq("Fail");
          res.body.should.have.property("error").eq("tags must be in Array");
          done();
        });
    });

    it("it should not post question if post same question again", (done) => {
      const question = {
        userId: "64392880c4475de3e920adab",
        question: "2:Unit testing nodejs module using mocha and chai",
        tags: ["chai", "mocha"],
      };

      authenticatedUser
        .post("/api/users/question")
        .send(question)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("status").eq("Fail");
          res.body.should.have.property("message").eq("Question already exist");
          done();
        });
    });

    it("it should POST a question", (done) => {
      const question = {
        userId: "64392880c4475de3e920adab",
        question: "3:Unit testing nodejs module using mocha and chai",
        tags: ["chai", "mocha"],
      };
      authenticatedUser
        .post("/api/users/question")
        .send(question)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("status");
          res.body.should.have.property("status").eq("Success");
          res.body.should.have.property("message");
          res.body.should.have
              .property("message")
              .eq("Question created successfully");
          res.body.should.have.property("data");
          res.body.data.should.be.a("object")
          done();
        });
    });
  });
});
