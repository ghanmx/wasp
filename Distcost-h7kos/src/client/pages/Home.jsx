import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import processPayment from '@wasp/actions/processPayment';

export function HomePage() {
  const [distancia, setDistancia] = useState('');

  const handleCalcularDistancia = async (dist) => {
    try {
      const result = await processPayment({ distancia: dist });
      setDistancia(result);
    } catch (error) {
      console.error('Error al calcular la distancia:', error);
    }
  };

  return (
    <div className='p-4'>
      <CalculadoraDistancia onCalcularDistancia={handleCalcularDistancia} />
      <p>La distancia calculada es: {distancia}</p>
      <Link to='/new-request' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Solicitar servicio</Link>
    </div>
  );
}