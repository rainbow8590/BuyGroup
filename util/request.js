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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlcXVlc3QuanMiXSwibmFtZXMiOlsid3hSZXF1ZXN0IiwicGFyYW1zIiwidXJsIiwibG9hZGluZyIsImh0cCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0Iiwid3giLCJzaG93TG9hZGluZyIsInRpdGxlIiwibWFzayIsIndlcHkiLCJyZXF1ZXN0IiwibWV0aG9kIiwiZGF0YSIsImhlYWRlciIsImdldFN0b3JhZ2VTeW5jIiwic3VjY2VzcyIsInJlcyIsInN0YXR1c0NvZGUiLCJjb2RlIiwic2hvd1RvYXN0IiwibXNnIiwiaWNvbiIsInN3aXRjaFRhYiIsInNldFRpbWVvdXQiLCJoaWRlTG9hZGluZyIsImZhaWwiLCJjb25zb2xlIiwibG9nIiwiZXJyIiwiRXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7QUFDQSxTQUFTQSxTQUFULENBQW1CQyxNQUFuQixFQUEwQkMsR0FBMUIsRUFBMkM7QUFBQSxRQUFiQyxPQUFhLHVFQUFMLElBQUs7O0FBQ3ZDO0FBQ0EsUUFBSUMsTUFBTSxpQ0FBVjtBQUNBLFdBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBU0MsTUFBVCxFQUFrQjtBQUNqQyxZQUFHSixPQUFILEVBQVc7QUFDUEssZUFBR0MsV0FBSCxDQUFlO0FBQ1hDLHVCQUFNLEtBREs7QUFFWEMsc0JBQU07QUFGSyxhQUFmO0FBSUg7QUFDREMsdUJBQUtDLE9BQUwsQ0FBYTtBQUNUWCxpQkFBS0UsTUFBTUYsR0FERjtBQUVUWSxvQkFBT2IsT0FBT2EsTUFBUCxJQUFlLEtBRmI7QUFHVEMsa0JBQU1kLE9BQU9jLElBQVAsSUFBYSxFQUhWO0FBSVRDLG9CQUFRO0FBQ0osZ0NBQWdCZixPQUFPYSxNQUFQLElBQWlCLE1BQWpCLEdBQTBCLG1DQUExQixHQUFnRSxrQkFENUU7QUFFSiw0QkFBWU4sR0FBR1MsY0FBSCxDQUFrQixPQUFsQjtBQUZSLGFBSkM7QUFRVEMscUJBQVMsc0JBQUs7QUFDVixvQkFBR0MsSUFBSUMsVUFBSixJQUFrQixHQUFyQixFQUF5Qjs7QUFHckI7QUFDQSx3QkFBR0QsSUFBSUosSUFBSixDQUFTTSxJQUFULElBQWlCLENBQXBCLEVBQXNCO0FBQ2xCZixnQ0FBUWEsR0FBUjtBQUNILHFCQUZELE1BRUs7QUFDRFgsMkJBQUdjLFNBQUgsQ0FBYTtBQUNUWixtQ0FBTVMsSUFBSUosSUFBSixDQUFTUSxHQUROO0FBRVRDLGtDQUFLO0FBRkkseUJBQWI7QUFJSDtBQUNGLGlCQVpILE1BWU87QUFDSGhCLHVCQUFHYyxTQUFILENBQWE7QUFDVlosK0JBQU1TLElBQUlKLElBQUosQ0FBU1EsR0FETDtBQUVWQyw4QkFBSztBQUZLLHFCQUFiO0FBSUEsd0JBQUdMLElBQUlKLElBQUosQ0FBU1EsR0FBVCxJQUFnQixPQUFuQixFQUEyQjtBQUN2QmYsMkJBQUdpQixTQUFILENBQWEsRUFBQ3ZCLEtBQUksY0FBTCxFQUFiO0FBQ0g7QUFDRjtBQUNEd0IsMkJBQVcsWUFBSTtBQUNibEIsdUJBQUdtQixXQUFIO0FBQ0QsaUJBRkQsRUFFRSxHQUZGO0FBS0wsYUFuQ1E7QUFvQ1RDLGtCQUFNLG1CQUFNO0FBQ1JDLHdCQUFRQyxHQUFSLENBQVlDLEdBQVo7QUFDQXZCLG1CQUFHYyxTQUFILENBQWE7QUFDVFosMkJBQU0sVUFERztBQUVUYywwQkFBSztBQUZJLGlCQUFiO0FBSUFqQix1QkFBTyxJQUFJeUIsS0FBSixDQUFVLHdCQUFWLENBQVA7QUFDSDtBQTNDUSxTQUFiO0FBNkNILEtBcERNLENBQVA7QUFxREg7a0JBQ2NoQyxTIiwiZmlsZSI6InJlcXVlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5mdW5jdGlvbiB3eFJlcXVlc3QocGFyYW1zLHVybCxsb2FkaW5nPXRydWUpe1xyXG4gICAgLy8gbGV0IGh0cCA9ICdodHRwczovL2FwaS5nYW9zaWVkdS5jb20vaGFwcHlwbGFuJyAvL+ato+W8j1xyXG4gICAgbGV0IGh0cCA9ICdodHRwOi8vZmFxX2Rldi5nYW9zaWVkdS5jb20vYXBpJ1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcclxuICAgICAgICBpZihsb2FkaW5nKXtcclxuICAgICAgICAgICAgd3guc2hvd0xvYWRpbmcoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6J+WKoOi9veS4rScsXHJcbiAgICAgICAgICAgICAgICBtYXNrOiB0cnVlICxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgd2VweS5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOiBodHAgKyB1cmwsXHJcbiAgICAgICAgICAgIG1ldGhvZDpwYXJhbXMubWV0aG9kfHwnR0VUJyxcclxuICAgICAgICAgICAgZGF0YTogcGFyYW1zLmRhdGF8fHt9LFxyXG4gICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiBwYXJhbXMubWV0aG9kID09ICdwb3N0JyA/ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnIDogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ1hYLVRva2VuJzogd3guZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJylcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzczogcmVzPT57XHJcbiAgICAgICAgICAgICAgICBpZihyZXMuc3RhdHVzQ29kZSA9PSAyMDApe1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOeZu+W9leaIkOWKn1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHJlcy5kYXRhLmNvZGUgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzKVxyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6cmVzLmRhdGEubXNnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjonbm9uZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOnJlcy5kYXRhLm1zZyxcclxuICAgICAgICAgICAgICAgICAgICAgICBpY29uOidub25lJyxcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHJlcy5kYXRhLm1zZyA9PSAn5rS75Yqo5LiN5a2Y5ZyoJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHd4LnN3aXRjaFRhYih7dXJsOicvcGFnZXMvaW5kZXgnfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgIH0sNTAwKVxyXG4gICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWlsOiBlcnIgPT57XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXHJcbiAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOifnvZHnu5zmiJbmnI3liqHlmajlh7rplJknLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246J25vbmUnLFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ05ldHdvcmsgcmVxdWVzdCBmYWlsZWQnKSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IHd4UmVxdWVzdDtcclxuXHJcblxyXG5cclxuXHJcbiJdfQ==