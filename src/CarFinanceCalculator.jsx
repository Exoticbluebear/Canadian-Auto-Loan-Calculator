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
        { id: 2, name: 'British Columbia' },
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

    const reset = () => {
    setPrice('');
    setDownPayment('');
    setLoanTerm('');
    setInterestRate('');
    setMonthlyPayment(null);
    setTotalPayment(null);
    setTotalInterestPaid(null);
    setSelectedProvince('');
    setTaxAmount(0);
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
          <h1>Auto Loan Calculator</h1>
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

              <option value="">Select Province/Territory</option> 
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
                <strong>Think carefully before you sign it</strong>
            </p>
            <p>
    Based on your inputs, your monthly auto loan payment is <strong>${monthlyPayment}</strong>, payable each month over your loan term of {loanTerm} years. In total, you will pay <strong>${totalPayment}</strong> for the vehicle, which includes the principal, interest accrued, and your down payment. Of this, <strong>${totalInterestPaid}</strong> will be paid in interest alone.
</p>
<p>
    Note that a combined provincial and federal tax rate of <strong>{taxAmount}%</strong> is included in your total, ensuring all costs are accurately reflected in your financing. Additional fees, such as administrative charges and luxury vehicle taxes, may apply.

    <strong>Zero-Emission Vehicles:</strong> Certain provinces offer tax exemptions or reductions for zero-emission vehicles. Please check with local authorities for details.

    <strong>Trade-Ins:</strong> For trade-ins at a dealership, the taxable amount is often calculated after deducting the trade-in value, potentially reducing your total tax.
</p>
<p>
    Consider your loan carefully! If you have further questions, conduct additional research.
</p>

            <button type="button" onClick={reset}>Calculate again</button>
        </div>
    )}
</div>

  </div>
    );  
};

export default CarFinanceCalculator;
