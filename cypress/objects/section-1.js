const Section1 = {
  /**
   * A literal is considered static, stable strings (eg. titles, form labels, ...)
   */
  literals: {},

  /**
   * An element is a selector for any DOM element (eg. [data-test="xxx"], #id, ...)
   */
  elements: {
    tableRootElement: "[data-test=user-table]",
    showTableBtnElement: "[data-test=table-toggle-button]",
    showFormBtnElement: "[data-test=form-toggle-button]",
    tableHeaderElement: "[data-test=table-header]",
    formElement: "[data-test=signup-form]",
    nameElement: "[data-test=full-name-input]",
    ageElement: "[data-test=age-input]",
    genderElement: "[data-test=gender-select]",
    nurseElement: "[data-test=nurse-input]",
    submitBtnElement: "[data-test=submit-btn]",
  },

  /**
   * An action should be pretty self explanatory! It consists of all the method performing
   * a particular action from clicking a simple button to doing complex assertions.
   */
  actions: {
    assertTableNotVisible() {
      cy.get(Section1.elements.tableRootElement).should("not.be.visible");
    },

    assertTableVisible() {
      cy.get(Section1.elements.tableRootElement).should("be.visible");
    },

    clickShowTable() {
      cy.get(Section1.elements.showTableBtnElement).click();
    },

    getTableColumns() {
      return cy.get(Section1.elements.tableHeaderElement).find("th");
    },

    getTableRows() {
      return cy.get(Section1.elements.tableRootElement).find("tr");
    },

    getRoleData() {
      return cy
        .get(Section1.elements.tableRootElement)
        .find("tr th:nth-child(5)");
    },

    getDOBData() {
      return cy
        .get(Section1.elements.tableRootElement)
        .find("tr th:nth-child(4)");
    },

    assertFormNotVisible() {
      cy.get(Section1.elements.formElement).should("not.be.visible");
    },

    assertFormVisible() {
      cy.get(Section1.elements.formElement).should("be.visible");
    },

    clickShowForm() {
      cy.get(Section1.elements.showFormBtnElement).click();
    },

    typeName(name) {
      cy.get(Section1.elements.nameElement).type(name);
    },

    typeAge(age) {
      cy.get(Section1.elements.ageElement).type(age).trigger("change");
    },

    getName() {
      return cy.get(Section1.elements.nameElement).invoke("val");
    },

    getAge() {
      return cy.get(Section1.elements.ageElement).invoke("val");
    },

    selectGender(gender) {
      cy.get(Section1.elements.genderElement).select(gender);
    },

    getGender() {
      return cy.get(Section1.elements.genderElement).invoke("val");
    },

    selectNurse() {
      cy.get(Section1.elements.nurseElement).check();
    },

    getNurse() {
      return cy.get(Section1.elements.nurseElement).invoke("val");
    },

    submitForm() {
      cy.get(Section1.elements.submitBtnElement).click();
    },
  },
};

module.exports = { Section1 };
