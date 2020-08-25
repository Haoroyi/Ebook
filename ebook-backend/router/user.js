const express = require('express')

const router = express.Router()

router.get('./info', (require, res, next) => {
  res.json('user info...')
})

module.exports = router