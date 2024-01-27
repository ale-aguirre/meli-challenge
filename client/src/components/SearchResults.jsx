import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [location, setLocation] = useState("");
  const searchQuery = searchParams.get("search");

  useEffect(() => {
    if (searchQuery) {
      setLoading(true);
      console.log(`Fetching results for query: ${searchQuery}`);

      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3003";
      fetch(`${apiUrl}/api/items?q=${searchQuery}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setLoading(false);
          console.log("Data fetched:", data);
          if (data && data.results) {
            setResults(data.results.slice(0, 4));
            const categoryFilter = data.filters.find(
              (f) => f.id === "category"
            );
            const locationFilter = data.available_filters.find(
              (f) => f.id === "state"
            );

            if (categoryFilter && categoryFilter.values.length > 0) {
              const categoryNames = categoryFilter.values[0].path_from_root.map(
                (c) => c.name
              );
              setCategories(categoryNames.join(" > "));
            } else {
              setCategories([]);
            }

            if (locationFilter && locationFilter.values.length > 0) {
              setLocation(locationFilter.values[0].name);
            } else {
              setLocation("");
            }
          } else {
            setResults([]);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error fetching data:", error);
          setError("Hubo un error al buscar los resultados");
        });
    }
  }, [searchQuery]);

  if (loading) {
    return <div>Buscando productos...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!results.length && !loading) {
    return <div>No se encontraron resultados para "{searchQuery}"</div>;
  }

  return (
    <div>
      {categories && (
        <div>
          <span>Categorías: {categories}</span>
        </div>
      )}

      {results.map((result) => (
        <div key={result.id}>
          <img src={result.thumbnail} alt={result.title} />
          <h3>{result.title}</h3>
          <p>Precio: {result.price}</p>
          {location && (
            <div>
              <span>Ubicación: {location || "No disponible"}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
