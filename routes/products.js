import express from "express";
import { getProducts, getProduct } from "../data/products.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const products = await getProducts();
    res.json(products);
  });

router.get("/:id", async (req, res) => {
    const product = await getProduct(req.params.id);
    res.json(product);
  });

  router.post("/", async (req, res) => {
    const product = await getProduct(req.params.id);
    res.json(product);
  });


  export default router;