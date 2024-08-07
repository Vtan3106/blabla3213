exports.name = '/react';
exports.index = async (req, res, next) => {
  if (require('../API_KEY/data/check_api_key.js').check_api_key(req, res)) return;
const request = require('request');
const user = require('./cfs.json');
var index = req.query.index;
const { readFileSync, writeFileSync, existsSync, createReadStream } = require("fs-extra")
const pathA = require("path");
const path = pathA.join(__dirname, `cfs.json`);
user[parseInt(index)].react = user[parseInt(index)].react + 1
writeFileSync(path, JSON.stringify(user, null, 2));
return res.json({ data: true })
}