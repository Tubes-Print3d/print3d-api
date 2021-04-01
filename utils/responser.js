const sendResponse = (res, status, options = {}) => {
  res.status(status).send({ status, ...options });
};

const responser = (res, payload, status = 200, options = {}) => {
  sendResponse(res, status, { payload, ...options });
};

module.exports = { sendResponse, responser };
