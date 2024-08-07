exports.name = '/cfsdata';
exports.index = async (req, res, next) => {
  if (require('../API_KEY/data/check_api_key.js').check_api_key(req, res)) return;
const request = require('request');
let path = __dirname + `/cfs.json`;
return res.sendFile(path)
}