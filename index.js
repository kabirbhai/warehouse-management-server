const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// MIDDLEWARE
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zj0qa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const sportCollections = client.db("Sports").collection("item");

    //LOAD ALL ITEM
    app.get("/items", async (req, res) => {
      const query = {};
      const cursor = sportCollections.find(query);
      const items = await cursor.toArray();
      res.send(items);
    });
  } finally {
  }
}
run().catch(console.dir);

//ROOT API
app.get("/", (req, res) => {
  res.send("server is running");
});

//LISTENING TO PORT
app.listen(port, () => {
  console.log("listening port", port);
});
