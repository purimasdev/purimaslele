// IMPORT MODULE
const express = require('express')
const path = require('path')
var compression = require('compression')

// ASSIGN CONST
const app = express()
const port = 3000

// GLOBAL VARIABLE
app.locals.pml = {
  judul: 'Puri Mas Lele',
  versi: '0.2.2',
  icon: {
    '96': '/icons/icon-96x96.png',
  }
}

// EXPRESS MIDDLEWARE
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

// EXPRESS STATIC FILE
app.use(compression())
app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/bulma', express.static(__dirname + '/node_modules/bulma/css/'));
app.use('/icons', express.static(__dirname + '/node_modules/material-icons/iconfont'));

// EXPRESS ROUTES
app.get('/', (req, res) => res.render('home/index'))

// 404 Route
app.get('*', (req, res) => {
  res.sendStatus(404)
})

// EXPRESS SERVER
app.listen(port, () => console.log(`Server run on port : ${port}`))