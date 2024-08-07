const axios = require("axios");
// const fs = require("fs-extra");
// const request = require("request-promise").defaults({ jar: true });
// const jar = request.jar();

const userAgents =
	[
		"Mozilla/5.0 (Linux; Android 12; F-51B Build/V47RD64B; wv) AppleWebKit/537.36 (KHTML, like Gecko) Ve	Android rsion/4.0 Chrome/108.0.5359.128 Mobile Safari/537.36 Instagram 265.0.0.19.301 Android (31/12; 360dpi; 720x1366; FCNT; F-51B; F51B; qcom; ja_JP; 436384443)",
		"Mozilla/5.0 (Linux; Android 13; Pixel 6a) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.128 Mobile Safari/537.36 Instagram 265.0.0.19.301 Android (31/13; 320dpi; 720x1366; FCNT; F-51B; F51B; qcom; ja_JP; 436384443)",
		"Mozilla/5.0 (Linux; Android 13; Pixel 6a) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.128 Mobile Safari/537.36 Instagram 265.0.0.19.301 Android (31/12; 320dpi; 720x1366; FCNT; F-51B; F51B; qcom; ja_JP; 436384443)",
		"Instagram 264.0.0.22.106 Android (28/9; 160dpi; 800x1232; JOYAR/onn; TBBVNC100005208; TBBVNC100005208; mt8163; en_US; 430370697)	Android	ONN TBBVNC100005208",
		"Mozilla/5.0 (Linux; Android 9; KFONWI Build/PS7326.3183N; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/106.0.5249.170 Safari/537.36 Instagram 253.0.0.23.114 Android (28/9; 213dpi; 800x1216; Amazon; KFONWI; onyx; mt8168; de_DE; 399993134)",
		"Mozilla/5.0 (Linux; Android 9; KFONWI Build/PS7326.3183N; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/106.0.5249.170 Safari/537.36 Instagram 253.0.0.23.114 Android (28/9; 213dpi; 800x1216; Amazon; KFONWI; onyx; mt8168; en_GB; 399993134)9	Explay Onyx",
		"Mozilla/5.0 (Linux; Android 12; F-51B Build/V47RD64B; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/108.0.5359.128 Mobile Safari/537.36 Instagram 265.0.0.19.301 Android (31/12; 320dpi; 720x1366; FCNT; F-51B; F51B; qcom; ja_JP; 436384443)12	Fujitsu Arrows We",
		"Instagram 261.0.0.21.111 Android (30/11; 540dpi; 1080x2137; HMD Global/Nokia; Nokia X100; DM5; qcom; es_US; 418951310)	Android	Nokia Nokia X100",
		"Mozilla/5.0 (Linux; Android 9; KFONWI Build/PS7326.3183N; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/106.0.5249.170 Safari/537.36 Instagram 264.0.0.22.106 Android (28/9; 213dpi; 800x1216; Amazon; KFONWI; onyx; mt8168; de_DE; 430370685)9	Explay Onyx",
		"Mozilla/5.0 (Linux; Android 12; FCG01 Build/V40RK64A; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/108.0.5359.128 Mobile Safari/537.36 Instagram 264.0.0.22.106 Android (31/12; 360dpi; 720x1366; FCNT; FCG01; FCG01; qcom; ja_JP; 430370701)12	Fujitsu Arrows We",
		"Mozilla/5.0 (Linux; Android 9; KFONWI Build/PS7326.3183N; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/106.0.5249.170 Safari/537.36 Instagram 224.2.0.20.116 Android (28/9; 213dpi; 800x1216; Amazon; KFONWI; onyx; mt8168; en_US; 354065894)9	Explay Onyx",
		"Instagram 145.0.0.32.119 Android (29/10; 480dpi; 1080x2264; Realme; RMX1851; RMX1851; qcom; en_US; 219308759)	Android	Realme 3 Pro",
		"Mozilla/5.0 (Linux; Android 9; 7DY Build/PPR1.180610.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/108.0.5359.128 Safari/537.36 Instagram 264.0.0.22.106 Android (28/9; 160dpi; 600x976; mediacom; 7DY; 7DY; mt8321; it_IT; 430370684)9	Mediacom 7DY",
		"Mozilla/5.0 (Linux; Android 9; 1CY Build/PPR1.180610.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/108.0.5359.128 Safari/537.36 Instagram 264.0.0.22.106 Android (28/9; 160dpi; 800x1232; mediacom; 1CY; 1CY; mt8321; it_IT; 430370684)9	Mediacom 1CY",
		"Mozilla/5.0 (Linux; Android 12; F-51B Build/V47RD64B; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/108.0.5359.128 Mobile Safari/537.36 Instagram 264.0.0.22.106 Android (31/12; 320dpi; 720x1366; FCNT; F-51B; F51B; qcom; ja_JP; 430370627)12	Fujitsu Arrows We",
		"Mozilla/5.0 (Linux; Android 5.1; B1-723 Build/LMY47I; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/95.0.4638.74 Safari/537.36 Instagram 264.0.0.22.106 Android (22/5.1; 160dpi; 600x976; Acer/acer; B1-723; oban; mt6580; it_IT; 430370684)5	Acer Iconia Talk 7",
		"Mozilla/5.0 (Linux; Android 11; FCG01 Build/V14RK61D; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/108.0.5359.128 Mobile Safari/537.36 Instagram 264.0.0.22.106 Android (30/11; 320dpi; 720x1366; FCNT; FCG01; FCG01; qcom; ja_JP; 430370701)11	Fujitsu Arrows We",
		"Mozilla/5.0 (Linux; Android 9; 7DY Build/PPR1.180610.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/108.0.5359.128 Safari/537.36 Instagram 263.2.0.19.104 Android (28/9; 160dpi; 600x976; mediacom; 7DY; 7DY; mt8321; it_IT; 428413120)9	Mediacom 7DY",
		"Mozilla/5.0 (Linux; Android 12; F-51B Build/V47RD64B; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/108.0.5359.128 Mobile Safari/537.36 Instagram 264.0.0.22.106 Android (31/12; 320dpi; 720x1366; FCNT; F-51B; F51B; qcom; ja_JP; 430370703)12	Fujitsu Arrows We",
		"Mozilla/5.0 (Linux; Android 9; KFONWI Build/PS7326.3183N; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/106.0.5249.170 Safari/537.36 Instagram 253.0.0.23.114 Android (28/9; 213dpi; 800x1216; Amazon; KFONWI; onyx; mt8168; en_CA; 399993134)"
	];

