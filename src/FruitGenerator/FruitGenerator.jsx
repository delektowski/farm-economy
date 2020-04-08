import React, { useState } from 'react';
import { fruitFactory } from '../FruitFactory/FruitFactory';
import FruitContainer from '../FruitContainer/FruitContainer';

const FruitGenerator = () => {
  const [fruitList, setFruitList] = useState(fruitFactory);
  const handleChangeFruitProperty = (fruitName, newValue, property) => {
    const changedFruitList = fruitList.map(fruit => {
      const fruitCopy = { ...fruit };
      if (fruitCopy.fruitName === fruitName) {
        fruitCopy[property] = newValue;
      }
      return fruitCopy;
    });
    setFruitList(changedFruitList);
  };

  const getProfitPerHour = (fruitCroppingTime, fruitPrice, fruitCrop) => {
    const hourMultiplier = fruitCroppingTime / 60;
    return ((fruitPrice * fruitCrop) / hourMultiplier).toFixed(2);
  };

  const getSortedFruitsPerProfit = () => {
    return fruitList.sort((i, j) => {
      return (
        getProfitPerHour(j.fruitCroppingTime, j.fruitPrice, j.fruitCrop) -
        getProfitPerHour(i.fruitCroppingTime, i.fruitPrice, i.fruitCrop)
      );
    });
  };

  const sortedFruits = () => {
    return sortedFruitsCroppingTime().map(fruitSorted => {
      const copyFruitSorted = { ...fruitSorted };
      copyFruitSorted.profit = +getProfitPerHour(
        copyFruitSorted.fruitCroppingTime,
        copyFruitSorted.fruitPrice,
        copyFruitSorted.fruitCrop,
      );
      return copyFruitSorted;
    });
  };

  const sortedFruitsAlphabetically = () => {
    return fruitList.sort((i, j) => {
      return i.fruitName.localeCompare(j.fruitName);
    });
  };

  const sortedFruitsCroppingTime = () => {
    return fruitList.sort((i, j) => {
      return i.fruitCroppingTime - j.fruitCroppingTime;
    });
  };

  return (
    <div className="ContentContainer">
      <h1 className="Header">Działkowe inwestycje</h1>
      <div className="AppContainer">
        {sortedFruits().map((fruit, i) => {
          return (
            <FruitContainer
              index={i + 1}
              key={fruit.fruitName}
              fruitName={fruit.fruitName}
              fruitPrice={fruit.fruitPrice}
              fruitCrop={fruit.fruitCrop}
              fruitCroppingTime={fruit.fruitCroppingTime}
              fieldMultiplier={fruit.fieldMultiplier}
              sortedFruitProfit={fruit.profit}
              imgPositionX={fruit.positionX}
              imgPositionY={fruit.positionY}
              handleChangeFruitProperty={handleChangeFruitProperty}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FruitGenerator;
