require('dotenv').config()
const express = require('express')
const morgan = require("morgan")
const bcrypt = require('bcrypt')

const connectDB = require('./config/database.js')

const app = express()
connectDB()

app.use(express.json())
app.use(morgan)

const PORT = process.env.PORT || "3000";

app.listen(PORT, () => {
    console.log(`The express app is ready on port ${PORT}`)
})