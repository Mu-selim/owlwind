## Reaction Controller

### overview

This controller handles adding, getting, and removing reactions on posts.

### Imports

- `PrismaClient` - For database access
- `isEmpty` - Validation helper

### Helper Functions

**`errorHandler`** - Returns formatted error response object

**`findPost`** - Gets post data from DB, throws error if missing

**`addReaction`** - Creates reaction record in DB

- Validate user auth status
- Validate input
- Check post exists
- Check user has not already reacted
- Create reaction record in DB
- Return API response

**`getPostReactions`** - Gets reaction data from DB

- Validate postID
- Get post data
- Fetch reaction data including user details
- Return API response

**`removeReaction`** - Deletes reaction record in DB

- Validate user auth status
- Validate input
- Check post exists
- Check user has reacted already
- Delete reaction record in DB
- Return API response

### Summary

This controller handles reaction CRUD operations by validating input, accessing the DB, and returning API responses. The modular functions allow independent management of reaction features.
