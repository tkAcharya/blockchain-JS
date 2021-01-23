const cryptoHash = require('../util/crypto-hash');
const sha256 = require('js-sha256');

describe ('cryptoHash()', () => {

    it("Verifying SHA256 algo used in the code ", ()=> {
        expect(cryptoHash('test'))
            .toEqual('9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08');
    });


    it('Produces same hash with all the inputs irrespective of order' , () => {

        expect(cryptoHash('one', 'two', 'three'))
            .toEqual(cryptoHash('two','one','three'));
    });
});