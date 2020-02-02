const mongoose = require("mongoose");
const express = require("express");
let app = express();

mongoose.connect(
  "mongodb+srv://maximusII:1711max1988@cluster0-e2ejg.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  function(err) {
    if (err) throw err;

    console.log("Successfully connected to DB");
  }
);

let homePage = require("./src/routes/homePageRoute");
let products = require("./src/routes/productsRoute");
let users = require("./src/routes/usersRoute");
let orders = require("./src/routes/ordersRoute");

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});

app.use("/", homePage);
app.use("/products", products);
app.use("/users", users);
app.use("/orders", orders);
