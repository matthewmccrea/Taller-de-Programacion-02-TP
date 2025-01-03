import express from "express";
import inventorRouter from "./routes/inventor.js";
import userRouter from "./routes/user.js";
import buyerRouter from "./routes/buyers.js";
import productRouter from "./routes/products.js";
import sellerRouter from "./routes/sellers.js";
import saleRouter from "./routes/sale.js";
import loginRouter from "./routes/login.js";

//TODO llevarlo a archivo de config
const PORT = 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/inventors", inventorRouter);
app.use("/api/users", userRouter);
app.use("/api/buyers", buyerRouter);
app.use("/api/products", productRouter);
app.use("/api/sellers", sellerRouter);
app.use("/api/sale", saleRouter);
app.use("/api/login", loginRouter);

app.listen(PORT, () => {
  console.log("Servidor Web Express en el puerto: ", PORT);
});
