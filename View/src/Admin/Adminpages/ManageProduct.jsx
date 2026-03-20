import React, { useContext, useEffect, useState, useRef } from "react";
import CarContext from "../../ContextAPI/Carcontext";
import { ProductContext } from "../AdminControllers/ProductControlers";
import { useNavigate } from "react-router-dom";

export default function ManageProduct() {
  const navigate = useNavigate();
  const { cars, fetchCars } = useContext(CarContext);
  const { deleteProductDB, editProductDB } = useContext(ProductContext);
  const [selectedCar, setSelectedCar] = useState(null);
  const [formData, setFormData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const productsRef = useRef(null);

  // Load cars once
  useEffect(() => {
    setLoading(true);
    fetchCars;
    setLoading(false);
  }, []);

  // Modal open on "Edit"
  const handleEdit = (car) => {
    setSelectedCar(car);
    setFormData(car);
    setModalOpen(true);
  };

  // Modal fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Modal submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCar) editProductDB(selectedCar._id, formData);
    setModalOpen(false);
  };

  // Delete handler
  const handleDelete = (carId) => {
    deleteProductDB(carId);
  };

  const goToAddCar = () => navigate("/Addproducts");

  return (
    <div className="p-5 bg-white min-h-screen">
      {/* Header */}
      <div className="text-center py-8 mb-5">
        <h1 className="text-3xl font-bold mb-2">Manage Your Inventory</h1>
        <p className="text-gray-500 mb-4">
          View, edit, and manage all your car listings in one place.
        </p>
        <button
          onClick={goToAddCar}
          className="bg-black text-white py-2 px-5 rounded mr-3"
        >
          Add New Car
        </button>
      </div>

      {/* Main Grid */}
      <div
        ref={productsRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {loading
          ? Array(6)
              .fill(0)
              .map((_, idx) => (
                <div
                  key={idx}
                  className="bg-gray-100 p-8 rounded animate-pulse"
                >
                  Loading...
                </div>
              ))
          : cars.map((car) => (
              <div
                key={car._id}
                className="bg-gray-50 rounded shadow p-4 flex flex-col"
              >
                <img
                  src={car.image}
                  alt={car.name}
                  className="h-32 object-contain mb-2"
                  style={{ background: "#fafafa" }}
                  onError={(e) => {
                    e.target.src = "/placeholder-image.jpg";
                  }}
                />
                <div className="font-bold mb-1">{car.name}</div>
                <div className="text-sm text-gray-600 mb-1">
                  {car.brand} • {car.type}
                </div>
                <div className="text-sm text-gray-600 mb-2">{car.hp} HP</div>
                <div className="text-base mb-2">
                  ₹{car.price.toLocaleString()}
                </div>
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => handleEdit(car)}
                    className="flex-1 py-1 rounded bg-gray-800 text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(car._id)}
                    className="flex-1 py-1 rounded bg-white text-red-500 border"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
      </div>

      {/* Edit Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          onClick={() => setModalOpen(false)}
        >
          <form
            className="bg-white p-5 rounded w-full max-w-sm space-y-4"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
          >
            <h2 className="text-lg font-bold mb-2">Edit Car</h2>
            {["name", "brand", "type", "hp", "price", "image"].map((field) => (
              <div key={field}>
                <label className="block text-gray-700 text-sm mb-1 capitalize">
                  {field}
                </label>
                <input
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  placeholder={`Enter ${field}`}
                />
              </div>
            ))}
            <div className="flex gap-2 pt-2 justify-end">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-1 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1 bg-black text-white rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
