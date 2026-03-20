import React, { useContext, useState } from "react";
import Navbar from "../Common/Nav";
import Footer from "../Common/Footer";
import { CartContext } from "../../ContextAPI/Cartcontext";
import WishlistContext from "../../ContextAPI/WishlistContext";
import CarContext from "../../ContextAPI/Carcontext";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";

const sortCars = (cars, sortValue) => {
  switch (sortValue) {
    case "name-asc":
      return [...cars].sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return [...cars].sort((a, b) => b.name.localeCompare(a.name));
    case "price-asc":
      return [...cars].sort((a, b) => a.price - b.price);
    case "price-desc":
      return [...cars].sort((a, b) => b.price - a.price);
    case "hp-asc":
      return [...cars].sort((a, b) => a.hp - b.hp);
    case "hp-desc":
      return [...cars].sort((a, b) => b.hp - a.hp);
    default:
      return cars;
  }
};

const getCarId = (car) => car._id?.toString() || car.id?.toString();

const Productlist = () => {
  const { addToCart } = useContext(CartContext);
  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);
  const {
    filteredCars,
    searchTerm,
    setSearchTerm,
    filterHP,
    setFilterHP,
    loading,
    page,
    setPage,
    totalPages,
  } = useContext(CarContext);

  const [sort, setSort] = useState("");

  let displayedCars = sortCars(filteredCars, sort);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-10 px-4 mt-20">
        {/* Filters */}
        <div className="mb-8 flex flex-wrap justify-center gap-4 bg-white py-6 px-4 rounded-lg border border-gray-100 shadow-sm">
          <input
            type="text"
            placeholder="Search cars..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-3 w-64 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200"
          />
          <select
            onChange={(e) => setFilterHP(e.target.value)}
            value={filterHP}
            className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200 appearance-none w-40"
          >
            <option value="">All HP</option>
            <option value="300">300+ HP</option>
            <option value="500">500+ HP</option>
            <option value="700">700+ HP</option>
            <option value="1000">1000+ HP</option>
          </select>
          <select
            onChange={(e) => setSort(e.target.value)}
            value={sort}
            className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200 appearance-none w-40"
          >
            <option value="">Sort By</option>
            <option value="name-asc">Name (A - Z)</option>
            <option value="name-desc">Name (Z - A)</option>
            <option value="price-asc">Price (Low - High)</option>
            <option value="price-desc">Price (High - Low)</option>
            <option value="hp-asc">HP (Low - High)</option>
            <option value="hp-desc">HP (High - Low)</option>
          </select>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-2 my-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {/* Display grid */}
        {loading ? (
          <p className="text-center text-gray-500">Loading cars...</p>
        ) : displayedCars.length === 0 ? (
          <p className="text-center text-gray-500">
            No cars found matching your filters.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedCars.map((car) => {
              const carId = getCarId(car);
              const inWishlist =
                wishlist && wishlist.some((item) => getCarId(item) === carId);
              return (
                <div
                  key={carId}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 relative"
                >
                  <button
                    onClick={() =>
                      inWishlist
                        ? removeFromWishlist(carId)
                        : addToWishlist(car)
                    }
                    className="absolute top-3 right-3 z-10 bg-white p-2 rounded-full shadow-md hover:scale-110 transition-transform"
                  >
                    {inWishlist ? (
                      <HeartSolid className="h-6 w-6 text-red-500" />
                    ) : (
                      <HeartOutline className="h-6 w-6 text-gray-500" />
                    )}
                  </button>
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-52 object-cover"
                  />
                  <div className="p-5">
                    <h2 className="text-lg font-semibold">{car.name}</h2>
                    <p className="text-sm text-gray-500 mb-2">{car.brand}</p>
                    <div className="flex justify-between text-sm mb-3">
                      <span className="bg-gray-100 px-3 py-1 rounded-full">
                        {car.type}
                      </span>
                      <span className="bg-gray-100 px-3 py-1 rounded-full">
                        {car.hp} HP
                      </span>
                    </div>
                    <p className="text-lg font-semibold text-gray-800">
                      ₹{Number(car.price).toLocaleString("en-IN")}
                    </p>
                    <button
                      onClick={() => addToCart(car)}
                      className="w-full mt-4 bg-black text-white py-2 rounded-xl hover:bg-gray-900 transition-all"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Productlist;
