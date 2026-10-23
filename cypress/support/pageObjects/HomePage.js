// cypress/support/pageObjects/HomePage.js
// Page Object for the SawitPRO homepage (https://www.sawitpro.id/).

class HomePage {
  visit() {
    cy.visit("/");
  }

  heroAboutButton() {
    // "Tentang Kami" call-to-action button in the hero section
    return cy.contains("a, button", "Tentang Kami");
  }

  googlePlayBadge() {
    return cy.get('a[href*="play.google.com"]');
  }

  whatsAppLink() {
    return cy.get('a[href*="wa.me"]');
  }

  footer() {
    return cy.get("footer");
  }

  socialLinks() {
    return this.footer().find(
      'a[href*="facebook.com"], a[href*="instagram.com"], a[href*="linkedin.com"], a[href*="youtube.com"], a[href*="tiktok.com"]'
    );
  }

  termsLink() {
    return this.footer().contains("a", "Syarat");
  }

  privacyPolicyLink() {
    return this.footer().contains("a", "Kebijakan Privasi");
  }
}

export default new HomePage();
