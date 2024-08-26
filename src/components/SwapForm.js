import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { fetchTokenPrices } from '../api/fetchPrices';
import TokenSelector from './TokenSelector';
import '../App.css';
import BarLoader from 'react-spinners/BarLoader';

const SwapForm = () => {
    const [loading, setLoading] = useState(false);
    const [prices, setPrices] = useState([]);
    const [fromCurrency, setFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');
    const [fromAmount, setFromAmount] = useState('');
    const [toAmount, setToAmount] = useState('');

    const navigate  = useNavigate(); 

    useEffect(() => {
        const fetchData = async () => {
            const tokenPrices = await fetchTokenPrices();
            setPrices(tokenPrices);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (!fromCurrency || !toCurrency || !fromAmount || fromCurrency === toCurrency) {
            setToAmount(null);
            return;
        }

        setLoading(true); 

        setTimeout(() => {
            const fromPrice = prices.find(token => token.currency === fromCurrency)?.price;
            const toPrice = prices.find(token => token.currency === toCurrency)?.price;

            if (fromPrice && toPrice) {
                const result = (fromAmount * fromPrice) / toPrice;
                setToAmount(result.toFixed(6));
            } else {
                setToAmount(null);
                alert('Price data not available for selected currencies.');
            }

            setLoading(false); 
        }, 2000); 

    }, [fromCurrency, toCurrency, fromAmount, prices]);


    const handleExchange = () => {
        if (!fromAmount || !toAmount) return;
        navigate('/confirmation', { state: { fromCurrency, toCurrency, fromAmount, toAmount } });
    };

    const isDisabled = !fromAmount || !fromCurrency || !toCurrency || !toAmount;


    return (
        <div className='swap-form'>
            <h2>Currency Swap</h2>
            <div className='token-selectors'>
                <TokenSelector
                    prices={prices}
                    selectedCurrency={fromCurrency}
                    setSelectedCurrency={setFromCurrency}
                    label="From"
                />
                <TokenSelector
                    prices={prices}
                    selectedCurrency={toCurrency}
                    setSelectedCurrency={setToCurrency}
                    label="To"
                />
            </div>
            <div className='amount-input'>
                <input
                    type='number'
                    value={fromAmount}
                    onChange={e => setFromAmount(e.target.value)}
                    placeholder='0'
                />
            </div>

            <div className='conversion-result'>
                {loading ? (
                    <BarLoader color="#09f" 
                        size={50}
                        cssOverride={{
                            display: 'block',
                            margin: '0 auto',
                            marginTop: '29px',
                            marginBottom: '29px'
                        }}
                    />
                ) : (fromCurrency && toCurrency && fromAmount) ? (
                    <p>
                        {fromAmount} {fromCurrency} will give {toAmount} {toCurrency}
                    </p>
                ) : (fromCurrency && toCurrency) ? (
                    <p>
                        Please provide an amount to be exchanged.
                    </p>
                ) : (
                    <p>
                        Please select the tokens you want to exchange.
                    </p>
                )}
            </div>

            <button 
                onClick={handleExchange} 
                className='swap-button'
                disabled={isDisabled}
            >    Exchange
            </button>
        </div>
    );
};

export default SwapForm;