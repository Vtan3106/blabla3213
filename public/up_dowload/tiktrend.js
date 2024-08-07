exports.name = '/tiktok/trendingtiktok';
exports.index = async(req, res, next) => {
  if (require('../API_KEY/data/check_api_key.js').check_api_key(req, res)) return;
var axios = require('axios');
axios({
    method: 'post',
    url: 'https://www.tikwm.com/api/feed/list?region=VN',
    data: {
	}
})
.then(function (response) {
    var data = response.data
  //  console.log(data)
    return res.json(data)
})
.catch(function (error) {
    return res.json({ error });
});
}