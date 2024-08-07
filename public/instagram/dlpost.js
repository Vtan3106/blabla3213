const axios = require("axios");
const cheerio = require("cheerio");
const request = require("request-promise").defaults({
	jar: true,
	simple: false
});

exports.name = '/instagram/dlpost';
exports.index = async (req, res, next) => {
	if (require('../API_KEY/data/check_api_key.js').check_api_key(req, res))
	return;
	const { url } = req.query;
	if (!url)
		return res.json({ error: "Missing url" });
	if (!url.match(/https:\/\/www.instagram.com\/(reel|p)/))
		return res.json({
			error: "Invalid url",
			message: "Please enter a valid url"
		});

	try {
		const data = await getPost(url);
		return res.json(data);
	}
	catch (e) {
		console.log(e);
		return res.json({
			error: "Server error",
			message: "Something went wrong, please try again later"
		});
	}
};


async function getPost(url) {
	let token, k_exp;
	let tryNum = 0;
	while (tryNum < 4) {
		try {
			const res1 = await axios.get("https://saveinsta.app/en1");
			token = res1.data.match(/k_token="(.*)"<\/script><\/div><footer/)[1];
			k_exp = res1.data.match(/k_exp=\"(.*)\",/)[1].split('"')[0];
			break;
		}
		catch (e) {
			tryNum++;
		}
	}

	if (!token || !k_exp)
		throw new Error("Can't get token");

	return new Promise((resolve, reject) => {
		request({
			uri: "https://v3.saveinsta.app/api/ajaxSearch",
			headers: {
				"accept": "*/*",
				"accept-language": "vi,en;q=0.9,en-GB;q=0.8,en-US;q=0.7",
				"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
				"sec-ch-ua": "\"Not_A Brand\";v=\"99\", \"Microsoft Edge\";v=\"109\", \"Chromium\";v=\"109\"",
				"sec-ch-ua-mobile": "?0",
				"sec-ch-ua-platform": "\"Windows\"",
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "same-site",
				"Referer": "https://saveinsta.app/",
				"Referrer-Policy": "strict-origin-when-cross-origin"
			},
			body: `reCaptchaToken=&reCaptchaType=&k_exp=${k_exp}&k_token=${token}&q=${encodeURIComponent(url)}&t=media`,
			"method": "POST"
		}, function (error, response, body) {
			try {
				const json = JSON.parse(body);
				if (json.status != "ok")
					return reject(json);
				const html = json.data;
				const $ = cheerio.load(html);
				const data = {
					images: [],
					videos: []
				};
				$(".photo-option").each(function () {
					const link = $(this).find("option").last().attr("value");
					data.images.push(link);
				});

				$("a[title='Tải video']").each(function () {
					const link = $(this).attr("href");
					data.videos.push(link);
				});
				resolve(data);
			}
			catch (e) {
				console.log(e);
				return reject({
					error: "Server error",
					message: "Something went wrong, please try again later"
				});
			}

		});
	});
}


