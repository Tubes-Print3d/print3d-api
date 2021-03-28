module.exports = (res, payload, status=200, message='') => {
  res.status(status).send({
    status,
    payload,
    message
  })
}