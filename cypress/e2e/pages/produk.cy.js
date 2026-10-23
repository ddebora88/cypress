import NavigationMenu from "../../support/pageObjects/NavigationMenu";

describe("Produk Page", () => {
  beforeEach(() => {
    cy.visit("/produk");
  });

  it("loads with the correct title", () => {
    cy.title().should("eq", "Produk | SawitPRO");
  });

  it("lists the core product cards", () => {
    ["Petani PRO", "Agen PRO", "TimPRO", "KebunPRO", "Dokter Sawit"].forEach((product) => {
      cy.contains(product).should("be.visible");
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
