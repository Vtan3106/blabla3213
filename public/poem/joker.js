exports.name = '/poem/joker';
exports.index = async(req, res, next) => {
    try {
        const joker = require('./data/joker.json');
        var image = joker[Math.floor(Math.random() * joker.length)].trim();
        res.jsonp({
          url: image,
            data: image,
            count: girl.length,
            author: 'Văn Tân'
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}