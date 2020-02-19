import React, { useState, useEffect } from 'react';

const EstimationTimeInput = ({ dateNow, onSetTimeToEstimate }) => {
  const [hour, setHour] = useState(new Date(dateNow).getHours());
  const [minutes, setMinutes] = useState(new Date(dateNow).getMinutes());
  const handleOnChangeHour = e => {
    setHour(e.target.value);
  };
  const handleOnChangeMinutes = e => {
    setMinutes(e.target.value);
  };
  useEffect(() => {
      console.log("hour", hour)
      onSetTimeToEstimate({hour, minutes});
  }, [hour, minutes]);

  return (
    <div className="CheckoboxPriceContainer">
      <p className="Paragraph">
        <strong>Godzina wysiewu: </strong>
      </p>
      <input
        type="number"
        value={hour}
        onChange={handleOnChangeHour}
        min="0"
        max="23"
        step="1"
      />
      <p> : </p>
      <input
        type="number"
        value={minutes}
        onChange={handleOnChangeMinutes}
        min="0"
        max="59"
        step="1"
      />
    </div>
  );
};

export default EstimationTimeInput;
