import express from "express";
import { getSales, getSale} from "../data/sale.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const sale = await getSales();
    res.json(sale);
  });

router.get("/:id", async (req, res) => {
    const product = await getSale(req.params.id);
    res.json(product);
  });


  export default router;