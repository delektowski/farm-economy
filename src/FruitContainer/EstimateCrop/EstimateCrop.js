import React, { useEffect, useState } from 'react';
import EstimationTimeInput from './EstimationTimeInput/EstimationTimeInput';

const EstimateCrop = ({ croppingTime }) => {
  const [dateNow, setDateNow] = useState(Date.now());
  const [timeOfEstimationHour, setTimeOfEstimationHour] = useState(
    new Date(dateNow).getHours(),
  );
  const [timeOfEstimationMinutes, setTimeOfEstimationMinutes] = useState(
    new Date(dateNow).getMinutes(),
  );

  useEffect(() => {
    setInterval(() => {
      setDateNow(Date.now());
    }, 60000);
  }, []);
  const getEstimatedCropTime = () => {
    const getMillisecondsFromMinutes = minutes => {
      return minutes * 60000;
    };

    const getMinutesAsTwoCharacters = minutes => {
      return minutes.toString().length > 1 ? minutes : `0${minutes}`;
    };

    const getMonthAsTwoCharacters = month => {
      return month.toString().length > 1 ? month : `0${month}`;
    };

    const getDateEstimated = () => {
      const time = new Date();

      time.setHours(timeOfEstimationHour, timeOfEstimationMinutes, 0);
      return new Date(
        time.getTime() + getMillisecondsFromMinutes(croppingTime),
      );
    };

    const day = getDateEstimated().getUTCDate();
    const month = getDateEstimated().getMonth() + 1;
    const year = getDateEstimated()
      .getUTCFullYear()
      .toString()
      .substr();
    const hour = getDateEstimated().getHours();
    const minutes = getDateEstimated().getMinutes();

    return `${day}.${getMonthAsTwoCharacters(
      month,
    )}.${year} godz. ${hour}:${getMinutesAsTwoCharacters(minutes)}`;
  };

  const handleSetTimeToEstimateHour = hourToEstimate => {
    setTimeOfEstimationHour(hourToEstimate);
  };

  const handleSetTimeToEstimateMinutes = minutesToEstimate => {
    setTimeOfEstimationMinutes(minutesToEstimate);
  };

  return (
    <React.Fragment>
      <EstimationTimeInput
        dateNow={dateNow}
        onSetTimeToEstimateHour={handleSetTimeToEstimateHour}
        onSetTimeToEstimateMinutes={handleSetTimeToEstimateMinutes}
      />
      <p className="Paragraph">
        <strong>Czas zbioru: </strong> {getEstimatedCropTime()}
      </p>
    </React.Fragment>
  );
};

export default EstimateCrop;
