const axios = require('axios');
const request = require('request');
exports.name = '/capcut/download';
exports.index = async(req, res, next) => {
//if (require('../API_KEY/data/check_api_key.js').check_api_key(req, res)) return;
  const { url } = req.query;
  if (!url) return res.json({ error: 'Thiếu dữ liệu để khởi chạy chương trình' });
  const getUrl = await axios.get("https://ssscap.net/api/download/get-url?url=" + url);
  const get = getUrl.data.url
  const urls = get.split("/")[4].split("?")[0]
//console.log(urls)
  const options = {
            method: 'GET',
            url: 'https://ssscap.net/api/download/' + urls,
            headers: {
                'Connection':'keep-alive',
'If-None-Match':'W/\"b5g46esu4owe\"',
//'Accept-Encoding':'gzip, deflate, br',
'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1',
'Cookie':'device-time=1689832206038; sign=35455ecfd6b5b5e1cc76167c3efb033a; __gads=ID=213a51ccbc3e8cae-2232104a6ee20085:T=1689832121:RT=1689832121:S=ALNI_MaUG-o0pLuBRphxaRt_Q-pvbaFehg; __gpi=UID=00000c227e4bec29:T=1689832121:RT=1689832121:S=ALNI_Majvgt2Z1isgWbx_YqPFXcuzjYtww',
'Referer':'https://ssscap.net/vi',
'Host':'ssscap.net',
'Accept-Language':'vi-VN,vi;q=0.9',
'Accept':'application/json, text/plain, */*',
'Sec-Fetch-Dest':'empty',
'Sec-Fetch-Site':'same-origin',
'Sec-Fetch-Mode':'cors'
            }
        };
        axios.request(options).then(function(response) {
          const getData = response.data
        //console.log(getData)
          const tieude = getData.title
          const mota = getData.description
          const luotxem = getData.usage
          const video = getData.originalVideoUrl
          data = {
              tieude: tieude,
              video: 'https://ssscap.net'+ video,
              mota: mota,
              luotxem: luotxem,
              author: 'NGT - TÁO'
            }
            return res.jsonp({ data });
        }).catch(function(error) {
            return res.jsonp({ error: 'Không tìm thấy dữ liệu video này' });
        });
    }