const feathers = require('feathers');
const rest = require('feathers-rest');
const hooks = require('feathers-hooks');
const socketio = require('feathers-socketio');
const bodyParser = require('body-parser');
const errorHandler = require('feathers-errors/handler');
const PushService = require('../lib').PushService;


// Create a feathers instance.
var app = feathers()
  // Enable REST services
  .configure(rest())
  // Enable hooks
  .configure(hooks())
  // Enable Socket.io services
  .configure(socketio())
  // Turn on JSON parser for REST services
  .use(bodyParser.json())
  // Turn on URL-encoded parser for REST services
  .use(bodyParser.urlencoded({extended: true}));

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
