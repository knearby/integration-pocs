const crypto = require('crypto');
const fs = require('fs');
const https = require('https');
const path = require('path');

module.exports = {
  getData,
  getEnvValue,
  setCache,
};

function createCacheHash({
  method,
  hostname,
  uriPath,
}) {
  const unhashedData = method + hostname + uriPath;
  return crypto.createHash('md5').update(unhashedData).digest('hex');
}

function createCachePath({
  id,
  platform,
  cacheHash,
}) {
  return path.join(__dirname, `./${platform}`, `/${id}-${cacheHash}.json`);
}

function getData({
  hostname,
  id = 'unknown',
  method = 'GET',
  platform = '',
  uriPath = '/',
  useCache = false,
}) {
  
  return new Promise((resolve, reject) => {
    const cacheOptions = {
      hostname, id, method, platform, uriPath,
    };
    console.info(cacheOptions);
    const cachedData = getCache(cacheOptions);

    if (useCache && cachedData !== null ) {
      resolve(cachedData);
    } else {
      getResponse({
        hostname,
        uriPath,
        method,
      }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          setCache(cacheOptions, data);
          resolve(data);
        }
      });
    }
  });
};

function getResponse({
  hostname,
  method,
  uriPath,
}, callback) {
  const requestOptions = {
    hostname,
    port: 443,
    path: uriPath,
    method,
  };

  let responseBody = '';

  const request = https.request(
    requestOptions,
    (res) => {
      res.on('data', (data) => responseBody += data.toString());
      res.on('end', () => {
        let parsedData;
        try {
          parsedData = JSON.parse(responseBody);
        } catch (ex) {
          callback(ex);
        }
        callback(null, parsedData)
      });
    },
  );
  request.on('error', (error) => callback(error));
  request.end();
}

function getEnvValue(keyString) {
  return fs
    .readFileSync(path.join(__dirname, '../.env'))
    .toString()
    .split('\n')
    .filter((v) => v.indexOf(keyString) === 0)
    [0].split('=')[1];
};

/**
 * 
 * @param {Object} options
 * @param {String} options.hostname
 * @param {String} options.id
 * @param {String} options.method
 * @param {String} options.platform
 * @param {String} options.uriPath
 */
function getCache({
  hostname,
  id,
  method,
  platform,
  uriPath,
}) {
  const cacheHash = createCacheHash({method, hostname, uriPath});
  const pathToData = createCachePath({id, platform, cacheHash});

  try {
    return (fs.existsSync(pathToData))
      ? JSON.parse(fs.readFileSync(pathToData).toString())
      : null;
  } catch (ex) {
    console.info('pathToDataExists', fs.existsSync(pathToData));
    console.info('pathToData', pathToData);
    console.error(ex);
    throw ex;
  }
}

/**
 * 
 * @param {Object} options
 * @param {String} options.hostname
 * @param {String} options.id
 * @param {String} options.method
 * @param {String} options.platform
 * @param {String} options.uriPath
 * @param {Any} data
 */
function setCache(
  {
    hostname,
    id,
    method,
    platform,
    uriPath,
  },
  data
) {
  const cacheHash = createCacheHash({method, hostname, uriPath});
  const pathToData = createCachePath({id, platform, cacheHash});

  fs.writeFileSync(
    pathToData,
    JSON.stringify(data, null, 2)
  );
}
