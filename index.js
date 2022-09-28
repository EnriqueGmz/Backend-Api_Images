import express from "express";
import * as dotenv from "dotenv";
import morgan from "morgan";
import mysqlConnect from "./database/connectdb.js";
import authRouter from "./routes/auth.route.js"

const app = express();
dotenv.config();

// Middlewares
app.use(express.json())
app.use(morgan("dev"));

// Rutas
app.use("/", authRouter)

// Puerto conectado
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on port: http://localhost:${PORT} 🚀🚀🚀`));