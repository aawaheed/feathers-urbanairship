# feathers-urbanairship

[![Build Status](https://travis-ci.org/aawaheed/feathers-urbanairship.png?branch=master)](https://travis-ci.org/aawaheed/feathers-urbanairship)
[![Code Climate](https://codeclimate.com/github/aawaheed/feathers-urbanairship/badges/gpa.svg)](https://codeclimate.com/github/aawaheed/feathers-urbanairship)
[![Test Coverage](https://codeclimate.com/github/aawaheed/feathers-urbanairship/badges/coverage.svg)](https://codeclimate.com/github/aawaheed/feathers-urbanairship/coverage)
[![Dependency Status](https://img.shields.io/david/aawaheed/feathers-urbanairship.svg?style=flat-square)](https://david-dm.org/aawaheed/feathers-urbanairship)
[![Download Status](https://img.shields.io/npm/dm/feathers-urbanairship.svg?style=flat-square)](https://www.npmjs.com/package/feathers-urbanairship)

> Adds Urban Airship capability to the feathers application (service)
#### Inspired from [FeathersJS/sendgrid](https://github.com/feathersjs/feathers-sendgrid)
## Installation

```
npm install feathers-urbanairship --save
```

## Documentation

Please refer to the [feathers-urbanairship documentation](http://docs.feathersjs.com/) for more details.

Please refer to the Urban Airship documentation [Urban Airship documentation](http://docs.urbanairship.com/index.html) for more details.
## Complete Example

Here's an example of a Feathers server that uses `feathers-urbanairship`. 

```js
const feathers = require('feathers');
const rest = require('feathers-rest');
const hooks = require('feathers-hooks');
const bodyParser = require('body-parser');
const errorHandler = require('feathers-errors/handler');
const PushService = require('feathers-urbanairship');

// Initialize the application
const app = feathers()
  .configure(rest())
  .configure(hooks())
  // Needed for parsing bodies (login)
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(errorHandler());

//set up Urban AirShip Details
const UA_APP_KEY = '';
const UA_APP_MASTER_KEY = '';

//set Test Device
const TEST_DEVICE_CODE  = ''

const ua = { username: UA_APP_KEY, password: UA_APP_MASTER_KEY };

app.use('/push', PushService(ua));

let iOSAlert = {
    "audience": {
        "ios_channel": TEST_DEVICE_CODE
    },
    "notification": {
        "alert": "Hello From Push Service"
    },
    "device_types": "all"
}

// Send a notification!
app.service('push').create(iOSAlert).then(function (result) {
  console.log('Sent push notification', result);
}).catch(error => {
  console.log(error);
});


app.use(errorHandler());

// Start the server.
const port = 3030;

app.listen(port, function () {
  console.log(`Feathers server listening on port ${port}`);
});

```

## License

Copyright (c) 2017

Licensed under the [MIT license](LICENSE).
