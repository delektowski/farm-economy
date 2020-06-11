import React, { useState } from 'react';
import { fruitFactory } from '../FruitFactory/FruitFactory';
import FruitContainer from '../FruitContainer/FruitContainer';
import * as selectOpt from '../lib/enums';

const FruitGenerator = () => {
  const [fruitList, setFruitList] = useState(fruitFactory);
  const [selectedOption, setSelectedOption] = useState(
    selectOpt.ZYSK_NA_GODZINE,
  );
  const selectOptions = [
    selectOpt.ALFABETYCZNIE,
    selectOpt.CENA_ZA_SZTUKE,
    selectOpt.CZAS_UPRAWY_MAX,
    selectOpt.CZAS_UPRAWY_MIN,
    selectOpt.ZYSK_NA_GODZINE,
    selectOpt.ZYSK_Z_POLA,
  ];

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

  const getSortedFruitsProfitPerHour = () => {
    return fruitList.sort((i, j) => {
      return (
        getProfitPerHour(j.fruitCroppingTime, j.fruitPrice, j.fruitCrop) -
        getProfitPerHour(i.fruitCroppingTime, i.fruitPrice, i.fruitCrop)
      );
    });
  };

  const getSortedFruitsAlphabetically = () => {
    return fruitList.sort((i, j) => {
      return i.fruitName.localeCompare(j.fruitName);
    });
  };

  const getSortedFruitsCroppingTime = isMax => {
    return fruitList.sort((i, j) => {
      return isMax
        ? j.fruitCroppingTime - i.fruitCroppingTime
        : i.fruitCroppingTime - j.fruitCroppingTime;
    });
  };

  const getSortedFruitsFieldProfit = () => {
    return fruitList.sort((i, j) => {
      return (
        (j.fruitPrice * j.fruitCrop) / j.fieldMultiplier -
        (i.fruitPrice * i.fruitCrop) / i.fieldMultiplier
      );
    });
  };

  const getSortedFruitsPerPrice = () => {
    return fruitList.sort((i, j) => {
      return j.fruitPrice - i.fruitPrice;
    });
  };

  const sortedFruits = () => {
    const getSortedFruitsAccordingToType = () => {
      if (selectedOption === selectOpt.ALFABETYCZNIE) {
        return getSortedFruitsAlphabetically();
      }
      if (selectedOption === selectOpt.ZYSK_NA_GODZINE) {
        return getSortedFruitsProfitPerHour();
      }
      if (selectedOption === selectOpt.CZAS_UPRAWY_MAX) {
        return getSortedFruitsCroppingTime(true);
      }
      if (selectedOption === selectOpt.CZAS_UPRAWY_MIN) {
        return getSortedFruitsCroppingTime(false);
      }
      if (selectedOption === selectOpt.ZYSK_Z_POLA) {
        return getSortedFruitsFieldProfit();
      }
      if (selectedOption === selectOpt.CENA_ZA_SZTUKE) {
        return getSortedFruitsPerPrice();
      }
    };

    return getSortedFruitsAccordingToType().map(fruitSorted => {
      const copyFruitSorted = { ...fruitSorted };
      copyFruitSorted.profit = +getProfitPerHour(
        copyFruitSorted.fruitCroppingTime,
        copyFruitSorted.fruitPrice,
        copyFruitSorted.fruitCrop,
      );
      return copyFruitSorted;
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
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              selectOptions={selectOptions}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FruitGenerator;
