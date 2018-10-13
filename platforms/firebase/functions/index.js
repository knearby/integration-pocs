const functions = require('firebase-functions');

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send({
    body: request.body,
    headers: request.headers,
    method: request.method,
    params: request.query,
  });
});
