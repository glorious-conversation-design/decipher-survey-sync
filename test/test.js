var expect = require('chai').expect;
const dss = require('../lib/decipher-survey-sync.js');

describe('dss.get_api_key()', function() {
    it('should be equal to', function() {
        let theapikey = 'psdpaopdoadp2323131';

        expect(dss.get_api_key).to.be.equal(theapikey);
    })
})