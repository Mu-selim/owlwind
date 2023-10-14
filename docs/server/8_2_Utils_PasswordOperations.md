## Password Operations

### Overview

This module contains helper functions for hashing and comparing passwords when registering and authenticating users.

The bcrypt library is used to handle password hashing securely.

### Functions

**`hashPassword`** - hashing the password before saving to database improves security. The steps are:

- Generate a cryptographic salt using `bcrypt.genSalt()`
- Hash the plaintext password using the salt
- Return the hashed password

**`comparePassword`** - to authenticate, the plaintext password is compared against the hashed password from the database:

- `bcrypt.compare()` is used to compare the passwords in constant time
- Returns true if matching, false otherwise

### Usage

When registering a user:

```js
const hashed = await hashPassword(password);
// save hashed to db
```

When logging in:

```js
const match = await comparePassword(plaintext, hashed);
// match is true if password matches
```
