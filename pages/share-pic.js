'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _request = require('./../util/request.js');

var _request2 = _interopRequireDefault(_request);

var _downloadSaveFiles = require('./../util/downloadSaveFiles.js');

var _downloadSaveFiles2 = _interopRequireDefault(_downloadSaveFiles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SharePic = function (_wepy$page) {
  _inherits(SharePic, _wepy$page);

  function SharePic() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SharePic);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SharePic.__proto__ || Object.getPrototypeOf(SharePic)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '生成分享图片'
      // disableScroll: true
    }, _this.components = {}, _this.mixins = [], _this.data = {
      FullHeight: 0,
      FullWidth: 0
    }, _this.computed = {}, _this.methods = {
      // 保存绘图
      saveCanvas: function saveCanvas() {
        // 获取权限
        wx.getSetting({
          success: function success(res) {
            var auths = res.authSetting;

            // 已经授权
            if (auths['scope.writePhotosAlbum']) {
              auth();
            } else if (auths['scope.writePhotosAlbum'] == false) {
              // 拒绝授权
              wx.openSetting({
                success: function success(res) {}
              });
            } else {
              // 第一次使用 还未进行授权操作
              giveAuth();
            }
          }
        });
        function giveAuth() {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: function success() {
              // 同意
              auth();
            },
            fail: function fail(err) {
              // 拒绝
            }
          });
        }

        function auth() {
          wx.canvasToTempFilePath({
            fileType: 'jpg',
            canvasId: 'myCanvas',
            success: function success(res) {
              // 保存图片
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success: function success(resq) {
                  wx.showToast({
                    title: '保存成功',
                    icon: 'success',
                    duration: 1000
                  });
                }
              });
            }
          });
        }
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SharePic, [{
    key: 'drawSharePic',
    value: function drawSharePic(topimg, title, price, code) {
      wx.showLoading({
        title: '图片生成中...',
        mask: true
      });

      var ctx = wx.createCanvasContext('myCanvas');
      // 画白色背景
      ctx.rect(0, 0, this.FullWidth, this.FullWidth * 520 / 375);
      ctx.setFillStyle('#ffffff');
      ctx.fill();

      // 画banner
      ctx.drawImage(topimg, 0, 0, this.FullWidth, this.FullWidth * 200 / 375);

      // 标题
      ctx.setTextAlign('left');
      ctx.setFillStyle('#313131');
      ctx.setFontSize(this.FullWidth * 15 / 375);
      // let title = title;
      ctx.fillText(title, (this.FullWidth - title.length * 15) / 2, this.FullWidth * 230 / 375);

      ctx.setFillStyle('#3dcc6f');
      ctx.setFontSize(this.FullWidth * 22 / 375);
      var pricestr = price + '元拼团';
      ctx.fillText(pricestr, (this.FullWidth - (pricestr.length - 1) * 22) / 2, this.FullWidth * 260 / 375);
      // 下划线
      ctx.setLineWidth('0.1');
      ctx.beginPath();
      ctx.moveTo(15, this.FullWidth * 294 / 375);
      ctx.lineTo(this.FullWidth - 15, this.FullWidth * 294 / 375);
      ctx.stroke();

      // 小程序码
      ctx.drawImage(code, (this.FullWidth - 120) / 2, this.FullWidth * 324 / 375, this.FullWidth * 130 / 375, this.FullWidth * 130 / 375);

      // 提示文字
      ctx.setFillStyle('#000');
      ctx.setFontSize(this.FullWidth * 15 / 375);
      var tip = '长按识别小程序，参与拼团';
      ctx.fillText(tip, (this.FullWidth - tip.length * 15) / 2, this.FullWidth * 490 / 375);

      ctx.draw(false, function () {
        wx.hideLoading();
      });
    }

    // 获取图片及信息

  }, {
    key: 'getImgAndInfo',
    value: function getImgAndInfo() {
      var _this2 = this;

      var that = this;
      var params = {
        method: 'post',
        data: { project_id: this.project_id, group_inviter_id: this.group_inviter_id }
      };
      wx.showLoading({
        title: '图片生成中',
        mask: true
      });
      _wepy2.default.request({
        // url: 'https://api.gaosiedu.com/happyplan/wxacode', //正式
        url: 'http://faq_dev.gaosiedu.com/api/wxacode',
        method: 'post',
        data: { project_id: this.project_id, group_inviter_id: this.group_inviter_id },
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'XX-Token': wx.getStorageSync('token')
        },
        success: function success(res) {
          /* if(res.statusCode == 200){
              // 登录成功
              if(res.data.code == 1){
                  let urls = [res.data.data.project_image, res.data.data.project_wxacode_image]
                  downloadSaveFiles({
                      urls: urls,
                      success: function (resp) {
                          // 全部下载成功
                          console.log(resp)
                          that.drawSharePic(resp[1],res.data.data.project_title,res.data.data.project_price,resp[0])
                      },
                      fail: function (e) {
                        // 其中有一个下载失败
                        wx.showToast({
                            title:'图片下载失败',
                            icon:'none',
                        })
                      }
                  });
                  that.$apply();
              }else{
                  wx.showToast({
                      title: res.data.msg,
                      icon: 'none',
                  })
              }
            }else{
              wx.showToast({
                title: '请求出现错误',
                icon: 'none',
              })
            } */
          if (res.statusCode == 200) {
            // 登录成功
            if (res.data.code == 1) {
              var urls = [res.data.data.project_image, res.data.data.project_wxacode_image];
              wx.downloadFile({
                url: res.data.data.project_image,
                success: function success(re) {
                  if (re.statusCode === 200) {
                    var topimg = re.tempFilePath;
                    console.log(topimg);
                    wx.downloadFile({
                      url: res.data.data.project_wxacode_image,
                      success: function success(r) {
                        if (r.statusCode === 200) {
                          that.drawSharePic(topimg, res.data.data.project_title, res.data.data.project_price, r.tempFilePath);
                        }
                      }
                    });
                  }
                }
              });
              _this2.$apply();
            } else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none'
              });
            }
          } else {
            wx.showToast({
              title: '请求出现错误',
              icon: 'none'
            });
          }
        },
        fail: function fail(err) {
          console.log(err);
          wx.showToast({
            title: '网络或服务器出错',
            icon: 'none'
          });
          // reject(new Error('Network request failed'))
        }
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad(params) {
      // console.log(downLoadFiles)
      this.project_id = params.project_id;
      this.group_inviter_id = params.group_inviter_id;
      var that = this;
      wx.getSystemInfo({
        success: function success(res) {
          that.FullWidth = res.windowWidth;
          that.FullHeight = res.windowHeight;
          that.getImgAndInfo();
        }
      });
    }
  }]);

  return SharePic;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(SharePic , 'pages/share-pic'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNoYXJlLXBpYy5qcyJdLCJuYW1lcyI6WyJTaGFyZVBpYyIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwibWl4aW5zIiwiZGF0YSIsIkZ1bGxIZWlnaHQiLCJGdWxsV2lkdGgiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJzYXZlQ2FudmFzIiwid3giLCJnZXRTZXR0aW5nIiwic3VjY2VzcyIsInJlcyIsImF1dGhzIiwiYXV0aFNldHRpbmciLCJhdXRoIiwib3BlblNldHRpbmciLCJnaXZlQXV0aCIsImF1dGhvcml6ZSIsInNjb3BlIiwiZmFpbCIsImVyciIsImNhbnZhc1RvVGVtcEZpbGVQYXRoIiwiZmlsZVR5cGUiLCJjYW52YXNJZCIsInNhdmVJbWFnZVRvUGhvdG9zQWxidW0iLCJmaWxlUGF0aCIsInRlbXBGaWxlUGF0aCIsInJlc3EiLCJzaG93VG9hc3QiLCJ0aXRsZSIsImljb24iLCJkdXJhdGlvbiIsImV2ZW50cyIsInRvcGltZyIsInByaWNlIiwiY29kZSIsInNob3dMb2FkaW5nIiwibWFzayIsImN0eCIsImNyZWF0ZUNhbnZhc0NvbnRleHQiLCJyZWN0Iiwic2V0RmlsbFN0eWxlIiwiZmlsbCIsImRyYXdJbWFnZSIsInNldFRleHRBbGlnbiIsInNldEZvbnRTaXplIiwiZmlsbFRleHQiLCJsZW5ndGgiLCJwcmljZXN0ciIsInNldExpbmVXaWR0aCIsImJlZ2luUGF0aCIsIm1vdmVUbyIsImxpbmVUbyIsInN0cm9rZSIsInRpcCIsImRyYXciLCJoaWRlTG9hZGluZyIsInRoYXQiLCJwYXJhbXMiLCJtZXRob2QiLCJwcm9qZWN0X2lkIiwiZ3JvdXBfaW52aXRlcl9pZCIsIndlcHkiLCJyZXF1ZXN0IiwidXJsIiwiaGVhZGVyIiwiZ2V0U3RvcmFnZVN5bmMiLCJzdGF0dXNDb2RlIiwidXJscyIsInByb2plY3RfaW1hZ2UiLCJwcm9qZWN0X3d4YWNvZGVfaW1hZ2UiLCJkb3dubG9hZEZpbGUiLCJyZSIsImNvbnNvbGUiLCJsb2ciLCJyIiwiZHJhd1NoYXJlUGljIiwicHJvamVjdF90aXRsZSIsInByb2plY3RfcHJpY2UiLCIkYXBwbHkiLCJtc2ciLCJnZXRTeXN0ZW1JbmZvIiwid2luZG93V2lkdGgiLCJ3aW5kb3dIZWlnaHQiLCJnZXRJbWdBbmRJbmZvIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFE7Ozs7Ozs7Ozs7Ozs7OzBMQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQUN4QjtBQUZPLEssUUFJVEMsVSxHQUFhLEUsUUFFYkMsTSxHQUFTLEUsUUFDVEMsSSxHQUFPO0FBQ0xDLGtCQUFZLENBRFA7QUFFTEMsaUJBQVU7QUFGTCxLLFFBS1BDLFEsR0FBVyxFLFFBRVhDLE8sR0FBVTtBQUNSO0FBQ0FDLGdCQUZRLHdCQUVJO0FBQ1Y7QUFDQUMsV0FBR0MsVUFBSCxDQUFjO0FBQ1pDLGlCQURZLG1CQUNKQyxHQURJLEVBQ0E7QUFDVixnQkFBSUMsUUFBUUQsSUFBSUUsV0FBaEI7O0FBRUE7QUFDQSxnQkFBR0QsTUFBTSx3QkFBTixDQUFILEVBQW1DO0FBQ2pDRTtBQUNELGFBRkQsTUFFTSxJQUFHRixNQUFNLHdCQUFOLEtBQWtDLEtBQXJDLEVBQTJDO0FBQUU7QUFDakRKLGlCQUFHTyxXQUFILENBQWU7QUFDYkwseUJBQVMsaUJBQUNDLEdBQUQsRUFBUyxDQUNqQjtBQUZZLGVBQWY7QUFJRCxhQUxLLE1BS0Q7QUFBRTtBQUNMSztBQUNEO0FBQ0Y7QUFmVyxTQUFkO0FBaUJBLGlCQUFTQSxRQUFULEdBQW1CO0FBQ2pCUixhQUFHUyxTQUFILENBQWE7QUFDVEMsbUJBQU8sd0JBREU7QUFFVFIsbUJBRlMscUJBRUM7QUFDUjtBQUNBSTtBQUNELGFBTFE7QUFNVEssZ0JBTlMsZ0JBTUpDLEdBTkksRUFNQTtBQUNQO0FBQ0Q7QUFSUSxXQUFiO0FBVUQ7O0FBRUQsaUJBQVNOLElBQVQsR0FBZTtBQUNiTixhQUFHYSxvQkFBSCxDQUF3QjtB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YjtBQUNBLFdBQUtFLFVBQUwsR0FBa0JGLE9BQU9FLFVBQXpCO0FBQ0EsV0FBS0MsZ0JBQUwsR0FBd0JILE9BQU9HLGdCQUEvQjtBQUNBLFVBQUlKLE9BQU8sSUFBWDtBQUNBakQsU0FBR3lFLGFBQUgsQ0FBaUI7QUFDZnZFLGlCQUFTLGlCQUFTQyxHQUFULEVBQWM7QUFDckI4QyxlQUFLckQsU0FBTCxHQUFpQk8sSUFBSXVFLFdBQXJCO0FBQ0F6QixlQUFLdEQsVUFBTCxHQUFrQlEsSUFBSXdFLFlBQXRCO0FBQ0ExQixlQUFLMkIsYUFBTDtBQUNEO0FBTGMsT0FBakI7QUFVRDs7OztFQTNPbUN0QixlQUFLdUIsSTs7a0JBQXRCeEYsUSIsImZpbGUiOiJzaGFyZS1waWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IHd4UmVxdWVzdCBmcm9tICcuLi91dGlsL3JlcXVlc3QnXG4gIGltcG9ydCBkb3dubG9hZFNhdmVGaWxlcyBmcm9tICcuLi91dGlsL2Rvd25sb2FkU2F2ZUZpbGVzJ1xuICBcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hhcmVQaWMgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfnlJ/miJDliIbkuqvlm77niYcnLFxuICAgICAgLy8gZGlzYWJsZVNjcm9sbDogdHJ1ZVxuICAgIH1cbiAgICBjb21wb25lbnRzID0ge31cblxuICAgIG1peGlucyA9IFtdXG4gICAgZGF0YSA9IHtcbiAgICAgIEZ1bGxIZWlnaHQ6IDAsXG4gICAgICBGdWxsV2lkdGg6MFxuICAgIH1cblxuICAgIGNvbXB1dGVkID0ge31cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICAvLyDkv53lrZjnu5jlm75cbiAgICAgIHNhdmVDYW52YXMoKXtcbiAgICAgICAgLy8g6I635Y+W5p2D6ZmQXG4gICAgICAgIHd4LmdldFNldHRpbmcoe1xuICAgICAgICAgIHN1Y2Nlc3MocmVzKXtcbiAgICAgICAgICAgIGxldCBhdXRocyA9IHJlcy5hdXRoU2V0dGluZztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8g5bey57uP5o6I5p2DXG4gICAgICAgICAgICBpZihhdXRoc1snc2NvcGUud3JpdGVQaG90b3NBbGJ1bSddKXtcbiAgICAgICAgICAgICAgYXV0aCgpO1xuICAgICAgICAgICAgfWVsc2UgaWYoYXV0aHNbJ3Njb3BlLndyaXRlUGhvdG9zQWxidW0nXT09IGZhbHNlKXsgLy8g5ouS57ud5o6I5p2DXG4gICAgICAgICAgICAgIHd4Lm9wZW5TZXR0aW5nKHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfWVsc2V7IC8vIOesrOS4gOasoeS9v+eUqCDov5jmnKrov5vooYzmjojmnYPmk43kvZxcbiAgICAgICAgICAgICAgZ2l2ZUF1dGgoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgZnVuY3Rpb24gZ2l2ZUF1dGgoKXtcbiAgICAgICAgICB3eC5hdXRob3JpemUoe1xuICAgICAgICAgICAgICBzY29wZTogJ3Njb3BlLndyaXRlUGhvdG9zQWxidW0nLFxuICAgICAgICAgICAgICBzdWNjZXNzKCkge1xuICAgICAgICAgICAgICAgIC8vIOWQjOaEj1xuICAgICAgICAgICAgICAgIGF1dGgoKTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgZmFpbChlcnIpe1xuICAgICAgICAgICAgICAgIC8vIOaLkue7nVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGF1dGgoKXtcbiAgICAgICAgICB3eC5jYW52YXNUb1RlbXBGaWxlUGF0aCh7XG4gICAgICAgICAgICBmaWxlVHlwZTonanBnJyxcbiAgICAgICAgICAgIGNhbnZhc0lkOiAnbXlDYW52YXMnLFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgIC8vIOS/neWtmOWbvueJh1xuICAgICAgICAgICAgICB3eC5zYXZlSW1hZ2VUb1Bob3Rvc0FsYnVtKHtcbiAgICAgICAgICAgICAgICAgIGZpbGVQYXRoOnJlcy50ZW1wRmlsZVBhdGgsXG4gICAgICAgICAgICAgICAgICBzdWNjZXNzOmZ1bmN0aW9uKHJlc3EpIHtcbiAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+S/neWtmOaIkOWKnycsXG4gICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9IFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBldmVudHMgPSB7fVxuICAgIGRyYXdTaGFyZVBpYyh0b3BpbWcsIHRpdGxlLCBwcmljZSAsIGNvZGUpe1xuICAgICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICB0aXRsZTon5Zu+54mH55Sf5oiQ5LitLi4uJyxcbiAgICAgICAgbWFzazogdHJ1ZVxuICAgICAgfSlcbiAgICAgIFxuICAgICAgY29uc3QgY3R4ID0gd3guY3JlYXRlQ2FudmFzQ29udGV4dCgnbXlDYW52YXMnKVxuICAgICAgLy8g55S755m96Imy6IOM5pmvXG4gICAgICBjdHgucmVjdCgwLCAwLCB0aGlzLkZ1bGxXaWR0aCwgdGhpcy5GdWxsV2lkdGgqNTIwLzM3NSlcbiAgICAgIGN0eC5zZXRGaWxsU3R5bGUoJyNmZmZmZmYnKVxuICAgICAgY3R4LmZpbGwoKTtcblxuICAgICAgLy8g55S7YmFubmVyXG4gICAgICBjdHguZHJhd0ltYWdlKHRvcGltZywgMCwgMCwgdGhpcy5GdWxsV2lkdGgsIHRoaXMuRnVsbFdpZHRoKjIwMC8zNzUpXG5cbiAgICAgIC8vIOagh+mimFxuICAgICAgY3R4LnNldFRleHRBbGlnbignbGVmdCcpXG4gICAgICBjdHguc2V0RmlsbFN0eWxlKCcjMzEzMTMxJylcbiAgICAgIGN0eC5zZXRGb250U2l6ZSh0aGlzLkZ1bGxXaWR0aCoxNS8zNzUpXG4gICAgICAvLyBsZXQgdGl0bGUgPSB0aXRsZTtcbiAgICAgIGN0eC5maWxsVGV4dCh0aXRsZSwgKHRoaXMuRnVsbFdpZHRoIC0gdGl0bGUubGVuZ3RoKjE1KS8yLCB0aGlzLkZ1bGxXaWR0aCoyMzAvMzc1KVxuXG4gICAgICBjdHguc2V0RmlsbFN0eWxlKCcjM2RjYzZmJylcbiAgICAgIGN0eC5zZXRGb250U2l6ZSh0aGlzLkZ1bGxXaWR0aCoyMi8zNzUpXG4gICAgICBsZXQgcHJpY2VzdHIgPSBwcmljZSsn5YWD5ou85ZuiJ1xuICAgICAgY3R4LmZpbGxUZXh0KHByaWNlc3RyLCAodGhpcy5GdWxsV2lkdGggLSAocHJpY2VzdHIubGVuZ3RoLTEpKjIyKS8yLCAgdGhpcy5GdWxsV2lkdGgqMjYwLzM3NSlcbiAgICAgIC8vIOS4i+WIkue6v1xuICAgICAgY3R4LnNldExpbmVXaWR0aCgnMC4xJylcbiAgICAgIGN0eC5iZWdpblBhdGgoKVxuICAgICAgY3R4Lm1vdmVUbygxNSwgdGhpcy5GdWxsV2lkdGgqMjk0LzM3NSlcbiAgICAgIGN0eC5saW5lVG8odGhpcy5GdWxsV2lkdGgtMTUsIHRoaXMuRnVsbFdpZHRoKjI5NC8zNzUpXG4gICAgICBjdHguc3Ryb2tlKClcbiAgICAgXG5cbiAgICAgIC8vIOWwj+eoi+W6j+eggVxuICAgICAgY3R4LmRyYXdJbWFnZShjb2RlLCAodGhpcy5GdWxsV2lkdGggLSAxMjApLzIsIHRoaXMuRnVsbFdpZHRoKjMyNC8zNzUsIHRoaXMuRnVsbFdpZHRoKjEzMC8zNzUsIHRoaXMuRnVsbFdpZHRoKjEzMC8zNzUpXG5cbiAgICAgICAvLyDmj5DnpLrmloflrZdcbiAgICAgIGN0eC5zZXRGaWxsU3R5bGUoJyMwMDAnKVxuICAgICAgY3R4LnNldEZvbnRTaXplKHRoaXMuRnVsbFdpZHRoKjE1LzM3NSlcbiAgICAgIGxldCB0aXAgPSAn6ZW/5oyJ6K+G5Yir5bCP56iL5bqP77yM5Y+C5LiO5ou85ZuiJ1xuICAgICAgY3R4LmZpbGxUZXh0KHRpcCwgKHRoaXMuRnVsbFdpZHRoIC0gdGlwLmxlbmd0aCoxNSkvMiwgdGhpcy5GdWxsV2lkdGgqNDkwLzM3NSlcblxuICAgICAgY3R4LmRyYXcoZmFsc2UsZnVuY3Rpb24oKXtcbiAgICAgICAgd3guaGlkZUxvYWRpbmcoKTtcbiAgICAgIH0pO1xuICAgICAgXG4gICAgfVxuXG4gICAgIC8vIOiOt+WPluWbvueJh+WPiuS/oeaBr1xuICAgIGdldEltZ0FuZEluZm8oKXtcbiAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgIGxldCBwYXJhbXMgPSB7XG4gICAgICAgIG1ldGhvZDoncG9zdCcsXG4gICAgICAgIGRhdGE6e3Byb2plY3RfaWQ6IHRoaXMucHJvamVjdF9pZCwgZ3JvdXBfaW52aXRlcl9pZDogdGhpcy5ncm91cF9pbnZpdGVyX2lkfVxuICAgICAgfVxuICAgICAgd3guc2hvd0xvYWRpbmcoe1xuICAgICAgICAgIHRpdGxlOiflm77niYfnlJ/miJDkuK0nLFxuICAgICAgICAgIG1hc2s6IHRydWUgLFxuICAgICAgfSlcbiAgICAgIHdlcHkucmVxdWVzdCh7XG4gICAgICAgICAgICAvLyB1cmw6ICdodHRwczovL2FwaS5nYW9zaWVkdS5jb20vaGFwcHlwbGFuL3d4YWNvZGUnLCAvL+ato+W8j1xuICAgICAgICAgICAgdXJsOiAnaHR0cDovL2ZhcV9kZXYuZ2Fvc2llZHUuY29tL2FwaS93eGFjb2RlJyxcbiAgICAgICAgICAgIG1ldGhvZDoncG9zdCcsXG4gICAgICAgICAgICBkYXRhOiB7cHJvamVjdF9pZDogdGhpcy5wcm9qZWN0X2lkLCBncm91cF9pbnZpdGVyX2lkOiB0aGlzLmdyb3VwX2ludml0ZXJfaWR9LFxuICAgICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxuICAgICAgICAgICAgICAgICdYWC1Ub2tlbic6IHd4LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogcmVzPT57XG4gICAgICAgICAgICAgIC8qIGlmKHJlcy5zdGF0dXNDb2RlID09IDIwMCl7XG4gICAgICAgICAgICAgICAgICAvLyDnmbvlvZXmiJDlip9cbiAgICAgICAgICAgICAgICAgIGlmKHJlcy5kYXRhLmNvZGUgPT0gMSl7XG4gICAgICAgICAgICAgICAgICAgICAgbGV0IHVybHMgPSBbcmVzLmRhdGEuZGF0YS5wcm9qZWN0X2ltYWdlLCByZXMuZGF0YS5kYXRhLnByb2plY3Rfd3hhY29kZV9pbWFnZV1cbiAgICAgICAgICAgICAgICAgICAgICBkb3dubG9hZFNhdmVGaWxlcyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHVybHM6IHVybHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXNwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDlhajpg6jkuIvovb3miJDlip9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3ApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmRyYXdTaGFyZVBpYyhyZXNwWzFdLHJlcy5kYXRhLmRhdGEucHJvamVjdF90aXRsZSxyZXMuZGF0YS5kYXRhLnByb2plY3RfcHJpY2UscmVzcFswXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZmFpbDogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDlhbbkuK3mnInkuIDkuKrkuIvovb3lpLHotKVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTon5Zu+54mH5LiL6L295aSx6LSlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjonbm9uZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogcmVzLmRhdGEubXNnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn6K+35rGC5Ye6546w6ZSZ6K+vJyxcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9ICovXG4gICAgICAgICAgICAgICAgaWYocmVzLnN0YXR1c0NvZGUgPT0gMjAwKXtcbiAgICAgICAgICAgICAgICAgIC8vIOeZu+W9leaIkOWKn1xuICAgICAgICAgICAgICAgICAgaWYocmVzLmRhdGEuY29kZSA9PSAxKXtcbiAgICAgICAgICAgICAgICAgICAgICBsZXQgdXJscyA9IFtyZXMuZGF0YS5kYXRhLnByb2plY3RfaW1hZ2UsIHJlcy5kYXRhLmRhdGEucHJvamVjdF93eGFjb2RlX2ltYWdlXVxuICAgICAgICAgICAgICAgICAgICAgIHd4LmRvd25sb2FkRmlsZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IHJlcy5kYXRhLmRhdGEucHJvamVjdF9pbWFnZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzIChyZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmUuc3RhdHVzQ29kZSA9PT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRvcGltZyA9IHJlLnRlbXBGaWxlUGF0aFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRvcGltZylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5kb3dubG9hZEZpbGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiByZXMuZGF0YS5kYXRhLnByb2plY3Rfd3hhY29kZV9pbWFnZSwgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzIChyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyLnN0YXR1c0NvZGUgPT09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZHJhd1NoYXJlUGljKHRvcGltZyxyZXMuZGF0YS5kYXRhLnByb2plY3RfdGl0bGUscmVzLmRhdGEuZGF0YS5wcm9qZWN0X3ByaWNlLCByLnRlbXBGaWxlUGF0aClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZTpyZXMuZGF0YS5tc2csXG4gICAgICAgICAgICAgICAgICAgICAgaWNvbjonbm9uZScsXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTon6K+35rGC5Ye6546w6ZSZ6K+vJyxcbiAgICAgICAgICAgICAgICAgICAgaWNvbjonbm9uZScsXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmYWlsOiBlcnIgPT57XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOifnvZHnu5zmiJbmnI3liqHlmajlh7rplJknLFxuICAgICAgICAgICAgICAgICAgICBpY29uOidub25lJyxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC8vIHJlamVjdChuZXcgRXJyb3IoJ05ldHdvcmsgcmVxdWVzdCBmYWlsZWQnKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG4gICAgb25Mb2FkKHBhcmFtcykge1xuICAgICAgLy8gY29uc29sZS5sb2coZG93bkxvYWRGaWxlcylcbiAgICAgIHRoaXMucHJvamVjdF9pZCA9IHBhcmFtcy5wcm9qZWN0X2lkO1xuICAgICAgdGhpcy5ncm91cF9pbnZpdGVyX2lkID0gcGFyYW1zLmdyb3VwX2ludml0ZXJfaWQ7XG4gICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICB3eC5nZXRTeXN0ZW1JbmZvKHtcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgdGhhdC5GdWxsV2lkdGggPSByZXMud2luZG93V2lkdGhcbiAgICAgICAgICB0aGF0LkZ1bGxIZWlnaHQgPSByZXMud2luZG93SGVpZ2h0XG4gICAgICAgICAgdGhhdC5nZXRJbWdBbmRJbmZvKCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgIFxuICAgICBcblxuICAgIH1cblxuICAgIFxuICB9XG4iXX0=