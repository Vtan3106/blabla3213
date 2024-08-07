exports.name = '/game/linkword';
exports.index = async (req, res, next) => {
  if (require('../API_KEY/data/check_api_key.js').check_api_key(req, res)) return;
const data = require('./data/datawords.json');
var word = req.query.word;
if(!word) return res.json({
  error: 'Thiếu dữ liệu'
})
var words = word.split(' ')
if(word.split(' ').length !== 2) return res.json({
  error: 'Vui lòng để nhập 2 từ'
})
var filter = data.filter(i => i.head == words[1])
if(filter.length == 0) return res.json({ 
  data: false,
  author: 'Tpk'
 })
const rdWords = filter[Math.floor(Math.random() * filter.length)]
return res.json({ 
  data: rdWords,
  author: 'Tpk'
 })
}