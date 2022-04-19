const { expect } = require("@jest/globals");
const expectExport = require("expect");
const { Item, update_quality} = require("../src/gilded_rose");

describe("Gilded Rose", function() {

  it("Test conjured quality decrease", function() {
    // prepare
    const items = [
      new Item('Conjured Mana Cake', 3, 6)
    ];

    // act
    const itemsResult = update_quality(items);

    // assert
    expect(itemsResult).toStrictEqual([new Item('Conjured Mana Cake', 2, 4)]);
  });

});
