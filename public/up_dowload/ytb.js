const axios = require('axios');
const qs = require('querystring');

exports.name = '/youtube/download';
exports.index = async (req, res, next) => {
  if (require('../API_KEY/data/check_api_key.js').check_api_key(req, res))
    return;
  let id = req.query.id;
  id = id.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  id = id[2] !== undefined ? id[2].split(/[^0-9a-z_\-]/i)[0] : id[0];
  if (!id)
    return res.json({ error: 'Thiếu dữ liệu để khởi chạy chương trình' });
  try {
    const formats = await getFormatsUrl(id);
    return res.json(formats);
  }
  catch (error) {
    console.log(error);
    return res.json({ error: error.message });
  }
};


async function getFormatsUrl(id) {
  const url = `https://www.youtube.com/watch?v=${id}`;
  const response = await axios.post("https://9convert.com/api/ajaxSearch/index", qs.stringify({
    query: url,
    vt: "home"
  }));

  const videoId = response.data.vid;
  const { data } = response;
  for (const key in data.links) {
    for (const key2 in data.links[key]) {
      data.links[key][key2] = {
        ...data.links[key][key2],
        dataConvert: convert(videoId, data.links[key][key2].k)
      };
    }
  }

  for (const key in data.links) {
    for (const key2 in data.links[key]) {
      data.links[key][key2] = { ...data.links[key][key2], ...(await data.links[key][key2].dataConvert) };
      delete data.links[key][key2].dataConvert;
    }
  }

  // format data to array
  const linksFormat = [];
  for (const key in data.links) {
    const qualitys = [];
    for (const key2 in data.links[key]) {
      const format = data.links[key][key2];

      let size;
      if (format.size.includes("KB"))
        size = parseInt(format.size.replace("KB", "")) * 1024;
      if (format.size.includes("MB"))
        size = parseInt((format.size.match(/\d+/) || ['0'])[0]) * 1024 * 1024;
      if (format.size.includes("GB"))
        size = parseInt((format.size.match(/\d+/) || ['0'])[0]) * 1024 * 1024 * 1024;

      qualitys.push({
        size,
        dlink: format.dlink,
        f: format.f,
        q: format.d,
        ftype: format.ftype
      });
    }

    qualitys.sort((a, b) => a.size + b.size);

    linksFormat.push({
      type: key,
      qualitys
    });
  }

  data.links = linksFormat.sort((a, b) => b.size - a.size);
  return data;
}

function convert(videoId, k) {
  return new Promise((resolve, reject) => {
    axios.post("https://9convert.com/api/ajaxConvert/convert", qs.stringify({
      vid: videoId,
      k
    }))
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
}