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

const handleError = (res, error) => {
  console.error(error);
  res.status(500).send({ error: "An error occurred" });
};

// Endpoint para buscar productos
app.get("/api/items", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.mercadolibre.com/sites/MLA/search?q=${req.query.q}`
    );
    const data = await response.json();
    res.send(data);
  } catch (error) {
    handleError(res, error);
  }
});

// Endpoint para detalles del producto
app.get("/api/items/:id", async (req, res) => {
  try {
    const [itemResponse, descriptionResponse] = await Promise.all([
      fetch(`https://api.mercadolibre.com/items/${req.params.id}`),
      fetch(`https://api.mercadolibre.com/items/${req.params.id}/description`),
    ]);
    const itemData = await itemResponse.json();
    const descriptionData = await descriptionResponse.json();
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
      },
    };
    res.send(result);
  } catch (error) {
    handleError(res, error);
  }
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
