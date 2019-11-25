import React, {useState, useEffect} from "react";
import img from "../img/fruitVege.jpg";
import Chart from "./Chart/Chart";
import PriceInput from "./PriceInput/PriceInput";
import CheckboxInput from "./CheckboxInput/CheckboxInput";
import firebase from 'firebase/app';
import 'firebase/database';
import {changeDiacriticToStandard} from "../lib/helper";


const FruitContainer = ({
                            fruitName,
                            fruitPrice,
                            fruitCrop,
                            fruitCroppingTime,
                            sortedFruitProfit,
                            handleChangeFruitProperty,
                            fieldMultiplier,
                            imgPositionX,
                            imgPositionY,
                        }) => {
    const image = {
        background: `url(${img})`,
        backgroundPosition: `${imgPositionX} ${imgPositionY}`,
        marginLeft: "1.5rem",
        width: "2.7rem",
        height: "2.7rem"
    };
    const [price, setPrice] = useState(fruitPrice);
    const [sellPriceHistory, setSellPriceHistory] = useState([0,0,0,0]);
    const [sellPrice, setSellPrice] = useState(0);
    const [fruitProfit, setFruitProfit] = useState(sortedFruitProfit);
    const [croppingTime, setCroppingTime] = useState(fruitCroppingTime);
    const [isFocus, setIsFocus] = useState(false);
    const [croppingTimeCheckboxFalse] = useState(fruitCroppingTime);

    const getProfitPerHour = fruitPrice => {
        const hourMultiplier = croppingTime / 60;
        return +((fruitPrice * fruitCrop) / hourMultiplier).toFixed(2);
    };

    const getPriceByProfitPerHour = profitPerHour => {
        const price = (profitPerHour * croppingTime) / 60 / fruitCrop;
        console.log("price", price.toFixed(2));
        setPrice(price.toFixed(2));
    };

    const getCroppingTimeHoursAndMinute = () => {
        const hours = Math.floor(croppingTime / 60);
        const minutes = Math.ceil(croppingTime % 60);
        return `${hours}h ${minutes}m`;
    };

    const handlePrice = e => {
        const newPrice = e.target.value;
        setPrice(newPrice);
    };

    const handleChangeProfit = e => {
        if (e.key === "Enter") {
            handleChangeFruitProperty(fruitName, e.target.value, "fruitPrice");
        }
    };

    const handleChangeSortingOnProfitChange = e => {
        if (e.key === "Enter") {
            handleChangeFruitProperty(fruitName, price, "fruitPrice");
        }
    };

    const handleOnFocus = () => {
        setIsFocus(true);
    };

    const handleOnBlur = () => {
        setIsFocus(false);
    };

    useEffect(() => {
        setFruitProfit(getProfitPerHour(price));
    }, [price, croppingTime]);

    useEffect(() => {
        setFruitProfit(sortedFruitProfit);
    }, [sortedFruitProfit]);

    useEffect(() => {
        handleChangeFruitProperty(fruitName, croppingTime, "fruitCroppingTime");
    }, [croppingTime]);

    useEffect(() => {
        const plantsData = firebase.database().ref(`plants/${changeDiacriticToStandard(fruitName)}`);
        plantsData.on('value', function (snapshot) {
            if (snapshot.val() !== null) {
                setSellPriceHistory(Object.values(snapshot.val()))
            }
        });
    }, []);
    useEffect(() => {
        setSellPrice(sellPriceHistory[0])
    },[sellPriceHistory]);

    const handleWateringCheckbox = e => {
        if (e.target.checked) {
            setCroppingTime(croppingTime - Math.ceil(croppingTime * 0.06));
        } else {
            setCroppingTime(croppingTimeCheckboxFalse);
        }
    };

    const handleProfitOnHour = e => {
        const changedProfitOnHour = e.target.value;
        setFruitProfit(changedProfitOnHour);
        getPriceByProfitPerHour(e.target.value);
    };

    const handleSellPrice = (e) => {
        const changedSellPrice = isNaN(parseFloat(e.target.value, 10)) ? '' : parseFloat(e.target.value, 10);
        setSellPrice(changedSellPrice);
    };

    const sendDataToFirebase = (data) => {
        firebase.database().ref(`plants/${changeDiacriticToStandard(fruitName)}`).set({
            price1: data[0],
            price2: data[1],
            price3: data[2],
            price4: data[3],
        });
    };

    const handleChangeChart = (e) => {
        function changeSellPriceHistory() {
            const sellPriceHistoryCopy = [...sellPriceHistory];
            sellPriceHistoryCopy.pop();
            sellPriceHistoryCopy.unshift(sellPrice);
            sendDataToFirebase(sellPriceHistoryCopy)
        }

        if (e.key === "Enter") {
            changeSellPriceHistory();
        }
    };

    return (
        <div>
            <label htmlFor={fruitName}>
                <section
                    className={
                        isFocus
                            ? ["FruitContainer", "Focused"].join(" ")
                            : ["FruitContainer"]
                    }
                >
                    <div className="ContainerTitle">
                        <div style={image}/>
                        <h2 className="Title">{fruitName}</h2>
                    </div>

                    <p className="Paragraph">
                        <strong>Czas uprawy: </strong> {getCroppingTimeHoursAndMinute()}
                    </p>
                    <p className="Paragraph">
                        <strong>Plon: </strong>
                        {`${fruitCrop} sztuk`}
                    </p>
                    <PriceInput
                        title="Cena za sztukę"
                        placeholder="cena"
                        fruitName={fruitName}
                        value={price}
                        handleOnChange={handlePrice}
                        handleOnKeyUp={handleChangeProfit}
                        handleOnFocus={handleOnFocus}
                        handleOnBlur={handleOnBlur}
                    />
                    <PriceInput
                        title="Ostatnia sprzedaż"
                        placeholder="cena"
                        fruitName={fruitName}
                        value={sellPrice}
                        handleOnChange={handleSellPrice}
                        handleOnKeyUp={handleChangeChart}
                        handleOnFocus={handleOnFocus}
                        handleOnBlur={handleOnBlur}
                    />
                    <CheckboxInput
                        title="Podlewanie"
                        handleOnChange={handleWateringCheckbox}
                        handleOnFocus={handleOnFocus}
                        handleOnBlur={handleOnBlur}
                    />
                    <PriceInput
                        title="Zysk na godzinę"
                        placeholder="zysk"
                        fruitName={fruitName}
                        value={fruitProfit}
                        handleOnChange={handleProfitOnHour}
                        handleOnKeyUp={e => handleChangeSortingOnProfitChange(e)}
                        handleOnFocus={handleOnFocus}
                        handleOnBlur={handleOnBlur}
                    />
                    <p className="Paragraph">
                        <strong>Zysk z pola: </strong>
                        {((price * fruitCrop) / fieldMultiplier).toFixed(2)} kt
                    </p>
                    <Chart chartData={sellPriceHistory}/>
                </section>
            </label>
        </div>
    );
};

export default FruitContainer;
