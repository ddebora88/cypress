describe("Harga Sawit (Harga TBS) Page", () => {
  beforeEach(() => {
    cy.visit("/harga-tbs");
  });

  it("loads with the correct title", () => {
    cy.title().should("eq", "Harga TBS | SawitPRO");
  });

  it("is reachable from the homepage via the main menu", () => {
    cy.visit("/");
    cy.get("header, nav").first().contains("a", "Harga Sawit").scrollIntoView().click({ force: true });
    cy.url().should("include", "/harga-tbs");
  });

  it("displays office/contact information for regional branches", () => {
    ["Pekanbaru", "Jambi", "Medan"].forEach((city) => {
      cy.contains(city).should("exist");
    });
  });
});
