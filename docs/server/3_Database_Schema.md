## Database Schema

The database schema is defined using [Prisma](https://www.prisma.io/). The schema is defined in the [`schema.prisma`](../../server/prisma/schema.prisma) file in the [`prisma`](../../server/prisma) directory. The schema is then used to generate the database client which is used to interact with the database. The database client is generated in the `@prisma/client` directory.

### Generator

The `generator client` block specifies that the Prisma Client JS library will be generated.

### Datasource

The `datasource` points to a PostgreSQL database using the `DATABASE_URL` environment variable.

### Models

- **User**: Stores user account information like username, email etc. Has an enum `userType` field. Related to other models via relations.
- **Follow**: Stores follower/following relationships between users. Refers to users with foreign keys.
- **Post**: Stores user posts. Related to users, comments and reactions.
- **Comment**: Stores post comments. Relates to users and posts.
- **Reaction**: Stores post reactions/likes. Relates to users and posts.

### Fields

- `@id` - Primary key field
- `@default` - Default value if unspecified
- `@unique` - Must be unique
- `@relation` - Links related model