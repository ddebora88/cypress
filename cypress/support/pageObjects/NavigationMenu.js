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
   * The dropdown is shown/hidden via pure CSS `:hover`, so this attempts a
   * real hover first (cypress-real-events' `.realHover()`, not Cypress's
   * synthetic `.trigger("mouseover")` — that only dispatches a mouseover
   * event and does not change the browser's actual hover state). The
   * submenu `<a>` is deliberately clicked with `{ force: true }` rather
   * than asserted `.should("be.visible")` first: it's a real, always-present
   * link (just zero-size until hovered), and in CI's headless Electron,
   * realHover()'s CDP-simulated mouse move doesn't reliably trigger the
   * CSS `:hover` render the way it does in a real, GUI Chrome — see
   * README > Notes. Forcing the click keeps navigation reliable across
   * browsers without depending on that visual render.
   */
  openProdukSubmenu(itemLabel) {
    this.produkLink().scrollIntoView();
    this.produkLink().realHover();
    cy.contains("a", itemLabel, { timeout: 10000 }).click({ force: true });
  }

  /**
   * Open the "Program" dropdown and click one of its submenu items,
   * e.g. openProgramSubmenu("Panen Emas")
   * See the note on `openProdukSubmenu` above re: force-clicking rather
   * than asserting visibility first.
   */
  openProgramSubmenu(itemLabel) {
    this.programLink().scrollIntoView();
    this.programLink().realHover();
    cy.contains("a", itemLabel, { timeout: 10000 }).click({ force: true });
  }
}

export default new NavigationMenu();
