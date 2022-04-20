function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = []

items.push(new Item('+5 Dexterity Vest', 10, 20));
items.push(new Item('Aged Brie', 2, 0));
items.push(new Item('Elixir of the Mongoose', 5, 7));
items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
items.push(new Item('Conjured Mana Cake', 3, 6));

function checkItemProperties(item) {
  if (!item.hasOwnProperty('quality') || !item.hasOwnProperty('sell_in')) {
    return false;
  }

  return true;
}

function checkQualityValue(item) {

  const itemsByPass = [
    'Sulfuras, Hand of Ragnaros'
  ];

  if (itemsByPass.includes(item.name)) {
    return true;
  }

  if (item.quality >= 0 && item.quality <= 50) {
    return true;
  }

  return false;
}

function updateConjuredItem(item) {

  if (item.name.match(/Conjured/)) {
    item.quality -= 1;
  }

  return item;
}

function updateSulfurasItem(item) {

  // because for all items the quality and sell_in are updated in the beginning
  if (item.name.match(/Sulfuras/)) {
    item.sell_in += 1;
    item.quality += 1;
  }

  return item;
}

function updateItemThatGainQualityWhenDecreaseSellIn(item) {
  if (item.name.match(/(Aged Brie|Backstage passes)/gi)) {
    if (item.sell_in <= 10) {
      if (item.sell_in <= 5) {
        item.quality += 3;
      } else {
        item.quality += 2;
      }
    }
  }
  return item;
}

function updateQualityIfSellInLessThanZero(item) {
  if (item.sell_in < 0) {
    item.quality -= 1;
  }
  return item;
}

function update_quality(items) {

  // constraints ...
  // v - all items have sell_in and quality
  // v - quality never is less than 0
  // v - quality never is more than 50
  // v - quality is >= 0
  // v - quality is <= 50
  // - Sulfuras is legendary item not decrease quality and sell_in, your quality always 80 and never change
  // - "Backstage passes", like aged brie, increases in *quality* as it's *sell_in* value decreases; *quality* 
  //      increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but *quality* 
  //      drops to 0 after the concert
  // - Once the *sell_in* days is less than zero, *quality* degrades twice as fast

  items.map((item) => {

    if (!checkItemProperties(item)) {
      throw new Error('invalid properties, needs quality and sell_in');
    }

    if (!checkQualityValue(item)) {
      throw new Error(`invalid quality value: ${item.quality}`);
    }

    // for all items
    item.sell_in -= 1;
    item.quality -= 1;

    item = updateConjuredItem(item);
    item = updateSulfurasItem(item);
    item = updateItemThatGainQualityWhenDecreaseSellIn(item);
    item = updateQualityIfSellInLessThanZero(item);

    return item;
  });

  return items;
}

module.exports = {
  Item,
  items,
  checkItemProperties,
  checkQualityValue,
  updateConjuredItem,
  updateItemThatGainQualityWhenDecreaseSellIn,
  updateQualityIfSellInLessThanZero,
  update_quality
}