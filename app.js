// IMPORT MODULE
const express = require('express')
const path = require('path')
var compression = require('compression')

// IMPORT FILE
const authRoutes = require('./routes/authRoutes')

// ASSIGN CONST
const app = express()
const port = 3000

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

// EXPRESS SERVER
app.listen(port, () => console.log(`Server run on port : ${port}`))