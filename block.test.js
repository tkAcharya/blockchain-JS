const Block = require('./block');

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
