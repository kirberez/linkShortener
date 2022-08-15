const linksService = require("../services/links");

async function addAlias(request, response, next) {
  try {
    const { alias, link } = request.body; // from client with axios/fetch/etc

    await linksService.addAlias(alias, link);
    
    return response.send({ status: 'success' });
  } catch(err) {
    next(err);
  }
}

module.exports = { addAlias };
