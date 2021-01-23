const Block = require('./block');
const {GENESIS_DATA} = require('./config');
const cryptoHash = require('./crypto-hash');

describe('Block',() => {

  const timestamp='a-date';
  const lastHash='previous-hash';
  const hash='current-hash';
  const data=['blockchain','data'];

  const block = new Block({timestamp , lastHash , hash , data});

  it('Verifying params', ()=> {
    expect(block.timestamp).toEqual(timestamp);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.hash).toEqual(hash);
    expect(block.data).toEqual(data);
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


    describe('Creates a SHA-256 Hash based on prev block', () => {
      expect(minedBlock.hash)
        .toEqual(cryptoHash(minedBlock.data , minedBlock.timestamp , lastBlock.hash));
    }); 

  });

});

