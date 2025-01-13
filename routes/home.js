import express from "express";
import path from "path";
import { auth } from "../middleware/auth.js";

const router = express.Router();
const __dirname = path.resolve();

router.get("/", auth,async(req, res) => {
    res.sendFile(path.join(__dirname, "views", "home", "home.html"));
    
  });


  export default router;