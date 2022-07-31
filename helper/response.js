const {
  apiStatus: { success, failed },
} = require("../config/constant");

function Response(body) {
  this.status = body.status;
  this.res = body.result ? body.result : null;
  this.err = body.error ? body.error.message : null;
  this.version = "1.0";
}


function serviceResponse(func, req, res, resLog = false, resErr = false) {
  func
    .then((result) => {
      if (resLog)
        console.log('Res Result:', JSON.stringify(result, undefined, 2));
      res.send(new Response({ result, status: success }));
    })
    .catch((error) => {
      if (resErr)
        console.log('Res Error:', error)
      res.send(new Response({ error, status: failed }));
    });
};

module.exports = {
  Response,
  serviceResponse
}