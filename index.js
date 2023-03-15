import stringSimilarity from "string-similarity";

Cypress.Commands.add(
  "sortacontains",
  { prevSubject: "optional" },
  (subject, text, threshold, options) => {
    // If subject is not provided, use the default Cypress subject
    const $root = subject
      ? Cypress.$(subject)
      : Cypress.$(Cypress.config("aut"));

    // If threshold is not provided, use a default value
    const similarityThreshold = threshold || 0.8;

    const checkSimilarity = ($el) => {
      const similarity = stringSimilarity.compareTwoStrings($el.text(), text);
      return similarity >= similarityThreshold;
    };

    // Use the built-in 'filter' function to only return elements with the desired text likeness
    const $elements = $root
      .find("*")
      .filter((_, el) => checkSimilarity(Cypress.$(el)));

    // If no elements are found, throw an error
    if ($elements.length === 0) {
      throw new Error(
        `No elements with a text similarity of at least ${similarityThreshold} found.`
      );
    }

    // Return the elements that passed the similarity threshold
    return cy.wrap($elements, options);
  }
);
