## Cookie Configuration

### Overview

This module exports configuration options for setting cookies in Express applications. Cookies are used to store information like authentication tokens on the client-side.

### Cookie Options

- `httpOnly` - Prevents client-side JS from accessing the cookie. Improves security.
- `sameSite` - Specifies whether the cookie is sent with cross-origin requests. strict will prevent sending cookie cross-origin.
- `signed` - Indicates if the cookie should be signed (encrypted). This requires the cookie-parser middleware.
- `secure` - Cookie will only be sent over HTTPS.
- `maxAge` - Lifetime of the cookie in milliseconds.

### Configuration

- `age` - Environment variable for the lifetime of the JWT token in days.
- `maxAge` - Sets cookie lifetime.

### Usage

The options are exported and can be passed to res.cookie():

```js
res.cookie("token", tokenString, cookieOptions);
```

This will set the token cookie with the defined secure options.
