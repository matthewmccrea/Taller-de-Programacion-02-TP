import express from "express";
import { getProducts, getProduct, addProduct } from "../data/products.js";

const router = express.Router();

//ENDPOINT PARA OBTENER TODOS LOS PRODUCTOS
router.get("/", async (req, res) => {
    const products = await getProducts();
    res.json(products);
  });


//ENDPOINT PARA OBTENER UN PRODUCTO POR ID
  router.get("/:id", async (req, res) => {
    const product = await getProduct(req.params.id);
    res.json(product);
  });

  //ENDPOINT PARA CREAR UN PRODUCTO NUEVO
  router.post("/", async (req, res) => {
    const product = await addProduct(req.body);
    res.json(product);
  });

  export default router;