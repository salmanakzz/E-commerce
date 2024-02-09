require("dotenv").config();
import dbConnect from "./config/connection";
import bodyParser from "body-parser";
import express from "express";
import path from "path";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;

// import route setup files
import { ProductRoutes } from "./modules/product/routes";
import { CartRoutes } from "./modules/cart/routes";

// Set up CORS options
const corsOptions = {
  origin: "http://localhost:3000",
};

// Use middlewares
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors(corsOptions));
// app.use(express.static(path.join(__dirname, "public")));

// Conecting to database
dbConnect((err) => {
  if (err) {
    console.log("Database Connection Error:" + err);
  } else {
    console.log("Database Connected Successfully");
  }
});

app.use(function (req, res, next) {
  console.log(`method=${req.method} route=${req.url}`);
  next();
});

// routes
ProductRoutes(app);
CartRoutes(app);

app.get("*", (req: any, res: { send: (arg0: string) => void }) => {
  res.send("404");
});

app.listen(PORT, () => console.log(`Server Running ${PORT}`));
