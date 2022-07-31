const express = require('express');
const router = express.Router();
const { serviceResponse } = require('../../../helper/response')
const controller = require('./controller');
/* GET users listing. */

router.get('/', (req, res, next) => {
  serviceResponse(controller.getUsers(req), req, res,);

});

module.exports = router;
