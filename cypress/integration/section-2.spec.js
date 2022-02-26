const { Section2 } = require("../objects/section-2");

describe("Section 2 Tests", () => {
  before(function () {
    cy.visit("http://localhost:8080/section-2");
  });

  describe("Waiting for network calls", function () {
    it("Assert status, payload, UI alert for long network call", function () {
      cy.intercept("GET", "/todos/1").as("longCall");
      Section2.actions.clickNetworkCallBtn();

      cy.wait("@longCall").should(({ response }) => {
        // assert status
        expect(response.statusCode).to.eq(200);
        // assert payload
        expect(response.body).to.have.property("id", 1);
        expect(response.body).to.have.property(
          "title",
          "Abnormally long network call!"
        );
      });

      // validate alter msg
      cy.on("window:alert", (msg) => {
        expect(msg).to.contains("Abnormally long network call!");
      });
    });
  });

  describe("Opening a new Tab", function () {
    it("Click on the button to trigger a new tab", function () {
      cy.visit("/");
      cy.window().then((win) => {
        cy.stub(win, "open").as("windowOpen");
      });
      cy.get("a").contains("Section 2").click();
      Section2.actions.clickOpenNewTabBtn();
      cy.get("@windowOpen").should("be.called");
    });

    it("Assert button does what it is supposed to", function () {
      cy.get(".row > div:nth-child(3) > a").should(
        "have.attr",
        "target",
        "_blank"
      );

      cy.get(".row > div:nth-child(3) > a").invoke("removeAttr", "target");
      Section2.actions.clickOpenNewTabBtn();
      cy.url().then((url) => {
        expect(url).to.eq("http://localhost:8080/");
      });
    });
  });
});
