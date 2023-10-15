# Profile Controllers

- [profile.js](#profilejs)
- [profileFollowUnfollow.js](#profilefollowunfollowjs)
- [profileInfo.js](#profileinfojs)

## profile.js

### Overview

Gets a user profile by username from the database along with their posts.

### Imports

- PrismaClient to query database
- `getUserByUsername` utility to get user without sensitive fields

### Helper Functions

**`getUserPosts`** - Fetches all posts for the given username, including reactions and comments. Orders by descending created time.

**`getProfile`**:

- Get username param from request
- Get current user ID from cookies
- Call `getUserByUsername` to get clean user data
- Call `getUserPosts` to get user's posts
- Return response with user data, posts, and 'owner' or 'viewer' privilege
- Handle errors and return descriptive response

## profileFollowUnfollow.js

### Overview

Contains controller functions to handle following and unfollowing a user.

### Imports

PrismaClient to query follows table

### Helper Functions

**`findUser`** - Gets full user data to validate follow/unfollow. Throws errors if issues.

**`errorHandler`** - Returns formatted error response object.

**`followUser`**:

- Check if user authenticated
- Find target user
- Check if already following
- Create new follow record
- Return success response

**`unfollowUser`**:

- Check if user authenticated
- Find target user
- Check if currently following
- Delete follow record
- Return success response

## profileInfo.js

### Overview

Handles updating user profile info, picture and banner. Uses multer for uploads.

### Imports

- PrismaClient
- multer for file uploads
- `getUserByUsername` util

### Helper Functions

**`checkUser`** - Validates current user is authorized to edit this profile.

**`updateProfileInfo`** - Updates user record with new name, about, location.

**`putProfileInfo`**:

- Validate current user authorization
- Call `updateProfileInfo` to update fields
- Return success

**`putProfilePicture`**:

- Validate current user authorization
- Use multer to handle file upload
- Update user `avatarURL` with new picture location
- Return success response

**`putProfileBanner`**:

- Validate current user authorization
- Use multer to handle file upload
- Update user `bannerURL` with new banner location
- Return success response
