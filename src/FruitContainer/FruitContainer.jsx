import React, {useState, useEffect} from "react";
import img from '../img/fruitVege.jpg'


const FruitContainer = ({
                            fruitName,
                            fruitPrice,
                            fruitCrop,
                            fruitCroppingTime,
                            sortedFruitProfit,
                            handleChangeFruitProperty,
                            fieldMultiplier,
                            imgPositionX,
                            imgPositionY
                        }) => {
    const image = {
        background: `url(${img})`,
        backgroundPosition: `${imgPositionX} ${imgPositionY}`,
        margin: '0 auto',
        width: '2.7rem',
        height: '2.7rem',
    };
    const [price, setPrice] = useState(fruitPrice);
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

    const handleWateringCheckbox = e => {
        if (e.target.checked) {
            setCroppingTime(croppingTime - Math.ceil(croppingTime * 0.06));
        } else {
            setCroppingTime(croppingTimeCheckboxFalse);
        }
    };

    const handleProfitOnHour = e => {
        setFruitProfit(e.target.value);
        getPriceByProfitPerHour(e.target.value);
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
                    <h2 className="Title">{fruitName}</h2>
                    <div style={image}/>
                    </div>
                    <p className="Paragraph">
                        <strong>Czas uprawy: </strong> {getCroppingTimeHoursAndMinute()}
                    </p>
                    <p className="Paragraph">
                        <strong>Plon: </strong>
                        {`${fruitCrop} sztuk`}
                    </p>
                        <div className="WateringCheckboxContainer">
                            <p className="Paragraph">
                                <strong>Cena za sztukę: </strong>
                            </p>
                            <input
                                id={fruitName}
                                placeholder="cena"
                                className="PriceField"
                                type="number"
                                value={price}
                                onChange={handlePrice}
                                onKeyUp={handleChangeProfit}
                                onFocus={handleOnFocus}
                                onBlur={handleOnBlur}
                                min="0"
                                max="999999"
                                step="0.10"
                            />
                            <p className="Currency">kt</p>
                        </div>
                    <div className="WateringCheckboxContainer">
                        <p className="Paragraph">
                            <strong>Podlewanie </strong>
                        </p>
                        <input
                            type="checkbox"
                            onChange={handleWateringCheckbox}
                            onFocus={handleOnFocus}
                            onBlur={handleOnBlur}
                        />
                    </div>
                    <div className="WateringCheckboxContainer">
                        <p className="Paragraph"><strong>Zysk na godzinę: </strong></p>
                        <input
                            value={fruitProfit}
                            type="number"
                            placeholder="zysk"
                            className="PriceField"
                            onChange={handleProfitOnHour}
                            onKeyUp={e => handleChangeSortingOnProfitChange(e)}
                            onFocus={handleOnFocus}
                            onBlur={handleOnBlur}
                            min="0"
                            max="999999"
                            step="0.10"
                        />
                        <p className="Currency">kt</p>
                    </div>
                    <p className="Paragraph">
                        <strong>Zysk z pola: </strong>
                        {((fruitPrice * fruitCrop) / fieldMultiplier).toFixed(2)} kt
                    </p>
                </section>
            </label>
        </div>
    );
};

export default FruitContainer;
