import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/database.js";
import customerRoute from "./routes/customerRoute.js";
import cors from "cors"
const app = express();

dotenv.config();
// connect to database
dbConnect();

app.use(cors());
app.use(express.json());

app.use("/api/v1", customerRoute);

// default route
app.get("/", (req, res) => {
  res.send("<h1>This is the HomePage</h1>");
});

const PORT = process.env.PORT || 5000;

// start server
app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});


