const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port =  process.env.PORT || 5000
dotenv.config();

// model wire 
app.use(cors());
app.use(express.json());



const user = process.env.DB_USER
const pass = process.env.DB_PASS


console.log(user)
console.log(pass)



app.get('/', (req, res) => {
    res.send('Hello world!');
})

app.listen(port, (req, res) => {
    console.log(`listening on ${port}`);
});


// mongodb 

const uri = `mongodb+srv://${user}:${pass}@cluster0.7vupqqk.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
