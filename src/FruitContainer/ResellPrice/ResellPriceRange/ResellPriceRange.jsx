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
        type="text"
        value={resellPriceMin}
        onChange={e => handleOnChange(e, 'min')}
        onKeyUp={handleOnKeyUp}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
      <p className="PriceDescription">max </p>
      <input
        id={fruitName}
        placeholder={placeholder}
        className="PriceField"
        type="text"
        value={resellPriceMax}
        onChange={e => handleOnChange(e, 'max')}
        onKeyUp={handleOnKeyUp}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
      <p className="Currency">kt</p>
    </div>
  );
};

export default resellPriceRange;
