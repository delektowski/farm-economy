import React, {useState} from "react";
import {fruitFactory} from "../FruitFactory/FruitFactory";
import FruitContainer from "../FruitContainer/FruitContainer";
import firebase from 'firebase/app';
import 'firebase/database';
import {changeDiacriticToStandard} from "../lib/helper";

const FruitGenerator = () => {
    const [fruitList, setFruitList] = useState(fruitFactory);

    const handleChangeFruitProperty = (fruitName, newValue, property) => {
        const changedFruitList = fruitList.map(fruit => {
            const fruitCopy = {...fruit};
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

    const getSubtractionSum = (i, j) => {
        return (
            getProfitPerHour(j.fruitCroppingTime, j.fruitPrice, j.fruitCrop) -
            getProfitPerHour(i.fruitCroppingTime, i.fruitPrice, i.fruitCrop)
        );
    };

    const getSortedFruitsPerProfit = () => {
        return fruitList.sort((i, j) => {
            return getSubtractionSum(i, j);
        });
    };

    const sortedFruitsAndProfit = () => {
        return getSortedFruitsPerProfit().map(fruitSorted => {
            const copyFruitSorted = {...fruitSorted};
            copyFruitSorted.profit = +getProfitPerHour(
                copyFruitSorted.fruitCroppingTime,
                copyFruitSorted.fruitPrice,
                copyFruitSorted.fruitCrop
            );
            return copyFruitSorted;
        });
    };

    const setLastPriceHandler = (item) => {
        firebase.database().ref(`plants/${changeDiacriticToStandard(item)}`).set({
            price1: 1,
            price2: 2,
            price3: 3,
            price4: 4,
        });
    };

    return (
        <div className="ContentContainer">
            <h1 className="Header">
                Działkowe inwestycje
            </h1>
            <div className="AppContainer">
                {sortedFruitsAndProfit().map(fruit => {
                    return (
                        <FruitContainer
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
                            setLastPrice={setLastPriceHandler}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default FruitGenerator;
