import express from "express";
import { addBuyer, getBuyers, getBuyer,deleteBuyer} from "../data/buyers.js";


const router = express.Router();

  //EDNPOINT PARA OBTENER TODOS LOS BUYERS
router.get("/", async (req, res) => {
    const buyers = await getBuyers();
    res.json(buyers);
  });

  //ENDPOINT PARA OBTENER UN BUYER POR ID
  router.get("/:id", async (req, res) => {
    const buyer = await getBuyer(req.params.id);
    res.json(buyer);
  });

  //ENDPOINT PARA AGREGAR BUYERS
  router.post("/", async (req, res) => {
    const buyer = await addBuyer(req.body);
    res.json(buyer);
  });

  //ENDPOINT PARA ELIMINAR BUYERS
  router.delete("/:id", async (req, res) => {
    console.log("Ingresando en el metodo delete")
    const buyer = await deleteBuyer(req.params.id)
    res.send(buyer);
  });


  export default router;