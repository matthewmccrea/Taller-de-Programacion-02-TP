import express from "express";
import path from "path";
import { getSellers } from "../data/sellers.js";

const router = express.Router();
const __dirname = path.resolve();
router.get("/", async (req, res) => {
    const sellers = await getSellers();
    res.json(sellers);
  });

 router.get("/list",async(req, res) => {
    
    
    res.sendFile(path.join(__dirname, "views", "sellers", "listSellers.html"));
  });


  export default router;