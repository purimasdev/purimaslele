const router = require('express').Router()
const setting = require('../config/setting')

router.get('/', (req, res) => {
  res.render('auth/index', {
    setting
  })
})

router.post('/login', (req, res) => {
  console.log(req.body)
  if (!req.body) return res.status(400).json({ status: 'error', message: 'Data NOT Accepted' })
  res.status(200).json({ status: 'ok', message: 'Data Accepted', data: { ...req.body } })
})

router.post('/register', (req, res) => {
  console.log(req.body)
  if (!req.body) return res.status(400).json({ status: 'error', message: 'Data NOT Accepted' })
  res.status(200).json({ status: 'ok', message: 'Data Accepted', data: { ...req.body } })
})

module.exports = router