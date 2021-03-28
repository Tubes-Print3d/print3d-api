const express = require("express");
const router = express.Router();
const resp = require('../../utils/responser');
const userRouter=  require('./user.router')

router.get('/', (req, res) => {
  resp(res, { version: 'v1' }, 200)
  res.end()
})

router.use('/users', userRouter);

module.exports = router;
