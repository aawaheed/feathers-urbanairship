//Implementation of Urban AirShip Push Notification
//http://docs.urbanairship.com/api/ua.html#push
//inspired from : https://github.com/feathersjs/feathers-sendgrid

import errors from 'feathers-errors';
import request from 'request';
import Debug from 'debug';

const debug = new Debug('feathers-urbanairship:push');

const URBANAIR_API = 'https://go.urbanairship.com/';

export class PushService {
  constructor (options = {}) {
    if (!options.username) {
      throw new Error('UrbanAirShip `App Key` needs to be provided');
    }
    if (!options.password) {
      throw new Error('UrbanAirShip `Master Key` needs to be provided');
    }

    options.authorization = Buffer.from(options.username + ':' + options.password).toString('base64');
    this.options = options;
  }

  create (data) {
    return new Promise((resolve, reject) => {
      const options = {
        url: `${URBANAIR_API}/api/push`,
        method: 'POST',
        json: true,
        headers: {
          'User-Agent': 'feathers-urbanairship',
          'Authorization': `Basic ${this.options.authorization}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.urbanairship+json; version=3;'
        },
        body: data
      };

      debug(`Sending request`, options);

      request(options, (error, response, body) => {
        if (error) {
          return reject(error);
        }

        error = errors[response.statusCode];

        if (error) {
          return reject(new Error('Error sending push to UrbanAirShip', body));
        }

        resolve({ sent: true });
      });
    });
  }
}

export default function (options) {
  debug(`Configuring UrbanAirShip Push service with options:`, options);

  return new PushService(options);
}
