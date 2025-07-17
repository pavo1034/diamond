import React, { useState } from 'react'
import { BrokerForm } from './BrokerForm'
import { BrokerTable } from './BrokerTable'

export const Broker = () => {
    const [brokerId,setBrokerId]=useState(null)
  return (
    <div className='p-6'>
        <BrokerForm  brokerId={brokerId} setBrokerId={setBrokerId}/>
        <BrokerTable setBrokerId={setBrokerId}/>
    </div>
  )
}
