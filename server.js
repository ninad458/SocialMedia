const express = require('express');
require('dotenv').config();
const db = require('./db');
const UserRoute = require('./app/route/Auth')
const PostRoute = require('./app/route/Post')

const app = express()

app.use(express.json())

app.use("/users", UserRoute)
app.use("/posts", PostRoute)

db()
app.listen(process.env.PORT || 3000);