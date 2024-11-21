import express from "express";
import { addBuyer, getBuyers, getBuyer,deleteBuyer} from "../data/buyers.js";
import { getProduct } from "../data/products.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const buyers = await getBuyers();
    res.json(buyers);
  });

  router.get("/:id", async (req, res) => {
    const buyer = await getBuyer(req.params.id);
    res.json(buyer);
  });

  router.post("/", async (req, res) => {
    const buyer = await addBuyer(req.body);
    res.json(buyer);
  });

  // router.post("/buyProduct/:id", async (req, res) => {
    
  //   const sale = await getSale(req.body);
  //   res.json(sale);
  // });

  router.delete("/:id", async (req, res) => {
    console.log("Ingresando en el metodo delete")
    const buyer = await deleteBuyer(req.params.id)
    res.send(buyer);
  });




  export default router;