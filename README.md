Express Server with intent Exit/ Exit Popup frontend
===

## Express Server
### Technical Features
- Using Typescript
- Using TS.ed. It is a Node.js and TypeScript framework on top of Express to write the application with TypeScript (or ES6)
  It provides a lot of decorators and guidelines to make the code more readable and less error-prone
- Custom Logger to allow logging
- Using JS object based config files for more flexibility
- Using Djaty for bug tracking
- Using Redis as a session store for production scaling support
- Using winston as a custom logger
- Applying AirBnB Style guide 
- Code based error messages
- Custom error handling
- Creating a security middleware
- Modularity structure
- JSON based request validation using AJV
- Using domains in combination with our logger to log all the request logs with a unique ID
- Exposing Health Checks endpoint and supporting Graceful Shutdown
- Supporting AWS CodeBuild
- Supporting AWS Serverless Application Model (SAM) framework for building the serverless Lambda
- Using `semantic-release` for semantic versioning and generation changelog
- Using `commitlint` and `husky` to force Angular conventional commit format and linting staged files
- Using `sequelize-typescript` and building decorated Models

### Current Routes
| Method         | Endpoint                        | Class method                      |
| -------------- | ------------------------------- | --------------------------------- |
| GET            | /api/subscriptions/mailing-list | SubscriptionCtrl.getMailingList() |
| POST           | /api/subscriptions/             | SubscriptionCtrl.subscribe()      |
| GET            | /api/healthCheck                |                                   |

### Requirements
- NodeJS > v10.18

### Database
- Install MySQL
- Run query: `CREATE TABLE Subscription ( id int NOT NULL AUTO_INCREMENT, email varchar(255) UNIQUE NOT NULL, creationDate Date, updatedAt Date, PRIMARY KEY (id) );`

### Install dependencies
- `$ npm i`

### Config
- Copy file `src/config/config.default.ts` to `src/config/config.ts` and set needed config.
- Copy file `src/config/djatyConfig.default.ts` to `src/config/djatyConfig.ts` and set needed config.

### Build
- `$ npm run buildServer`
- `$ npm run build # To build both server and the frontend`

### Run the app
- `$ npm run start`

### Test
- `$ npm run testServer`
- `$ npm run test # To test both server and the frontend`

### Git Commit
- `$ npm run commit`

### TODOs
- Every module should have its own `ERROR_MESSAGES` object.
- Create testing example.
- Create a logger decorator.
- Replacing the Domain with `async-hook-domain`
- Using Swagger
- Configuring `djaty` based on the env.
- Completing the GET `/mailing-list` endpoint

## Frontend (Exit Intent Form / Exit Popup)
- Check README.md file inside `frontend` directory.
