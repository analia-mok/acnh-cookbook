function getIngredient (id, type) {
  const misc = {
    flour: {
      title: 'Flour',
      image: 'FlourWheatCropped.png',
    },
    wholeWheatFlour: {
      title: 'Whole-Wheat Flour',
      image: 'FlourWheatwholeCropped.png',
    },
    sugar: {
      title: 'Sugar',
      image: 'FlourSugarCropped.png',
    },
    brownSugar: {
      title: 'Brown Sugar',
      image: 'FlourSugarbrownCropped.png',
    },
    tomatoPuree: {
      title: 'Tomato Puree',
      image: 'FtrJarTomatoCropped.png',
    },
    weed: {
      title: 'Weed',
      image: 'Weed.png',
    },
  };

  const crop = {
    apple: {
      title: 'Apple',
      image: 'AppleCropped.png',
    },
    bambooShoot: {
      title: 'Bamboo Shoot',
      image: 'BanbooShoot.png',
    },
    carrot: {
      title: 'Carrot',
      image: 'CarrotCropped.png',
    },
    cherry: {
      title: 'Cherry',
      image: 'CherryCropped.png',
    },
    coconut: {
      title: 'Coconut',
      image: 'CoconutCropped.png',
    },
    potato: {
      title: 'Potato',
      image: 'PotatoCropped.png',
    },
    pear: {
      title: 'Pear',
      image: 'PearCropped.png',
    },
    peach: {
      title: 'Peach',
      image: 'PeachCropped.png',
    },
    pumpkin: {
      title: 'Orange Pumpkin',
      image: 'SquashOrange.png',
    },
    white_pumpkin: {
      title: 'White Pumpkin',
      image: 'SquashWhite.png',
    },
    green_pumpkin: {
      title: 'Green Pumpkin',
      image: 'SquashGreen.png',
    },
    yellow_pumpkin: {
      title: 'Yellow Pumpkin',
      image: 'SquashYellow.png',
    },
    orange: {
      title: 'Orange',
      image: 'OrangeCropped.png',
    },
    sugarCane: {
      title: 'Sugarcane',
      image: 'SugarCaneCropped.png',
    },
    tomato: {
      title: 'Tomato',
      image: 'TomatoCropped.png',
    },
    turnip: {
      title: 'Turnip',
      image: 'KabuCropped.png',
    },
    wheat: {
      title: 'Wheat',
      image: 'WheatCropped.png',
    },
    // Not actual crops... all well.
    scallop: {
      title: 'Scallop',
      image: 'HotateCropped.png',
    },
    clam: {
      title: 'Clam',
      image: 'ShellFishAsari.png',
    },
    tiger_prawn: {
      title: 'Tiger Prawn',
      image: 'KurumaebiCropped.png',
    },
    squid: {
      title: 'Squid',
      image: 'HotaruikaCropped.png',
    },
    sweet_shrimp: {
      title: 'Sweet Shrimp',
      image: 'AmaebiCropped.png',
    },
    seaweed: {
      title: 'Seaweed',
      image: 'WakameCropped.png',
    },
  };

  const mushies = {
    round: {
      title: 'Round Mushroom',
      image: 'Mush1.png',
    },
    skinny: {
      title: 'Skinny Mushroom',
      image: 'Mush2.png',
    },
    flat: {
      title: 'Flat Mushroom',
      image: 'Mush3.png',
    },
    rare: {
      title: 'Rare Mushroom',
      image: 'Mush4.png',
    },
  };

  const recipe = {
    tomato_puree: {
      title: 'Tomato Puree',
      image: 'FtrJarTomato.png',
    },
  };

  const items = {
    mushy: mushies,
    crop,
    misc,
    recipe,
  };

  if (items[type] && items[type][id]) {
    return items[type][id];
  }

  return null;
}

export { getIngredient };
