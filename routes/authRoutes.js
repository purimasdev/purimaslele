const router = require('express').Router()
const setting = require('../config/setting')
const { registerValidation, loginValidation } = require('../validator/authValidator')

router.get('/', (req, res) => {
  res.render('auth/index', {
    setting
  })
})

router.post('/register', (req, res) => {
  // Validate req.body
  const { error } = registerValidation(req.body)
  if (error) return res.status(400).json({ status: 'error', message: error.details[0].message })

  console.log(req.body)
  res.status(200).json({ status: 'ok', message: 'Data Accepted', data: { ...req.body } })
})

router.post('/login', (req, res) => {
  // Validate req.body
  const { error } = loginValidation(req.body)
  if (error) return res.status(400).json({ status: 'error', message: error.details[0].message })

  console.log(req.body)
  res.status(200).json({ status: 'ok', message: 'Data Accepted', data: { ...req.body } })
})

module.exports = router