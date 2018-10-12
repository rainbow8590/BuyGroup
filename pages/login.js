'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./../npm/wepy-async-function/index.js');

var _request = require('./../util/request.js');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Login = function (_wepy$page) {
  _inherits(Login, _wepy$page);

  function Login() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Login);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Login.__proto__ || Object.getPrototypeOf(Login)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '登录'
      // disableScroll: true
    }, _this.components = {}, _this.mixins = [], _this.data = {}, _this.computed = {}, _this.methods = {
      getPhone: function getPhone(res) {
        console.log(res);
        var that = this;
        // 授权
        if (res.detail.errMsg.indexOf('ok') != -1) {
          wx.checkSession({
            success: function success() {
              // 传phonenumber

              var params = {
                method: 'post',
                data: {
                  type: 2,
                  encrypted_data: res.detail.encryptedData,
                  iv: res.detail.iv
                }
                // 登录
              };(0, _request2.default)(params, '/login').then(function (r) {
                console.log('测试昵称');
                console.log(r.data.data.user);
                that.$parent.globalData.already = 1;
                // 储存user信息
                wx.setStorageSync('ActicityUser', r.data.data.user);
                // console.log(that.from)
                if (that.from == '/pages/order') {
                  that.$switch(that.from);
                } else {
                  that.$redirect(that.from, { activityId: that.activityId, groupInviterId: that.groupInviterId, from: 'login', buyPrice: that.buyPrice });
                }
                // 登录完成 跳转到登录之前的页面,并将携带用户信息
                // this.$navigate('/pages/login',{
                //   from: '/'+this.$wxpage.route,
                //   raw_data: res.detail.rawData,
                //   signature: res.detail.signature,
                //   encrypted_data:res.detail.encryptedData,
                //   iv:res.detail.iv,
                // })
              });
            },
            fail: function fail() {
              // session失效就回订单页重新登录
              this.$redirect(this.from);
              // 重新获取code登陆
              /* wx.login({
                success: re => {
                  if(re.code){
                    //进行登陆
                      let params = {
                        method:'post',
                        data:{
                          code:re.code,
                          type: 1,
                          encrypted_data:this.encrypted_data,
                          iv: this.iv,
                        }
                      }
                      // 登录
                      wxRequest(params,'/login').then(r => {
                          // 储存token
                          wx.setStorageSync('token', r.data.data.token)
                          wx.setStorageSync('user', r.data.data.user)
                          // 登录完成 跳转到登录之前的页面,并将携带用户信息
                          this.$navigate('/pages/login',{
                            from: '/'+this.$wxpage.route,
                            raw_data: res.detail.rawData,
                            signature: res.detail.signature,
                            encrypted_data:res.detail.encryptedData,
                            iv:res.detail.iv,
                          })
                            
                      })
                  }
                }
              }) */
            }
          });
        }
      },
      loginAsPhone: function loginAsPhone() {
        this.$navigate('/pages/login-phone', { from: this.from, activityId: this.activityId, groupInviterId: this.groupInviterId, buyPrice: this.buyPrice });
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Login, [{
    key: 'onLoad',
    value: function onLoad(param) {
      console.log(param);
      this.from = param.from;
      // this.raw_data = param.raw_data;
      // this.signature = param.signature;
      this.encrypted_data = param.encrypted_data;
      this.iv = param.iv;
      this.activityId = param.activityId;
      this.groupInviterId = param.groupInviterId;
      this.buyPrice = param.buyPrice;
    }
  }]);

  return Login;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Login , 'pages/login'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLmpzIl0sIm5hbWVzIjpbIkxvZ2luIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJtaXhpbnMiLCJkYXRhIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiZ2V0UGhvbmUiLCJyZXMiLCJjb25zb2xlIiwibG9nIiwidGhhdCIsImRldGFpbCIsImVyck1zZyIsImluZGV4T2YiLCJ3eCIsImNoZWNrU2Vzc2lvbiIsInN1Y2Nlc3MiLCJwYXJhbXMiLCJtZXRob2QiLCJ0eXBlIiwiZW5jcnlwdGVkX2RhdGEiLCJlbmNyeXB0ZWREYXRhIiwiaXYiLCJ0aGVuIiwiciIsInVzZXIiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImFscmVhZHkiLCJzZXRTdG9yYWdlU3luYyIsImZyb20iLCIkc3dpdGNoIiwiJHJlZGlyZWN0IiwiYWN0aXZpdHlJZCIsImdyb3VwSW52aXRlcklkIiwiYnV5UHJpY2UiLCJmYWlsIiwibG9naW5Bc1Bob25lIiwiJG5hdmlnYXRlIiwiZXZlbnRzIiwicGFyYW0iLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFDeEI7QUFGTyxLLFFBSVRDLFUsR0FBYSxFLFFBR2JDLE0sR0FBUyxFLFFBRVRDLEksR0FBTyxFLFFBSVBDLFEsR0FBVyxFLFFBSVhDLE8sR0FBVTtBQUNSQyxjQURRLG9CQUNDQyxHQURELEVBQ0s7QUFDWEMsZ0JBQVFDLEdBQVIsQ0FBWUYsR0FBWjtBQUNBLFlBQUlHLE9BQU8sSUFBWDtBQUNBO0FBQ0EsWUFBR0gsSUFBSUksTUFBSixDQUFXQyxNQUFYLENBQWtCQyxPQUFsQixDQUEwQixJQUExQixLQUFtQyxDQUFDLENBQXZDLEVBQXlDO0FBQ3ZDQyxhQUFHQyxZQUFILENBQWdCO0FBQ2RDLHFCQUFTLG1CQUFVO0FBQ2xCOztBQUVLLGtCQUFJQyxTQUFTO0FBQ1hDLHdCQUFPLE1BREk7QUFFWGYsc0JBQUs7QUFDSGdCLHdCQUFNLENBREg7QUFFSEMsa0NBQWViLElBQUlJLE1BQUosQ0FBV1UsYUFGdkI7QUFHSEMsc0JBQUlmLElBQUlJLE1BQUosQ0FBV1c7QUFIWjtBQU1QO0FBUmEsZUFBYixDQVNBLHVCQUFVTCxNQUFWLEVBQWlCLFFBQWpCLEVBQTJCTSxJQUEzQixDQUFnQyxhQUFLO0FBQ25DZix3QkFBUUMsR0FBUixDQUFZLE1BQVo7QUFDQUQsd0JBQVFDLEdBQVIsQ0FBWWUsRUFBRXJCLElBQUYsQ0FBT0EsSUFBUCxDQUFZc0IsSUFBeEI7QUFDRWYscUJBQUtnQixPQUFMLENBQWFDLFVBQWIsQ0FBd0JDLE9BQXhCLEdBQWtDLENBQWxDO0FBQ0E7QUFDQWQsbUJBQUdlLGNBQUgsQ0FBa0IsY0FBbEIsRUFBa0NMLEVBQUVyQixJQUFGLENBQU9BLElBQVAsQ0FBWXNCLElBQTlDO0FBQ0E7QUFDQSxvQkFBR2YsS0FBS29CLElBQUwsSUFBYSxjQUFoQixFQUErQjtBQUM3QnBCLHVCQUFLcUIsT0FBTCxDQUFhckIsS0FBS29CLElBQWxCO0FBQ0QsaUJBRkQsTUFFSztBQUNIcEIsdUJBQUtzQixTQUFMLENBQWV0QixLQUFLb0IsSUFBcEIsRUFBeUIsRUFBQ0csWUFBV3ZCLEtBQUt1QixVQUFqQixFQUE0QkMsZ0JBQWV4QixLQUFLd0IsY0FBaEQsRUFBK0RKLE1BQUssT0FBcEUsRUFBNEVLLFVBQVV6QixLQUFLeUIsUUFBM0YsRUFBekI7QUFDRDtBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFSCxlQXJCRDtBQXNCTCxhQW5DYTtBQW9DZEMsa0JBQU0sZ0JBQVU7QUFDZDtBQUNBLG1CQUFLSixTQUFMLENBQWUsS0FBS0YsSUFBcEI7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBK0JEO0FBdkVhLFdBQWhCO0FBMkVEO0FBRUYsT0FuRk87QUFvRlJPLGtCQXBGUSwwQkFvRk07QUFDWixhQUFLQyxTQUFMLENBQWUsb0JBQWYsRUFBb0MsRUFBQ1IsTUFBTSxLQUFLQSxJQUFaLEVBQWlCRyxZQUFZLEtBQUtBLFVBQWxDLEVBQTZDQyxnQkFBZSxLQUFLQSxjQUFqRSxFQUFnRkMsVUFBVSxLQUFLQSxRQUEvRixFQUFwQztBQUNEO0FBdEZPLEssUUF5RlZJLE0sR0FBUyxFOzs7OzsyQkFHRkMsSyxFQUFPO0FBQ1poQyxjQUFRQyxHQUFSLENBQVkrQixLQUFaO0FBQ0EsV0FBS1YsSUFBTCxHQUFZVSxNQUFNVixJQUFsQjtBQUNBO0FBQ0E7QUFDQSxXQUFLVixjQUFMLEdBQXNCb0IsTUFBTXBCLGNBQTVCO0FBQ0EsV0FBS0UsRUFBTCxHQUFVa0IsTUFBTWxCLEVBQWhCO0FBQ0EsV0FBS1csVUFBTCxHQUFrQk8sTUFBTVAsVUFBeEI7QUFDQSxXQUFLQyxjQUFMLEdBQXNCTSxNQUFNTixjQUE1QjtBQUNBLFdBQUtDLFFBQUwsR0FBZ0JLLE1BQU1MLFFBQXRCO0FBQ0Q7Ozs7RUF4SGdDTSxlQUFLQyxJOztrQkFBbkI1QyxLIiwiZmlsZSI6ImxvZ2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbidcbiAgaW1wb3J0IHd4UmVxdWVzdCBmcm9tICcuLi91dGlsL3JlcXVlc3QnXG4gIFxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBMb2dpbiBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+eZu+W9lScsXG4gICAgICAvLyBkaXNhYmxlU2Nyb2xsOiB0cnVlXG4gICAgfVxuICAgIGNvbXBvbmVudHMgPSB7XG4gICAgfVxuXG4gICAgbWl4aW5zID0gW11cblxuICAgIGRhdGEgPSB7XG4gICAgICBcbiAgICB9XG5cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIFxuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICBnZXRQaG9uZShyZXMpe1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgICAgLy8g5o6I5p2DXG4gICAgICAgIGlmKHJlcy5kZXRhaWwuZXJyTXNnLmluZGV4T2YoJ29rJykgIT0gLTEpe1xuICAgICAgICAgIHd4LmNoZWNrU2Vzc2lvbih7XG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgIC8vIOS8oHBob25lbnVtYmVyXG4gICAgICAgICAgXG4gICAgICAgICAgICAgICAgICBsZXQgcGFyYW1zID0ge1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6J3Bvc3QnLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAyLFxuICAgICAgICAgICAgICAgICAgICAgIGVuY3J5cHRlZF9kYXRhOnJlcy5kZXRhaWwuZW5jcnlwdGVkRGF0YSxcbiAgICAgICAgICAgICAgICAgICAgICBpdjogcmVzLmRldGFpbC5pdixcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgLy8g55m75b2VXG4gICAgICAgICAgICAgICAgICB3eFJlcXVlc3QocGFyYW1zLCcvbG9naW4nKS50aGVuKHIgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn5rWL6K+V5pi156ewJylcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coci5kYXRhLmRhdGEudXNlcilcbiAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRwYXJlbnQuZ2xvYmFsRGF0YS5hbHJlYWR5ID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAvLyDlgqjlrZh1c2Vy5L+h5oGvXG4gICAgICAgICAgICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ0FjdGljaXR5VXNlcicsIHIuZGF0YS5kYXRhLnVzZXIpXG4gICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGhhdC5mcm9tKVxuICAgICAgICAgICAgICAgICAgICAgIGlmKHRoYXQuZnJvbSA9PSAnL3BhZ2VzL29yZGVyJyl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRzd2l0Y2godGhhdC5mcm9tKVxuICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kcmVkaXJlY3QodGhhdC5mcm9tLHthY3Rpdml0eUlkOnRoYXQuYWN0aXZpdHlJZCxncm91cEludml0ZXJJZDp0aGF0Lmdyb3VwSW52aXRlcklkLGZyb206J2xvZ2luJyxidXlQcmljZTogdGhhdC5idXlQcmljZX0pXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIC8vIOeZu+W9leWujOaIkCDot7PovazliLDnmbvlvZXkuYvliY3nmoTpobXpnaIs5bm25bCG5pC65bim55So5oi35L+h5oGvXG4gICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy4kbmF2aWdhdGUoJy9wYWdlcy9sb2dpbicse1xuICAgICAgICAgICAgICAgICAgICAgIC8vICAgZnJvbTogJy8nK3RoaXMuJHd4cGFnZS5yb3V0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAvLyAgIHJhd19kYXRhOiByZXMuZGV0YWlsLnJhd0RhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgLy8gICBzaWduYXR1cmU6IHJlcy5kZXRhaWwuc2lnbmF0dXJlLFxuICAgICAgICAgICAgICAgICAgICAgIC8vICAgZW5jcnlwdGVkX2RhdGE6cmVzLmRldGFpbC5lbmNyeXB0ZWREYXRhLFxuICAgICAgICAgICAgICAgICAgICAgIC8vICAgaXY6cmVzLmRldGFpbC5pdixcbiAgICAgICAgICAgICAgICAgICAgICAvLyB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgIC8vIHNlc3Npb27lpLHmlYjlsLHlm57orqLljZXpobXph43mlrDnmbvlvZVcbiAgICAgICAgICAgICAgdGhpcy4kcmVkaXJlY3QodGhpcy5mcm9tKVxuICAgICAgICAgICAgICAvLyDph43mlrDojrflj5Zjb2Rl55m76ZmGXG4gICAgICAgICAgICAgIC8qIHd4LmxvZ2luKHtcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiByZSA9PiB7XG4gICAgICAgICAgICAgICAgICBpZihyZS5jb2RlKXtcbiAgICAgICAgICAgICAgICAgICAgLy/ov5vooYznmbvpmYZcbiAgICAgICAgICAgICAgICAgICAgICBsZXQgcGFyYW1zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOidwb3N0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6e1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjb2RlOnJlLmNvZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGVuY3J5cHRlZF9kYXRhOnRoaXMuZW5jcnlwdGVkX2RhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGl2OiB0aGlzLml2LFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAvLyDnmbvlvZVcbiAgICAgICAgICAgICAgICAgICAgICB3eFJlcXVlc3QocGFyYW1zLCcvbG9naW4nKS50aGVuKHIgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDlgqjlrZh0b2tlblxuICAgICAgICAgICAgICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygndG9rZW4nLCByLmRhdGEuZGF0YS50b2tlbilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ3VzZXInLCByLmRhdGEuZGF0YS51c2VyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDnmbvlvZXlrozmiJAg6Lez6L2s5Yiw55m75b2V5LmL5YmN55qE6aG16Z2iLOW5tuWwhuaQuuW4pueUqOaIt+S/oeaBr1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRuYXZpZ2F0ZSgnL3BhZ2VzL2xvZ2luJyx7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbTogJy8nK3RoaXMuJHd4cGFnZS5yb3V0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByYXdfZGF0YTogcmVzLmRldGFpbC5yYXdEYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpZ25hdHVyZTogcmVzLmRldGFpbC5zaWduYXR1cmUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5jcnlwdGVkX2RhdGE6cmVzLmRldGFpbC5lbmNyeXB0ZWREYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl2OnJlcy5kZXRhaWwuaXYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pICovXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgIFxuICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgfSxcbiAgICAgIGxvZ2luQXNQaG9uZSgpe1xuICAgICAgICB0aGlzLiRuYXZpZ2F0ZSgnL3BhZ2VzL2xvZ2luLXBob25lJyx7ZnJvbTogdGhpcy5mcm9tLGFjdGl2aXR5SWQ6IHRoaXMuYWN0aXZpdHlJZCxncm91cEludml0ZXJJZDp0aGlzLmdyb3VwSW52aXRlcklkLGJ1eVByaWNlOiB0aGlzLmJ1eVByaWNlfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBldmVudHMgPSB7XG4gICAgfVxuICAgIFxuICAgIG9uTG9hZChwYXJhbSkge1xuICAgICAgY29uc29sZS5sb2cocGFyYW0pXG4gICAgICB0aGlzLmZyb20gPSBwYXJhbS5mcm9tO1xuICAgICAgLy8gdGhpcy5yYXdfZGF0YSA9IHBhcmFtLnJhd19kYXRhO1xuICAgICAgLy8gdGhpcy5zaWduYXR1cmUgPSBwYXJhbS5zaWduYXR1cmU7XG4gICAgICB0aGlzLmVuY3J5cHRlZF9kYXRhID0gcGFyYW0uZW5jcnlwdGVkX2RhdGE7XG4gICAgICB0aGlzLml2ID0gcGFyYW0uaXY7XG4gICAgICB0aGlzLmFjdGl2aXR5SWQgPSBwYXJhbS5hY3Rpdml0eUlkO1xuICAgICAgdGhpcy5ncm91cEludml0ZXJJZCA9IHBhcmFtLmdyb3VwSW52aXRlcklkO1xuICAgICAgdGhpcy5idXlQcmljZSA9IHBhcmFtLmJ1eVByaWNlO1xuICAgIH1cbiAgfVxuIl19