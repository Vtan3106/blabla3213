exports.name = '/infofacebook';
exports.index = async (req, res, next) => {
if (require('../API_KEY/data/check_api_key.js').check_api_key(req, res)) return;
  const id = req.query.id;
  const axios = require("axios");
  axios.get(`https://graph.facebook.com/${id}?fields=currency,cover,age_range,name,first_name,email,about,birthday,gender,is_guest_user,is_verified,website,hometown,link,location,quotes,relationship_status,significant_other,username,subscribers.limite(0)&access_token=EAAD6V7os0gcBACAIrgrg8XOQtlyfWCGWJKFynmq3n2DNe8FGAkrVFDfLSboU6p3BMz9ULKtVPCy5ZChC29fHgLXgR6DDwiuydquznib1EQVhgm203fcUqMNBdID9kJH4dmEQhd73QZCRhchOWwMQ3jXe2KgzCKmh4gSQzgInYg4SyEqbliNFN21JdEXtCeY8cejqvvfwZDZD`)
    .then(resp => {
      const dj = {
        uid: resp.data.id,
        birthday: resp.data.birthday,
        gender: resp.data.gender,
        relationship_status: resp.data.relationship_status,
        quotes: resp.data.quotes,
        follower: resp.data.subscribers.summary.total_count,
        significant_other: resp.data.significant_other,
        cover: resp.data.cover,
        username: resp.data.username,
        link: resp.data.link,
        name: resp.data.name,
        tichxanh: resp.data.is_verified,
        work: resp.data.work,
        hometown: resp.data.hometown,
        locale: resp.data.locale,
        location: resp.data.location,
        avtlink: `https://graph.facebook.com/${resp.data.id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`
      };
      res.send(dj);
    })
    .catch(e => {
      console.log(e);
      res.status(500).send({
        error: 'error',
        message: "Đã có lỗi xảy ra"
      })
    });
};