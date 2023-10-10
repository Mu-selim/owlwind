## Auth Route

### Overview

This router handles authentication-related routes for the application. It is responsible for user registration, login, logout, and account verification.

The `express.Router()` is used to create a modular, mountable route handler.

### Imports

The following items are imported:

- `Router` - to create the router
- Controller functions for each route from `../controllers/auth.js`
- Authentication middleware `isAuthenticated` from `../middlewares/userStatus.js`
- Validation middlewares `loginValidate` and `registerValidate` from `../middlewares/authValidate.js`

### Routes

**POST /register**

- Validates user input using `registerValidate` middleware
- Checks if user is already authenticated using `isAuthenticated` middleware
- Calls `postRegister` controller to handle registration

**POST /login**

- Validates user input using `loginValidate` middleware
- Checks if user is already authenticated using `isAuthenticated` middleware
- Calls `postLogin` controller to handle login

**POST /logout**

- Checks if user is authenticated using `isAuthenticated` middleware
- Calls `postLogout` controller to handle logout

**POST /verify**

- Will handle account verification (not yet implemented)
