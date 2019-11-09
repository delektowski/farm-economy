import React, { useState } from "react";

const FruitContainer = ({
  fruitName,
  fruitPrice,
  fruitCrop,
  fruitCroppingTime
}) => {
  const [price, setPrice] = useState(fruitPrice);

  const getProfitPerHour = () => {
    const hourMultiplier = fruitCroppingTime / 60;
    return ((price * fruitCrop) / hourMultiplier).toFixed(2);
  };

  const getCroppingTimeHoursAndMinute = () => {
    const hours = Math.floor(fruitCroppingTime / 60);
    const minutes = Math.ceil(fruitCroppingTime % 60);
    return `${hours}h ${minutes}m`;
  };

  const handlePrice = event => {
    setPrice(event.target.value);
  };

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

        <form className="PriceContainer">
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
            ></input>
            <p>zł</p>
          </div>
        </form>

        <p>
          <strong>Zysk na godzinę: </strong>
          {getProfitPerHour()} zł
        </p>
      </section>
    </div>
  );
};

export default FruitContainer;
