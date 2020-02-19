import React from 'react'

const PriceInput = ({fruitName, value, handleOnChange, handleOnKeyUp, handleOnFocus, handleOnBlur, title, placeholder}) => {

    return (
        <div className="CheckoboxPriceContainer">
            <label htmlFor={fruitName+placeholder} className="Paragraph">
                <strong>{title}: </strong>
            </label>
            <input
                id={fruitName+placeholder}
                placeholder={placeholder}
                className="PriceField"
                type="number"
                value={value}
                onChange={handleOnChange}
                onKeyUp={handleOnKeyUp}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                min="0"
                max="999999"
                step="0.10"
            />
            <p className="Currency">kt</p>
        </div>
    )
};

export default PriceInput
