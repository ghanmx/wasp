import React, { useState } from 'react';


function RequestPage() {
  const [distancia, setDistancia] = useState(null);

  const handleCalcularDistancia = async (ubicacion, destino) => {
    if (!ubicacion || !destino) {
      alert('Por favor, complete los campos de ubicaci?n y destino');
      return;
    }

    const response = await fetch(`/api/calculardistancia?ubicacion=${ubicacion}&destino=${destino}`);
    const data = await response.json();

    setDistancia(data.distancia);
  };

  return (
    <div>
      <h1>Request Page</h1>
      <CalculadoraDistancia onCalcularDistancia={handleCalcularDistancia} />
      {distancia && <p>Distancia: {distancia}</p>}
    </div>
  );
}

export default RequestPage;