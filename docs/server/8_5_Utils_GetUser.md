## Get User

### Overview

This module contains a controller function to get a user profile by username from the database. The Prisma Client is used to query the database.

### Imports

PrismaClient - Instantiated to query the database models

### Functions

`getUserByUsername` - Queries the database for a user profile by username

- Accepts the `username` string parameter
- Uses `prisma.user.findUnique()` to query for a user by username
- Returns null if no user found
- Omits sensitive fields from user object
- Returns cleaned user object

### Usage

It can be used in a route handler:

```js
// GET /profile/:username
import { getUserByUsername } from "./controllers/profile.js";

router.get("/:username", async (req, res) => {
  const user = await getUserByUsername(req.params.username);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});
```
