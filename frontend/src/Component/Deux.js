
import React, { useState } from 'react';
import DiplomeRequestForm from './components/DiplomeRequestForm';
import DiplomeDisplay from './components/DiplomeDisplay';
import { validateDiplomeRequest } from './utils/validation';
function Deux() {
    const [diplomeInfo, setDiplomeInfo] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleSubmit = (request) => {
      const validationResult = validateDiplomeRequest(request);
      if (validationResult.isValid) {
        setDiplomeInfo(request);
        setErrorMessage('');
      } else {
        setErrorMessage(validationResult.message);
      }
    };
  
  return (
    <div>
    <DiplomeRequestForm onSubmit={handleSubmit} />
    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    {diplomeInfo && <DiplomeDisplay {...diplomeInfo} />}
  </div>
);
};

export default Deux