import React, { useState } from 'react'
import DiplomeDisplay from './DiplomeDisplay';
import DiplomeForm from './DiplomeForm';

function Diplome() {
    const [diplomeInfo, setDiplomeInfo] = useState(null);

  const handleSubmit = (info) => {
    setDiplomeInfo(info);
  };
  return (
    <div>
    <DiplomeForm onSubmit={handleSubmit} />
    {diplomeInfo && <DiplomeDisplay {...diplomeInfo} />}
  </div>
  )
}

export default Diplome