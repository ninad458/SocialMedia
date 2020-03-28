const express = require('express');
require('dotenv').config();
const db = require('./db');
const UserController = require('./app/controller/Auth')

const app = express()

app.use(express.json())

app.get("/", async (req, res) => {
    res.send("hello world");
})

app.post("/register", UserController.register)

db()
app.listen(process.env.PORT || 3000);