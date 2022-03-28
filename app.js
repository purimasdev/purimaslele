// IMPORT MODULE
require('dotenv').config({ path: './config/.env' })
const express = require('express')
const path = require('path')
const compression = require('compression')
const cors = require("cors");
const cookieParser = require('cookie-parser')

// IMPORT FILE
const connectDB = require('./config/db')
const { ensureAuth, checkUser, isAuth, } = require('./middleware/authGuard')
const authRoutes = require('./routes/authRoutes')
const adminRoutes = require('./routes/adminRoutes')

// ASSIGN CONST
const app = express()
const PORT = process.env.NODE_DOCKER_PORT || 8080

// GLOBAL VARIABLE
app.locals.pml = {
  judul: 'Puri Mas Lele',
  versi: '0.3.0',
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
app.use(cookieParser())
app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/bulma', express.static(__dirname + '/node_modules/bulma/css/'));
app.use('/icons', express.static(__dirname + '/node_modules/material-icons/iconfont'));

// EXPRESS ROUTES
app.get('*', checkUser)
app.get('/', isAuth, (req, res) => res.render('home/index'))
app.use('/auth', authRoutes)
app.use('/admin', [ensureAuth], adminRoutes)

// 404 Route
app.get('*', (req, res) => {
  res.status(400).render('home/4xx',{
    navTitle: { a: '404', b: 'Not Found' },
  })
})

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