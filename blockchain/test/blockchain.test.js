const Blockchain = require('../model/blockchain');
const Block = require('../model/block');

describe('Blockchain', () => {
    let blockchain, newChain , originalChain;

    beforeEach(() => {
      blockchain = new Blockchain();
      newChain = new Blockchain();

      originalChain = blockchain.chain;
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
          beforeEach(() => {

            blockchain.addBlock({data: 'Open'});
            blockchain.addBlock({data: 'Source'});
            blockchain.addBlock({data: 'Code'});

            // console.log(blockchain.chain[0]);
          });

            describe('and a lastHash reference has changed', () => {
                it('Returns False', () => {


                  blockchain.chain[2].lastHash = 'broken-lastHash';
                  expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });

            describe('and the chain has a block with invalid field', () => {
                it('Returns False', () => {

                  blockchain.chain[2].data = 'changing data';
                  expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });


            });

            describe('and the chain does not contain any invalid field', () => {
                it('Returns True', () => {

                  expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
                });
            });


        });

    });

    describe('ReplaceChain()', () => {
      describe('When the chain is not longer' , () => {
        it('does not replace the chain ' , () => {
           blockchain.addBlock({data: 'Replace test'})

           blockchain.replaceChain(newChain.chain);
           expect(blockchain.chain).toEqual(originalChain);
        });
      });

      describe('When the new chain is longer', () => {
        beforeEach(() => {

          newChain.addBlock({data: 'Open'});
          newChain.addBlock({data: 'Source'});
          newChain.addBlock({data: 'Code'});

          // console.log(blockchain.chain[0]);
        });


        describe('When the chain is invalid' , () => {
          it('does not replace the chain ' , () => {
            newChain.chain[2].hash = 'fake-replacement';

            blockchain.replaceChain(newChain.chain);

            expect(blockchain.chain).toEqual(originalChain);
          });
        });

        describe('When the chain is valid ', () => {
          it('replaces the chain' , () => {

            blockchain.replaceChain(newChain.chain);

            expect(blockchain.chain).toEqual(newChain.chain);
          });
        });
      });
    });

});
