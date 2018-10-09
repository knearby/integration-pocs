const { getData, getEnvValue } = require('../utils');

// query options and defaults
const REQ_LAT = process.env.REQ_LAT || 1.2998;
const REQ_LON = process.env.REQ_LON || 103.7876;
const REQ_RAD = process.env.REQ_RAD || 500;
const REQ_TEXT = process.env.REQ_TEXT || 'cafe';

// API administration stuff
const API_KEY = getEnvValue('GOOGLE_PLACES_API_KEY');
const REQ_HOST = 'maps.googleapis.com';
const REQ_METHOD = 'GET';
const REQ_PATH =
  '/maps/api/place/nearbysearch/json' +
  `?key=${API_KEY}` +
  `&keyword=${REQ_TEXT}` +
  `&location=${REQ_LAT},${REQ_LON}` +
  `&radius=${REQ_RAD}`;

getData({
  id: 'get-places',
  hostname: REQ_HOST,
  method: REQ_METHOD,
  platform: 'google',
  useCache: true,
  uriPath: REQ_PATH
}).then(data => {
  console.info(data);
});
