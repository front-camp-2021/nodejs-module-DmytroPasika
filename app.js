const express = require('express');
const fs = require('fs');
const app = express();
const port = 5000;

const randomText = () => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (var i = 0; i <= charactersLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result.split(/\d+/).join(' ');
}

app.get("/", (req, res) => {
  res.send('<h1>Greeting from server!</h1>');
})

app.get("/data", (req, res) => {
  res.send('<p>Welcome to data path</p>');
})

app.listen(port, () => {
  console.log(`Server is listening at port - ${port}`)
})

fs.writeFile("./text/file.txt", '', (err) => {
  if (err) throw err;
  for (let i = 1; i <= 10; i++) {
    fs.appendFileSync("./text/file.txt", `${i === 1 ? i : '\n' + i}`, (err) => {
      if (err) throw err;
    })
  }
})

fs.writeFile("./text/random_text.txt", randomText(), (err) => {
  if (err) throw err;

  fs.readFile("./text/random_text.txt", "utf-8", (err, data) => {
    if (err) throw err;

    console.log('random text --> ', data)

    fs.unlink("./text/random_text.txt", (err) => {
      if (err) console.log(err);
    });
  })
})







