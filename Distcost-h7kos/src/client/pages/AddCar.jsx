import React, { useState } from 'react';
import { loadGoogleMapsScript } from '../utils/googleMaps';


function AddCar() {
  const [ubicacion, setUbicacion] = useState('');
  const [destino, setDestino] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!ubicacion || !destino) {
      alert('Por favor, complete los campos de ubicaci?n y destino');
      return;
    }
    const baseGruasLat = 26.1500851;
    const baseGruasLng = -100.0732657;
    const distancia = await calcularDistancia(
      `${baseGruasLat},${baseGruasLng}`,
      ubicacion,
      destino
    );
    // TODO: Implement the logic to save the new car
  };

  const calcularDistancia = async (origen, ubicacion, destino) => {
    await loadGoogleMapsScript();
    const service = new window.google.maps.DistanceMatrixService();
    return new Promise((resolve, reject) => {
      service.getDistanceMatrix(
        {
          origins: [origen, ubicacion],
          destinations: [ubicacion, destino],
          travelMode: 'DRIVING',
          unitSystem: window.google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false,
        },
        (response, status) => {
          if (status !== 'OK') {
            console.error('Error al calcular la distancia: ' + status);
            reject('Error al calcular la distancia');
          } else {
            const distance = response.rows[0].elements[1].distance.text;
            resolve(distance);
          }
        }
      );
    });
  };

  return (
    <div>
      <h1>Agregar Veh?culo</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Ubicaci?n:
          <input
            type='text'
            value={ubicacion}
            onChange={(event) => setUbicacion(event.target.value)}
          />
        </label>
        <label>
          Destino:
          <input
            type='text'
            value={destino}
            onChange={(event) => setDestino(event.target.value)}
          />
        </label>
        <button type='submit'>Guardar Veh?culo</button>
      </form>
    </div>
  );
}

export default AddCar;