import React, { useEffect, useState } from 'react';

const EstimateCrop = ({ croppingTime }) => {
  const [dateNow, setDateNow] = useState(Date.now());

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

    const getDateEstimated = () => {
      return new Date(dateNow + getMillisecondsFromMinutes(croppingTime));
    };

    const day = getDateEstimated().getUTCDate();
    const month = getDateEstimated().getMonth() + 1;
    const year = getDateEstimated()
      .getUTCFullYear()
      .toString()
      .substr(-2);
    const hour = getDateEstimated().getHours();
    const minutes = getDateEstimated().getMinutes();

    return `${day}.${month}.${year} godz. ${hour}:${getMinutesAsTwoCharacters(
      minutes,
    )}`;
  };

  return (
    <p className="Paragraph">
      <strong>Czas zbioru: </strong> {getEstimatedCropTime()}
    </p>
  );
};

export default EstimateCrop;
