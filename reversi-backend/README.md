### Pre-Requisites
You must have node 16, 18, or 19 installed

You should install flyway `brew install flyway`

Have postgresql installed. Create the db. `createdb <dbname>`

## Instructions
1. Run `npm install`
2. Run `source .env.local`
3. Run `flyway migrate`
4. Run `npm start`

js/ts code changes will cause the dev server to auto-reload, but if you want db migrations to run again you will need to run `npm start` again. 