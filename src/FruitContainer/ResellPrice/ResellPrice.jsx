import React, { useEffect, useState } from 'react';
import PriceInput from '../PriceInput/PriceInput';
import firebase from 'firebase/app';

import { changeDiacriticToStandard } from '../../lib/helper';
import ResellPriceRange from './ResellPriceRange/ResellPriceRange';

const resellPrice = ({ fruitName, handleOnFocus, handleOnBlur }) => {
  const [resellPrice, setResellPrice] = useState({ min: "0", max: "0" });

  const sendDataToFirebase = (data, range) => {
    firebase
      .database()
      .ref(`plants/${changeDiacriticToStandard(fruitName)}/resellPriceRange/`)
      .update({ [range]: data });
  };

  const handleResellPrice = (e, range) => {
    const newResellPrice = e.target.value;
    setResellPrice({ ...resellPrice, [range]: newResellPrice });
    console.log("resellPrice", resellPrice)
    sendDataToFirebase(newResellPrice, range);
  };

  useEffect(() => {
    const resellPriceData = firebase
      .database()
      .ref(`plants/${changeDiacriticToStandard(fruitName)}/resellPriceRange`);

    resellPriceData.on('value', function(snapshot) {
      if (snapshot.val() !== null) {
        const min = snapshot.val().min;
        const max = snapshot.val().max;
        console.log("max", max)
        setResellPrice({ min, max });
      }
    });
  }, []);

  return (
    <ResellPriceRange
      title="Odsprzedaż"
      placeholder="cena"
      fruitName={fruitName}
      resellPriceMin={resellPrice.min}
      resellPriceMax={resellPrice.max}
      handleOnChange={handleResellPrice}
      handleOnFocus={handleOnFocus}
      handleOnBlur={handleOnBlur}
    />
  );
};

export default resellPrice;
