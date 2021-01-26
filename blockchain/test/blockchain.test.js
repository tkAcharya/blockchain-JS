const Blockchain = require('../model/blockchain');
const Block = require('../model/block');

describe('Blockchain', () => {
    let blockchain;

    beforeEach(() => {
      blockchain = new Blockchain();
    });

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

    describe('isValidChain()', () => {

        describe('Chain does not start with GENESIS BLOCK', () => {
            it('Returns False', () => {

                blockchain.chain[0] = {data: 'fake'};
                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);

            });

        });

        describe('Chain starts with GENESIS BLOCK , has multiple blocks', () => {
            describe('and a lastHash reference has changed', () => {
                it('Returns False', () => {
                  blockchain.addBlock({data: 'Open'});
                  blockchain.addBlock({data: 'Source'});
                  blockchain.addBlock({data: 'Code'});

                  blockchain.chain[2].lastHash = 'broken-lastHash';
                  expect(Blockchain.isValidChain(Blockchain.chain)).toBe(false);
                });
            });

            describe('and the chain has a block with invalid field', () => {
                it('Returns False', () => {
                  blockchain.addBlock({data: 'Open'});
                  blockchain.addBlock({data: 'Source'});
                  blockchain.addBlock({data: 'Code'});

                  blockchain.chain[2].data = 'changing data';
                  expect(Blockchain.isValidChain(Blockchain.chain)).toBe(false);
                });


            });

            describe('and the chain does not contain any invalid field', () => {
                it('Returns True', () => {
                  blockchain.addBlock({data: 'Open'});
                  blockchain.addBlock({data: 'Source'});
                  blockchain.addBlock({data: 'Code'});

                  expect(Blockchain.isValidChain(Blockchain.chain)).toBe(true);
                });
            });


        });

    });
});
