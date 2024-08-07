exports.name = '/lol/list';
const stringSimilarity = require('string-similarity');
exports.index = async(req, res, next) => {
  if (require('../API_KEY/data/check_api_key.js').check_api_key(req, res)) return;
    const champ_names = require('./data/lollist.json');
    const request = require('request');
    res.jsonp({
        count: champ_names.length,
        champ_names,
        author: 'ThanhAli'
    });
}