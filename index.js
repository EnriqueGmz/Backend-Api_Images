import express from "express";
import * as dotenv from "dotenv";
import mysqlConnect from "./database/connectdb.js";
import morgan from "morgan";
import authRouter from "./routes/auth.route.js"

const app = express();
dotenv.config();



app.use("/", authRouter)

// Middlewares
app.use(express());
app.use(morgan("dev"));


// Puerto conectado
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on port: http://localhost:${PORT} 🚀🚀🚀`));