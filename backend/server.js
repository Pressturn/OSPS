require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bcrypt = require("bcrypt");
const connectDB = require("./config/database.js");
const userRouter = require("./routers/users.js");

const receiptRouter = require("./routers/receipts.js");

const app = express();
connectDB();

app.use(express.json());
app.use(morgan("dev"));

const PORT = process.env.PORT || "3000";

// Routes
app.use("/users", userRouter);
app.use("/receipts", receiptRouter);

app.listen(PORT, () => {
  console.log(`The express app is ready on port ${PORT}`);
});
