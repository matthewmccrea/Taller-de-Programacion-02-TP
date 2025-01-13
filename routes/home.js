import express from "express";
import path from "path";
import { auth } from "../middleware/auth.js";

const router = express.Router();
const __dirname = path.resolve();

router.get("/", async (req, res) => {
  const token = req.query.token;

  if (!token) {
   
    return res.status(401).send("Token is required");
  }

  res.sendFile(path.join(__dirname, "views", "home", "home.html"));
});



  export default router;