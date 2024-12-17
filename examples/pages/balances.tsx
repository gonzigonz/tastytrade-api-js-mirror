import React, {useContext} from 'react'
import { AppContext } from '../contexts/context';
import _ from 'lodash'
import UseHttpRequest from '../components/use-http-request';
import { ObjectPropertiesTable } from '../components/custom-table';

export default function Balances() {
    const context = useContext(AppContext);

    const { isLoading, errorMessage, executeRequest, responseData } = UseHttpRequest(async () => (
        context.tastytradeApi.balancesAndPositionsService.getAccountBalanceValues(context.accountNumbers![0])
      ), true)

    if (isLoading) {
        return <div>Loading...</div>
      }

    const balances = responseData

    if (_.isNil(context.accountNumbers)) {
      return <p>Loading...</p>
    }

    if (_.isEmpty(balances)) {
      return (
        <div>
          <h1>Transactions for {context.accountNumbers[0]}</h1>
          No Balances
          </div>
        )
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
        <div className='text-lg font-bold mb-4'>Balances for {context.accountNumbers[0]}</div>
        {errorMessage && <div>{errorMessage}</div>}
        <h2>Gonz:</h2>
        <pre style={inlineDisplay}>{JSON.stringify(balances, null, 2)}</pre>
        <h2>TastTrade:</h2>
        <ObjectPropertiesTable item={balances}/>
    </div>
    );
};
