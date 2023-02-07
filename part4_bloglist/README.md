# To run all tests:

npm run test

# To run single test:

npm test -- -t 'TEST NAME'

# The following command only runs the tests found in the tests/note_api.test.js file:

npm test -- tests/note_api.test.js

# The parameter can also contain just a part of the name. The following command will run all of the tests that contain notes in their name:

npm test -- -t 'notes'