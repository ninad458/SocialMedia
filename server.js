const express = require('express');
require('dotenv').config();
const db = require('./db');

const app = express()

app.get("/", async (req, res) => {
    res.send("hello world");
})

db()
app.listen(process.env.PORT || 3000);