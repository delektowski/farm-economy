import React from "react";
import styled from "styled-components";

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
    return (-ktPositionOffset) - 16
}

const ChartTitle = styled.h3`
margin: 1.7rem 0 1.4rem 0;
line-height: 0;
font-size: .8rem;
`;

const TextBracket = styled.span`
font-size: .8rem;
text-align: center;
font-weight: 100;
`;

const ChartContainer = styled.div`
  margin-left: 2.6rem;
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
  height: ${({height}) => {
    return height
}}%;
  background: #3385ff;
  border-right: solid grey 0.1rem;
  margin-left: 0.5rem;
  position: relative;
  &:after {
  content: "${({cost}) => {
    if (cost === '') {
        return '';
    }
    return cost.toFixed(2)
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
  top: ${({top}) => top}%;
  transform: translateY(-50%);
  width: 100%;
  background: #afafaf;
  position: absolute;
  &:after {
    content: "${props => props.kt} kt";
    position: absolute;
    left: ${({ktPositionOffset}) => {
    return offsetProportion(ktPositionOffset)
}}%;
    font-size: 0.6rem;
    top: -500%;
  }
`;

const Chart = ({chartData}) => {
    const chartDataMax = Math.ceil(Math.max(...chartData));
    const getKtPositionOffset = () => {
        return (chartDataMax).toFixed(2).length
    };
    const setKtAmount = (ktLine) => {

        if (ktLine === 3) {
            return chartDataMax.toFixed(2)
        }
        if (ktLine === 2) {
            return (chartDataMax - chartDataMax / 3).toFixed(2)
        }
        if (ktLine === 1) {
            return (chartDataMax - (chartDataMax / 3 + chartDataMax / 3)).toFixed(2)
        }
    };

    const drawColumns = () => {
        const columnKeys = ['col1', 'col2', 'col3', 'col4'];

        return chartData.map((column, i) => {
            if (chartData[i] === 0) {
                return (<ChartColumn key={columnKeys[i]} height={0} cost=''/>)
            }
            return (<ChartColumn key={columnKeys[i]} height={(chartData[i] / chartDataMax) * 100} cost={chartData[i]}/>)
        })
    };

    return (
        <div>
            <ChartTitle>Historia cen <TextBracket>
                (od lewej najnowsze)
            </TextBracket></ChartTitle>
            <ChartContainer>
                <ChartLine top={0} kt={setKtAmount(3)} ktPositionOffset={getKtPositionOffset()}/>
                <ChartLine top={33} kt={setKtAmount(2)} ktPositionOffset={getKtPositionOffset()}/>
                <ChartLine top={66} kt={setKtAmount(1)} ktPositionOffset={getKtPositionOffset()}/>
                {drawColumns()}
            </ChartContainer>
        </div>
    );
};

export default Chart;
