import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  let { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3003";
    fetch(`${apiUrl}/api/items/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        setProduct(data.item);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching product details:", error);
        setError("No se pudo cargar la información del producto");
      });
  }, [id]);

  if (loading) {
    return <div>Cargando detalles del producto...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <img src={product.picture} alt={product.title} />
      <p>Precio: ${product.price.amount}</p>
      <p>Descripción: {product.description}</p>
      {/* Añadir aquí más detalles del producto según sea necesario */}
    </div>
  );
};

export default ProductDetail;
