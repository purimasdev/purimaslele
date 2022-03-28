const router = require('express').Router()

router.get('/', (req, res) => {
  res.render('admin/index', {
    navTitle: { a: 'Dashboard', b: '' },
  })
})

module.exports = router