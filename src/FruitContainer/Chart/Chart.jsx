import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import firebase from 'firebase/app';
import 'firebase/database';
import { changeDiacriticToStandard } from '../../lib/helper';
import DeleteColumn from './DeleteColumnButton/DeleteColumnButton';

function offsetProportion(ktPositionOffset) {
  if (ktPositionOffset === 5) {
    return -22;
  }
  if (ktPositionOffset === 6) {
    return -24;
  }
  if (ktPositionOffset === 7) {
    return -27;
  }
  return -ktPositionOffset - 16;
}

const ChartTitle = styled.h3`
  margin: 1.7rem 0 1.4rem 0;
  line-height: 0;
  font-size: 0.8rem;
`;

const TextBracket = styled.span`
  font-size: 0.8rem;
  text-align: center;
  font-weight: 100;
`;

const ChartContainer = styled.div`
  margin-left: 2.6rem;
  margin-top: 3rem;
  margin-bottom: 0.3rem;
  display: flex;
  align-items: flex-end;
  width: 11rem;
  height: 3rem;
  border-left: 1px solid black;
  border-bottom: 1px solid black;
  position: relative;
`;

const ChartColumn = styled.div`
  width: 2.2rem;
  height: ${({ height }) => {
    return height;
  }}%;
  background: #3385ff;
  border-right: solid grey 0.1rem;
  margin-left: 0.5rem;
  position: relative;
  &:after {
  content: "${({ cost }) => {
    if (cost === '') {
      return '';
    }
    return cost.toFixed(2);
  }}";
  position: absolute;
  bottom: -1rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.6rem;
  }
`;

const ChartLine = styled.div`
  height: 1px;
  top: ${({ top }) => top}%;
  transform: translateY(-50%);
  width: 100%;
  background: #afafaf;
  position: absolute;
  &:after {
    content: "${props => props.kt} kt";
    position: absolute;
    left: ${({ ktPositionOffset }) => {
      return offsetProportion(ktPositionOffset);
    }}%;
    font-size: 0.6rem;
    top: -500%;
  }
`;

const Chart = ({
  fruitName,
  isChangeSellPrice,
  sellPrice,
  resetIsChangeSellPrice,
  isResetDeleteColumnButton,
}) => {
  const [sellPriceHistory, setSellPriceHistory] = useState([0, 0, 0, 0]);
  const chartDataMax = Math.ceil(Math.max(...sellPriceHistory));
  const [deleteColumnKey, setDeleteColumnKey] = useState(null);
  const sendDataToFirebase = data => {
    firebase
      .database()
      .ref(`plants/${changeDiacriticToStandard(fruitName)}`)
      .set({
        price1: data[0],
        price2: data[1],
        price3: data[2],
        price4: data[3],
      });
  };

  const getKtPositionOffset = () => {
    return chartDataMax.toFixed(2).length;
  };
  const setKtAmount = ktLine => {
    if (ktLine === 3) {
      return chartDataMax.toFixed(2);
    }
    if (ktLine === 2) {
      return (chartDataMax - chartDataMax / 3).toFixed(2);
    }
    if (ktLine === 1) {
      return (chartDataMax - (chartDataMax / 3 + chartDataMax / 3)).toFixed(2);
    }
  };

  const handleSetNewColumn = () => {
    const sellPriceHistoryCopy = [...sellPriceHistory];
    sellPriceHistoryCopy.pop();
    sellPriceHistoryCopy.unshift(sellPrice);
    sendDataToFirebase(sellPriceHistoryCopy);
  };

  useEffect(() => {
    const plantsData = firebase
      .database()
      .ref(`plants/${changeDiacriticToStandard(fruitName)}`);
    plantsData.on('value', function(snapshot) {
      if (snapshot.val() !== null) {
        setSellPriceHistory(Object.values(snapshot.val()));
      }
    });
  }, []);

  useEffect(() => {
    if (isChangeSellPrice) {
      handleSetNewColumn();
      resetIsChangeSellPrice();
    }
  }, [isChangeSellPrice]);

  useEffect(() => {
    setDeleteColumnKey(null);
  }, [isResetDeleteColumnButton]);

  const handleClickColumn = (e, columnKey) => {
    e.stopPropagation();
    setDeleteColumnKey(columnKey);
  };

  const drawColumns = () => {
    const columnKeys = ['price1', 'price2', 'price3', 'price4'];

    return sellPriceHistory.map((column, i) => {
      const columnKey = columnKeys[i];
      if (sellPriceHistory[i] === 0) {
        return <ChartColumn key={columnKey} height={0} cost="" />;
      }
      return (
        <ChartColumn
          key={columnKey}
          height={(sellPriceHistory[i] / chartDataMax) * 100}
          cost={sellPriceHistory[i]}
          onClick={e => handleClickColumn(e, columnKeys[i])}
        >
          {deleteColumnKey === columnKey && <DeleteColumn columnKey={columnKey} fruitName={fruitName}/>}
        </ChartColumn>
      );
    });
  };

  return (
    <div>
      <ChartTitle>
        Historia cen <TextBracket>(od lewej najnowsze)</TextBracket>
      </ChartTitle>
      <ChartContainer>
        <ChartLine
          top={0}
          kt={setKtAmount(3)}
          ktPositionOffset={getKtPositionOffset()}
        />
        <ChartLine
          top={33}
          kt={setKtAmount(2)}
          ktPositionOffset={getKtPositionOffset()}
        />
        <ChartLine
          top={66}
          kt={setKtAmount(1)}
          ktPositionOffset={getKtPositionOffset()}
        />
        {drawColumns()}
      </ChartContainer>
    </div>
  );
};

export default Chart;
