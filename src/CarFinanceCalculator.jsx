import './CarFinanceCalculator.scss';
import logo from './logo.jpg';
import React, { useState, useEffect } from 'react';

const CarFinanceCalculator = () => {
    const [price, setPrice] = useState('');
    const [downPayment, setDownPayment] = useState('');
    const [loanTerm, setLoanTerm] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState(null);
    const [totalPayment, setTotalPayment] = useState(null);
    const [totalInterestPaid, setTotalInterestPaid] = useState(null);
    const [tax, setTax] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState('');
    const [taxAmount, setTaxAmount] = useState(0);

    const provinces = [
        { id: 1, name: 'Alberta' },
        { id: 2, name: 'Luxury Vehicle' },
        { id: 3, name: 'Manitoba' },
        { id: 4, name: 'New Brunswick' },
        { id: 5, name: 'Newfoundland and Labrador' },
        { id: 6, name: 'Northwest Territories' },
        { id: 7, name: 'Nova Scotia' },
        { id: 8, name: 'Ontario' },
        { id: 9, name: 'Prince Edward Island' },
        { id: 10, name: 'Quebec' },
        { id: 11, name: 'Saskatchewan' },
        { id: 12, name: 'Nunavut' },
        { id: 13, name: 'Yukon' },
    ];

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch('https://6701eeb6b52042b542d8d315.mockapi.io/carTaxes');
            const jsonResult = await result.json();
            setTax(jsonResult);
        };
        fetchData();
    }, []);

    const handleSliderChange = (e) => {
        setLoanTerm(Number(e.target.value));


    };

    

    const calculateMonthlyPayment = (e) => {
        e.preventDefault();

        const principal = price - downPayment;
        const interest = interestRate / 100 / 12;
        const numPayments = loanTerm * 12;

        const monthly = (principal * interest) / (1 - Math.pow(1 + interest, -numPayments));
        const total = monthly * numPayments;
        const totalInterest = total - principal;

        const provinceTaxData = tax.find(item => item.province === selectedProvince);
        const taxValue = provinceTaxData ? provinceTaxData.tax : 0;

        const totalWithTax = total + taxValue + downPayment;

        setTaxAmount(taxValue);
        setMonthlyPayment((totalWithTax / numPayments).toFixed(2));
        setTotalPayment(totalWithTax.toFixed(2));
        setTotalInterestPaid(totalInterest.toFixed(2));

        
    };

    return (
      <div className="container">
      <div className="form-container">
          <img src={logo} alt="logo" width="75" height="75"></img>
          <h1>Sachin Auto </h1>
          <h1>Car Loan Calculator</h1>
          <form onSubmit={calculateMonthlyPayment}>
              <input
                  type="number"
                  placeholder="Loan Amount"
                  value={price}
                  onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                  required
              />
              <input
                  type="number"
                  placeholder="Down Payment"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value === '' ? '' : Number(e.target.value))}
                  required
              />
              <input
                  type="number"
                  placeholder="Loan Term (Years)"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value === '' ? '' : Number(e.target.value))}
                  required
              />
              <input
                  type="number"
                  placeholder="Interest Rate (%)"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value === '' ? '' : Number(e.target.value))}
                  required
              />
              <select
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                  required
              >

              <option value="">Select Country</option> 
                  {provinces.map(province => (
                      <option key={province.id} value={province.name}>
                          {province.name}
              </option>
                  ))}
              </select>
              <h3></h3>
              <button type="submit">Calculate</button>
          </form>
      </div>
      <div className="output-container">
    {monthlyPayment && (
        <div>
            <h2>Your Auto Loan Summary</h2>
            <p>
                <strong>Here in Sachin Auto We Care About You</strong>
                <br />
                Based on your inputs, <br />
                your monthly payment for the auto loan is <strong>Rs.{monthlyPayment}</strong>. 
                This amount will be due each month over the course of your loan term of {loanTerm} years. 
                In total, you will pay <strong>Rs.{totalPayment} </strong> 
                for the vehicle, which includes the principal amount, interest accrued over the loan period and your down payment. 
                Additionally, you will be paying <strong>Rs.{totalInterestPaid}</strong> in interest alone. 
            </p>
            <p>
                It's important to note that, depending on your vehicle model, there is a luxury tax amount of 
                <strong> 120% </strong> included in the total, 
                ensuring that all costs are accurately accounted for in your financing.
            </p>
            <p>
                It is important to think about your loan carefully!
                If you have any further questions about these figures or need assistance with anything else, 
                feel free to ask!
            </p>
        </div>
    )}
</div>

  </div>
    );  
};

export default CarFinanceCalculator;
