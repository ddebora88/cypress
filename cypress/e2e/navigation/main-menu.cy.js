import NavigationMenu from "../../support/pageObjects/NavigationMenu";

describe("SawitPRO Main Navigation Menu", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  context("Top-level menu items (data-driven)", () => {
    before(function () {
      cy.fixture("menu-data").then((data) => {
        this.menuData = data.mainMenu;
      });
    });

    it("navigates to every top-level page and verifies URL + title", function () {
      // Iterate sequentially: each iteration re-visits the homepage so the
      // nav is always in a known state before clicking the next item.
      cy.wrap(this.menuData).each((item) => {
        cy.visit("/");
        NavigationMenu.nav.contains("a", item.label).scrollIntoView().click({ force: true });
        cy.url().should("include", item.path);
        cy.title().should("eq", item.expectedTitle);
      });
    });
  });

  context("Produk dropdown submenu", () => {
    it("opens the Produk dropdown and shows PetaniPRO as an option", () => {
      NavigationMenu.produkLink().scrollIntoView().trigger("mouseover", { force: true });
      cy.contains("a", "PetaniPRO").should("be.visible");
    });

    it("navigates to the PetaniPRO product page", () => {
      NavigationMenu.openProdukSubmenu("PetaniPRO");
      cy.url().should("include", "/produk/petanipro");
    });

    it("navigates to the AgenPRO product page", () => {
      NavigationMenu.openProdukSubmenu("AgenPRO");
      cy.url().should("include", "/produk/agenpro");
    });

    it("navigates to the Dokter Sawit product page", () => {
      NavigationMenu.openProdukSubmenu("Dokter Sawit");
      cy.url().should("include", "/produk/doktersawit");
    });
  });

  context("Program dropdown submenu", () => {
    it("navigates to the Panen Emas program page", () => {
      NavigationMenu.openProgramSubmenu("Panen Emas");
      cy.url().should("include", "/program/panen-emas");
    });

    it("navigates to the PROTim program page", () => {
      NavigationMenu.openProgramSubmenu("PROTim");
      cy.url().should("include", "/program/protim");
    });
  });

  context("Toko (store) menu", () => {
    it("links out to the retail store subdomain", () => {
      NavigationMenu.tokoLink().should("have.attr", "href").and("include", "toko.sawitpro.id");
    });
  });
});
