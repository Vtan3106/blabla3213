const axios = require("axios");
const cheerio = require("cheerio");

exports.name = '/hentai/:type';
exports.index = async (req, resp, next) => {
	if (require('../API_KEY/data/check_api_key.js').check_api_key(req, resp)) return;
	try {
		const { type } = req.params;
		const { query, link, page } = req.query;
		const hentai = new Hentai();
		if (!type) return resp.json({ error: true, message: "Missing type" });
		switch (type) {
			case "home": {
				const data = await hentai.home(page);
				return resp.json({ error: false, data });
			}
			case "search": {
				if (!query) return resp.json({ error: true, message: "Missing query" });
				const data = await hentai.search(query);
				return resp.json({ error: false, data });
			}
			case "details": {
				if (!link || !hentai.vaildURL(link)) return resp.json({ error: true, message: "Missing link" });
				const data = await hentai.details(link);
				return resp.json({ error: false, data });
			}
			case "read": {
				if (!link || !hentai.vaildURL(link)) return resp.json({ error: true, message: "Missing link" });
				const data = await hentai.read(link);
				return resp.json({ error: false, data });
			}
			default: {
				return resp.json({ error: true, message: "Invalid type" });
			}
		}
	} catch (e) {
		console.log(e);
		return resp.json({
			status: 400,
			message: "Bad request"
		});
	}
};


class Hentai {
	constructor() {
		this.url = 'https://mangahentai.me/';
	}
	DOM(url, method = 'get') {
		return new Promise(async (resolve, reject) => {
			axios({
				method,
				url
			}).then(res => {
				const $ = cheerio.load(res.data);
				resolve($);
			}).catch(err => reject(err));
		});
	}
	async home(page) {
		const $ = await this.DOM(this.url + 'page/' + (page || 1));
		const data = [];
		$('.page-listing-item > div > div').each(function (a, b) {
			data.push({
				title: $(b).find('h3 > a').text(),
				thumb: $(b).find('a > img').attr('src'),
				link: $(b).find('h3 > a').attr('href'),
				chapter: $(b).find('.chapter').text().trim().split('\n')[0].trim()
			});
		});
		return data;
	}
	async search(query) {
		const $ = await this.DOM(this.url + '?s=' + query + '&post_type=wp-manga');
		const data = [];
		$('.search-wrap > div:eq(1) > div > div').each(function (a, b) {
			data.push({
				title: $(b).find('h3 > a').text(),
				thumb: $(b).find('a > img').attr('src'),
				link: $(b).find('h3 > a').attr('href')
			});
		});
		data.pop();
		return data;
	}
	async details(link) {
		if (!this.vaildURL(link)) return { error: true, message: "Link không hợp lệ" };
		const $ = await this.DOM(link + 'ajax/chapters/', 'post');
		const data = [];
		$('.wp-manga-chapter').each(function (a, b) {
			data.push({
				title: $(b).find('a').text(),
				link: $(b).find('a').attr('href')
			});
		});
		return data;
	}
	async read(link) {
		if (!this.vaildURL(link)) return { error: true, message: "Link không hợp lệ" };
		// link must match https://mangahentai.me/manga-hentai/sahwa-secret-commission-mgh-0016/chapter-1/ (example, have /chapter-1/ or /chapter-1)
		// if (!link.match(/\/chapter-\d+\/?$/))
			// return { error: true, message: "Link không hợp lệ" };
		const html = await axios.get(link, {
			headers: {
				"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/109.0",
				"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
				"Accept-Language": "vi-VN,vi;q=0.8,en-US;q=0.5,en;q=0.3",
				"Alt-Used": "mangahentai.me",
				"Upgrade-Insecure-Requests": "1",
				"Sec-Fetch-Dest": "document",
				"Sec-Fetch-Mode": "navigate",
				"Sec-Fetch-Site": "none",
				"Sec-Fetch-User": "?1"
			}
		});
		const $ = cheerio.load(html.data);
		const data = [];
		// <img id=image-0 src=" https://mangahentai.me/wp-content/uploads/WP-manga/data/manga_5f5d1bbe29da8/6ca0b18b3fbf5c2cebe87e461f195002/003.jpg" class=wp-manga-chapter-img></div><div class="page-break no-gaps">
		$('.wp-manga-chapter-img').each(function (a, b) {
			data.push($(b).attr('src').trim());
		});
		return data;
	}
	vaildURL(str) {
		const regex = /^(ftp|http|https):\/\/[^ "]+$/;
		return regex.test(str);
	}
}