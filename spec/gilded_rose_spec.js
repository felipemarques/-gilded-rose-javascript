const { expect } = require("@jest/globals");
const expectExport = require("expect");
const { Item, items, update_quality} = require("../src/gilded_rose");

describe("Gilded Rose", function() {

  it("Test all items", function() {
    // prepare

    // act
    const itemsResult = update_quality(items);

    // assert
    expect(itemsResult).toStrictEqual([
      new Item('+5 Dexterity Vest', 9, 19),
      new Item('Aged Brie', 1, 2),
      new Item('Elixir of the Mongoose', 4, 6),
      new Item('Sulfuras, Hand of Ragnaros', 0, 80),
      new Item('Backstage passes to a TAFKAL80ETC concert', 14, 19),
      new Item('Conjured Mana Cake', 2, 4),
    ]);
  });

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
