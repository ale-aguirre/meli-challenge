export const formatPriceARS = (price) => {
  const formattedPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0, // muestra al menos 0 decimales
    maximumFractionDigits: price % 1 === 0 ? 0 : 2, //muestra 2 decimales si no son 00
  }).format(price);

  return formattedPrice;
};
