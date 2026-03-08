require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Client = require("./models/Client");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

/* ======================
   MONGODB CONNECTION
====================== */
console.log("Mongo URI:", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("✅ MongoDB Connected");
})
.catch((err) => {
  console.log("❌ MongoDB Error:", err);
});

/* ======================
   TEMP CLIENT STORAGE
====================== */

let clients = [];

/* ======================
   ROUTES
====================== */

// GET clients
app.get("/api/clients", async (req, res) => {
  const clients = await Client.find();
  res.json(clients);
});

// ADD client
app.post("/api/clients", async (req, res) => {

  const newClient = new Client(req.body);

  await newClient.save();

  const clients = await Client.find();

  res.json({
    message: "Client added",
    clients
  });

});

// DELETE client
app.delete("/api/clients/:id", async (req, res) => {

  await Client.findByIdAndDelete(req.params.id);

  const clients = await Client.find();

  res.json({
    message: "Client deleted",
    clients
  });

});

/* ======================
   START SERVER
====================== */

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});