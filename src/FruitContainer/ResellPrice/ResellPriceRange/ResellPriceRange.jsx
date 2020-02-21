import React from 'react';

const resellPriceRange = ({
  fruitName,
  resellPriceMin,
  resellPriceMax,
  handleOnChange,
  handleOnKeyUp,
  handleOnFocus,
  handleOnBlur,
  title,
  placeholder,
}) => {
  return (
    <div className="ResellPriceContainer">
      <p className="Paragraph">
        <strong>{title}: </strong>
      </p>
      <p className="PriceDescription">min </p>
      <input
        placeholder={placeholder}
        className="PriceField"
        type="number"
        value={resellPriceMin}
        onChange={e => handleOnChange(e, 'min')}
        onKeyUp={handleOnKeyUp}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        min="0"
        max="999999"
        step="0.10"
      />
      <p className="PriceDescription">max </p>
      <input
        id={fruitName}
        placeholder={placeholder}
        className="PriceField"
        type="number"
        value={resellPriceMax}
        onChange={e => handleOnChange(e, 'max')}
        onKeyUp={handleOnKeyUp}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        min="0"
        max="999999"
        step="0.10"
      />
      <p className="Currency">kt</p>
    </div>
  );
};

export default resellPriceRange;
