import React, { useState, useEffect } from 'react';

const currencyToCountry = {
  XAF: "CM", // Cameroun (FCFA BEAC)
  XOF: "SN", // Sénégal (FCFA BCEAO)
  NGN: "NG", // Nigeria
  EGP: "EG", // Égypte
  ZAR: "ZA", // Afrique du Sud
  KES: "KE", // Kenya
  GHS: "GH", // Ghana
  DZD: "DZ", // Algérie
  MAD: "MA", // Maroc
  TND: "TN", // Tunisie
  USD: "US", // États-Unis
  EUR: "EU", // Union Européenne (drapeau alternatif)
  GBP: "GB", // Royaume-Uni
  JPY: "JP", // Japon
  CNY: "CN", // Chine
};

const africanCurrencies = [
  { code: 'XAF', name: 'CFA Franc BEAC' },
  { code: 'XOF', name: 'CFA Franc BCEAO' },
  { code: 'NGN', name: 'Nigerian Naira' },
  { code: 'EGP', name: 'Egyptian Pound' },
  { code: 'ZAR', name: 'South African Rand' },
  { code: 'KES', name: 'Kenyan Shilling' },
  { code: 'GHS', name: 'Ghanaian Cedi' },
  { code: 'DZD', name: 'Algerian Dinar' },
  { code: 'MAD', name: 'Moroccan Dirham' },
  { code: 'TND', name: 'Tunisian Dinar' }
];

const globalCurrencies = [
  { code: 'USD', name: 'US Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'British Pound' },
  { code: 'JPY', name: 'Japanese Yen' },
  { code: 'CNY', name: 'Chinese Yuan' }
];

const allCurrencies = [...africanCurrencies, ...globalCurrencies];

function App() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('XAF');
  const [exchangeRate, setExchangeRate] = useState(null);

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        .then(response => response.json())
        .then(data => {
          setExchangeRate(data.rates[toCurrency]);
        })
        .catch(error => console.error('Error fetching exchange rate:', error));
    }
  }, [fromCurrency, toCurrency]);

  const handleConvert = (e) => {
    e.preventDefault();
    if (!amount) return;
  };

  return (
    <div className='currency-converter'>
      <h2 className='converter-title'>Currency Converter</h2>
      <form className='converter-form' onSubmit={handleConvert}>
        <div className='form-group'>
          <label htmlFor='amount' className='form-label'>Enter Amount</label>
          <input 
            type='number' 
            id='amount' 
            className='form-input' 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            required 
          />
        </div>

        <div className='form-group'>
          <div className='form-section'>
            <label className='form-label'>From</label>
            <div className='currency-select'>
              <img src={`https://flagsapi.com/${currencyToCountry[fromCurrency]}/flat/64.png`} alt={`${fromCurrency} Flag`} />
              <select className='currency-dropdown' value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                {allCurrencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>{currency.name} ({currency.code})</option>
                ))}
              </select>
            </div>
          </div>

          <div className='swap-icon' onClick={() => { setFromCurrency(toCurrency); setToCurrency(fromCurrency); }}>
            ↔
          </div>

          <div className='form-section'>
            <label className='form-label'>To</label>
            <div className='currency-select'>
              <img src={`https://flagsapi.com/${currencyToCountry[toCurrency]}/flat/64.png`} alt={`${toCurrency} Flag`} />
              <select className='currency-dropdown' value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                {allCurrencies.map((currency) => (
                  <option key={currency.code} value={currency.code}>{currency.name} ({currency.code})</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <button type='submit' className='submit-button'>Get Exchange Rate</button>
        {exchangeRate && amount && (
          <p className='exchange-rate-result'>{amount} {fromCurrency} = {(amount * exchangeRate).toFixed(2)} {toCurrency}</p>
        )}
      </form>
    </div>
  );
}

export default App;
