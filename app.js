const express = require('express');
const fs = require('fs');
const app = express();
const port = 5000;
const cors = require('cors')

app.use(cors())

app.get("/", (req, res) => {
  res.send('<h1>Greeting from server!</h1>');
})

app.get("/products", (req, res) => {
  fs.readFile("./db/products.json", "utf-8", (err, data) => {
    if (err) throw err;
    res.send(data)
  })
})

app.get("/brands", (req, res) => {
  fs.readFile("./db/brands.json", "utf-8", (err, data) => {
    if (err) throw err;
    res.send(data)
  })
})

app.get("/categories", (req, res) => {
  fs.readFile("./db/categories.json", "utf-8", (err, data) => {
    if (err) throw err;
    res.send(data)
  })
})

app.listen(port, () => {
  console.log(`Server is listening at port - ${port}`)
})








