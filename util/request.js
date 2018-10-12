'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function wxRequest(params, url) {
    var loading = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    // let htp = 'https://api.gaosiedu.com/happyplan' //正式
    var htp = 'http://faq_dev.gaosiedu.com/api';
    return new Promise(function (resolve, reject) {
        if (loading) {
            wx.showLoading({
                title: '加载中',
                mask: true
            });
        }
        _wepy2.default.request({
            url: htp + url,
            method: params.method || 'GET',
            data: params.data || {},
            header: {
                'Content-Type': params.method == 'post' ? 'application/x-www-form-urlencoded' : 'application/json',
                'XX-Token': wx.getStorageSync('token')
            },
            success: function success(res) {
                if (res.statusCode == 200) {
                    // 登录成功
                    if (res.data.code == 1) {
                        resolve(res);
                    } else {
                        wx.showToast({
                            title: res.data.msg,
                            icon: 'none'
                        });
                    }
                } else {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none'
                    });
                    if (res.data.msg == '活动不存在') {
                        wx.switchTab({ url: '/pages/index' });
                    }
                }
                setTimeout(function () {
                    wx.hideLoading();
                }, 500);
            },
            fail: function fail(err) {
                console.log(err);
                wx.showToast({
                    title: '网络或服务器出错',
                    icon: 'none'
                });
                reject(new Error('Network request failed'));
            }
        });
    });
}
exports.default = wxRequest;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlcXVlc3QuanMiXSwibmFtZXMiOlsid3hSZXF1ZXN0IiwicGFyYW1zIiwidXJsIiwibG9hZGluZyIsImh0cCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwid3giLCJzaG93TG9hZGluZyIsInRpdGxlIiwibWFzayIsIndlcHkiLCJyZXF1ZXN0IiwibWV0aG9kIiwiZGF0YSIsImhlYWRlciIsImdldFN0b3JhZ2VTeW5jIiwic3VjY2VzcyIsInJlcyIsInN0YXR1c0NvZGUiLCJjb2RlIiwic2hvd1RvYXN0IiwibXNnIiwiaWNvbiIsInN3aXRjaFRhYiIsInNldFRpbWVvdXQiLCJoaWRlTG9hZGluZyIsImZhaWwiLCJjb25zb2xlIiwibG9nIiwiZXJyIiwiRXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7QUFDQSxTQUFTQSxTQUFULENBQW1CQyxNQUFuQixFQUEwQkMsR0FBMUIsRUFBMkM7QUFBQSxRQUFiQyxPQUFhLHVFQUFMLElBQUs7O0FBQ3ZDO0FBQ0EsUUFBSUMsTUFBTSxpQ0FBVjtBQUNBLFdBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBU0MsTUFBVCxFQUFrQjtBQUNqQyxZQUFHSixPQUFILEVBQVc7QUFDUEssZUFBR0MsV0FBSCxDQUFlO0FBQ1hDLHVCQUFNLEtBREs7QUFFWEMsc0JBQU07QUFGSyxhQUFmO0FBSUg7QUFDREMsdUJBQUtDLE9BQUwsQ0FBYTtBQUNUWCxpQkFBS0UsTUFBTUYsR0FERjtBQUVUWSxvQkFBT2IsT0FBT2EsTUFBUCxJQUFlLEtBRmI7QUFHVEMsa0JBQU1kLE9BQU9jLElBQVAsSUFBYSxFQUhWO0FBSVRDLG9CQUFRO0FBQ0osZ0NBQWdCZixPQUFPYSxNQUFQLElBQWlCLE1BQWpCLEdBQTBCLG1DQUExQixHQUFnRSxrQkFENUU7QUFFSiw0QkFBWU4sR0FBR1MsY0FBSCxDQUFrQixPQUFsQjtBQUZSLGFBSkM7QUFRVEMscUJBQVMsc0JBQUs7QUFDVixvQkFBR0MsSUFBSUMsVUFBSixJQUFrQixHQUFyQixFQUF5QjtBQUNyQjtBQUNBLHdCQUFHRCxJQUFJSixJQUFKLENBQVNNLElBQVQsSUFBaUIsQ0FBcEIsRUFBc0I7QUFDbEJmLGdDQUFRYSxHQUFSO0FBQ0gscUJBRkQsTUFFSztBQUNEWCwyQkFBR2MsU0FBSCxDQUFhO0FBQ1RaLG1DQUFNUyxJQUFJSixJQUFKLENBQVNRLEdBRE47QUFFVEMsa0NBQUs7QUFGSSx5QkFBYjtBQUlIO0FBQ0YsaUJBVkgsTUFVTztBQUNIaEIsdUJBQUdjLFNBQUgsQ0FBYTtBQUNWWiwrQkFBTVMsSUFBSUosSUFBSixDQUFTUSxHQURMO0FBRVZDLDhCQUFLO0FBRksscUJBQWI7QUFJQSx3QkFBR0wsSUFBSUosSUFBSixDQUFTUSxHQUFULElBQWdCLE9BQW5CLEVBQTJCO0FBQ3ZCZiwyQkFBR2lCLFNBQUgsQ0FBYSxFQUFDdkIsS0FBSSxjQUFMLEVBQWI7QUFDSDtBQUNGO0FBQ0R3QiwyQkFBVyxZQUFJO0FBQ2JsQix1QkFBR21CLFdBQUg7QUFDRCxpQkFGRCxFQUVFLEdBRkY7QUFLTCxhQWpDUTtBQWtDVEMsa0JBQU0sbUJBQU07QUFDUkMsd0JBQVFDLEdBQVIsQ0FBWUMsR0FBWjtBQUNBdkIsbUJBQUdjLFNBQUgsQ0FBYTtBQUNUWiwyQkFBTSxVQURHO0FBRVRjLDBCQUFLO0FBRkksaUJBQWI7QUFJQWpCLHVCQUFPLElBQUl5QixLQUFKLENBQVUsd0JBQVYsQ0FBUDtBQUNIO0FBekNRLFNBQWI7QUEyQ0gsS0FsRE0sQ0FBUDtBQW1ESDtrQkFDY2hDLFMiLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbmZ1bmN0aW9uIHd4UmVxdWVzdChwYXJhbXMsdXJsLGxvYWRpbmc9dHJ1ZSl7XHJcbiAgICAvLyBsZXQgaHRwID0gJ2h0dHBzOi8vYXBpLmdhb3NpZWR1LmNvbS9oYXBweXBsYW4nIC8v5q2j5byPXHJcbiAgICBsZXQgaHRwID0gJ2h0dHA6Ly9mYXFfZGV2Lmdhb3NpZWR1LmNvbS9hcGknXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+e1xyXG4gICAgICAgIGlmKGxvYWRpbmcpe1xyXG4gICAgICAgICAgICB3eC5zaG93TG9hZGluZyh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTon5Yqg6L295LitJyxcclxuICAgICAgICAgICAgICAgIG1hc2s6IHRydWUgLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICB3ZXB5LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICB1cmw6IGh0cCArIHVybCxcclxuICAgICAgICAgICAgbWV0aG9kOnBhcmFtcy5tZXRob2R8fCdHRVQnLFxyXG4gICAgICAgICAgICBkYXRhOiBwYXJhbXMuZGF0YXx8e30sXHJcbiAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6IHBhcmFtcy5tZXRob2QgPT0gJ3Bvc3QnID8gJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcgOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAnWFgtVG9rZW4nOiB3eC5nZXRTdG9yYWdlU3luYygndG9rZW4nKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWNjZXNzOiByZXM9PntcclxuICAgICAgICAgICAgICAgIGlmKHJlcy5zdGF0dXNDb2RlID09IDIwMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g55m75b2V5oiQ5YqfXHJcbiAgICAgICAgICAgICAgICAgICAgaWYocmVzLmRhdGEuY29kZSA9PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTpyZXMuZGF0YS5tc2csXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOidub25lJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6cmVzLmRhdGEubXNnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIGljb246J25vbmUnLFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgaWYocmVzLmRhdGEubXNnID09ICfmtLvliqjkuI3lrZjlnKgnKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd3guc3dpdGNoVGFiKHt1cmw6Jy9wYWdlcy9pbmRleCd9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgfSw1MDApXHJcbiAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWw6IGVyciA9PntcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcclxuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6J+e9kee7nOaIluacjeWKoeWZqOWHuumUmScsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjonbm9uZScsXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignTmV0d29yayByZXF1ZXN0IGZhaWxlZCcpKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgd3hSZXF1ZXN0O1xyXG5cclxuXHJcblxyXG5cclxuIl19