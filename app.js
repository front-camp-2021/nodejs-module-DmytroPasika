const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require("uuid");
const bodyParser = require("body-parser")

const port = 5000;
const cors = require('cors')

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
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

app.post('/products', (req, res) => {
  const { product } = req.body
  fs.readFile('./db/products.json', 'utf-8', (err, data) => {
    if (err) throw err;
    const products = JSON.parse(data);
    products.push({
      ...product,
      id: uuidv4(),
    })
    fs.writeFile('./db/products.json', JSON.stringify(products), (err) => {
      if (err) throw err;
      res.status(200).send({ response: "product was added" });
    })
  })
})

app.put('/products/:id', (req, res) => {
  const { product } = req.body
  const { id } = req.params

  fs.readFile('./db/products.json', 'utf-8', (err, data) => {
    if (err) throw err;

    const products = JSON.parse(data);
    const index = products.findIndex(product => {
      return product.id === id
    })

    if (index < 0) return res.status(404).send("Not found");

    products[index] = {
      ...product,
      id: uuidv4(),
    }

    fs.writeFile('./db/products.json', JSON.stringify(products), (err) => {
      if (err) throw err;
      res.status(200).send({ response: "product was update!" });
    })
  })
})

app.delete('/products/:id', (req, res) => {
  const { id } = req.params

  fs.readFile('./db/products.json', 'utf-8', (err, data) => {
    if (err) throw err;

    const products = JSON.parse(data);
    const updateProducts = products.filter(product => {
      return product.id !== id;
    })

    fs.writeFile('./db/products.json', JSON.stringify(updateProducts), (err) => {
      if (err) throw err;
      res.status(200).send({ response: "product was deleted!" });
    })
  })
})

app.delete('/products', (req, res) => {
  fs.writeFile('./db/products.json', JSON.stringify([]), (err) => {
    if (err) throw err;
    res.status(200).send({ response: "product was deleted!" });
  })
})


app.listen(port, () => {
  console.log(`Server is listening at port - ${port}`)
})








