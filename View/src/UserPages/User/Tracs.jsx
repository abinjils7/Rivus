import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../../ContextAPI/Cartcontext";

function Tracs() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await fetch("http://localhost:3000/cars");
      const data = await response.json();
      // Filter cars to only include those with type 'racespec'
      const raceCars = data.filter((car) => car.type === "racespec");
      setCars(raceCars);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cars:", error);
      setLoading(false);
    }
  };

  const addToCart = (car) => {
    // This would be your cart implementation
    console.log("Added to cart:", car);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Enhanced header with new styling */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 tracking-tight bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          FOR THE TRACKS
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-gray-400 to-gray-300 mx-auto mb-4"></div>
        <p className="text-gray-600 max-w-2xl mx-auto italic">
          Precision engineered machines built for maximum performance
        </p>
      </div>

      {/* Grid layout with consistent button sizing */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {cars.map((car) => (
          <div
            key={car.id}
            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col"
          >
            {/* Image container */}
            <div className="relative overflow-hidden flex-shrink-0">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 right-4 bg-black text-white text-xs px-3 py-1 rounded-full">
                {car.type}
              </div>
            </div>

            {/* Content container with flex-grow to push button to bottom */}
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                {car.name}
              </h3>
              <p className="text-gray-600 mb-3">{car.model}</p>
              <p className="text-gray-500 text-sm mb-4">Type: {car.type}</p>

              {/* This div will push the price and button to the bottom */}
              <div className="mt-auto">
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold text-black">
                    ${car.price.toLocaleString()}
                  </p>
                  <button
                    onClick={() => addToCart(car)}
                    className="bg-black text-white px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium text-sm min-w-[120px]"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tracs;
