const fs = require('fs');
const path = require('path');
exports.name = '/apikey';
exports.index = async(req, res, next) => {
    const path_D = path.join(__dirname, 'data', 'data_apikey.json');
    if (!fs.existsSync(path_D)) {
        fs.writeFileSync(path_D, '[]', 'utf-8');
    }
    const data_apikey = require('./data/data_apikey.json');
    if (data_apikey.find(i => i.username == req.query.username)) {
        return res.json({
            error: 'Bạn đã có APIKEY trên hệ thống'
        });
    }
    if (req.query.keytype == 'register') {
        let username = req.query.username;
        if (!username) return res.json({
            error: 'Thiếu dữ liệu để thực hiện yêu cầu cho bạn'
        });
        else {
            if (req.query.apikey == 'TVT06') {
                var keytype = 'premium';
                var apikey = 'TVT06';
                var request = 'infinite';
            } else {
                var keytype = 'free';
                var request = 500;
                var apikey = 'TVT06';
            }
            const data = require('./data/data_apikey.json');
            var random = '1234567890';
            var number = 10;
            for (var i = 0; i < number; i++) {
                apikey += random.charAt(Math.floor(Math.random() * random.length));
            }
            data.push({ apikey, username, request, keytype });
            fs.writeFileSync(path_D, JSON.stringify(data, null, 2), 'utf-8');
            res.json({
                success: 200,
                apikey,
                keytype,
                message: 'Tạo APIKEY thành công'
            })
        }
    } else if (req.query.type == 'checker') {
        var apikey = req.query.apikey;
        const data = require('./data/data_apikey.json');
        if (!data.find(i => i.apikey == apikey)) {
            return res.json({
                error: 'APIKEY không tồn tại'
            })
        } else {
            var APIKEY = data.find(i => i.apikey == apikey);
            return res.json(APIKEY)
        }
    } else {
        return res.json({
            error: 'Không tìm thấy lệnh mà bạn yêu cầu'
        })
    }
}