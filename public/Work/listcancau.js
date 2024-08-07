exports.name = '/cancau';
exports.index = async(req, res, next) => {
	const data = require('./data/data_work.json');
  if (require('../API_KEY/data/check_api_key.js').check_api_key(req, res)) return;
	const list = []
	for(let i of data) {
		var ID = i.ID
		var name = i.name;
		var data1 = i.data1;
		var des = i.des;
		list.push({
			ID,
			name,
			data1,
			des
		})
	}
	return res.json(list)
}