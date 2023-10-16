## Comments Route

### Overview

The commentsRouter handles API routes related to managing comments on posts.
It uses Express Router for modular, mountable route handlers.

### Imports
- `isAuthenticated` middleware to check if user logged in
- Controller functions for comments from `../controllers/comments.js`

### Routes
**`POST /`** - Adds a comment to a post

- Uses `isAuthenticated` middleware
- Calls `addComment` controller

**`GET /:postID`** - Gets all comments on a post

- Fetches `postID` param
- Calls `getPostComments` controller

**`DELETE /`** - Deletes a comment by user

- Uses `isAuthenticated` middleware
- Calls `removeComment` controller
