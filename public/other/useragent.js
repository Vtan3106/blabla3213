exports.name = '/random/useragent';
exports.index = async(req, res, next) => {
  if (require('../API_KEY/data/check_api_key.js').check_api_key(req, res)) return;
    const data = require("./data/useragent.json");
    const dataGame = data[Math.floor(Math.random() * data.length)]
    return res.json(dataGame)
}