## Profile Route

### Overview

This router handles profile related routes for viewing and updating user profiles.
The Express Router() is used to create a modular mountable router.

### Imports

- Router from Express
- Controller functions from `../controllers/profile.js`
- `isAuthenticated` middleware from `../middlewares/userStatus.js`
- `userInfoValidate` middleware from `../middlewares/infoValidate.js`

### Routes

**GET /:username**

- Calls `getProfile` controller to get a profile by username.

**POST /:username/follow**

- Checks if user is authenticated using `isAuthenticated` middleware.
- Calls `followUser` to follow a user.

**DELETE /:username/follow**

- Checks if user is authenticated using `isAuthenticated` middleware.
- Calls `unfollowUser` to unfollow a user.

**PUT /:username/info**

- Checks if user is authenticated using `isAuthenticated` middleware.
- Validates user info data using `userInfoValidate` middleware.
- Calls `putProfileInfo` to update user profile info.

**PUT /:username/picture**

- Checks if user is authenticated using `isAuthenticated` middleware.
- Calls `putProfilePicture` to update profile picture.

**PUT /:username/banner**

- Checks if user is authenticated using `isAuthenticated` middleware.
- Calls `putProfileBanner` to update profile banner.
