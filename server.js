const express = require('express');
require('dotenv').config();
const db = require('./db');
const UserController = require('./app/route/Auth')

const app = express()

app.use(express.json())

app.use("/users", UserController)

db()
app.listen(process.env.PORT || 3000);