import express from "express";
import inventorRouter from "./routes/inventor.js";
import userRouter from "./routes/user.js";
import buyerRouter from "./routes/buyers.js";
import productRouter from "./routes/products.js";
import sellerRouter from "./routes/sellers.js";
import saleRouter from "./routes/sale.js";
import loginRouter from "./routes/login.js";
import homeRouter from "./routes/home.js";
import playgroundRouter from "./routes/playground.js";
import cookieParser from "cookie-parser";
import { auth } from "./middleware/auth.js";
import ejs from "ejs";

//TODO llevarlo a archivo de config
const PORT = 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");
app.use("/api/inventors", inventorRouter);
app.use("/api/users",auth,userRouter);
app.use("/api/buyers",auth,buyerRouter);
app.use("/api/products",auth,productRouter);
app.use("/api/sellers", sellerRouter);
app.use("/api/sale", saleRouter);
app.use("/api/login", loginRouter);
app.use("/api/playground", playgroundRouter);
app.use("/api/home",homeRouter);
app.use('/images', express.static('C:/Users/mmccreasteele/Desktop/TP02/Taller de Programacion TP02/images'));


app.listen(PORT, () => {
  console.log("Servidor Web Express en el puerto: ", PORT);
});
