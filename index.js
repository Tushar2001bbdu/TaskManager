const connectToMongo=require('./db')
const express = require('express')

connectToMongo()

const app = express()
const cors = require('cors');

app.use(cors());
const port = 3001
app.use(express.json())
app.use('/api/auth',require("./Routes/auth"))
app.use('/api/notes',require("./Routes/notes"))

app.listen(port, () => {
  console.log(`I NoteBook listening on port ${port}`)
})