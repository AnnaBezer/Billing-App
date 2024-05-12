import { useState } from "react";
import './BillingSection.css';
import userIcon from '../../assets/icons/user.svg';
import BillingResult from "../BillingResult/BillingResult";

const tipOptions = [5, 10, 15, 25, 50];

const BillingSection = () => {
    const [selectedOption, setSelectedOption] = useState(-1);
    const [tipAmount, setTipAmount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [history, setHistory] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData(e.target);

        const bill = parseInt(data.get('bill-input'));
        const numberOfPeople = parseInt(data.get('number-of-people-input'));

        console.log(bill, numberOfPeople, selectedOption);

        const tipTotal = bill * (tipOptions[selectedOption] / 100);
        const tipTotalPerPerson = tipTotal / numberOfPeople;

        const orderTotal = bill + tipTotal;
        const orderTotalPerPerson = orderTotal / numberOfPeople;
        
        setTipAmount(tipTotalPerPerson);
        setTotalAmount(orderTotalPerPerson);
    };

    const handleClick = (optionIndex) => {
        setSelectedOption(optionIndex);
    };

    const getAverageBillAmount = () => {
        // ....
        let average = 0;

        // for ...
        // average += history[i].bill;

        return average / history.length;
    }

    return (
        <section>
            <h1 className="billing-section-title"> SPLI TTER </h1>
            <div className="billing-container">
                <form onSubmit={handleSubmit} className="billing-form">
                    <div className="input-container">
                        <label className="standard-label" htmlFor="bill-input"> Bill </label>
                        <input className="standard-input" id="bill-input" name="bill-input" type="number" defaultValue={0} />
                        <p className="standard-input-indicator"> $ </p>
                    </div>
                    <div className="tip-options-container">
                        <p className="standard-label"> Select Tip % </p>
                        <div className="tip-options">
                            {tipOptions.map((option, index) => (
                                <button type="button" className={index === selectedOption ? 'selected' : ''} onClick={() => handleClick(index)} key={option}> {option}% </button>
                            ))}
                        </div>
                    </div>
                    <div className="input-container">
                        <label className="standard-label" htmlFor="number-of-people-input"> Number of People </label>
                        <input className="standard-input" id="number-of-people-input" name="number-of-people-input" type="number" defaultValue={0} />
                        <img className="standard-input-indicator" src={userIcon} />
                    </div>
                    <button type="submit" className="calculate-billing"> Calculate </button>
                </form>
                <div className="billing-result-container">
                   <BillingResult name ={'Tip'} amount = {tipAmount.toFixed(2)}/>
                   <BillingResult name ={'Total'} amount = {tipAmount.toFixed(2)}/>
                   <BillingResult name ={'Tip+Total'} amount = {tipAmount.toFixed(2) + totalAmount.toFixed(2)} />
                    {/* <div className="billing-result">
                            <div>
                                <p className="billing-result-heading"> Tip Amount </p>
                                <p className="billing-result-sub-heading"> /person </p>
                            </div>
                            <p className="billing-result-number"> ${tipAmount} </p>
                            </div>
                    <div className="billing-result">
                        <div>
                            <p className="billing-result-heading"> Total </p>
                            <p className="billing-result-sub-heading"> /person </p>
                        </div>
                        <p className="billing-result-number"> ${totalAmount} </p>
                    </div> */}
                </div>
            </div>

            <ul>
                {history.map((order) => (
                    <li> {order.bill} - {order.tip} </li>
                ))}
            </ul>

            <div>
                <h2> Stats: </h2>
                <h3> Average bill: {getAverageBillAmount()} </h3>
            </div>
        </section>
    )
}

export default BillingSection;