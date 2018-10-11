const {expect} = require('chai');

const geohasher = require('./geohasher');

const testCases = [
  {
    geohash: 'w21zdz3g84xj',
    latitude: '1.3588',
    longitude: '103.8342',
    precision: 12,
  },
];

describe('geohasher', () => {
  describe('.encode', () => {
    const {encode} = geohasher;

    it('works', () => {
      testCases.forEach((test) => {
        for (let p = 1; p < test.precision; ++p) {
          expect(encode({
            latitude: test.latitude,
            longitude: test.longitude,
            precision: p,
          })).to.eql(test.geohash.substr(0, p));
        }
      });
    });
  });

  describe('.decode', () => {
    const {decode} = geohasher;

    it('works', () => {
      testCases.forEach((test) => {
        const latlng = decode({
          debug: true,
          geohash: test.geohash.substr(0, test.precision)
        });
        console.info(latlng);
        expect(latlng.latitude - test.latitude).to.be.below(0.001);
        expect(latlng.latitude - test.latitude).to.be.above(-0.001);
        expect(latlng.longitude - test.longitude).to.be.below(0.001);
        expect(latlng.longitude - test.longitude).to.be.above(-0.001);
      });
    });
  });
});
