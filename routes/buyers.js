import express from "express";
import { getBuyers } from "../data/buyers.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const buyers = await getBuyers();
    res.json(buyers);
  });


  export default router;