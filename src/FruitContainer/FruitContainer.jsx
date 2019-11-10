import React, { useState, useEffect } from "react";

const FruitContainer = ({
  fruitName,
  fruitPrice,
  fruitCrop,
  fruitCroppingTime,
  sortedFruitProfit,
  handleChangeFruitProperty,

}) => {
  const [price, setPrice] = useState(fruitPrice);
  const [fruitProfit, setFruitProfit] = useState(sortedFruitProfit);
  const [croppingTime, setCroppingTime] = useState(fruitCroppingTime);
  const [isFocus, setIsFocus] = useState(false);
  const [croppingTimeCheckboxFalse] = useState(fruitCroppingTime);

  const getProfitPerHour = fruitPrice => {
    const hourMultiplier = croppingTime / 60;
    return +((fruitPrice * fruitCrop) / hourMultiplier).toFixed(2);
  };

  const getCroppingTimeHoursAndMinute = () => {
    const hours = Math.floor(croppingTime / 60);
    const minutes = Math.ceil(croppingTime % 60);
    return `${hours}h ${minutes}m`;
  };

  const handlePrice = e => {
    const newPrice = e.target.value;
    setPrice(newPrice);
  };

  const handleChangeProfit = e => {
    if (e.key === "Enter") {
      handleChangeFruitProperty(fruitName, event.target.value, "fruitPrice");
    }
  };

  const handleOnFocus = e => {
    setIsFocus(true);
  };

  const handleOnBlur = e => {
    setIsFocus(false);
  };

  useEffect(() => {
    setFruitProfit(getProfitPerHour(price));
  }, [price, croppingTime]);

  useEffect(() => {
    setFruitProfit(sortedFruitProfit);
  }, [sortedFruitProfit]);

  useEffect(() => {
    handleChangeFruitProperty(fruitName, croppingTime, "fruitCroppingTime");
  }, [croppingTime]);

  const handleWateringCheckbox = e => {
    if (e.target.checked) {
      setCroppingTime(croppingTime - Math.ceil(croppingTime * 0.06));
    } else {
      setCroppingTime(croppingTimeCheckboxFalse);
    }
  };
  return (
    <div className="App">
      <label htmlFor={fruitName}>
        <section
          className={
            isFocus
              ? ["FruitContainer", "Focused"].join(" ")
              : ["FruitContainer"]
          }
        >
          <h2>{fruitName}</h2>
          <p>
            <strong>Czas uprawy: </strong> {getCroppingTimeHoursAndMinute()}
          </p>
          <p>
            <strong>Plon: </strong>
            {`${fruitCrop} sztuk`}
          </p>

          <div className="PriceContainer">
            <div className="CurrencyFieldContainer">
              <p>
                <strong>Cena za sztukę</strong>
              </p>
              <input
                id={fruitName}
                placeholder="cena"
                className="PriceField"
                type="number"
                value={price}
                onChange={handlePrice}
                onKeyUp={handleChangeProfit}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                min="0"
                max="999999"
                step="0.10"
              />
              <p>zł</p>
            </div>
          </div>
          <div className="WateringCheckboxContainer">
            <p>
              <strong>Podlewanie</strong>
            </p>
            <input
              type="checkbox"
              onChange={handleWateringCheckbox}
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
            />
          </div>
          <p>
            <strong>Zysk na godzinę: </strong>
            {fruitProfit} kt
          </p>
          <p>
            <strong>Zysk z pola: </strong>
            {(fruitPrice * fruitCrop).toFixed(2)} kt
          </p>
        </section>
      </label>
    </div>
  );
};

export default FruitContainer;
