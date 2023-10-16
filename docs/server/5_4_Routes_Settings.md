## Settings Route

### Overview

The settingsRouter handles routes related to updating user account settings like email, username, and password.
It uses the Express Router to create modular, mountable route handlers.

### Imports

- `isAuthenticated` - middleware to check if user is logged in
- Controller functions for updating settings from `../controllers/settings.js`
- Validation middlewares for input data from `../middlewares/settingsValidate.js`

### Routes

**`PUT /password`** - Updates user password

- Uses `isAuthenticated` middleware
- Validates input with `passwordValidate`
- Calls `updatePassword` controller

**`PUT /email`** - Updates user email

- Uses `isAuthenticated` middleware
- Validates input with `emailValidate`
- Calls `updateEmail` controller

**`PUT /username`** - Updates username

- Uses `isAuthenticated` middleware
- Validates input with `usernameValidate`
- Calls `updateUsername` controller
