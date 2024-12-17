import React, { useState, useContext } from 'react'
import { AppContext } from '../contexts/context';
import UseHttpRequest from '../components/use-http-request';
import _ from 'lodash'
import Button from '../components/button';

function parseError(error: any) {
    if (error.message === 'Network Error') {
        console.log('network error')
        return (error.message);
    } else if (error.code === "ERR_BAD_REQUEST") {
        console.log(error)
        return (error.response.data.error.code);
    } else {
        console.log(error)
    }
}

export default function marketMetrics() {
    const [symbols, setSymbols] = useState('');
    const [ivData, setIVData] = useState<null | object>(null)
    const [error, setError] = useState('');
    const context = useContext(AppContext);

    const { isLoading, errorMessage, executeRequest, responseData } = UseHttpRequest(async (symbols) => (
        context.tastytradeApi.marketMetricsService.getMarketMetrics({"symbols": symbols})
    ), false);

    const handleFetch = async () => {
        setError('')
        try {
            const data = await executeRequest(symbols);
            setIVData(data);
        } catch (error: any) {
            parseError(error);
        }
    };

    const handleKeyPress = (event: any) => {
        if (event.target.value) {
            setSymbols(event.target.value)
            if (event.key === 'Enter') {
                handleFetch();
            }
        }
    }

    if (_.isNil(context.accountNumbers)) {
        return <p>Loading...</p>
    }
    
    const inlineDisplay = {
      border: "1px solid darkblue",
      borderRadius: "3px",
      fontSize: "16px",
      color: "#fff",
      backgroundColor: "#54a0dd",
    }

    return (
        <div>
            <div className="text-lg font-bold mb-4">Market Metrics</div>
            <div>Enter symbols <small>Comma separated list of symbols e.g. AAPL,FB,BRK%2FB</small></div>
            <input
                type='text'
                className="p-2 w-full border border-gray-400 mb-2"
                onKeyUp={handleKeyPress}
                required
                />
            <Button onClick={handleFetch} title="Search" />
            {error && <div>{error}</div>}
            <h2>Gonz:</h2>
            <pre style={inlineDisplay}>{JSON.stringify(ivData, null, 2)}</pre>
        </div>
    )
}