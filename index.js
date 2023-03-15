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

    const getSimilarity = ($el) => {
      return stringSimilarity.compareTwoStrings($el.text(), text);
    };

    const checkSimilarity = ($el) => {
      const similarity = getSimilarity($el);
      return similarity >= similarityThreshold;
    };

    // Filter elements that pass the similarity threshold
    const $filteredElements = $root
      .find("*")
      .filter((_, el) => checkSimilarity(Cypress.$(el)));

    // If no elements are found, throw an error
    if ($filteredElements.length === 0) {
      throw new Error(
        `No elements with a text similarity of at least ${similarityThreshold} found.`
      );
    }

    // Sort the filtered elements by similarity, in descending order
    const $sortedElements = $filteredElements.sort((a, b) => {
      const aSimilarity = getSimilarity(Cypress.$(a));
      const bSimilarity = getSimilarity(Cypress.$(b));
      return bSimilarity - aSimilarity;
    });

    // Return the sorted elements
    return cy.wrap($sortedElements, options);
  }
);
