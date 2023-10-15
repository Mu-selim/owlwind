## Post Controller

### Overview

This controller handles API logic for creating, retrieving, and deleting posts.
The Prisma Client is used to query and mutate post data in the database.

### Imports

- `PrismaClient` - To query the database
- `isEmpty` - Validation helper

### Helper Functions

**`errorHandler`** - Returns a formatted error response object.

**`createPost`**:

- Check user auth status
- Validate input
- Create post record in DB
- Return API response with new post data

**`getPost`**:

- Get postID parameter
- Fetch post by ID from DB
- Include user, comments, reactions
- Return API response with post data

**`deletePost`**:

- Check user auth status
- Delete post in DB by ID and userID
- Return API response