const headers = {
	"user-agent": userAgents[Math.floor(Math.random() * userAgents.length)],
	"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
	"accept-language": "vi,en;q=0.9,en-GB;q=0.8,en-US;q=0.7",
	"cache-control": "max-age=0",
	"sec-ch-prefers-color-scheme": "dark",
	"sec-ch-ua": "\"Not_A Brand\";v=\"99\", \"Microsoft Edge\";v=\"109\", \"Chromium\";v=\"109\"",
	"sec-ch-ua-mobile": "?0",
	"sec-ch-ua-platform": "\"Windows\"",
	"sec-fetch-dest": "document",
	"sec-fetch-mode": "navigate",
	"sec-fetch-site": "none",
	"sec-fetch-user": "?1",
	"upgrade-insecure-requests": "1",
	// "cookie": "csrftoken=MmWyMFr7j6h05DE0ZIhbHVGvmKIBwsn1; mid=Y8jCyAALAAGuxvSb_XxKIqDPDRTA; ig_did=46113657-2712-42E0-AB3A-9FAF79C51B8C; ig_nrcb=1"
};

exports.name = '/instagram/info';
exports.index = async (req, res, next) => {
	// if (require('../API_KEY/data/check_api_key.js').check_api_key(req, res)) return;
	const { username } = req.query;
	if (!username)
		return res.json({ error: "Missing username" });

	getInfo(username)
		.then(data => res.json(data))
		.catch(() => res.json({
			error: "USERNAME NOT EXIST",
			message: "Can't get info of this username"
		}));
};

async function getInfo(userName) {
	try {
		const BASE_URL = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${userName}`;
		const response = await axios.get(BASE_URL, { headers });
		const { data } = response;
		return data;
	}
	catch (e) {
		console.log(e);
		throw {
			error: "INVALID_USERNAME",
			message: "Invalid username"
		};
	}
}
