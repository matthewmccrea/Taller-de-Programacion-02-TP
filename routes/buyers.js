import express from "express";
import path from "path";
import { addBuyer, getBuyers, getBuyer,deleteBuyer} from "../data/buyers.js";


const router = express.Router();
const __dirname = path.resolve();

  //EDNPOINT PARA OBTENER TODOS LOS BUYERS
router.get("/", async (req, res) => {
    const buyers = await getBuyers();
    res.json(buyers);
  });


  //ENDPOINT DE TESTING QUE DEVUELVE UN HTML
  router.get("/list", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "buyers", "listBuyers.html"));
  });

  router.get("/createBuyer", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "buyers", "createBuyers.html"));
  });

  //ENDPOINT PARA OBTENER UN BUYER POR ID
  router.get("/:id", async (req, res) => {
    const buyer = await getBuyer(req.params.id);
    res.json(buyer);
  });

  //ENDPOINT PARA AGREGAR BUYERS
  router.post("/createBuyer", async (req, res) => {
    console.log("Datos recibidos en req.body:", req.body);
    const buyer = await addBuyer(req.body);
    
    res.sendFile(path.join(__dirname, "views", "buyers", "listBuyers.html"));
  });

  //ENDPOINT PARA ELIMINAR BUYERS
  router.delete("/:id", async (req, res) => {
    console.log("Ingresando en el metodo delete")
    const buyer = await deleteBuyer(req.params.id)
    res.send(buyer);
  });


  export default router;