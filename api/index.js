// Importa los módulos necesarios y configura el servidor Express
import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import "dotenv/config";

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Función para manejar errores
const handleError = (res, error) => {
  console.error(error);
  res.status(500).send({ error: "An error occurred" });
};

// Endpoint para obtener productos
app.get("/api/items", async (req, res) => {
  try {
    const searchResponse = await fetch(
      `https://api.mercadolibre.com/sites/MLA/search?q=${req.query.q}`
    );
    const searchData = await searchResponse.json();
    
    // Obtener las categorías
    let categories = [];
    const availableFilters = searchData.available_filters;
    const filters = searchData.filters;

    if (filters.length > 0 && filters[0].values.length > 0) {
      categories = filters[0].values[0].path_from_root.map((category) => category.name);
    } else if (availableFilters.length > 0 && availableFilters[0].values.length > 0) {
      categories = availableFilters[0].values[0].path_from_root.map((category) => category.name);
    }

    const itemsDetailsPromises = searchData.results
      .slice(0, 4)
      .map((item) => fetch(`https://api.mercadolibre.com/items/${item.id}`));

    const itemsDetailsResponses = await Promise.all(itemsDetailsPromises);
    const itemsDetails = await Promise.all(
      itemsDetailsResponses.map((res) => res.json())
    );

    const resultsWithSellerAddress = searchData.results
      .slice(0, 4)
      .map((item, index) => {
        return {
          ...item,
          seller_address: itemsDetails[index].seller_address,
        };
      });

    res.json({ results: resultsWithSellerAddress, categories: categories });
  } catch (error) {
    console.error("Error fetching items details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Endpoint para obtener detalles de un producto individual
app.get("/api/items/:id", async (req, res) => {
  try {
    const [itemResponse, descriptionResponse, categoryResponse] =
      await Promise.all([
        fetch(`https://api.mercadolibre.com/items/${req.params.id}`),
        fetch(
          `https://api.mercadolibre.com/items/${req.params.id}/description`
        ),
        fetch(
          `https://api.mercadolibre.com/categories/${req.params.id}`
        ),
      ]);

    const [itemData, descriptionData, categoryData] = await Promise.all([
      itemResponse.json(),
      descriptionResponse.json(),
      categoryResponse.json(),
    ]);

    const result = {
      author: {
        name: "Alexis",
        lastname: "Aguirre",
      },
      item: {
        id: itemData.id,
        title: itemData.title,
        price: {
          currency: itemData.currency_id,
          amount: itemData.price,
          decimals: itemData.decimals || 0,
        },
        picture: itemData.thumbnail,
        condition: itemData.condition,
        free_shipping: itemData.shipping.free_shipping,
        sold_quantity: itemData.sold_quantity,
        description: descriptionData.plain_text,
        categories: categoryData.map((category) => category.name),
      },
    };

    res.send(result);
  } catch (error) {
    handleError(res, error);
  }
});

// Define el puerto y escucha las solicitudes
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
