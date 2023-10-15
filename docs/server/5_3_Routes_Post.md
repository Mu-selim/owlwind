## Post Route

### Overview

This router handles API routes related to posts in a social media app.
The Express `Router()` is used to create a modular mountable router.

### Imports

- Router from Express
- Post controller functions from `../controllers/post.js`
- `isAuthenticated` middleware from `../middlewares/userStatus.js`

### Routes

**POST /create**

- Uses `isAuthenticated` middleware to check if user is logged in.
- Calls `createPost` controller to handle creating a new post.

**GET /:postID**

- Calls `getPost` controller to get a single post by ID.

**DELETE /:postID**

- Uses `isAuthenticated` middleware to check if user is logged in.
- Calls `deletePost` controller to handle deleting a post by ID.
