import React, { useState } from 'react';


function NewRequest() {
  const [mechanicalFault, setMechanicalFault] = useState('');
  const [location, setLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [towType, setTowType] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Implement request creation
  };

  return (
    <div>
      <h1>New Request</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Mechanical Fault:
          <input
            type='text'
            value={mechanicalFault}
            onChange={(event) => setMechanicalFault(event.target.value)}
          />
        </label>
        <label>
          Location:
          <input
            type='text'
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
        </label>
        <label>
          Destination:
          <input
            type='text'
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
          />
        </label>
        <label>
          Tow Type:
          <input
            type='text'
            value={towType}
            onChange={(event) => setTowType(event.target.value)}
          />
        </label>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default NewRequest;