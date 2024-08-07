const getIP = require('ipware')().get_ip;
const fs = require("fs-extra");
module.exports = function (req, res, next) {
  const listIPBlocked = JSON.parse(fs.readFileSync('./blockedIP.json', { encoding: 'utf-8' }));
  const allowIPs = JSON.parse(fs.readFileSync('./allowIP.json', { encoding: 'utf-8' }));
  if (listIPBlocked.includes(getIP(req).clientIp) && !allowIPs.includes(getIP(req).clientIp)) {
    res.status(403).send({
      status: 'error',
      message: 'You are not allowed to access this API'
    });
  } 
  else {
    next();
  }
}