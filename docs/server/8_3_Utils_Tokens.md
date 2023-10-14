## Tokens

### Overview

This module contains functions for generating and verifying JSON Web Tokens (JWT) for authentication in a Node.js application.

The jsonwebtoken library is used for token creation and verification.

### Functions

`createToken` - Generates a signed JWT from a user ID and expiry time.

- `id` - The user ID to encode in the token payload
- `maxAge` - Expiry time specified in days
- JWT secret from environment variables used to sign the token
- Returns the signed access token string

`verifyToken` - Verifies if a JWT is valid:

- Token string is passed to `jwt.verify()` along with the secret
- On error (expired, malformed etc), it will return false
- If verification succeeds, the decoded token payload is returned

### Usage

When generating token on login:

```js
const token = createToken(user.id, 1); // 1 day expiry
```

To verify token before protected API call:

```js
const isValid = verifyToken(token);
if (!isValid) throw Error();
```
