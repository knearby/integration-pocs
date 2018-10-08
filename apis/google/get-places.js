const {getData, getEnvValue} = require('../utils');

// query options and defaults
const REQ_LAT = process.env.REQ_LAT || 1.3521;
const REQ_LON = process.env.REQ_LON || 103.8198;
const REQ_TEXT = process.env.REQ_TEXT || 'cafe';

// API administration stuff
const API_KEY = getEnvValue('GOOGLE_API_KEY');
// https://
const REQ_HOST = 'maps.googleapis.com';
const REQ_METHOD = 'GET';
const REQ_PATH = '/maps/api/place/findplacefromtext/json' +
  `?&key=${API_KEY}` +
  `&input=${REQ_TEXT}` +
  `&locationbias=point:${REQ_LAT},${REQ_LON}`
;

getData({
  id: 'get-places',
  hostname: REQ_HOST,
  method: REQ_METHOD,
  platform: 'google',
  useCache: true,
  uriPath: REQ_PATH,
}).then((data) => {
  console.info(data);
});
