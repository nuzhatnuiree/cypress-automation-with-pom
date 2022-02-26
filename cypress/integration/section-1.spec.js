const { Section1 } = require("../objects/section-1");

describe("Section 1 Tests", () => {
  before(function () {
    cy.visit("localhost:8080/section-1");
  });

  describe("Table tests", () => {
    it("1. Assert table is not visible", function () {
      Section1.actions.assertTableNotVisible();
    });

    it("2. Assert table is visible after clicking Show button", function () {
      Section1.actions.clickShowTable();
      Section1.actions.assertTableVisible();
    });

    it("3. Assert the table is 5 columns wide", function () {
      Section1.actions.getTableColumns().then((cols) => {
        expect(cols.length).to.eq(5);
      });
    });

    it("4. Assert table is 10 rows long excluding header", function () {
      Section1.actions.getTableRows().then((rows) => {
        expect(rows.length - 1).to.eq(10);
      });
    });

    it("5. Get number of rows with 'user'", function () {
      Section1.actions.getRoleData().then((rows) => {
        let count = 0;
        for (let i = 1; i < rows.length; i++) {
          if (rows.eq(i).text() == "user") count++;
        }
        expect(count).to.be.at.least(5);
      });
    });

    it("6. Get number of rows with 60 years old", function () {
      const currentYear = Cypress.moment().format("YYYY");
      cy.log(currentYear);
      Section1.actions.getDOBData().then((rows) => {
        let count = 0;
        for (let i = 1; i < rows.length; i++) {
          let date = rows.eq(i).text();
          let year = date.substring(date.lastIndexOf("/") + 1);
          if (currentYear - year >= 60) count++;
        }
        expect(count).to.eq(3);
      });
    });
  });

  describe("Form tests", () => {
    it("1. Assert form is not visible", function () {
      Section1.actions.assertFormNotVisible();
    });

    it("2. Assert form is visible after clicking Show button", function () {
      Section1.actions.clickShowForm();
      Section1.actions.assertFormVisible();
    });

    it("3. Fill name and age and assert inputs are filled", function () {
      Section1.actions.typeName("Shannon");
      Section1.actions.typeAge("30");

      Section1.actions.getName().then((name) => {
        expect(name).to.contain("Shannon");
      });
      Section1.actions.getAge().then((age) => {
        expect(age).to.contain("30");
      });
    });

    it("4. Select Female option and assert that the value is female", function () {
      Section1.actions.selectGender("Female");
      Section1.actions.getGender().then((gender) => {
        expect(gender).to.contain("female");
      });
    });

    it("5. Tick the Nurse checkbox and assert that the value nurse is true", function () {
      Section1.actions.selectNurse();
      Section1.actions.getNurse().then((nurse) => {
        expect(nurse).to.contain("on");
      });
    });

    it("6. Click submit button and assert alert window message", function () {
      Section1.actions.submitForm();
      cy.on("window:alert", (msg) => {
        expect(msg).to.contains("Form submitted!");
      });
    });
  });
});
