## Auth Controller

### Overview

This controller handles user authentication logic including registration, login, logout, and account verification.

It exports the following functions:

- `postRegister` - handles user registration
- `postLogin` - handles user login
- `postLogout` - handles user logout
- `postVerify` - handles account verification (not yet implemented)

The `PrismaClient` from `@prisma/client` is used to interact with the database.

### Helper Functions

#### createUser

Creates a new user record in the database using Prisma and returns the user data without the password.

#### getUser

Finds a user by email or username using Prisma.

#### checkPassword

Compares the sent password with the hashed password in the database.

#### getPostsFromFollowedUsers

Gets recent posts from users that the given userID follows.

#### postRegister

- Validates input data
- Hashes the password
- Creates the user in the DB
- Generates a JWT token
- Sets auth cookies
- Catches errors like duplicate emails and returns a descriptive response.
- Returns response with user data and empty posts array

#### postLogin

- Validates input data
- Finds the user by email/username
- Checks if password matches
- Gets followed user posts
- Generates JWT token
- Sets auth cookies
- Catches errors like duplicate emails and returns a descriptive response.
- Returns response with user data and followed user posts

#### postLogout

- Checks if user is authenticated
- Clears the auth cookies
- Returns logout success response
- Returns error if user is not authenticated.

#### postVerify (not yet implemented)
