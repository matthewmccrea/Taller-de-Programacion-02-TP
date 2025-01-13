import express from "express";
import path from "path";


const router = express.Router();
const __dirname = path.resolve();

router.get("/list",async(req, res) => {

  res.sendFile(path.join(__dirname, "views", "playground", "playground.html"));
});

export default router;