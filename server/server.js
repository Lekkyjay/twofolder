const express = require('express')
const mongoose = require('mongoose')
const path = require("path")
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors());
app.use(express.static('./client/build'))

// model
const Schema = mongoose.Schema
const Exercise = mongoose.model('Exercise', new Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, required: true },
  }, 
  {
  timestamps: true,
  }
))

mongoose.connect(process.env.ATLAS_URL)
  .then(() => console.log("DB connected"))
  .catch(err => console.error(err))

app.get('/exercises', (req, res) => {
  Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
})

app.get('*', (req, res) => {
  res.json({msg: 'Hello world!'})
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})