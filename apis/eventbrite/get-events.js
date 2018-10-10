const { getData, getEnvValue } = require('../utils');

// query options and defaults
const REQ_LAT = process.env.REQ_LAT || 1.3521;
const REQ_LON = process.env.REQ_LON || 103.8198;
const REQ_TEXT = process.env.REQ_TEXT || 'fitness';

// API administration stuff
const API_KEY = getEnvValue('EVENTBRITE_API_KEY');
const REQ_HOST = 'www.eventbriteapi.com';
const REQ_METHOD = 'GET';
const REQ_PATH = '/v3/events/search/' +
    `?token=${API_KEY}` +
    `&q=${REQ_TEXT}` +
    `&location.longitude=${REQ_LON}` +
    `&location.latitude=${REQ_LAT}`
    ;
getData({
    id: 'get-events',
    hostname: REQ_HOST,
    method: REQ_METHOD,
    platform: 'eventbrite',
    useCache: true,
    uriPath: REQ_PATH,
}).then((data) => {
    console.info(data.events.map((v) => ({
        date: v['start']['local'],
        time: v['local_time'],
        name: v['name']['text'],
        by: v['organizer_id'] ? v['organizer_id'] : null,
        description: v['description'] ? v['description']['text'] : null,
        id: v['id']
        // lat: v['venue'] ? v['venue']['lat'] : null,
        // lon: v['venue'] ? v['venue']['lon'] : null,
    })));
}).catch((err) => {
    console.log(err);
});
