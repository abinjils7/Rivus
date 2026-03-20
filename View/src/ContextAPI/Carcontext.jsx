import React, { createContext, useState, useEffect, useMemo } from "react";
import axios from "axios";

const CarContext = createContext();

export const CarProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterHP, setFilterHP] = useState("");
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const pageSize = 3; // Always use this limit for pagination

  // Fetch paginated cars from API whenever page changes
  useEffect(() => {
    async function fetchCars(currentPage = page) {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/cars?page=${currentPage}&limit=${pageSize}`,
          { withCredentials: true }
        );
        if (Array.isArray(response.data.data)) {
          setCars(response.data.data);
          setTotalPages(response.data.meta?.totalPages || 1);
        } else {
          setCars([]);
          setTotalPages(1);
          console.warn("Unexpected API response", response.data);
        }
      } catch (error) {
        setCars([]);
        setTotalPages(1);
        console.error("Error fetching cars:", error.message, error);
      }
      setLoading(false);
    }
    fetchCars(page);
  }, [page]);

  // Memoized filtering/search on fetched data
  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const name = car.name?.toLowerCase() || "";
      const brand = car.brand?.toLowerCase() || "";
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        !term || name.includes(term) || brand.includes(term);

      const carHP = Number(car.hp) || 0;
      const targetHP = parseInt(filterHP);
      const matchesHP = !filterHP || carHP >= targetHP;

      return matchesSearch && matchesHP;
    });
  }, [cars, searchTerm, filterHP]);

  return (
    <CarContext.Provider
      value={{
        filteredCars,
        cars,
        searchTerm,
        setSearchTerm,
        filterHP,
        setFilterHP,
        loading,
        page,
        setPage,
        totalPages,
      }}
    >
      {children}
    </CarContext.Provider>
  );
};

export default CarContext;
