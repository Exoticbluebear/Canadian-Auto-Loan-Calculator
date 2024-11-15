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

    const handleSliderChange = (e) => { //upcoming update
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

    //output currency formatter
    const CurrencyFormatter = ({ amount, locale, currency }) => {
         const formattedAmount = new Intl.NumberFormat(locale, {
         style: 'currency',
         currency: currency,
         minimumFractionDigits: 2, 
         maximumFractionDigits: 2,
         }).format(amount);

         return formattedAmount;
    };
    
    const calculateMonthlyPayment = (e) => {
        e.preventDefault();

        const provinceTaxData = tax.find(item => item.province === selectedProvince);
        const taxValue = provinceTaxData ? provinceTaxData.tax : 0;
        
        const vehicleTax = price * (taxValue)/100;
        const priceAfterTax = vehicleTax + price;

        const principal = parseFloat(priceAfterTax) - parseFloat(downPayment);
        const interest = parseFloat(interestRate) / 100 / 12;
        const numPayments = parseInt(loanTerm) * 12;

        const monthly = (principal * interest) / (1 - Math.pow(1 + interest, -numPayments));
        const total = monthly * numPayments;
        const totalInterest = principal * (parseFloat(interestRate) / 100) * loanTerm ; 

        const totalWithTax = total + vehicleTax;

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
                  type="text"
                  placeholder="Value of the car"
                  value={price}
                  onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                  required
              />
              <input
                  type="text"
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
    Based on your inputs, your monthly auto loan payment is <strong><CurrencyFormatter amount={monthlyPayment} locale="en-CA" currency="CAD"/></strong>, payable each month over your loan term of {loanTerm} years. In total, you will pay <strong><CurrencyFormatter amount={totalPayment} locale="en-CA" currency="CAD"/></strong> for the vehicle, which includes the principal and interest accrued. Of this, <strong><CurrencyFormatter amount={totalInterestPaid} locale="en-CA" currency="CAD"/></strong> will be paid in interest alone.
</p><p>
    Note that a combined provincial and federal tax rate of <strong>{taxAmount}%</strong> is included in your total, ensuring all costs are accurately reflected in your financing. Additional fees, such as administrative charges and luxury vehicle taxes, may apply.
</p><p>
    <strong>Zero-Emission Vehicles:</strong> Certain provinces offer tax exemptions or reductions for zero-emission vehicles. Please check with local authorities for details.
</p><p> 
    <strong>Trade-Ins:</strong> For trade-ins at a dealership, the taxable amount is often calculated after deducting the trade-in value, potentially reducing your total tax.
</p><p>
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
