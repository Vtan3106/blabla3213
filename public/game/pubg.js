exports.name = '/game/dovuipubg';
exports.index = async(req, res, next) => {
  if (require('../API_KEY/data/check_api_key.js').check_api_key(req, res)) return;
const resp = require("./data/pubg.json");
const length = resp.length
return res.json({ 
  author: 'Văn Tân',
	data: resp[Math.floor(Math.random() * length)]
 })
}