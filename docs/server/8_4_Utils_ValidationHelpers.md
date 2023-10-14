## Vaildation Helpers

### Overview

This module exports helper functions for validating user input in a Node.js application. The validator package is used to assist with validation.

### Functions

`isEmail(email)`:

- Uses `validator.isEmail()` to validate email format.
- Returns true if valid, false otherwise.

`isStrongPass(password)`:

- Validates password strength using `validator.isStrongPassword()`
- Checks min length, lowercase, uppercase, numbers, symbols.
- Returns true if password passes all criteria.

`isEmpty(string)`

- Checks if a string is empty after trimming whitespace using `validator.isEmpty()`
- Returns true if empty, false otherwise.

### Usage

Can be used when validating user input:

```js
if (!isEmail(email)) {
  // show email error
}

if (!isStrongPass(password)) {
  // show password error
}

if (isEmpty(name)) {
  // show required error
}
```
