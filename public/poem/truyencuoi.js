exports.name = '/poem/truyencuoi';
exports.index = async(req, res, next) => {
    try {
      if (require('../API_KEY/data/check_api_key.js').check_api_key(req, res)) return;
        const truyencuoi = require('./data/truyencuoi.json');
        var image = truyencuoi[Math.floor(Math.random() * truyencuoi.length)].trim();
        res.jsonp({
            data: image,
            count: truyencuoi.length,
            author: 'ThanhAli'
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}