/// <reference types="cypress" />

before(() => {
  Cypress.env("validPayment", {
    description: "Test",
    price: "99,99",
    deadline: "2021-12-31",
  });

  Cypress.Commands.add(
    "addValidPayment",
    (
      description: string = Cypress.env("validPayment").description,
      price: string = Cypress.env("validPayment").price,
      deadline: string = Cypress.env("validPayment").deadline
    ) => {
      cy.get("[data-cy=btn-add-new-payment]").click();
      cy.get("[data-cy=input-description]").type(description);
      cy.get("[data-cy=input-price]").type(price);
      cy.get("[data-cy=input-deadline]").type(deadline);
      cy.get("[data-cy=btn-save-payment]").click();
    }
  );
});

beforeEach(() => {
  cy.visit("http://localhost:3000/");
});

describe("Add new payment", () => {
  it("should open the modal form", () => {
    cy.get("[data-cy=btn-add-new-payment]").click();
    cy.get("[data-cy=new-payment-modal]").should("be.visible");
  });

  it("should add valid payment", () => {
    cy.addValidPayment();

    cy.get("[data-cy=payments-list]").should(($list) => {
      expect($list).length(1);
      expect($list.eq(0)).contain(Cypress.env("validPayment").description);
      expect($list.eq(0)).contain(Cypress.env("validPayment").price);
      expect($list.eq(0)).contain("31 dez 2021");
    });
  });

  it("should report an error when trying to save payment with empty description", () => {
    cy.get("[data-cy=btn-add-new-payment]").click();
    cy.get("[data-cy=input-description]").clear();
    cy.get("[data-cy=input-price]").type(Cypress.env("validPayment").price);
    cy.get("[data-cy=input-deadline]").type(
      Cypress.env("validPayment").deadline
    );
    cy.get("[data-cy=btn-save-payment]").click();
    cy.get("[data-cy=new-payment-modal]").contains("Preencha este campo");
  });

  it("should report an error when trying to save payment with empty price", () => {
    cy.get("[data-cy=btn-add-new-payment]").click();
    cy.get("[data-cy=input-description]").type(
      Cypress.env("validPayment").description
    );
    cy.get("[data-cy=input-price]").clear();
    cy.get("[data-cy=input-deadline]").type(
      Cypress.env("validPayment").deadline
    );
    cy.get("[data-cy=btn-save-payment]").click();
    cy.get("[data-cy=new-payment-modal]").contains("Preencha este campo");
  });

  it("should report an error when trying to save payment with empty deadline", () => {
    cy.get("[data-cy=btn-add-new-payment]").click();
    cy.get("[data-cy=input-description]").type(
      Cypress.env("validPayment").description
    );
    cy.get("[data-cy=input-price]").type(Cypress.env("validPayment").price);
    cy.get("[data-cy=input-deadline]").clear();
    cy.get("[data-cy=btn-save-payment]").click();
    cy.get("[data-cy=new-payment-modal]").contains("Preencha este campo");
  });

  it("should report an error when trying to save payment with invalid price", () => {
    cy.get("[data-cy=btn-add-new-payment]").click();
    cy.get("[data-cy=input-description]").type(
      Cypress.env("validPayment").description
    );
    cy.get("[data-cy=input-price]").type("99.99");
    cy.get("[data-cy=input-deadline]").type(
      Cypress.env("validPayment").deadline
    );
    cy.get("[data-cy=btn-save-payment]").click();
    cy.get("[data-cy=new-payment-modal]").contains("Insira um valor válido");
  });
});

describe("Update payment status", () => {
  it("should set payment as done", () => {
    cy.addValidPayment();

    cy.get("[data-cy=switch-paid]").parent().click();
    cy.get("[data-cy=switch-paid]").should(($element) => {
      expect($element).attr("aria-checked", "true");
    });
  });
});

describe("Update payment details", () => {
  it("should update payment details", () => {
    cy.addValidPayment();

    cy.get("[data-cy=btn-update-payment]").click();
    cy.get("[data-cy=update-payment-modal").should("be.visible");

    cy.get("[data-cy=input-description]").should(
      "be.value",
      Cypress.env("validPayment").description
    );
    cy.get("[data-cy=input-price]").should(
      "be.value",
      Cypress.env("validPayment").price
    );
    cy.get("[data-cy=input-deadline]").should(
      "be.value",
      Cypress.env("validPayment").deadline
    );

    cy.get("[data-cy=input-description]").clear().type("Updated description");
    cy.get("[data-cy=input-price]").clear().type("100,00");
    cy.get("[data-cy=input-deadline]").clear().type("2022-01-01");
    cy.get("[data-cy=btn-save-payment]").click();

    cy.get("[data-cy=payments-list]").should(($list) => {
      expect($list).length(1);
      expect($list.eq(0)).contain("Updated description");
      expect($list.eq(0)).contain("100,00");
      expect($list.eq(0)).contain("1 jan 2022");
    });
  });
});

describe("Delete payment", () => {
  it("should delete a payment", () => {
    cy.addValidPayment();

    cy.get("[data-cy=btn-delete-payment]").click();

    cy.get("[data-cy=payments-list]").should("have.length", 0);
  });
});
