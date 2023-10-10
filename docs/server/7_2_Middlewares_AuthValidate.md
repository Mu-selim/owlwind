## Auth Validate Middleware

### Overview

This module exports middleware functions to validate user input on registration and login.\
Input validation helps prevent incorrect or malicious data from reaching application code.

### Imports

Validation helper functions are imported from `../utils/validationHelpers.js`

### Helper Functions

**`registerValidate`** Validates registration data:

- name, username, email, password required
- username length 3-50 characters
- valid email format (helper function)
- strong password (helper function)
- Returns errors if issues found.

**`loginValidate`** Validates login data:

- user and password required
- user can be email or username
- Returns errors if missing.
