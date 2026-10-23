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
  //
  // Each click/hover is split into two chains (locate+scroll, then
  // locate+act) rather than `.scrollIntoView().click()` on one line.
  // Chaining two action commands together is flagged as unsafe by
  // cypress/unsafe-to-chain-command, since Cypress doesn't re-verify the
  // subject between them — re-querying the (cheap, static) nav link is
  // more robust.

  clickTentang() {
    this.tentangLink().scrollIntoView();
    this.tentangLink().click({ force: true });
  }

  clickKarir() {
    this.karirLink().scrollIntoView();
    this.karirLink().click({ force: true });
  }

  clickPromo() {
    this.promoLink().scrollIntoView();
    this.promoLink().click({ force: true });
  }

  clickBerita() {
    this.beritaLink().scrollIntoView();
    this.beritaLink().click({ force: true });
  }

  clickHargaSawit() {
    this.hargaSawitLink().scrollIntoView();
    this.hargaSawitLink().click({ force: true });
  }

  /**
   * Open the "Produk" dropdown and click one of its submenu items,
   * e.g. openProdukSubmenu("PetaniPRO")
   *
   * The dropdown is shown/hidden via pure CSS `:hover`, so it must be
   * opened with a real hover (cypress-real-events' `.realHover()`), not
   * Cypress's synthetic `.trigger("mouseover")` — that only dispatches a
   * mouseover event and does not change the browser's actual hover state.
   */
  openProdukSubmenu(itemLabel) {
    this.produkLink().scrollIntoView();
    this.produkLink().realHover();
    cy.contains("a", itemLabel, { timeout: 10000 }).should("be.visible").click({ force: true });
  }

  /**
   * Open the "Program" dropdown and click one of its submenu items,
   * e.g. openProgramSubmenu("Panen Emas")
   */
  openProgramSubmenu(itemLabel) {
    this.programLink().scrollIntoView();
    this.programLink().realHover();
    cy.contains("a", itemLabel, { timeout: 10000 }).should("be.visible").click({ force: true });
  }
}

export default new NavigationMenu();
