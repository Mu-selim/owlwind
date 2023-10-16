## Comments Controller

### overview

This controller handles adding, getting, and deleting comments on posts.

### Imports

- `PrismaClient` - For database access
- `isEmpty` - Validation helper

### Helper Functions

**`errorHandler`** - Returns formatted error response object

**`checkHelper`** - Common input validation checks

**`findPost`** - Gets post data from DB, throws error if missing

**`addComment`** - Creates comment record in DB

- Validate user auth status
- Validate input
- Check post exists
- Create comment record in DB
- Return API response with new comment

**`getPostComments`** - Gets comment data from DB

- Validate postID
- Get post data
- Fetch comments on post from DB
- Return API response with comments

**`removeComment`** - Deletes comment record in DB

- Validate user auth status
- Validate input
- Check post and comment exist
- Verify user owns comment
- Delete comment in DB
- Return API response

### Summary

This controller handles comment CRUD operations by validating input, accessing DB, and returning API responses. Modular functions allow independent management of comment features.
