const {getData, getEnvValue} = require('./utils');

// query options
const REQ_LAT = process.env.REQ_LAT || 1.3521;
const REQ_LON = process.env.REQ_LON || 103.8198;
const REQ_TEXT = process.env.REQ_TEXT || 'fitness';

// API administration stuff
const API_KEY = getEnvValue('MEETUP_API_KEY');
const REQ_PATH = '/find/upcoming_events' +
  '?sign=true' +
  '&photo-host=public' +
  '&page=20' +
  `&text=${REQ_TEXT}` +
  `&key=${API_KEY}` +
  `&lon=${REQ_LON}` +
  `&lat=${REQ_LAT}`
;

getData({
  id: 'get-events',
  useCache: true,
  uriPath: REQ_PATH,
}).then((data) => {
  console.info(data.events.map((v) => ({
    date: v['local_date'],
    time: v['local_time'],
    name: v['name'],
    by: v['group'] ? v['group']['name'] : null,
    description: v['description'] ? v['description'] : null,
    id: v['id'],
    lat: v['venue'] ? v['venue']['lat'] : null,
    lon: v['venue'] ? v['venue']['lon'] : null,
  })));
});
