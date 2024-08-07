exports.name = '/thinh';
exports.index = async(req, res, next) => {
    try {
        const love = require('./data/love.json');
        var image = love[Math.floor(Math.random() * love.length)].trim();
        res.jsonp({
            data: image,
            url: image,
            count: love.length,
            author: 'Văn Tân'
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}