import NavigationMenu from "../../support/pageObjects/NavigationMenu";

describe("Produk Page", () => {
  beforeEach(() => {
    cy.visit("/produk");
  });

  it("loads with the correct title", () => {
    cy.title().should("eq", "Produk | SawitPRO");
  });

  it("lists the core product cards", () => {
    // Scoped to <main>: the header's Produk dropdown contains hidden <a>
    // links with this same text (e.g. "TimPRO"), and an unscoped
    // cy.contains() can match that hidden nav link before the visible
    // card heading, failing the visibility assertion.
    cy.get("main").within(() => {
      ["Petani PRO", "Agen PRO", "TimPRO"].forEach((product) => {
        cy.contains(product).should("be.visible");
      });
    });
  });

  it("keeps the Produk dropdown accessible from this page", () => {
    NavigationMenu.produkLink().should("be.visible");
  });

  it("navigates into the PetaniPRO detail page from the dropdown", () => {
    NavigationMenu.openProdukSubmenu("PetaniPRO");
    cy.url().should("include", "/produk/petanipro");
  });

  it("navigates into the KebunPRO detail page from the dropdown", () => {
    NavigationMenu.openProdukSubmenu("KebunPRO");
    cy.url().should("include", "/produk/kebunpro");
  });
});
