const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

app.use( express.json() )

app.use((req, res, next) => {
  res.setHeader( 'Access-Control-Allow-Origin', '*' )
  res.setHeader( 'Access-Control-Allow-Methods', 'GET','POST','PATCH','DELETE' )
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type', 'Authorization')
  
  next()
} )
app.use(userRouter, taskRouter)

 

module.exports = app