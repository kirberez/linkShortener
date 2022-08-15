// Без next всё остановится и не пойдёт дальше
function urlLogger(request, response, next) {
  console.log(request.originalUrl);

  next();
}

module.exports = { urlLogger };