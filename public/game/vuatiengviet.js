exports.name = '/game/vuatiengviet';
exports.index = async(req, res, next) => {
    try {
        const data = require('./data/datawords.json');
	const rdWords = data[Math.floor(Math.random() * data.length)]
        res.json({
            keyword: rdWords.text,
            author: 'Văn Tân'
        })
    } catch (error) {
      console.log(error)
    }
}