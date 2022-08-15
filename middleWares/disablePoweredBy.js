function disablePoweredBy(request, response, next) {
  response.removeHeader("X-Powered-By"); // remove header from express for security

  next();
};

module.exports = { disablePoweredBy };
