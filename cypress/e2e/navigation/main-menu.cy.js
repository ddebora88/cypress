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
        NavigationMenu.nav.contains("a", item.label).scrollIntoView();
        NavigationMenu.nav.contains("a", item.label).click({ force: true });
        cy.url().should("include", item.path);
        cy.title().should("eq", item.expectedTitle);
      });
    });
  });

  context("Produk dropdown submenu", () => {
    it("opens the Produk dropdown and shows PetaniPRO as an option", () => {
      // The dropdown opens via CSS `:hover`, so a real hover is required
      // (see cypress-real-events import in support/e2e.js) — a synthetic
      // `.trigger("mouseover")` does not change the browser's hover state.
      NavigationMenu.produkLink().scrollIntoView();
      NavigationMenu.produkLink().realHover();
      // Asserted against the parent <ul>'s computed `display` (a plain
      // string) rather than `.should("be.visible")` on the jQuery-wrapped
      // <a> directly: when a `.should("be.visible")` assertion on a DOM/
      // jQuery subject fails, allure-cypress tries to JSON.stringify that
      // subject for the failure report with no depth/length limit, which
      // crashes with "RangeError: Invalid string length" on a page this
      // rich in DOM content — masking the real assertion failure entirely.
      // Comparing a string keeps any real failure here readable instead.
      cy.contains("a", "PetaniPRO", { timeout: 10000 })
        .parent("ul")
        .should(($ul) => {
          expect($ul.css("display"), "Produk dropdown <ul> display").not.to.eq("none");
        });
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
