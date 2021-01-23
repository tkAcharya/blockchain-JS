const Block = require('./block');
const {GENESIS_DATA} = require('./config');

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

});

describe ("genesis()", () => {
  const genesisBlock = Block.genesis();
  console.log(require('./config'));
  it('Check instance of Block', () => {
    expect(genesisBlock instanceof Block).toBe(true);
  });

  it('returns the genesis data', () =>{
    expect(genesisBlock).toEqual(GENESIS_DATA);
  });
});
