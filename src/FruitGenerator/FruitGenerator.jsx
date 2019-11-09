import React, { useState, useEffect } from "react";
import { fruitFactory } from "../FruitFactory/FruitFactory";
import FruitContainer from "../FruitContainer/FruitContainer";

const FruitGenerator = () => {
  const [fruitList, setFruitList] = useState(fruitFactory);
  useEffect(
    () => {
      console.log('kokos')
    },
    [fruitList]
  )
  const handleChangePrice = (fruitName, newPrice) => {
    const changedFruitList = fruitList.map(fruit => {
      const fruitCopy = { ...fruit };
      if (fruitCopy.fruitName === fruitName) {
        fruitCopy.fruitProfit = getProfitPerHour(
          fruitCopy.fruitCroppingTime,
          newPrice,
          fruitCopy.fruitCrop
        );
      }
      return fruitCopy;
    });
    console.log("changedFruitList", changedFruitList)
    setFruitList(changedFruitList);
  };
  const getProfitPerHour = (fruitCroppingTime, fruitPrice, fruitCrop) => {
    const hourMultiplier = fruitCroppingTime / 60;
    return ((fruitPrice * fruitCrop) / hourMultiplier).toFixed(2);
  };

  const getSubtractionSum = (i, j) => {
    return (
      getProfitPerHour(j.fruitCroppingTime, j.fruitPrice, j.fruitCrop) -
      getProfitPerHour(i.fruitCroppingTime, i.fruitPrice, i.fruitCrop)
    );
  };

  const getSortedFruitsPerProfit = () => {
    const sorted = fruitList.sort((i, j) => {
      return getSubtractionSum(i, j);
    });
    return sorted;
  };

  const sortedFruitsAndProfit = () => {
    return getSortedFruitsPerProfit().map(fruitSorted => {
      const copyFruitSorted = { ...fruitSorted };
      copyFruitSorted.profit = +getProfitPerHour(
        copyFruitSorted.fruitCroppingTime,
        copyFruitSorted.fruitPrice,
        copyFruitSorted.fruitCrop
      );
      return copyFruitSorted;
    });
  };

  return (<div>
    <h1 style={{textAlign: "center"}}>Ocena zyskowności kwiatuszkowych inwestycji działkowych</h1>
    <div className="AppContainer">
      
      {sortedFruitsAndProfit().map(fruit => {
        return (
          <FruitContainer
            key={fruit.fruitName}
            fruitName={fruit.fruitName}
            fruitPrice={fruit.fruitPrice}
            fruitCrop={fruit.fruitCrop}
            fruitCroppingTime={fruit.fruitCroppingTime}
            fruitProfit={fruit.profit}
            handleChangePrice={handleChangePrice}
          />
        );
      })}
    </div>
    </div>
  );
};

export default FruitGenerator;
