# cypress-sortacontains

## Example 1: Similarity threshold

Find elements with at least 90% text similarity to 'Sign up now for free':

```
cy.sortacontains('Sign up now for free', 0.9);
```

## Example 2: Specifying a parent element

Find elements with at least 75% text similarity to 'New user? Register here' within a '.login-form' element:

```
cy.get('.login-form').sortacontains('New user? Register here', 0.75);
```

## Example 3: Using options for the wrapped elements

Find elements with at least 85% text similarity to 'Add to cart', and click the first one:

```
cy.sortacontains('Add to cart', 0.85).first().click();
```
