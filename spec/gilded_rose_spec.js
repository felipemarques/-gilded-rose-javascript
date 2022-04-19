const { expect } = require("@jest/globals");
const expectExport = require("expect");

describe("Gilded Rose", function() {

  it("should do something", function() {
    // prepare
    const items = [
      new Item('Conjured Mana Cake', 3, 6)
    ];

    // act
    const itemsResult = update_quality(items);

    // assert
    expect(itemsResult).toBe([new Item('Conjured Mana Cake', 3, 4)]);
  });

});
