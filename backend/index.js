const connectToMongo = require('./db');

connectToMongo();

const express = require('express');
var cors = require('cors');
const app = express();
const port = 5000;
const path = require('path');
const buildPath = path.join(__dirname, "../build");

// Middleware
app.use(cors())
app.use(express.json());
app.use(express.static(buildPath));

// app.get("/*", function(req, res) {
//   res.sendFile(path.join(__dirname, "../build/index.html"),
//   function (err) {
//     if (err) {
//       res.status(500).send(err);
//     }
//   }
// );
// })
// Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contact'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})