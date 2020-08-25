const express = require('express')
const boom = require('boom')
const userRouter = require('./user')
const { CODE_ERROR } = require('../utils/constant')

// 注册路由
const router = express.Router()
router.get('/', (req, res) => {
  res.send('ebook backfront system')
})
router.use('/user', userRouter)

/**
 * 集中处理404请求的中间件
 * 注意：该中间件必须放再正常处理流程之后
 * 否则，会拦截正常请求
 */
router.use((req, res, next) => {
  next(boom.notFound('接口不存在')) // next方法是吧next方法中的参数继续向下个中间件传递
})

/**
 *
 */
router.use((err, req, res, next) => {
  const msg = (err && err.message) || '系统错误'
  const statusCode = (err.output && err.output.statusCode) || 500
  const errorMsg =
    (err.output && err.output.playload && err.output.playload.error) ||
    err.message
  res.status(statusCode).json({
    code: CODE_ERROR,
    msg,
    error: statusCode,
    errorMsg,
  })
})
module.exports = router
