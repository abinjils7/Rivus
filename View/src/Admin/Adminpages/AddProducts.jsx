import React, { useContext, useState } from "react";
import { ProductContext } from "../AdminControllers/ProductControlers";

const AddProduct = () => {
  const { addCarsDB } = useContext(ProductContext);

  const [formData, setFormData] = useState({
    id: crypto.randomUUID(),
    name: "",
    brand: "",
    type: "",
    hp: "",
    price: "",
    image: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setFormData({
      ...formData,
      [fieldName]: fieldValue,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.brand.trim()) newErrors.brand = "Brand is required";
    if (!formData.type) newErrors.type = "Type is required";
    if (!formData.hp || isNaN(formData.hp) || Number(formData.hp) <= 0)
      newErrors.hp = "Valid positive HP required";
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0)
      newErrors.price = "Valid positive price required";
    if (!formData.image.trim() || !/^https?:\/\/.+\..+/.test(formData.image))
      newErrors.image = "Valid Image URL is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // stop if form invalid

    setIsSubmitting(true);
    try {
      await addCarsDB(formData);
      setFormData({
        id: crypto.randomUUID(),
        name: "",
        brand: "",
        type: "",
        hp: "",
        price: "",
        image: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Failed to add product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-4 bg-white rounded-lg shadow-md">
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            <i className="fas fa-car mr-2 text-blue-500"></i>
            Add New Car
          </h2>
        </div>

        <form className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Model Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., 911 GT3 RS"
              className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 ${
                errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Brand
            </label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="e.g., Porsche"
              className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 ${
                errors.brand
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.brand && (
              <p className="mt-1 text-xs text-red-600">{errors.brand}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 ${
                  errors.type
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              >
                <option value="">Select Type</option>
                <option value="racespec">Race Spec</option>
                <option value="daily">Daily</option>
                <option value="luxury">Luxury</option>
                <option value="allterains">Allterrains</option>
              </select>
              {errors.type && (
                <p className="mt-1 text-xs text-red-600">{errors.type}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Horsepower
              </label>
              <input
                type="number"
                name="hp"
                value={formData.hp}
                onChange={handleChange}
                placeholder="e.g., 518"
                className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 ${
                  errors.hp
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.hp && (
                <p className="mt-1 text-xs text-red-600">{errors.hp}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g., 384000"
                className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 ${
                  errors.price
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.price && (
                <p className="mt-1 text-xs text-red-600">{errors.price}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 ${
                  errors.image
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.image && (
                <p className="mt-1 text-xs text-red-600">{errors.image}</p>
              )}
            </div>
          </div>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleClick}
            className="w-full bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50"
          >
            <span>
              <i className="fas fa-plus-circle mr-1"></i>
              Add Car
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
