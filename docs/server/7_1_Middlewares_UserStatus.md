## User Status Middleware

### Overview

This middleware module exports functions to check a user's authentication status and authorization.

### Imports

- `verifyToken` - used to verify JWT tokens

### Helper Functions

**`isAuthenticated`** Checks if the user is authenticated by:

- Getting the `userSession` cookie containing the JWT token
- Calling `verifyToken()` to validate the token
- Setting `req.authenticationStatus` to the result

This is used to prevent authenticated users from accessing login/register routes.

**`isAuthorized`** Checks if the user is authorized (i.e. has the correct role).