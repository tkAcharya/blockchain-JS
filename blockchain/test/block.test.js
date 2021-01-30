const Block = require('../model/block');
const {GENESIS_DATA} = require('../../config');
const cryptoHash = require('../util/crypto-hash');

describe('Block',() => {

  const timestamp='a-date';
  const lastHash='previous-hash';
  const hash='current-hash';
  const data=['blockchain','data'];
  const nonce =1 ;
  const difficulty = 1;
  const block = new Block({timestamp , lastHash , hash , data, nonce , difficulty});



  it('Verifying params', ()=> {
    expect(block.timestamp).toEqual(timestamp);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.hash).toEqual(hash);
    expect(block.data).toEqual(data);
    expect(block.nonce).toEqual(nonce);
    expect(block.difficulty).toEqual(difficulty);
  });


  describe ("genesis()", () => {
    const genesisBlock = Block.genesis();

    it('Check instance of Block', () => {
      expect(genesisBlock instanceof Block).toBe(true);
    });

    it('returns the genesis data', () =>{
      expect(genesisBlock).toEqual(GENESIS_DATA);
    });
  });

  describe('mineBlock()', ()=> {

    const lastBlock = Block.genesis();
    const data = "mined data";
    const minedBlock = Block.mineBlock({lastBlock , data});

    it('Check instance of Block', () => {
      expect(minedBlock instanceof Block).toBe(true);
      expect(minedBlock).not.toEqual(undefined);
    });

    it('Check the value of lastHash', () => {
      expect(minedBlock.lastHash).toEqual(lastBlock.hash);
    });

    it('Check the data field', () => {
      expect(minedBlock.data).toEqual(data);
    });

    it('Check the timestamp', () => {
       expect(minedBlock.timestamp).not.toEqual(undefined);
    });


    it('Creates a SHA-256 Hash based on prev block', () => {
      expect(minedBlock.hash)
        .toEqual(cryptoHash(minedBlock.data , minedBlock.timestamp ,
          lastBlock.hash , minedBlock.nonce , minedBlock.difficulty));
    });

    it('Sets a hash based upon difficulty and nonce', () => {
      expect(minedBlock.hash.substring(0,minedBlock.difficulty))
        .toEqual('0'.repeat(minedBlock.difficulty));
    });

  });

});
