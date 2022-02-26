const Section2 = {
  /**
   * A literal is considered static, stable strings (eg. titles, form labels, ...)
   */
  literals: {},

  /**
   * An element is a selector for any DOM element (eg. [data-test="xxx"], #id, ...)
   */
  elements: {
    networkCallBtnElement: "[data-test=network-call-button]",
    openNewTabBtnElement: "[data-test=new-tab-button]",
    dwldFilebBtnElement: "[data-test=file-download-button]",
  },

  /**
   * An action should be pretty self explanatory! It consists of all the method performing
   * a particular action from clicking a simple button to doing complex assertions.
   */
  actions: {
    clickNetworkCallBtn() {
      cy.get(Section2.elements.networkCallBtnElement).click();
    },

    clickOpenNewTabBtn() {
      cy.get(Section2.elements.openNewTabBtnElement).click();
    },

    clickFileDownloadBtn() {
      cy.get(Section2.elements.dwldFilebBtnElement).click();
    },
  },
};

module.exports = { Section2 };
