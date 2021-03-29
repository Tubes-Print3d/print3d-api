const express = require('express');
const routerV1 = require('./v1');
const errorHandler = require("../middleware/error-handler");
const errorMessage = require("../middleware/error-message");
const accessControls = require("../middleware/access-controls");
const cors = require('cors');
const passport = require('passport');

const mainRouter = express.Router();

mainRouter.use(express.json()); // to support JSON-encoded bodies
mainRouter.use(express.urlencoded({ extended: true }));
mainRouter.use(accessControls);
mainRouter.use(cors());
mainRouter.use(passport.initialize())

mainRouter.get('/', (req, res) => {
  res.json({ msg: 'Welcome!' });
  res.end();
})
mainRouter.use('/api/v1', routerV1);

mainRouter.use(errorHandler);
mainRouter.use(errorMessage);


module.exports = mainRouter;