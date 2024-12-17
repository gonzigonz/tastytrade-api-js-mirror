import React, {useContext} from 'react'
import { AppContext } from '../contexts/context';
import _ from 'lodash'
import UseHttpRequest from '../components/use-http-request';
import CustomTable from '../components/custom-table';

export default function Positions() {
  const context = useContext(AppContext);

  const { isLoading, errorMessage, executeRequest, responseData } = UseHttpRequest(async () => (
    context.tastytradeApi.balancesAndPositionsService.getPositionsList(context.accountNumbers![0])
  ), true)

  if (isLoading) {
      return <div>Loading...</div>
    }

  const positions = responseData

  if (_.isNil(context.accountNumbers)) {
    return <p>Loading...</p>
  }

  if (_.isEmpty(positions)) {
    return (
      <div>
        <h1>Transactions for {context.accountNumbers[0]}</h1>
        No Positions
        </div>
    )
  }

  const renderPositionRow = (position: any) => (
    <div>{position['quantity-direction']} {position.quantity} {position.symbol} {position['instrument-type']}</div>
  )
  const inlineDisplay = {
    border: "1px solid darkblue",
    borderRadius: "3px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#54a0dd",
  }

  return (
  <div>
      <div className='text-lg font-bold mb-4'>Positions for {context.accountNumbers[0]}</div>
        <h2>Gonz:</h2>
        <pre style={inlineDisplay}>{JSON.stringify(positions, null, 2)}</pre>
        <h2>TastTrade:</h2>
        <CustomTable rows={positions} renderItem={renderPositionRow}/>
  </div>
  );
};
