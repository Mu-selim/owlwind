## Reaction Route

### Overview

The reactionRouter handles API routes for managing reactions on posts.
It uses the Express Router for modular, mountable route handlers.

### Imports

- `isAuthenticated` middleware to check if user is logged in
- Controller functions for reactions from `../controllers/reaction.js`

### Routes

**`POST /`** - Adds a reaction to a post

- Uses `isAuthenticated` middleware
- Calls `addReaction` controller

**`GET /:postID`** - Gets all reactions on a post

- Fetches `postID` param
- Calls `getPostReactions` controller

**`DELETE /`** - Removes user's reaction from a post

- Uses `isAuthenticated` middleware
- Calls `removeReaction` controller
