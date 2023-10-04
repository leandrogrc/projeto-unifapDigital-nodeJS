const express = require('express');
const router = require('./routes');
const { PrismaClient } = require('@prisma/client');

const app = express();

const prisma = new PrismaClient();

app.use(express.json());

app.use(router);

app.get('/', (req, res) => {
    res.json({ success: "OK" });
});

app.listen(8080, () => {
    console.log("Running on port 8080");
});