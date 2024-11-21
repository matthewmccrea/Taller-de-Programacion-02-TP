import express from "express";
import { getSellers } from "../data/sellers.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const sellers = await getSellers();
    res.json(sellers);
  });


  export default router;