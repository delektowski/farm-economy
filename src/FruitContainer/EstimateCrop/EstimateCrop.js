import React, { useEffect, useState } from 'react';
import EstimationTimeInput from './EstimationTimeInput/EstimationTimeInput';

const EstimateCrop = ({ croppingTime }) => {
  const [dateNow, setDateNow] = useState(Date.now());
  const [timeOfEstimation, setTimeOfEstimation] = useState({
    hours: new Date(dateNow).getHours(),
    min: new Date(dateNow).getMinutes(),
  });

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
      console.log("timeOfEstimation", timeOfEstimation)
      time.setHours(timeOfEstimation.hours, timeOfEstimation.min, 0);
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

  const handleSetTimeToEstimate = timeToEstimate => {
    console.log("timeToEstimate", timeToEstimate)
    setTimeOfEstimation();
  };

  return (
    <React.Fragment>
      <EstimationTimeInput
        dateNow={dateNow}
        onSetTimeToEstimate={handleSetTimeToEstimate}
      />
      <p className="Paragraph">
        <strong>Czas zbioru: </strong> {getEstimatedCropTime()}
      </p>
    </React.Fragment>
  );
};

export default EstimateCrop;
