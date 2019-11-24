import React from "react";

const CheckboxInput = ({title, handleOnChange, handleOnFocus, handleOnBlur}) => {
    return (
        <div className="CheckoboxPriceContainer">
            <p className="Paragraph">
                <strong>{title} </strong>
            </p>
            <input
                type="checkbox"
                onChange={handleOnChange}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
            />
        </div>
    )
}

export default CheckboxInput