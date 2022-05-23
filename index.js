const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// MIDDLEWARE
app.use(cors());
app.use(express.json());

//MONGODB CONNECTION
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zj0qa.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const stokeCollection = client.db("stoke-product").collection("product");

    // Load all data
    app.get("/product", async (req, res) => {
      const products = await stokeCollection.find({}).toArray();
      res.send(products);
    });

    // load one data
    app.get("/product/:id", async (req, res) => {
      const Id = req.params.id;
      const query = { _id: ObjectId(Id) };
      const product = await stokeCollection.findOne(query);
      res.send(product);
    });

    // update the quantity
  } finally {
  }
}
run().catch(console.dir);

//ROOT API
app.get("/", (req, res) => {
  res.send("server is running on the server");
});

//LISTENING TO PORT
app.listen(port, () => {
  console.log("listening port", port);
});
