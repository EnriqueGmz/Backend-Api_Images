import express from "express";
import * as dotenv from "dotenv";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on port: http://localhost:${PORT} 🚀🚀🚀`));