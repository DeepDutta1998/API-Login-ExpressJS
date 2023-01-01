const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

app.use(
  express.urlencoded({
    extended: true,
  })
)

const apiRouter = require('./routes/logReg.routes')
app.use('/api', apiRouter)

const dbDriver =
  'mongodb+srv://lofi:bLZgeMO7Qs872Qqx@cluster0.rmvujxb.mongodb.net/logRegApi'

const port = process.env.PORT || 1579

mongoose
  .connect(dbDriver, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((res) => {
    app.listen(port, () => {
      console.log('DB is connected')
      console.log(`Server is connected @ http://localhost:${port}`)
    })
  })
  .catch((err) => {
    console.log(err)
  })
