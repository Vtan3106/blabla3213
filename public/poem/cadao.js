exports.name = '/cadao';
exports.index = async(req, res, next) => {
    try {
        const cadao = require('./data/cadao.json');
        var image = cadao[Math.floor(Math.random() * cadao.length)].trim();
        res.jsonp({
          url: image,
            data: image,
            count: cadao.length,
            author: 'Văn Tân'
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}