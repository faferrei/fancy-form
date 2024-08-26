import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CircleLoader } from 'react-spinners';

const ConfirmationPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);


    const { fromCurrency: from, toCurrency: to, fromAmount: amount, toAmount: received } = location.state || {};

    useEffect(() => {
        setTimeout(() => {
            setLoading(false); // Stop loading after 2 seconds
        }, 2000);

    }, []);


    const handleGoBack = () => {
        navigate('/');
    };

    if (!from || !to || !amount || !received) {
        return <div>Error. Missing data.</div>;
    }

    return (
        <div className="confirmation-page">
            {loading ? (
                <div className="spinner-container">
                    <CircleLoader color="#09f" size={60} />
                </div>
            ) : (
                <div>
                    <h2>
                        {amount} {from} was exchanged for {received} {to}.
                    </h2>
                    <button onClick={handleGoBack} className="back-button">
                        Exchange More!
                    </button>
                </div>
            )}
        </div>
    );
};

export default ConfirmationPage;
