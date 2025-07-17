import React, { useState } from 'react'
import { DiamondForm } from './DiamondForm';
import { DiamondTable } from './DiamondTable';

export const Diamond = () => {
  const [diamondId,setDiamondId]=useState(null)
  return (
    <div>
      <DiamondForm diamondId={diamondId} setDiamondId={setDiamondId}/>
      <DiamondTable setDiamondId={setDiamondId}/>
    </div>
  );
}
