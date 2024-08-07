'use strict';
const express = require("express");
const cors = require("cors");
const fs = require("fs-extra");
const helmet = require("helmet");
const server = require("./server.js");
const app = express();
const moment = require("moment-timezone");
const config = require("./ADMIN/config.json");
const rateLimit = require("express-rate-limit");
const getIP = require('ipware')().get_ip;
const checkIPBlocked = require('./blockIp.js');
global.config = config;
const blockedIPs = JSON.parse(fs.readFileSync('./blockedIP.json', {
  encoding: 'utf-8'
}));
const handleBlockIP = rateLimit({
  windowMs: 60 * 1000,
  max: 50,
  handler: function (req, res, next) {
    const ipInfo = getIP(req);
    const ip = ipInfo.clientIp;
    if (!blockedIPs.includes(ip)) {
      blockedIPs.push(ip);
      fs.writeFileSync('./blockedIP.json', JSON.stringify(blockedIPs, null, 2));
      console.log(`[ RATE LIMIT ] → Đã chặn truy cập với IP: ${ip}`);
    }
    next();
  },
  skip: (req, res) => {
    const ipInfo = getIP(req);
    const ip = ipInfo.clientIp;
    const allowIPs = JSON.parse(fs.readFileSync('./allowIP.json', {
      encoding: 'utf-8'
    }));
    if (allowIPs.includes(ip))
      return true;
    return false;
  }
});
app.use(handleBlockIP);

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 50,
  // limit each IP to max requests per windowMs
  message: {
    error: "Bạn đã đặt giới hạn lượt yêu cầu 50 lượt yêu cầu mỗi phút"
  }
});

/*const allowIPs = JSON.parse(fs.readFileSync('./allowIP.json', { encoding: 'utf-8' }));
app.use(function (req, res, next) {
    const timeNowz = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
    const ipInfoz = getIP(req);
    const ipz = ipInfoz.clientIp;
    if (!allowIPs.includes(ipz)) {
        const randomColor = ["\x1b[33m", "\x1b[34m", "\x1b[35m", '\x1b[36m', '\x1b[32m'];
        console.log(`${randomColor[Math.floor(Math.random() * randomColor.length)]}[ DENYIP ] → ${ipz} - Đã chặn quyền truy cập đến: ${decodeURIComponent(req.url)} - [ TIME ] → ${timeNowz}\n============================================\x1b[37m`);
        res.status(401);
        return res.send({
            status: 'error',
            message: `Hiện tại IP ${ipz} của bạn không có quyền truy cập API...Vui lòng liên hệ ADMIN để được cấp quyền`
        });
    }
    next();
});*/


app.use(checkIPBlocked);
app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
  const timeNow = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
  const ipInfo = getIP(req);
  const type = global.config.ADMIN.includes(ipInfo.clientIp) ? '[ ADMIN ] →': '[ Người dùng ] →';
  const color = ["\x1b[33m",
    "\x1b[34m",
    "\x1b[35m",
    '\x1b[36m',
    '\x1b[32m'];
  const more = color[Math.floor(Math.random() * color.length)];
  console.log(more + `${type} ${ipInfo.clientIp} - Đã yêu cầu truy cập đến: ${decodeURIComponent(req.url)} - [ TIME ] → ${timeNow}`);
  console.log('\x1b[37m============================================\x1b[37m');
  next();
});
app.post('/');
app.use("/", server);
app.set("json spaces", 4);
app.use((error, req, res, next) => {
  //console.log(error)
  res.status(error.status || 400).json({
    message: error.message
  });
});
///////////////////////////////////////////////////////////
//========= Create website for dashboard/uptime =========//
///////////////////////////////////////////////////////////
app.set('port', (process.env.PORT || 5000));
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');

}).listen(app.get('port'), function () {
  console.log('\x1b[36m[ PORT ] → \x1b[37m Máy chủ đang chạy trên PORT', app.get('port'), '\n\x1b[36m[ START ] → \x1b[37m Tiến hành nhận yêu cầu\n============================================');
});
// Router bank
async function bank() {
  const {
    writeFileSync
  } = require('fs-extra');
  const {
    join
  } = require('path');
  const pathData = join(__dirname,
    "public",
    "bank",
    "data",
    "bank.json");
  const user = require('./public/bank/data/bank.json');
  if (user[0] == undefined) return;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    for (const id of user) {
      const userData = user.find(i => i.senderID == id.senderID);
      const money = userData.data.money;
      userData.data.money = parseInt(money) + parseInt(money) * 0.005;
      writeFileSync(pathData, JSON.stringify(user, null, 2));
    }
    console.log("\x1b[36m[ BANKING ] →\x1b[37m API Ngân hàng đang xử lí...");
    await new Promise(resolve => setTimeout(resolve, 60 * 60 * 1000));
  }
}
bank();