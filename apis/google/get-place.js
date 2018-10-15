// docs: https://developers.google.com/places/web-service/details
const { getData, getEnvValue } = require('../utils');

const POC_ID = 'get-place';

// query options and defaults
const REQ_PLACE_ID = process.env.REQ_PLACE_ID || 'EiBQb3RvbmcgUGFzaXIgQXZlbnVlIDIsIFNpbmdhcG9yZSIuKiwKFAoSCcfNrKJ4F9oxEY98C-lg61a7EhQKEgkXe0EMbxfaMRHgvnHoDQ15Vg';
const REQ_SESSION = process.env.REQ_SESSION || 'b95af092-a0bd-4a47-9570-2094604fbb25';

// API administration stuff
const API_KEY = getEnvValue('GOOGLE_PLACES_API_KEY');
const REQ_HOST = 'maps.googleapis.com';
const REQ_METHOD = 'GET';
const REQ_PATH =
  '/maps/api/place/details/json?' +
  [
    `key=${API_KEY}`,
    `placeid=${REQ_PLACE_ID}`,
    `sessiontoken=${encodeURIComponent(REQ_SESSION)}`,
  ].join('&');

getData({
  id: POC_ID,
  hostname: REQ_HOST,
  method: REQ_METHOD,
  platform: 'google',
  useCache: true,
  uriPath: REQ_PATH
}).then(data => {
  const {result} = data;
  console.info({
    lat: result.geometry.location.lat,
    lng: result.geometry.location.lng,
    name: result.name,
    photos: (result.photos || []).map((photo) => ({
      ref: photo.photo_reference,
      height: photo.height,
      width: photo.width,
    })),
    placeId: result.place_id,
    rating: result.rating ? result.rating : null,
    reviews: (result.reviews || []).map((review) => ({
      author: review.author_name,
      authorPicture: review.profile_photo_url,
      rating: review.rating,
      relativeTime: review.relative_time_description,
      text: review.text,
    })),
    url: result.url,
    types: result.types,
  });
});
