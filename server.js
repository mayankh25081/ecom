import Express from "express";
// import  Color  from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDb from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import path from 'path'
import { fileURLToPath } from "url";
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// import formidableMiddleware from 'express-formidable';

// configure env
dotenv.config();

// database config
connectDb();

// esModule fix
// const __fileName = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__fileName); 

// rest objects
const app = Express();

// middlewares
app.use(cors());
app.use(Express.json());
app.use(morgan("dev"));

// deployment

app.use(Express.static(path.join(__dirname, './client/build')));

// app.use(formidableMiddleware());

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Ecommerce website</h1>");
});
app.use('*', function(req, res){
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
})

// port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server Running on ${process.env.DEV_MODE} mode on ${PORT} port`);
});
