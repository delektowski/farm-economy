import React from 'react';
import styled from 'styled-components';
import firebase from 'firebase/app';
import 'firebase/database';
import { changeDiacriticToStandard } from '../../../lib/helper';

const DeleteButton = styled.div`
  width: 2.3rem;
  height: 2.3rem;
  background: brown;
  position: absolute;
  top: 0;
  transform: translateY(-100%);
`;

const DeleteColumn = ({ columnKey, fruitName }) => {
  const handleDeleteColumn = () => {
    console.log('columnKey', columnKey);
    firebase
      .database()
      .ref(`plants/${changeDiacriticToStandard(fruitName)}`)
      .update({ [columnKey]: 0 });
  };
  return <DeleteButton onClick={handleDeleteColumn} />;
};

export default DeleteColumn;
