// cypress/support/pageObjects/NavigationMenu.js
// Page Object for the main site header / navigation menu.
// Centralizes menu locators so individual specs stay readable and
// selector changes only need to be updated in one place.

class NavigationMenu {
  get nav() {
    return cy.get("header, nav").first();
  }

  // --- Top-level menu items -------------------------------------------------

  tentangLink() {
    return this.nav.contains("a", "Tentang");
  }

  produkLink() {
    return this.nav.contains("a", "Produk");
  }

  programLink() {
    return this.nav.contains("a", "Program");
  }

  karirLink() {
    return this.nav.contains("a", "Karir");
  }

  tokoLink() {
    return this.nav.contains("a", "Toko");
  }

  promoLink() {
    return this.nav.contains("a", "Promo");
  }

  beritaLink() {
    return this.nav.contains("a", "Berita");
  }

  hargaSawitLink() {
    return this.nav.contains("a", "Harga Sawit");
  }

  // --- Actions ---------------------------------------------------------------

  clickTentang() {
    this.tentangLink().scrollIntoView().click({ force: true });
  }

  clickKarir() {
    this.karirLink().scrollIntoView().click({ force: true });
  }

  clickPromo() {
    this.promoLink().scrollIntoView().click({ force: true });
  }

  clickBerita() {
    this.beritaLink().scrollIntoView().click({ force: true });
  }

  clickHargaSawit() {
    this.hargaSawitLink().scrollIntoView().click({ force: true });
  }

  /**
   * Open the "Produk" dropdown and click one of its submenu items,
   * e.g. openProdukSubmenu("PetaniPRO")
   */
  openProdukSubmenu(itemLabel) {
    this.produkLink().scrollIntoView().trigger("mouseover", { force: true });
    cy.contains("a", itemLabel, { timeout: 10000 }).should("be.visible").click({ force: true });
  }

  /**
   * Open the "Program" dropdown and click one of its submenu items,
   * e.g. openProgramSubmenu("Panen Emas")
   */
  openProgramSubmenu(itemLabel) {
    this.programLink().scrollIntoView().trigger("mouseover", { force: true });
    cy.contains("a", itemLabel, { timeout: 10000 }).should("be.visible").click({ force: true });
  }
}

export default new NavigationMenu();
