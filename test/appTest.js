const expect = require("chai").expect;
const request = require("request");
const sayHello = require("../app").sayHello;

describe("Game API", () => {
  describe("Tennis Game Data", () => {
    describe("Init game", () => {
      describe("Reset Game", () => {
        it("Status", (done) => {
          request.put(
            `http://localhost:5000/api/game/reset/5ff395ad653be0020cfdc998`,
            (_, response) => {
              expect(response.statusCode).to.equal(200);
              done();
            }
          );
        });

        it("Reset Data", (done) => {
          request.put(
            `http://localhost:5000/api/game/reset/5ff395ad653be0020cfdc998`,
            (_, response) => {
              const res = JSON.parse(response.body);
              expect(res.data.p1Score).to.equal(0);
              expect(res.data.p2Score).to.equal(0);
              expect(res.data.p1DisplayScore).to.equal(0);
              expect(res.data.p2DisplayScore).to.equal(0);
              expect(res.data.result).to.equal(3);
              done();
            }
          );
        });
      });
    });

    describe("Upddate Game", () => {
      describe("Put request to API", () => {
        const payload = {
          p1Score: 1,
          p2Score: 2,
          p1DisplayScore: 15,
          p2DisplayScore: 30,
          result: 3,
        };

        const Badpayload = {
          p1Score: 1,
          p2Score: 1,
        };

        it("Status", (done) => {
          request.put(
            `http://localhost:5000/api/game/5ff395ad653be0020cfdc998`,
            {
              json: Badpayload,
            },
            (_, response) => {
              expect(response.statusCode).to.equal(400);
              expect(response.body.errors[0].msg).to.equal(
                "p2 score is requird"
              );
              expect(response.body.errors[1].msg).to.equal(
                "p2 score is requird"
              );
              expect(response.body.errors[2].msg).to.equal("result is requird");

              done();
            }
          );
        });

        it("Update Game Data", (done) => {
          request.put(
            `http://localhost:5000/api/game/5ff395ad653be0020cfdc998`,
            {
              json: payload,
            },
            (_, response) => {
              const res = response.body.data;
              expect(res.p1Score).to.equal(1);
              expect(res.p2Score).to.equal(2);
              expect(res.p1DisplayScore).to.equal(15);
              expect(res.p2DisplayScore).to.equal(30);
              expect(res.result).to.equal(3);
              done();
            }
          );
        });
      });
    });

    describe("Fetching Data", () => {
      it("Status", (done) => {
        request.get(
          `http://localhost:5000/api/game/5ff395ad653be0020cfdc998`,

          (_, response) => {
            expect(response.statusCode).to.equal(200);

            done();
          }
        );
      });

      it("Update Game Data", (done) => {
        request.get(
          `http://localhost:5000/api/game/5ff395ad653be0020cfdc998`,

          (_, response) => {
            let res = response.body;
            res = JSON.parse(res).data;
            expect(res.p1Score).to.equal(1);
            expect(res.p2Score).to.equal(2);
            expect(res.p1DisplayScore).to.equal(15);
            expect(res.p2DisplayScore).to.equal(30);
            expect(res.result).to.equal(3);
            done();
          }
        );
      });
    });
    describe("Reset Game", () => {
      it("Status", (done) => {
        request.put(
          `http://localhost:5000/api/game/reset/5ff395ad653be0020cfdc998`,
          (_, response) => {
            expect(response.statusCode).to.equal(200);
            done();
          }
        );
      });

      it("Reset Data", (done) => {
        request.put(
          `http://localhost:5000/api/game/reset/5ff395ad653be0020cfdc998`,
          (_, response) => {
            const res = JSON.parse(response.body);
            expect(res.data.p1Score).to.equal(0);
            expect(res.data.p2Score).to.equal(0);
            expect(res.data.p1DisplayScore).to.equal(0);
            expect(res.data.p2DisplayScore).to.equal(0);
            expect(res.data.result).to.equal(3);
            done();
          }
        );
      });
    });
  });
});
