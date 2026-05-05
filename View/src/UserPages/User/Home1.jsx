import React, { useContext, useMemo, useState } from "react";
import Nav from "../Common/Nav";
import Footer from "../Common/Footer";
import CarContext from "../../ContextAPI/Carcontext";
import { CartContext } from "../../ContextAPI/Cartcontext";
import { useNavigate } from "react-router-dom";

const Home1 = () => {
  const { cars, loading } = useContext(CarContext);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [videoError, setVideoError] = useState(false);

  const [selectedType, setSelectedType] = React.useState("ALL");

  // Get unique car types for filtering
  const carTypes = useMemo(() => {
    const types = new Set(cars.map((car) => car.type));
    return ["ALL", ...Array.from(types)];
  }, [cars]);

  // Filter cars based on selected type
  const filteredCars = useMemo(() => {
    if (selectedType === "ALL") return cars;
    return cars.filter((car) => car.type === selectedType);
  }, [cars, selectedType]);

  // Get unique brands and their counts for the hero cards
  const brandStats = useMemo(() => {
    const stats = {};
    cars.forEach((car) => {
      stats[car.brand] = (stats[car.brand] || 0) + 1;
    });
    return Object.entries(stats)
      .map(([name, count]) => ({
        name,
        count,
        // Find the first car of this brand to get an image
        image: cars.find((c) => c.brand === name)?.image,
      }))
      .sort((a, b) => b.count - a.count); // Sort by count desc
  }, [cars]);

  // Take the top 3 brands for the hero grid
  const heroBrands = brandStats.slice(0, 3);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="bg-white text-black font-sans">
      <Nav />

      {/* Hero Section */}
      <main className="relative w-full overflow-hidden">
        {/* Background Video Container - Using aspect-video to respect original proportions */}
        <div className="relative w-full aspect-video min-h-[500px] max-h-[800px]">
          {videoError ? (
            <div className="absolute inset-0 w-full h-full bg-black" />
          ) : (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => setVideoError(true)}
            >
              <source src="/videos/bmw.mp4" type="video/mp4" />
            </video>
          )}
          {/* Transparent Dark Overlay */}
          <div className="absolute inset-0 bg-black/30" />

          <div className="relative z-10 w-full h-full flex items-center justify-center md:justify-start md:ml-20 ml-0 px-6 md:px-0 text-center md:text-left">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start text-white w-full">
              <div className="space-y-3 md:space-y-5 flex flex-col items-center md:items-start mt-16 md:mt-20">
                <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-gray-300">
                  PREMIUM CARS. UNFORGETTABLE JOURNEYS.
                </p>
                <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold leading-tight tracking-tighter drop-shadow-2xl">
                  Drive the <br className="hidden md:block" /> Extraordinary
                </h1>
                <p className="text-base md:text-lg text-gray-200 max-w-lg leading-relaxed">
                  Choose from an exclusive collection of <br className="hidden md:block" />
                  high-performance vehicles and elevate every mile.
                </p>

                {/* Hero Content Bottom: Grid of 3 Cards + View All Button */}
                <div className="flex flex-col md:flex-row items-center md:items-end gap-8 w-full max-w-6xl">
                  {/* Grid of 3 Cards - Hidden on mobile */}
                  <div className="hidden md:grid grid-cols-1 sm:grid-cols-3 gap-4 flex-grow max-w-2xl">
                    {heroBrands.slice(0, 3).map((brand, idx) => (
                      <div
                        key={idx}
                        className="relative group cursor-pointer overflow-hidden rounded-[1.5rem] h-40 bg-white/10 backdrop-blur-md border border-white/20 shadow-xl"
                        onClick={() => navigate(`/marketplace?brand=${brand.name}`)}
                      >
                        <img
                          src={brand.image}
                          alt={brand.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                          <span className="bg-white text-black px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest">
                            {brand.name}
                          </span>
                          <span className="text-[9px] font-black tracking-tighter drop-shadow-lg">
                            {brand.count} RENTALS
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* View All Button */}
                  <button
                    onClick={() => navigate("/marketplace")}
                    className="group bg-black text-white px-8 py-4 md:py-3 rounded-full font-black text-xs md:text-[10px] tracking-[0.2em] hover:bg-gray-900 transition-all active:scale-95 shadow-2xl flex items-center justify-center gap-3 mb-2"
                  >
                    EXPLORE OUR FLEET
                    <span className="text-base group-hover:translate-x-2 transition-transform">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20 space-y-32">
          {/* Middle Section: Premium Meets Performance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center border-t border-gray-100 pt-16">
            <div>
              <h2 className="text-4xl font-bold mb-4 leading-tight">
                Premium Rentals <br /> Redefined
              </h2>
            </div>
            <div className="flex flex-col items-start md:items-end gap-8 text-left md:text-right">
              <p className="text-gray-500 max-w-lg text-lg leading-relaxed">
                Elevate your journey with our world-class rental service. From high-stakes
                business meetings to grand wedding celebrations, we provide the keys to
                automotive excellence and an unforgettable driving experience.
              </p>
              <button
                onClick={() => navigate("/marketplace")}
                className="bg-white text-black border border-black px-8 md:px-12 py-3 md:py-5 rounded-full font-bold text-base md:text-lg hover:bg-black hover:text-white transition-all duration-300 shadow-sm"
              >
                RENT NOW
              </button>
            </div>
          </div>

          {/* Fleet Section */}
          <section>
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-4">The Exclusive Collection</h2>
                <p className="text-gray-500 text-lg max-w-xl">
                  We offer our clients the most prestigious vehicles in the world.
                  Every car in our fleet is meticulously maintained to ensure your
                  ultimate comfort and performance.
                </p>
              </div>
            </div>

            {/* Filter Categories */}
            <div className="flex flex-wrap gap-3 mb-12">
              {carTypes.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedType(cat)}
                  className={`px-6 py-2 rounded-full text-xs font-bold border transition-all uppercase ${selectedType === cat ? "bg-black text-white border-black" : "bg-white text-gray-500 border-gray-200 hover:border-black"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid of Cars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredCars.slice(0, 8).map((car) => (
                <div
                  key={car._id}
                  className="group bg-white rounded-3xl p-4 border border-gray-50 hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
                >
                  <div className="relative overflow-hidden rounded-2xl h-52 mb-6">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm text-black">
                      {car.brand}
                    </div>
                  </div>

                  <div className="flex-grow">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-black transition-colors">
                      {car.name}
                    </h3>
                    <div className="flex gap-2 mb-4">
                      <span className="bg-gray-50 px-2 py-1 rounded text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                        {car.type}
                      </span>
                      <span className="bg-gray-50 px-2 py-1 rounded text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                        {car.hp} HP
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-50">
                    <span className="text-xl font-black">
                      ${Math.min(car.price * 0.01, 3000).toLocaleString()} / day
                    </span>
                    <button
                      onClick={() => addToCart(car)}
                      className="bg-black text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-gray-800 transition-all active:scale-95"
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-20">
              <button
                onClick={() => navigate("/marketplace")}
                className="text-gray-400 hover:text-black font-bold text-sm tracking-widest flex items-center gap-2 transition-all group"
              >
                VIEW ALL VEHICLES
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </button>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home1;
