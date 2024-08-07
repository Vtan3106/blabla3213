const router = require("express").Router();
const { readdirSync, readFileSync } = require('fs-extra');
const path = require('path');
const chalk = require('chalkercli');
try {
  console.log(`\x1b[36m[ VN ] →\x1b[37m API Project được điều hành bởi Văn Tân`), "";
    console.log(`\x1b[36m[ EN ] →\x1b[37m The API Project is run by Van Tan\n`), "";
    const rainbow = chalk.rainbow(`◆━━━━━━━━━━━━◆◆━━━━━━━━━━━━◆◆━━━━━━━━━━━━◆
*                                        *
*                                        *
*                                        *
*        █░█ ▄▀█ █▄░█ ▀█▀ ▄▀█ █▄░█       *
*        ▀▄▀ █▀█ █░▀█ ░█░ █▀█ █░▀█       *
*                                        *
*   → API Project                        *
*   → Phiên bản: 1.2.15                  *
*   → Tên: Trần Văn Tân - 03/01/2006     *
*   → FB: Trần Văn Tân                   *
*   → SĐT/Zalo: 0384190062               *
*   → Email: tranvantan006@gmail.com     *
*   → Github:                            *
*                                        *
◆━━━━━━━━━━━━◆◆━━━━━━━━━━━━◆◆━━━━━━━━━━━━◆\n`).stop();

    rainbow.render();

    const frame = rainbow.frame();
    console.log(frame);
    console.log(`[ API Project đang tiến hành khởi chạy ]`), "";
  console.log(`\x1b[36m[ LOADING ] →\x1b[37m Hệ thống đang kết nối API cho bạn, vui lòng đợi trong giây lát...`), "";
  // ------------------------------------------------------------------------//
  // ------------------------/     Fodel public    /-------------------------//
  // ------------------------------------------------------------------------//
  var i, j;
  const srcPath = path.join(__dirname, "/public/");
  const hosting = readdirSync(srcPath).filter((file) => file.endsWith(".js"));
  for (i of hosting) {
    const { index, name } = require(srcPath + i);
    router.get(name, index);
    //console.log(i);
  }

  // for 'post' folder
  const srcPathPost = path.join(__dirname, "/post/");
  const hostingPost = readdirSync(srcPathPost).filter((file) => file.endsWith(".js"));
  for (j of hostingPost) {
    const { index, name } = require(srcPathPost + j);
    router.post(name, index);
    //console.log('\x1b[36m[ LOADING ] →\x1b[37m Đã tải thành công POST/' + j);
  }


  router.get('/altp_data', function (req, res) {
    const data = JSON.parse(readFileSync('./altp_data.json', "utf-8"));
    res.header("Content-Type", 'application/json');
    res.send(JSON.stringify(data, null, 4));
  });
  // ------------------------------------------------------------------------//
  // ----------------------------/     Fodel    /----------------------------//
  // ------------------------------------------------------------------------//
  const getDirs = readdirSync(srcPath).filter((file) => !file.endsWith(".js") && !file.endsWith(".json"));
  for (const dir of getDirs) {
    const fileName = readdirSync(path.join(__dirname, '/public/' + dir + '/')).filter((file) => file.endsWith(".js"));
    for (j of fileName) {
      const { index, name } = require(path.join(__dirname, '/public/' + dir + '/') + j);
      router.get(name, index);
      //console.log('\x1b[36m[ LOADING ] →\x1b[37m Đã tải thành công ' + j);
    }
  }

  // for 'post' folder
  const getDirsPost = readdirSync(srcPathPost).filter((file) => !file.endsWith(".js") && !file.endsWith(".json"));
  for (const dir of getDirsPost) {
    const fileName = readdirSync(path.join(__dirname, '/post/' + dir + '/')).filter((file) => file.endsWith(".js"));
    for (j of fileName) {
      const { index, name } = require(path.join(__dirname, '/post/' + dir + '/') + j);
      router.post(name, index);
      //console.log('\x1b[36m[ LOADING ] →\x1b[37m Đã tải thành công POST/' + j);
    }
  }

} catch (e) { console.log(e); }
console.log('\x1b[36m[ LOADING ] →\x1b[37m Đã kết nối thành công tất cả API, bạn có thể sử dụng ngay bây giờ');
// -------------------------->      END     <------------------------------//
module.exports = router;