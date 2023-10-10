## Getting Started

To get started, you need `node v14+` and `npm v6+` installed on your system. You also need to have a PostgreSQL database running on your system. You can download and install PostgreSQL from [here](https://www.postgresql.org/download/). once follow the following steps to get started:

1. Clone the repository

```bash
git clone https://github.com/Mu-selim/owlwind.git
```

2. Change directory to the project directory

```bash
cd owlwind\server
```

3. Create a `.env` file in the root directory of the project and add the following environment variables:

```bash
PORT=5000
DATABASE_URL=postgresql://<username>:<password>@localhost:5432/<database_name>
NODE_ENV=<development/production>
JWT_SECRET=<secret>
COOKIE_SECRET=<secret>
JWT_EXPIRES_IN=<time>
CLIENT_URL=<client_url>
```

4. Run the migrations

```bash
npm run prisma-init
```

```bash
npm run prisma-migrate
```

```bash
npm run prisma-deploy
```

5. Install dependencies

```bash
npm install
```

6. Start the server

```bash
npm run dev
```

7. Open the browser and navigate to `http://localhost:5000` to see the server running.
