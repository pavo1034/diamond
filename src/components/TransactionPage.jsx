import React, { useState } from 'react'
import { BrokerDetailsSummary } from './BrokerDetailsSummary'
import { TransactionTable } from './TransactionTable'


export const TransactionPage = () => {
  const [selectedIds, setSelectedIds] = useState(new Set());
  return (
    <div>
       <BrokerDetailsSummary selectedIds={selectedIds}/>
       <TransactionTable selectedIds={selectedIds} setSelectedIds={setSelectedIds} />
    </div>
  )
}
