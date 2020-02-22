import React from 'react';
import styled from 'styled-components';
import firebase from 'firebase/app';
import 'firebase/database';
import { changeDiacriticToStandard } from '../../../lib/helper';

const DeleteButton = styled.div`
  width: 2.3rem;
  height: 2.3rem;
  background: rgba(106, 106, 106, 0.3);
  position: absolute;
  top: 0;
  transform: translateY(-100%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Cross = styled.p`
  font-family: Arial, serif;
  color: red;
  font-size: 1.7rem;
`;

const DeleteColumn = ({ columnKey, fruitName, columnsAmount }) => {
  const sendDataToFirebase = () => {
    const setFirstColumnToZero = { price0: 0 };
    firebase
      .database()
      .ref(`plants/${changeDiacriticToStandard(fruitName)}/chartPrices`)
      .set(setFirstColumnToZero);
  };

  const handleDeleteColumn = () => {
    firebase
      .database()
      .ref(`plants/${changeDiacriticToStandard(fruitName)}/chartPrices/${columnKey}`)
      .remove(() => {
        if (columnsAmount < 2) {
          sendDataToFirebase();
        }
      });
  };

  return (
    <DeleteButton onClick={handleDeleteColumn}>
      <Cross>X</Cross>
    </DeleteButton>
  );
};

export default DeleteColumn;
