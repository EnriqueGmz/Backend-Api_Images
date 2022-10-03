import express from "express";
import * as dotenv from "dotenv";
import morgan from "morgan";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import path from "path"

const app = express();
dotenv.config();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// Rutas
app.use("/api/v1/auth", authRouter)

// Esta carpeta para esta aplciacion sera usado para almacenar las imagenes
app.use("/uploads", express.static(path.resolve("uploads")))

// Puerto conectado
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on port: http://localhost:${PORT} 🚀🚀🚀`));