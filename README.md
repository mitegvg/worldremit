# WorldRemitChallenge

## Install instructions

-Run `npm install`

-Run `pod install` in the `ios` folder.

-To start the app run `npm run ios`

## Tests

-Run `npm test` to run the jest tests in the **tests** folder.

## How to improve the app if there is more time

- split the list component into separate components, like list-item, list-item-content, list-item-title etc

- use redux to for state management - if we have a database to save the followed and blocked users, it would be useful to use redux to share the global state among different components

- if using redux, would add two other folders - reducers (containing all reducer functions) and containers (all the component containers using the connect redux function)

- improve unit tests - when we split the list into list-item etc, we can have specific tests for items, titles etc

- add reducer function tests to test the reducer functions

- external services tests like api endpoint service functions

- integration tests - would use something cucumberjs
