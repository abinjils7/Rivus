import React, { useState, useEffect } from 'react'
import { carApi } from '../../Api';

function Allterrains() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await fetch(`${carApi}`);
      const data = await response.json();
      // Filter cars to only include those with type 'allterrain'
      const allTerrainCars = data.filter(car => car.type === 'allterains');
      setCars(allTerrainCars);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">All-Terrain's</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cars.map((car) => (
          <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img 
              src={car.image} 
              alt={car.name} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
              <p className="text-gray-600 mb-2">{car.model}</p>
              <p className="text-gray-600 mb-2">Type: {car.type}</p>
              <p className="text-2xl font-bold text-black-600">${car.price.toLocaleString()}</p>
            </div>
             <button
                onClick={() => addToCart(car)}
                className="bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-800 transition duration-300"
              >
                addToCart
              </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Allterrains;