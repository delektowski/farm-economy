import React, { useEffect, useState } from 'react';
import img from '../img/fruitVege.jpg';
import Chart from './Chart/Chart';
import PriceInput from './PriceInput/PriceInput';
import CheckboxInput from './CheckboxInput/CheckboxInput';
import EstimateCrop from './EstimateCrop/EstimateCrop';
import ResellPrice from './ResellPrice/ResellPrice';

const FruitContainer = ({
  fruitName,
  fruitPrice,
  fruitCrop,
  fruitCroppingTime,
  sortedFruitProfit,
  handleChangeFruitProperty,
  fieldMultiplier,
  imgPositionX,
  imgPositionY,
  index,
  selectedOption,
  setSelectedOption,
  selectOptions,
}) => {
  const image = {
    background: `url(${img})`,
    backgroundPosition: `${imgPositionX} ${imgPositionY}`,
    width: '2.7rem',
    height: '2.7rem',
    boxShadow: '0 2px 4px 2px rgba(0, 0, 0, 0.35)',
  };

  const [price, setPrice] = useState(fruitPrice);
  const [sellPrice, setSellPrice] = useState(0);
  const [fruitProfit, setFruitProfit] = useState(sortedFruitProfit);
  const [croppingTime, setCroppingTime] = useState(fruitCroppingTime);
  const [isFocus, setIsFocus] = useState(false);
  const [croppingTimeCheckboxFalse] = useState(fruitCroppingTime);
  const [isChangeSellPriceHistory, setIsChangeSellPriceHistory] = useState(
    false,
  );
  const [isResetDeleteColumnButton, setIsResetDeleteColumnButton] = useState(
    false,
  );

  const getProfitPerHour = fruitPrice => {
    const hourMultiplier = croppingTime / 60;
    return +((fruitPrice * fruitCrop) / hourMultiplier).toFixed(2);
  };

  const getPriceByProfitPerHour = profitPerHour => {
    const price = (profitPerHour * croppingTime) / 60 / fruitCrop;
    setPrice(price.toFixed(2));
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
    if (e.key === 'Enter') {
      handleChangeFruitProperty(fruitName, e.target.value, 'fruitPrice');
    }
  };

  const handleChangeSortingOnProfitChange = e => {
    if (e.key === 'Enter') {
      handleChangeFruitProperty(fruitName, price, 'fruitPrice');
    }
  };

  const handleOnFocus = () => {
    setIsFocus(true);
  };

  const handleOnBlur = () => {
    setIsFocus(false);
  };

  useEffect(() => {
    setFruitProfit(getProfitPerHour(price));
  }, [price, croppingTime]);

  useEffect(() => {
    setFruitProfit(sortedFruitProfit);
  }, [sortedFruitProfit]);

  useEffect(() => {
    handleChangeFruitProperty(fruitName, croppingTime, 'fruitCroppingTime');
  }, [croppingTime]);

  const handleWateringCheckbox = e => {
    if (e.target.checked) {
      setCroppingTime(croppingTime - Math.ceil(croppingTime * 0.08));
    } else {
      setCroppingTime(croppingTimeCheckboxFalse);
    }
  };

  const handleProfitOnHour = e => {
    const changedProfitOnHour = e.target.value;
    setFruitProfit(changedProfitOnHour);
    getPriceByProfitPerHour(e.target.value);
  };

  const handleSellPrice = e => {
    const changedSellPrice = isNaN(parseFloat(e.target.value, 10))
      ? ''
      : parseFloat(e.target.value, 10);
    setSellPrice(changedSellPrice);
  };

  const handleChangeChart = e => {
    if (e.key === 'Enter') {
      setIsChangeSellPriceHistory(true);
    }
  };

  const handleResetIsChangeSellPrice = () => {
    setIsChangeSellPriceHistory(false);
  };

  const handleHideDeleteColumnButton = e => {
    if (e.target.localName !== 'input') {
      setIsResetDeleteColumnButton(!isResetDeleteColumnButton);
    }
  };

  return (
    <div>
      <section
        onClick={handleHideDeleteColumnButton}
        className={
          isFocus ? ['FruitContainer', 'Focused'].join(' ') : ['FruitContainer']
        }
      >
        <div className="ContainerTitle">
          <div style={image} />
          <h2 className="Title">{fruitName}</h2>
        </div>

        <div className="sortingContainer">
          <button className="OrderNumber">
            <h3>{index}</h3>
          </button>

          <select
            value={selectedOption}
            onChange={e => {
              setSelectedOption(e.target.value);
            }}
            className="selectWindow"
            name="pets"
            id="pet-select"
          >
            {selectOptions.map(selectItem => {
              return (
                <option key={selectItem} value={selectItem}>
                  {selectItem}
                </option>
              );
            })}
          </select>
        </div>

        <p className="Paragraph">
          <strong>Czas uprawy: </strong> {getCroppingTimeHoursAndMinute()}
        </p>
        <EstimateCrop croppingTime={croppingTime} />
        <p className="Paragraph">
          <strong>Plon: </strong>
          {`${fruitCrop} szt.`}
        </p>

        <PriceInput
          title="Cena za sztukę"
          placeholder="cena"
          fruitName={fruitName}
          value={price}
          handleOnChange={handlePrice}
          handleOnKeyUp={handleChangeProfit}
          handleOnFocus={handleOnFocus}
          handleOnBlur={handleOnBlur}
        />

        <CheckboxInput
          title="Podlewanie"
          handleOnChange={handleWateringCheckbox}
          handleOnFocus={handleOnFocus}
          handleOnBlur={handleOnBlur}
        />
        <PriceInput
          title="Zysk na godzinę"
          placeholder="zysk"
          fruitName={fruitName}
          value={fruitProfit}
          handleOnChange={handleProfitOnHour}
          handleOnKeyUp={e => handleChangeSortingOnProfitChange(e)}
          handleOnFocus={handleOnFocus}
          handleOnBlur={handleOnBlur}
        />
        <p className="Paragraph">
          <strong>Zysk z pola: </strong>
          {((price * fruitCrop) / fieldMultiplier).toFixed(2)} kt
        </p>
        <PriceInput
          title="Cena ost. sprzedaży"
          placeholder="cena"
          fruitName={fruitName}
          value={sellPrice}
          handleOnChange={handleSellPrice}
          handleOnKeyUp={handleChangeChart}
          handleOnFocus={handleOnFocus}
          handleOnBlur={handleOnBlur}
        />
        <Chart
          fruitName={fruitName}
          sellPrice={sellPrice}
          isChangeSellPrice={isChangeSellPriceHistory}
          resetIsChangeSellPrice={handleResetIsChangeSellPrice}
          isResetDeleteColumnButton={isResetDeleteColumnButton}
        />
        <ResellPrice
          handleOnFocus={handleOnFocus}
          handleOnBlur={handleOnBlur}
          fruitName={fruitName}
        />
      </section>
    </div>
  );
};

export default FruitContainer;
