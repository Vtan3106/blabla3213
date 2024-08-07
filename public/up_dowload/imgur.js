const fs = require("fs");
const request = require('request');

exports.name = '/imgurupload';
exports.index = async (req, res, next) => {
  if (require('../API_KEY/data/check_api_key.js').check_api_key(req, res)) return;
  const link = req.query.link;
  if (!link) return res.json({ error: 'Thiếu dữ liệu để khởi chạy chương trình ' });
  const { path, type } = await dl(link);
  const options = {
    'method': 'POST',
    'url': 'https://api.imgur.com/3/upload',
    'headers': {
      'Authorization': 'Client-ID fc9369e9aea767c'
    }
  };

  options.formData = type == "video" ? { 'video': fs.createReadStream(path) } : { 'image': fs.createReadStream(path) };
  request(options, function (error, response) {
    if (error) return res.json({ error: 'Đã xảy ra lỗi với link của bạn' });
    const data = response.body;
  //  console.log(data);
    const upload = JSON.parse(data);
    fs.unlinkSync(path);
    res.json({
      uploaded: {
        status: 'success',
        image: upload.data?.link || ''
      }
    });
  });
};

async function dl(url) {
  return new Promise((rs, rj) => {
    let path;
    request(url).on('response', function (response) {
      const ext = response.headers['content-type'].split('/')[1];

      path = __dirname + `/cache/${Date.now()}.${ext}`;
      response
        .pipe(fs.createWriteStream(path))
        .on('finish', () => {
          rs({ path, type: response.headers['content-type'].split('/')[0] });
        });
    });
  });
}