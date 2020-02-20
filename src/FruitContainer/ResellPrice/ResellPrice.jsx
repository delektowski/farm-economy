import React, { useEffect, useState } from 'react';
import PriceInput from '../PriceInput/PriceInput';
import firebase from 'firebase/app';

import { changeDiacriticToStandard } from '../../lib/helper';

const resellPrice = ({ fruitName, handleOnFocus, handleOnBlur }) => {
  const [resellPrice, setResellPrice] = useState(0);



  const sendDataToFirebase = data => {
    console.log('data', data);
    firebase
      .database()
      .ref(`plants/${changeDiacriticToStandard(fruitName)}/chartPrices`)
      .set(data);
  };

    const handleResellPrice = e => {
        const newResellPrice = e.target.value;
        setResellPrice(newResellPrice);
        sendDataToFirebase({resellPrice: newResellPrice});
    };

  return (
    <PriceInput
      title="Cena odsprzedaży"
      placeholder="cena"
      fruitName={fruitName}
      value={resellPrice}
      handleOnChange={handleResellPrice}
      handleOnFocus={handleOnFocus}
      handleOnBlur={handleOnBlur}
    />
  );
};

export default resellPrice;
