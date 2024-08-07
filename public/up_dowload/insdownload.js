exports.name = '/instagram/downloadpost';
exports.index = async(req, res, next) => {
  if (require('../API_KEY/data/check_api_key.js').check_api_key(req, res)) return;
const url = req.query.url;
if (!url) return res.json({ error: 'Thiếu dữ liệu để khởi chạy chương trình' });
const axios = require("axios");
 const keyAPi = ['101587f644msh4ba47926ae948d0p1904ebjsn99fe61af7b05','fad1b748b9msh912d48e05dc8e8cp1ed658jsn399259eeadba','8f829e219bmsh2ce57b7367a2e33p1a7eefjsn7bb0adfd20cd','b4c2fb7fe8msh0c0e0d1050aee01p1eaa76jsndb486bd8d717','fad1b748b9msh912d48e05dc8e8cp1ed658jsn399259eeadba','7179578ac3mshd718fdb944dc8fep103d64jsn31c8041e2832','9b65366594msh1483ecd6f1fcc9dp1bd74cjsn90c16b3a8ab4','38afc6a734mshe4d100110e60b89p1380f2jsn2780bb4d614c','7dc0411695mshd9c3aff9db212adp12b0e4jsnc4a4cc13c55a']
    var keyRandom = keyAPi[Math.floor(Math.random() * keyAPi.length)];
  
  //

const options = {
  method: 'GET',
  url: 'https://instagram-looter2.p.rapidapi.com/post',
  params: {link: url},
  headers: {
    'X-RapidAPI-Key': keyRandom,
    'X-RapidAPI-Host': 'instagram-looter2.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	//console.log(response.data);
  return res.json(response.data)
}).catch(function (error) {
	console.error(error);
});
}