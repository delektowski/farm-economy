import React, { useState, useEffect } from 'react';

const EstimationTimeInput = ({
  dateNow,
  onSetTimeToEstimateHour,
  onSetTimeToEstimateMinutes,
}) => {
  const [hour, setHour] = useState(new Date(dateNow).getHours());
  const [minutes, setMinutes] = useState(new Date(dateNow).getMinutes());

  const isHours = val => {
    if (val > 23) {
      return 23;
    }
    if (val < 0) {
      return 0;
    }
    return val;
  };

  const handleOnChangeHour = e => {
    const hour = e.target.value;
    setHour(isHours(hour));
  };

  const isMinutes = val => {
    if (val > 59) {
      return 59;
    }
    if (val < 0) {
      return 0;
    }
    return val;
  };

  const handleOnChangeMinutes = e => {
    const minutes = e.target.value;
    setMinutes(isMinutes(minutes));
  };
  useEffect(() => {
    onSetTimeToEstimateHour(hour);
    onSetTimeToEstimateMinutes(minutes);
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
