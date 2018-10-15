// doc: https://developers.google.com/places/web-service/autocomplete
const { getData, getEnvValue } = require('../utils');

const POC_ID = 'autocomplete-place';

// query options and defaults
// component for selecting country - this should be sg until we expand
const REQ_COMPONENT = process.env.REQ_COMPONENT || 'country:sg';
// session so that we don't get charged too much
const REQ_SESSION = process.env.REQ_SESSION || 'e4a4c454-149b-497b-a769-fe1ac3230c19';
// query text
const REQ_TEXT = process.argv[2] || '';

// API administration stuff
const API_KEY = getEnvValue('GOOGLE_PLACES_API_KEY');
const REQ_HOST = 'maps.googleapis.com';
const REQ_METHOD = 'GET';
const REQ_PATH =
  '/maps/api/place/autocomplete/json?' +
  [
    `key=${API_KEY}`,
    `input=${encodeURIComponent(REQ_TEXT)}`,
    `components=${REQ_COMPONENT}`,
    `sessiontoken=${REQ_SESSION}`,
  ].join('&');

getData({
  id: POC_ID,
  hostname: REQ_HOST,
  method: REQ_METHOD,
  platform: 'google',
  useCache: true,
  uriPath: REQ_PATH
}).then(data => {
  console.info(data.predictions.map((prediction) => ({
    description: prediction.description,
    placeId: prediction.place_id,
    mainText: prediction.structured_formatting.main_text,
    secondaryText: prediction.structured_formatting.secondary_text,
    terms: prediction.terms.map((term) => term.value),
  })));
});
