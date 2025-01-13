import express from "express";
import path from "path";
import { addUser, findByCredentials, generateAuthToken } from "../data/user.js";

const router = express.Router();
const __dirname = path.resolve();

router.post("/deleteUser", async (req, res) => {
  const result = await deleteUser(req.body);

  try {
    
  } catch (error) {
    
  }
  res.send(result);
});

router.post("/", async (req, res) => {
  const result = await addUser(req.body);
  res.send(result);
});

//Login con redirect a home
router.post("/login", async (req, res) => {
  try {
    console.log("Dentro del login de User");
    console.log("email", req.body.email);
    console.log("password", req.body.password);

    const user = await findByCredentials(req.body.email, req.body.password);
    console.log(user);
    const token = generateAuthToken(user);
    console.log("El token generado para el usuario es: " + token);


    res.json({
      token,
      redirectUrl: `/api/home?token=${token}`,
    });
  } catch (error) {
    res.status(401).send(error.message);
  }
});

export default router;
