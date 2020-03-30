## Frontend (Exit Intent Form / Exit Popup)
- An exit intent form that is displayed before the user is about to leave the web page to collect the user email.
- Can be integrated into any web page by adding the JavaScript snippet (@TODO) to the page.
- The exit intent form has the following properties:
    1. It is only displayed when a user is about to leave the webpage.
    2. The form is only displayed once, if a user dismisses the form, and
    visits the page again the form should not pop up.
    3. The form only collects an email and it has to be a valid email.

## Technical Features
- Using typescript
- Unit and integration test using Jest
- Using services that is shared between the frontend and backend (Like logger formatter and error codes)
- Logging using Winston with different log levels (`Info` for production bundle and `debug` for developing/serving)
- OOP Design (Than can be built to es5 and support old browsers)
- Dependency Injection Design
- HTTP Error handling using codes in addition to the normal messages
- Using SCSS
- Using Webpack and having different env variables when building or serving the code (Like `COOKIE_EXP_IN_DAYS` which prevent the exit popup from showing. Its configured to be 1 day on production and 0 to never expire on development/serving)
- Frontend validation using native HTML5 attributes
- Using Bootstrap
- Applying AirBnB Style guide 

## Development
### Requirements
- NodeJS > v10.18

### Install dependencies
- `$ npm i`

### Config 
- Edit `webpack.EnvironmentPlugin` section at `webpack/webpack.config.js` or `webpack/webpack.dev.server.config.js`.

### Serve
- `$ npm run serve`

### Build for production
- `$ npm run build`

### Test
- `$ npm run test`

## TODOs
- Separating the frontend to be a stand alone repo and publish on NPM with Travis and `sematic-release`
- Use InversifyJS for the IoC
- Using Djaty for bug tracking
- Using a logger decorator.
- Using Vue at the frontend
- Bundle the popup html inside the js code and generate `exit-popup.js` and `exit-popup.min.js`
- Adding more tests
