import HomePage from "../../support/pageObjects/HomePage";
import NavigationMenu from "../../support/pageObjects/NavigationMenu";

describe("SawitPRO Homepage", () => {
  beforeEach(() => {
    HomePage.visit();
  });

  it("loads successfully with the correct title", () => {
    cy.title().should("eq", "SawitPRO | Solusi Digital Industri Kelapa Sawit Indonesia");
  });

  it("displays the main navigation menu", () => {
    NavigationMenu.nav.should("be.visible");
    NavigationMenu.tentangLink().should("be.visible");
    NavigationMenu.produkLink().should("be.visible");
    NavigationMenu.karirLink().should("be.visible");
    NavigationMenu.promoLink().should("be.visible");
    NavigationMenu.beritaLink().should("be.visible");
    NavigationMenu.hargaSawitLink().should("be.visible");
  });

  it('navigates to the "Tentang" page via the hero CTA button', () => {
    HomePage.heroAboutButton().first().scrollIntoView().click({ force: true });
    cy.url().should("include", "/tentang");
  });

  it("shows a Google Play store badge linking out to the app", () => {
    HomePage.googlePlayBadge().should("exist");
  });

  it("shows a WhatsApp contact link", () => {
    HomePage.whatsAppLink().should("have.attr", "href").and("include", "wa.me");
  });

  it("renders the footer with legal links", () => {
    HomePage.footer().should("be.visible");
    HomePage.termsLink().should("have.attr", "href").and("include", "term-and-condition");
    HomePage.privacyPolicyLink().should("have.attr", "href").and("include", "privacy-policy");
  });

  it("renders footer social media links", () => {
    HomePage.socialLinks().should("have.length.greaterThan", 0);
  });
});
