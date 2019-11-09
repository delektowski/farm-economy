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
    setPrice(e.target.value);
  };

  const handleChangeProfit = e => {
    if (e.key === "Enter") {
      handleChangePrice(fruitName, event.target.value);
    }
  };

  useEffect(() => {
    setFruitProfit(getProfitPerHour(price));
  }, [price]);

  useEffect(() => {
    setFruitProfit(sortedFruitProfit);
  }, [sortedFruitProfit]);

  return (
    <div className="App">
      <section className="FruitContainer">
        <h2>{fruitName}</h2>
        <p>
          <strong>Czas uprawy: </strong> {getCroppingTimeHoursAndMinute()}
        </p>
        <p>
          <strong>Plon: </strong>
          {`${fruitCrop} sztuki`}
        </p>

        <div className="PriceContainer">
          <div className="CurrencyFieldContainer">
            <label htmlFor="strawberryTime">
              <strong>Cena za owoc</strong>{" "}
            </label>
            <input
              placeholder="cena"
              className="PriceField"
              id="strawberryTime"
              type="number"
              value={price}
              onChange={handlePrice}
              onKeyUp={handleChangeProfit}
            ></input>
            <p>zł</p>
          </div>
        </div>

        <p>
          <strong>Zysk na godzinę: </strong>
          {fruitProfit} zł
        </p>
      </section>
    </div>
  );
};

export default FruitContainer;
