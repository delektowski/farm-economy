import React, { useState, useEffect } from "react";

const FruitContainer = ({
  fruitName,
  fruitPrice,
  fruitCrop,
  fruitCroppingTime,
  sortedFruitProfit,
  handleChangePrice
}) => {
  const [price, setPrice] = useState(fruitPrice);
  const [fruitProfit, setFruitProfit] = useState(sortedFruitProfit);
  const [isFocus, setIsFocus] = useState(false);

  const getProfitPerHour = fruitPrice => {
    const hourMultiplier = fruitCroppingTime / 60;
    return +((fruitPrice * fruitCrop) / hourMultiplier).toFixed(2);
  };

  const getCroppingTimeHoursAndMinute = () => {
    const hours = Math.floor(fruitCroppingTime / 60);
    const minutes = Math.ceil(fruitCroppingTime % 60);
    return `${hours}h ${minutes}m`;
  };

  const handlePrice = e => {
    const newPrice = e.target.value;
    setPrice(newPrice);
  };

  const handleChangeProfit = e => {
    if (e.key === "Enter") {
      handleChangePrice(fruitName, event.target.value);
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
  }, [price]);

  useEffect(() => {
    setFruitProfit(sortedFruitProfit);
  }, [sortedFruitProfit]);

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
                <strong>Cena za sztukę</strong>{" "}
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
          <p>
            <strong>Zysk na godzinę: </strong>
            {fruitProfit} zł
          </p>
          <p>
            <strong>Zysk z plonu: </strong>
            {(fruitPrice * fruitCrop).toFixed(2)} zł
          </p>
        </section>
      </label>
    </div>
  );
};

export default FruitContainer;
