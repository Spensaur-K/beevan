const express = require("express");
const path = require("path");
const body = require("body-parser");
const dotenv = require("dotenv");
const axios = require("axios");
const assert = require("assert")

dotenv.config();

assert(process.env.PORT);
assert(process.env.WEBHOOK);

const app = express();

app.use(body.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "./client")));

app.get("/speak", ({ query: { message } }, res, next) => {
    axios.post(process.env.WEBHOOK, {
        content: message,
    }).then(() => res.redirect("/"));
});

app.listen(process.env.PORT, () => {
    console.log(`EXPRESS LISTENTING ON PORT ${process.env.PORT}`);
});


setInterval(() => {
    axios.post(process.env.WEBHOOK, {
        content: "@everyone AAAAAAAAHAGHGH!",
    });
}, 1.728e+8);
