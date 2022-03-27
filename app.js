// IMPORT MODULE
require('dotenv').config({ path: './config/.env' })
const express = require('express')
const path = require('path')
var compression = require('compression')
const cors = require("cors");

// IMPORT FILE
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')

// ASSIGN CONST
const app = express()
const PORT = process.env.NODE_DOCKER_PORT || 8080

// GLOBAL VARIABLE
app.locals.pml = {
  judul: 'Puri Mas Lele',
  versi: '0.2.4',
  icon: {
    '96': '/icons/icon-96x96.png',
    '192': '/icons/icon-192x192.png'
  }
}

// EXPRESS MIDDLEWARE
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

// EXPRESS STATIC FILE
app.use(cors());
app.use(compression())
app.use(express.json())
app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/bulma', express.static(__dirname + '/node_modules/bulma/css/'));
app.use('/icons', express.static(__dirname + '/node_modules/material-icons/iconfont'));

// EXPRESS ROUTES
app.get('/', (req, res) => res.render('home/index'))
app.use('/auth', authRoutes)

// 404 Route
app.get('*', (req, res) => {
  res.sendStatus(404)
})

// const db = require("./models");
// db.mongoose
//   .connect(db.url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => {
//     console.log("Connected to the database!");
//   })
//   .catch(err => {
//     console.log("Cannot connect to the database!", err);
//     process.exit();
//   });

// TRY CONNECT TO DB AND THEN START SERVER
try {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port : ${PORT}`)
    })
  })
} catch (error) {
  console.error(error)
  process.exit(1)
}

// EXPRESS SERVER
// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))