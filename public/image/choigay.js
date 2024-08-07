exports.name = '/choigay';
exports.index = async(req, res, next) => {
    try {
      
        const girl = require('./data/json/choigay.json');
        var image = girl[Math.floor(Math.random() * girl.length)].trim();
        res.jsonp({
            url: image,
            count: girl.length,
            author: 'ThanhAli'
        });
    } catch (e) {
        return res.jsonp({ error: e });
    }
}