## Settings Controller

### overview

This controller handles updating user account settings by interacting with the database and handling errors.

### Imports

- `PrismaClient` - To query the database
- `passwordOperations` util - For hashing and comparing passwords

### Helper Functions

**`isUserAuth`** - Checks if user is authenticated, throws error if not.

**`errorHandler`** - Returns formatted error response object.

**`updatePassword`** - Updates user's password in database.

- Check if user authenticated
- Validate old password
- Hash new password
- Update password in database
- Return success response

**`updateEmail`** - Updates user's email in database.

- Check if user authenticated
- Update email in database
- Return success response

**`updateUsername`** - Updates user's username in database.

- Check if user authenticated
- Update username in database
- Return success response

### Summary

This controller handles updating user account settings by validating input, updating the database, and returning API responses. Modular functions allow settings to be updated independently.
