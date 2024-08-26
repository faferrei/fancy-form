import React from 'react';

function TokenSelector({ prices, selectedCurrency, setSelectedCurrency}){
    return (
            <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className='token-selector'
            >
                <option value=''>Select Token</option>
                {prices.map(token => (
                    <option key={token.currency} value={token.currency}>
                        {token.currency}
                    </option>
                ))}
            </select>
    );
}

export default TokenSelector;