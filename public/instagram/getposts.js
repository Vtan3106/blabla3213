const axios = require("axios");
const { HttpsProxyAgent } = require('https-proxy-agent');
const https = require('https');

exports.name = '/instagram/getposts';
exports.index = async (req, res, next) => {
	// if (require('../API_KEY/data/check_api_key.js').check_api_key(req, res)) return;
	const { username } = req.query;
	if (!username)
		return res.json({ error: "Missing username" });
	getInfo(username)
		.then(data => res.json(data))
		.catch(e => res.json({ error: "Server error", message: "Something went wrong, please try again later" }));
};

const proxyAgent = new HttpsProxyAgent(
	// 14.225.239.250	8888
	// 'http://xizvziax-rotate:nej8ufi4pz29@p.webshare.io:80',
	'http://103.153.254.198:3080'
);

async function getInfo(userName) {
	try {
		const BASE_URL = `https://i.instagram.com/api/v1/users/web_profile_info/?username=${userName}`;
		const { data } = await axios({
			url: BASE_URL,
			headers: {
				// "user-agent": "5.0+(iPhone%3B+CPU+iPhone+OS+14_8+like+Mac+OS+X)+AppleWebKit%2F605.1.15+(KHTML,+like+Gecko)+Version%2F14.1.2+Mobile%2F15E148+Safari%2F604.1",
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.55",
				"accept": "*/*",
				"accept-language": "vi,en-US;q=0.9,en;q=0.8",
				"sec-ch-ua": "\"Chromium\";v=\"106\", \"Microsoft Edge\";v=\"106\", \"Not;A=Brand\";v=\"99\"",
				"sec-ch-ua-mobile": "?0",
				"sec-ch-ua-platform": "\"Windows\"",
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "same-site",
				"x-asbd-id": "198387",
				"x-csrftoken": "94HUiQIoRE8XEAkiGN3oEHSVLEDpzlnM",
				"x-ig-app-id": "936619743392459",
				"x-ig-www-claim": "hmac.AR3OQ0qbMQFGvopKt6bvf27cwSi_srYglMRalVX8pFRJNKXt",
				"x-requested-with": "XMLHttpRequest",
				"cookie": "ig_nrcb=1; csrftoken=94HUiQIoRE8XEAkiGN3oEHSVLEDpzlnM; mid=Y8jaNwALAAFAtVwK0OuIkT_IkUvJ; ig_did=AFDB5466-11F2-4B70-8806-94F872304DA0; datr=7trIY6-UmELSkqqrYsxkK5Pg",
				"Referer": "https://www.instagram.com/",
				"Referrer-Policy": "strict-origin-when-cross-origin",
			},
			httpsAgent: https.Agent({ keepAlive: true }),
			"method": "GET"
		});
		const user = data.data.user;
		return {
			edge_owner_to_timeline_media: user.edge_owner_to_timeline_media,
			edge_felix_video_timeline: user.edge_felix_video_timeline
		};
	}
	catch (e) {
		console.log(e);
		throw e.response.data;
	}
}