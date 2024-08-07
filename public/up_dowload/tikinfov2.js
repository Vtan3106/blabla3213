exports.name = '/tiktok/infov2';
exports.index = async(req, res, next) => {
  if (require('../API_KEY/data/check_api_key.js').check_api_key(req, res)) return;
const axios = require('axios');
const{username,id} = req.query;
  const keyAPi = ['101587f644msh4ba47926ae948d0p1904ebjsn99fe61af7b05','fad1b748b9msh912d48e05dc8e8cp1ed658jsn399259eeadba','8f829e219bmsh2ce57b7367a2e33p1a7eefjsn7bb0adfd20cd','b4c2fb7fe8msh0c0e0d1050aee01p1eaa76jsndb486bd8d717','fad1b748b9msh912d48e05dc8e8cp1ed658jsn399259eeadba','7179578ac3mshd718fdb944dc8fep103d64jsn31c8041e2832','9b65366594msh1483ecd6f1fcc9dp1bd74cjsn90c16b3a8ab4','38afc6a734mshe4d100110e60b89p1380f2jsn2780bb4d614c','7dc0411695mshd9c3aff9db212adp12b0e4jsnc4a4cc13c55a']
    var keyRandom = keyAPi[Math.floor(Math.random() * keyAPi.length)];
const options = {
  method: 'GET',
  url: 'https://tiktok-video-no-watermark2.p.rapidapi.com/user/info',
  params: {unique_id: username, user_id: id},
  headers: {
    'X-RapidAPI-Key': keyRandom,
    'X-RapidAPI-Host': 'tiktok-video-no-watermark2.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
  var data = response.data.data
 // console.log(data)
     return res.json({
      id: data.user.id,
      nickname: data.user.uniqueId,
      username: data.user.nickname,
      avatarLarger: data.user.avatarLarger,
      signature: data.user.signature,
      secUid: data.user.secUid,
      relation: data.user.relation,
      bioLink: data.user.bioLink,
      verified: data.user.verified,
      privateAccount: data.user.privateAccount,
      isUnderAge18: data.user.isUnderAge18,
      videoCount: data.stats.videoCount,
      followingCount: data.stats.followingCount,
      followerCount: data.stats.followerCount,
      heartCount: data.stats.heartCount,
      diggCount: data.stats.diggCount
     })
}).catch(function (error) {
	console.error(error);
});
}