const express = require('express');
require('dotenv').config();

const app = express()

app.get("/", async (req, res) => {
    res.send("hello world");
})

app.listen(process.env.PORT || 3000);