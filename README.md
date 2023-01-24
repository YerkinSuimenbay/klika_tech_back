# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command

# Migration commands

yarn migration:generate ./src/migrations/MIGRATION_NAME
yarn migration:create ./src/migrations/MIGRATION_NAME
yarn migration:run
yarn migration:revert
