describe("Karir (Jobs) Page", () => {
  beforeEach(() => {
    cy.visit("/jobs");
  });

  it("loads with the correct title", () => {
    cy.title().should("eq", "Karir | SawitPRO");
  });

  it('shows the "Join Our Team" heading', () => {
    cy.contains("Join Our Team").should("be.visible");
  });

  it("is reachable from the homepage via the main menu", () => {
    cy.visit("/");
    cy.clickNavLink("Karir");
    cy.url().should("include", "/jobs");
    cy.title().should("eq", "Karir | SawitPRO");
  });
});
