const Blockchain = require('../model/blockchain');
const Block = require('../model/block');

describe('Blockchain', () => {
    const blockchain = new Blockchain();

    it('contains a chain Array Instance', () => {
        expect(blockchain.chain instanceof Array).toBe(true);
    });

    it('starts with Genesis block', () => {
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });

    it('Adds a new block to the chain', () => {
        const newData = 'new data';
        blockchain.addBlock({data: newData});

        expect(blockchain.chain[blockchain.chain.length-1].data)
            .toEqual(newData);
    })

});