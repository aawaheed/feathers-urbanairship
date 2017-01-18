if (!global._babelPolyfill) { require('babel-polyfill'); }

import push from './services/push';


export const PushService = push;
// TODO (AAW): Add more services for the Urban Airship API

export default push;