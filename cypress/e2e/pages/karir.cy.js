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
    cy.get("header, nav").first().contains("a", "Karir").scrollIntoView().click({ force: true });
    cy.url().should("include", "/jobs");
    cy.title().should("eq", "Karir | SawitPRO");
  });
});
