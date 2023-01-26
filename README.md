# Awesome Project Build with TypeORM

Steps to run this project:

1. Copy `example.env` file, paste it in the root, and rename it to `.env`

2. **Setup database settings**.
   The app uses PostgreSQL and Redis, thus they should be up and running before bootstapping the app. So, you can either:

- start them locally and set the DB env variables accordingly OR
- if you have docker installed, then pull the images and start containers by running `docker compose up -d` (or `docker-compose up -d`)

Once the DBs are up and running, proceed with the app setup:

3. Run `yarn` command 2. Run `migration:run` command 3. Run `yarn start` command

# Migration commands

yarn migration:generate ./src/migrations/MIGRATION_NAME
yarn migration:create ./src/migrations/MIGRATION_NAME
yarn migration:run
yarn migration:revert
