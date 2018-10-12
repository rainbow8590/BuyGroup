'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _request = require('./../util/request.js');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginPhone = function (_wepy$page) {
  _inherits(LoginPhone, _wepy$page);

  function LoginPhone() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, LoginPhone);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LoginPhone.__proto__ || Object.getPrototypeOf(LoginPhone)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '登录'
      // disableScroll: true
    }, _this.components = {}, _this.mixins = [], _this.data = {
      isError: false,
      isHide: false,
      codeText: '发送验证码',
      num: 60,
      tipText: '',
      // isDisabledBtn: true,
      RPhone: false,
      RCode: false,
      timera: null
    }, _this.computed = {}, _this.methods = {
      getPhone: function getPhone(e) {
        this.phone = e.detail.value;
      },
      wirteCode: function wirteCode(e) {
        console.log(e);
        this.code = e.detail.value;
      },

      // 发送验证码
      sendCode: function sendCode() {
        var _this2 = this;

        console.log(this.RPhone);
        if (this.RPhone == false) return;
        if (this.num < 60) return;
        // this.checkPhone();
        this.getCode();
        this.num--;
        this.codeText = this.num + '秒后发送';
        clearInterval(this.timera);
        this.timera = setInterval(function () {
          if (_this2.num == 0) {
            _this2.codeText = "重新发送";
            _this2.num = 60;
            clearInterval(_this2.timera);
            _this2.$apply();
            return;
          } else {
            console.log(9999);
            _this2.num--;
            _this2.codeText = _this2.num + '秒后发送';
          }
          _this2.$apply();
        }, 1000);
      },

      // 验证验证码
      checkCode: function checkCode() {
        console.log(this.code);
        var regCode = /^[0-9]{4}$/;
        if (this.code) {
          if (!regCode.test(this.code)) {
            this.RCode = false;

            // this.tipText = '验证码格式错误'
            // this.errorFun();
            wx.showModal({
              title: '提示',
              content: '验证码格式错误',
              showCancel: false,
              duration: 1000
            });
          } else {
            this.RCode = true;
          }
        } else {
          this.RCode = false;
          // this.tipText = '请输入验证码'
          // this.errorFun();
          wx.showModal({
            title: '提示',
            content: '验证码为空',
            showCancel: false,
            duration: 1000
          });
        }
      },
      login: function login() {
        var _this3 = this;

        setTimeout(function () {
          console.log(_this3.phone, _this3.RPhone, _this3.code, _this3.RCode);
          if (_this3.phone && !_this3.RPhone) {
            console.log('手机号1');
            wx.showModal({
              title: '提示',
              content: '手机号码格式错误',
              showCancel: false,
              duration: 1000
            });
            return;
          } else if (!_this3.phone) {
            console.log('手机号2');
            wx.showModal({
              title: '提示',
              content: '手机号码为空',
              showCancel: false,
              duration: 1000
            });
            return;
          }
          if (_this3.code && !_this3.RCode) {
            console.log('验证码1');
            wx.showModal({
              title: '提示',
              content: '验证码错误',
              showCancel: false,
              duration: 1000
            });
          } else if (!_this3.code) {
            console.log('验证码2');
            wx.showModal({
              title: '提示',
              content: '验证码为空',
              showCancel: false,
              duration: 1000
            });
            return;
          }

          if (_this3.RCode && _this3.RPhone) {
            _this3.loginFun();
          }
        }, 100);

        /* let regCode = /^[0-9]{4}$/;
        if(this.code){
          if(!regCode.test( this.code )){
            this.tipText = '验证码格式错误'
            this.errorFun();
          }else{
            
            // this.$navigate('/pages/group-detail');
          }
        }else{
          this.tipText = '请输入验证码'
          this.errorFun();
        } */
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  // 事件函数


  _createClass(LoginPhone, [{
    key: 'loginFun',

    // 登录
    value: function loginFun() {
      var _this4 = this;

      var that = this;
      (0, _request2.default)({ method: 'post', data: { phone: this.phone, sms_code: this.code } }, '/bindPhone').then(function (res) {
        console.log(res);
        wx.setStorageSync('ActicityUser', res.data.data.user);
        if (res.data.code == 1) {
          if (that.from == '/pages/order') {
            that.$switch(that.from);
          } else {
            that.$redirect(that.from, { activityId: that.activityId, groupInviterId: that.groupInviterId, from: 'login', buyPrice: _this4.buyPrice });
          }
          // this.$apply();
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false,
            duration: 1000
          });
        }
      });
    }
    // 验证手机号

  }, {
    key: 'checkPhone',
    value: function checkPhone() {
      var regPhone = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (this.phone) {
        if (!regPhone.test(this.phone)) {
          this.RPhone = false;
          wx.showModal({
            title: '提示',
            content: '手机号码格式不正确',
            showCancel: false,
            duration: 1000
          });
          // this.tipText = '手机号码格式不正确'
          // this.errorFun();
        } else {
          this.RPhone = true;
        }
      } else {
        this.RPhone = false;
        // this.tipText = '手机号码不能为空'
        // this.errorFun();
        wx.showModal({
          title: '提示',
          content: '手机号码不能为空',
          showCancel: false,
          duration: 1000
        });
      }
    }

    // errorFun(){
    //   this.isError = true;
    //   this.isHide = false;
    //   setTimeout(()=>{
    //     this.isError = false;
    //     this.isHide = true;
    //     this.$apply();
    //   },2000)
    // }
    //获取验证码

  }, {
    key: 'getCode',
    value: function getCode() {
      (0, _request2.default)({ method: 'post', data: { phone: this.phone } }, '/sendSmsCode').then(function (res) {
        console.log(res);
        if (res.data.code == 1) {
          wx.showModal({
            title: '提示',
            content: '发送成功, 请注意查收短信',
            showCancel: false
          });
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false
          });
        }
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad(param) {
      this.from = param.from;
      this.activityId = param.activityId;
      this.groupInviterId = param.groupInviterId;
      this.buyPrice = param.buyPrice;

      // 查看是否授权过
      // wx.getSetting({
      //   success: (res) => {
      //     console.log(res)
      //     var data = res.authSetting;
      //     if(!data.authSetting){
      //       wx.authorize({
      //           scope: 'scope.userInfo',
      //           success(res) {
      //              console.log(res)
      //           }
      //       })
      //     }
      //   }
      // })
    }
  }, {
    key: 'onUnload',
    value: function onUnload() {
      console.log('unload');
      clearInterval(this.timera);
      this.num = 60;
    }
  }]);

  return LoginPhone;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(LoginPhone , 'pages/login-phone'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLXBob25lLmpzIl0sIm5hbWVzIjpbIkxvZ2luUGhvbmUiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJpc0Vycm9yIiwiaXNIaWRlIiwiY29kZVRleHQiLCJudW0iLCJ0aXBUZXh0IiwiUlBob25lIiwiUkNvZGUiLCJ0aW1lcmEiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJnZXRQaG9uZSIsImUiLCJwaG9uZSIsImRldGFpbCIsInZhbHVlIiwid2lydGVDb2RlIiwiY29uc29sZSIsImxvZyIsImNvZGUiLCJzZW5kQ29kZSIsImdldENvZGUiLCJjbGVhckludGVydmFsIiwic2V0SW50ZXJ2YWwiLCIkYXBwbHkiLCJjaGVja0NvZGUiLCJyZWdDb2RlIiwidGVzdCIsInd4Iiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50Iiwic2hvd0NhbmNlbCIsImR1cmF0aW9uIiwibG9naW4iLCJzZXRUaW1lb3V0IiwibG9naW5GdW4iLCJldmVudHMiLCJ0aGF0IiwibWV0aG9kIiwic21zX2NvZGUiLCJ0aGVuIiwicmVzIiwic2V0U3RvcmFnZVN5bmMiLCJ1c2VyIiwiZnJvbSIsIiRzd2l0Y2giLCIkcmVkaXJlY3QiLCJhY3Rpdml0eUlkIiwiZ3JvdXBJbnZpdGVySWQiLCJidXlQcmljZSIsIm1zZyIsInJlZ1Bob25lIiwicGFyYW0iLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxVOzs7Ozs7Ozs7Ozs7Ozs4TEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFDeEI7QUFGTyxLLFFBSVRDLFUsR0FBYSxFLFFBR2JDLE0sR0FBUyxFLFFBRVRDLEksR0FBTztBQUNMQyxlQUFTLEtBREo7QUFFTEMsY0FBUSxLQUZIO0FBR0xDLGdCQUFTLE9BSEo7QUFJTEMsV0FBSyxFQUpBO0FBS0xDLGVBQVEsRUFMSDtBQU1MO0FBQ0FDLGNBQVEsS0FQSDtBQVFMQyxhQUFPLEtBUkY7QUFTTEMsY0FBUTtBQVRILEssUUFXUEMsUSxHQUFXLEUsUUFHWEMsTyxHQUFVO0FBQ1JDLGNBRFEsb0JBQ0NDLENBREQsRUFDRztBQUNULGFBQUtDLEtBQUwsR0FBYUQsRUFBRUUsTUFBRixDQUFTQyxLQUF0QjtBQUNELE9BSE87QUFJUkMsZUFKUSxxQkFJRUosQ0FKRixFQUlJO0FBQ1ZLLGdCQUFRQyxHQUFSLENBQVlOLENBQVo7QUFDQSxhQUFLTyxJQUFMLEdBQVlQLEVBQUVFLE1BQUYsQ0FBU0MsS0FBckI7QUFDRCxPQVBPOztBQVFSO0FBQ0FLLGNBVFEsc0JBU0U7QUFBQTs7QUFDUkgsZ0JBQVFDLEdBQVIsQ0FBWSxLQUFLWixNQUFqQjtBQUNBLFlBQUcsS0FBS0EsTUFBTCxJQUFlLEtBQWxCLEVBQXlCO0FBQ3pCLFlBQUcsS0FBS0YsR0FBTCxHQUFXLEVBQWQsRUFBa0I7QUFDbEI7QUFDRSxhQUFLaUIsT0FBTDtBQUNBLGFBQUtqQixHQUFMO0FBQ0EsYUFBS0QsUUFBTCxHQUFnQixLQUFLQyxHQUFMLEdBQVUsTUFBMUI7QUFDQWtCLHNCQUFjLEtBQUtkLE1BQW5CO0FBQ0EsYUFBS0EsTUFBTCxHQUFjZSxZQUFZLFlBQUk7QUFDNUIsY0FBRyxPQUFLbkIsR0FBTCxJQUFZLENBQWYsRUFBa0I7QUFDaEIsbUJBQUtELFFBQUwsR0FBZ0IsTUFBaEI7QUFDQSxtQkFBS0MsR0FBTCxHQUFXLEVBQVg7QUFDQWtCLDBCQUFjLE9BQUtkLE1BQW5CO0FBQ0EsbUJBQUtnQixNQUFMO0FBQ0E7QUFDRCxXQU5ELE1BTUs7QUFDSFAsb0JBQVFDLEdBQVIsQ0FBWSxJQUFaO0FBQ0EsbUJBQUtkLEdBQUw7QUFDQSxtQkFBS0QsUUFBTCxHQUFnQixPQUFLQyxHQUFMLEdBQVcsTUFBM0I7QUFDRDtBQUNDLGlCQUFLb0IsTUFBTDtBQUVILFNBZGEsRUFjWixJQWRZLENBQWQ7QUFpQkgsT0FuQ087O0FBb0NSO0FBQ0FDLGVBckNRLHVCQXFDRztBQUNUUixnQkFBUUMsR0FBUixDQUFZLEtBQUtDLElBQWpCO0FBQ0EsWUFBSU8sVUFBVSxZQUFkO0FBQ0EsWUFBRyxLQUFLUCxJQUFSLEVBQWE7QUFDWCxjQUFHLENBQUNPLFFBQVFDLElBQVIsQ0FBYyxLQUFLUixJQUFuQixDQUFKLEVBQThCO0FBQzVCLGlCQUFLWixLQUFMLEdBQWEsS0FBYjs7QUFFQTtBQUNBO0FBQ0FxQixlQUFHQyxTQUFILENBQWE7QUFDWEMscUJBQU8sSUFESTtBQUVYQyx1QkFBUyxTQUZFO0FBR1hDLDBCQUFZLEtBSEQ7QUFJWEMsd0JBQVU7QUFKQyxhQUFiO0FBTUQsV0FYRCxNQVdLO0FBQ0gsaUJBQUsxQixLQUFMLEdBQWEsSUFBYjtBQUNEO0FBQ0YsU0FmRCxNQWVLO0FBQ0gsZUFBS0EsS0FBTCxHQUFhLEtBQWI7QUFDQTtBQUNBO0FBQ0FxQixhQUFHQyxTQUFILENBQWE7QUFDWEMsbUJBQU8sSUFESTtBQUVYQyxxQkFBUyxPQUZFO0FBR1hDLHdCQUFZLEtBSEQ7QUFJWEMsc0JBQVU7QUFKQyxXQUFiO0FBTUQ7QUFDRixPQWxFTztBQW1FUkMsV0FuRVEsbUJBbUVEO0FBQUE7O0FBQ0xDLG1CQUFXLFlBQUk7QUFDYmxCLGtCQUFRQyxHQUFSLENBQWEsT0FBS0wsS0FBbEIsRUFBMEIsT0FBS1AsTUFBL0IsRUFBd0MsT0FBS2EsSUFBN0MsRUFBb0QsT0FBS1osS0FBekQ7QUFDQSxjQUFHLE9BQUtNLEtBQUwsSUFBYyxDQUFDLE9BQUtQLE1BQXZCLEVBQThCO0FBQzVCVyxvQkFBUUMsR0FBUixDQUFZLE1BQVo7QUFDQVUsZUFBR0MsU0FBSCxDQUFhO0FBQ1hDLHFCQUFPLElBREk7QUFFWEMsdUJBQVMsVUFGRTtBQUdYQywwQkFBWSxLQUhEO0FBSVhDLHdCQUFVO0FBSkMsYUFBYjtBQU1BO0FBQ0QsV0FURCxNQVNNLElBQUcsQ0FBQyxPQUFLcEIsS0FBVCxFQUFlO0FBQ25CSSxvQkFBUUMsR0FBUixDQUFZLE1BQVo7QUFDQVUsZUFBR0MsU0FBSCxDQUFhO0FBQ1hDLHFCQUFPLElBREk7QUFFWEMsdUJBQVMsUUFGRTtBQUdYQywwQkFBWSxLQUhEO0FBSVhDLHdCQUFVO0FBSkMsYUFBYjtBQU1BO0FBQ0Q7QUFDRCxjQUFHLE9BQUtkLElBQUwsSUFBYSxDQUFDLE9BQUtaLEtBQXRCLEVBQTRCO0FBQzFCVSxvQkFBUUMsR0FBUixDQUFZLE1BQVo7QUFDQVUsZUFBR0MsU0FBSCxDQUFhO0FBQ1hDLHFCQUFPLElBREk7QUFFWEMsdUJBQVMsT0FGRTtBQUdYQywwQkFBWSxLQUhEO0FBSVhDLHdCQUFVO0FBSkMsYUFBYjtBQU1ELFdBUkQsTUFRTSxJQUFHLENBQUMsT0FBS2QsSUFBVCxFQUFjO0FBQ2xCRixvQkFBUUMsR0FBUixDQUFZLE1BQVo7QUFDQVUsZUFBR0MsU0FBSCxDQUFhO0FBQ1hDLHFCQUFPLElBREk7QUFFWEMsdUJBQVMsT0FGRTtBQUdYQywwQkFBWSxLQUhEO0FBSVhDLHdCQUFVO0FBSkMsYUFBYjtBQU1BO0FBQ0Q7O0FBRUQsY0FBRyxPQUFLMUIsS0FBTCxJQUFjLE9BQUtELE1BQXRCLEVBQTZCO0FBQzNCLG1CQUFLOEIsUUFBTDtBQUNEO0FBQ0YsU0EzQ0QsRUEyQ0UsR0EzQ0Y7O0FBNkNBOzs7Ozs7Ozs7Ozs7O0FBYUQ7QUE5SE8sSyxRQWdJVkMsTSxHQUFTLEU7OztBQWpJVDs7Ozs7O0FBa0lBOytCQUNVO0FBQUE7O0FBQ1IsVUFBSUMsT0FBTyxJQUFYO0FBQ0EsNkJBQVUsRUFBRUMsUUFBTyxNQUFULEVBQWdCdkMsTUFBSyxFQUFFYSxPQUFNLEtBQUtBLEtBQWIsRUFBbUIyQixVQUFTLEtBQUtyQixJQUFqQyxFQUFyQixFQUFWLEVBQTBFLFlBQTFFLEVBQXdGc0IsSUFBeEYsQ0FBNkYsZUFBTztBQUNsR3hCLGdCQUFRQyxHQUFSLENBQVl3QixHQUFaO0FBQ0FkLFdBQUdlLGNBQUgsQ0FBa0IsY0FBbEIsRUFBa0NELElBQUkxQyxJQUFKLENBQVNBLElBQVQsQ0FBYzRDLElBQWhEO0FBQ0EsWUFBR0YsSUFBSTFDLElBQUosQ0FBU21CLElBQVQsSUFBaUIsQ0FBcEIsRUFBc0I7QUFDcEIsY0FBR21CLEtBQUtPLElBQUwsSUFBYSxjQUFoQixFQUErQjtBQUM3QlAsaUJBQUtRLE9BQUwsQ0FBYVIsS0FBS08sSUFBbEI7QUFDRCxXQUZELE1BRUs7QUFDSFAsaUJBQUtTLFNBQUwsQ0FBZVQsS0FBS08sSUFBcEIsRUFBeUIsRUFBQ0csWUFBV1YsS0FBS1UsVUFBakIsRUFBNEJDLGdCQUFlWCxLQUFLVyxjQUFoRCxFQUErREosTUFBSyxPQUFwRSxFQUE0RUssVUFBUyxPQUFLQSxRQUExRixFQUF6QjtBQUNEO0FBQ0Q7QUFDRCxTQVBELE1BT0s7QUFDSHRCLGFBQUdDLFNBQUgsQ0FBYTtBQUNYQyxtQkFBTyxJQURJO0FBRVhDLHFCQUFTVyxJQUFJMUMsSUFBSixDQUFTbUQsR0FGUDtBQUdYbkIsd0JBQVksS0FIRDtBQUlYQyxzQkFBVTtBQUpDLFdBQWI7QUFNRDtBQUNGLE9BbEJEO0FBbUJEO0FBQ0Q7Ozs7aUNBQ1k7QUFDVixVQUFJbUIsV0FBVywwQkFBZjtBQUNBLFVBQUcsS0FBS3ZDLEtBQVIsRUFBYztBQUNaLFlBQUcsQ0FBQ3VDLFNBQVN6QixJQUFULENBQWUsS0FBS2QsS0FBcEIsQ0FBSixFQUFnQztBQUM5QixlQUFLUCxNQUFMLEdBQWMsS0FBZDtBQUNBc0IsYUFBR0MsU0FBSCxDQUFhO0FBQ1hDLG1CQUFPLElBREk7QUFFWEMscUJBQVMsV0FGRTtBQUdYQyx3QkFBWSxLQUhEO0FBSVhDLHNCQUFVO0FBSkMsV0FBYjtBQU1BO0FBQ0E7QUFDRCxTQVZELE1BVUs7QUFDSixlQUFLM0IsTUFBTCxHQUFjLElBQWQ7QUFDQTtBQUNGLE9BZEQsTUFjSztBQUNILGFBQUtBLE1BQUwsR0FBYyxLQUFkO0FBQ0E7QUFDQTtBQUNBc0IsV0FBR0MsU0FBSCxDQUFhO0FBQ1RDLGlCQUFPLElBREU7QUFFVEMsbUJBQVMsVUFGQTtBQUdUQyxzQkFBWSxLQUhIO0FBSVRDLG9CQUFVO0FBSkQsU0FBYjtBQU1EO0FBQ0Y7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OEJBQ1M7QUFDUCw2QkFBVSxFQUFFTSxRQUFPLE1BQVQsRUFBZ0J2QyxNQUFLLEVBQUVhLE9BQU0sS0FBS0EsS0FBYixFQUFyQixFQUFWLEVBQXNELGNBQXRELEVBQXNFNEIsSUFBdEUsQ0FBMkUsZUFBTztBQUNoRnhCLGdCQUFRQyxHQUFSLENBQVl3QixHQUFaO0FBQ0EsWUFBR0EsSUFBSTFDLElBQUosQ0FBU21CLElBQVQsSUFBaUIsQ0FBcEIsRUFBc0I7QUFDcEJTLGFBQUdDLFNBQUgsQ0FBYTtBQUNYQyxtQkFBTyxJQURJO0FBRVhDLHFCQUFRLGVBRkc7QUFHWEMsd0JBQVk7QUFIRCxXQUFiO0FBS0QsU0FORCxNQU1LO0FBQ0hKLGFBQUdDLFNBQUgsQ0FBYTtBQUNYQyxtQkFBTyxJQURJO0FBRVhDLHFCQUFTVyxJQUFJMUMsSUFBSixDQUFTbUQsR0FGUDtBQUdYbkIsd0JBQVk7QUFIRCxXQUFiO0FBS0Q7QUFDRixPQWZEO0FBZ0JEOzs7MkJBR01xQixLLEVBQU87QUFDWixXQUFLUixJQUFMLEdBQVlRLE1BQU1SLElBQWxCO0FBQ0EsV0FBS0csVUFBTCxHQUFrQkssTUFBTUwsVUFBeEI7QUFDQSxXQUFLQyxjQUFMLEdBQXNCSSxNQUFNSixjQUE1QjtBQUNBLFdBQUtDLFFBQUwsR0FBZ0JHLE1BQU1ILFFBQXRCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNEOzs7K0JBRVM7QUFDUmpDLGNBQVFDLEdBQVIsQ0FBWSxRQUFaO0FBQ0FJLG9CQUFjLEtBQUtkLE1BQW5CO0FBQ0EsV0FBS0osR0FBTCxHQUFXLEVBQVg7QUFDRDs7OztFQXZRcUNrRCxlQUFLQyxJOztrQkFBeEI1RCxVIiwiZmlsZSI6ImxvZ2luLXBob25lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCB3eFJlcXVlc3QgZnJvbSAnLi4vdXRpbC9yZXF1ZXN0J1xuICBcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9naW5QaG9uZSBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+eZu+W9lScsXG4gICAgICAvLyBkaXNhYmxlU2Nyb2xsOiB0cnVlXG4gICAgfVxuICAgIGNvbXBvbmVudHMgPSB7XG4gICAgfVxuXG4gICAgbWl4aW5zID0gW11cblxuICAgIGRhdGEgPSB7XG4gICAgICBpc0Vycm9yOiBmYWxzZSxcbiAgICAgIGlzSGlkZTogZmFsc2UsXG4gICAgICBjb2RlVGV4dDon5Y+R6YCB6aqM6K+B56CBJyxcbiAgICAgIG51bTogNjAsXG4gICAgICB0aXBUZXh0OicnLFxuICAgICAgLy8gaXNEaXNhYmxlZEJ0bjogdHJ1ZSxcbiAgICAgIFJQaG9uZTogZmFsc2UsXG4gICAgICBSQ29kZTogZmFsc2UsXG4gICAgICB0aW1lcmE6IG51bGxcbiAgICB9XG4gICAgY29tcHV0ZWQgPSB7fVxuXG4gICAgLy8g5LqL5Lu25Ye95pWwXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGdldFBob25lKGUpe1xuICAgICAgICB0aGlzLnBob25lID0gZS5kZXRhaWwudmFsdWU7XG4gICAgICB9LFxuICAgICAgd2lydGVDb2RlKGUpe1xuICAgICAgICBjb25zb2xlLmxvZyhlKVxuICAgICAgICB0aGlzLmNvZGUgPSBlLmRldGFpbC52YWx1ZTtcbiAgICAgIH0sXG4gICAgICAvLyDlj5HpgIHpqozor4HnoIFcbiAgICAgIHNlbmRDb2RlKCl7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuUlBob25lKVxuICAgICAgICBpZih0aGlzLlJQaG9uZSA9PSBmYWxzZSkgcmV0dXJuO1xuICAgICAgICBpZih0aGlzLm51bSA8IDYwKSByZXR1cm47XG4gICAgICAgIC8vIHRoaXMuY2hlY2tQaG9uZSgpO1xuICAgICAgICAgIHRoaXMuZ2V0Q29kZSgpO1xuICAgICAgICAgIHRoaXMubnVtIC0tO1xuICAgICAgICAgIHRoaXMuY29kZVRleHQgPSB0aGlzLm51bSArJ+enkuWQjuWPkemAgSc7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyYSlcbiAgICAgICAgICB0aGlzLnRpbWVyYSA9IHNldEludGVydmFsKCgpPT57XG4gICAgICAgICAgICBpZih0aGlzLm51bSA9PSAwKSB7XG4gICAgICAgICAgICAgIHRoaXMuY29kZVRleHQgPSBcIumHjeaWsOWPkemAgVwiO1xuICAgICAgICAgICAgICB0aGlzLm51bSA9IDYwO1xuICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMudGltZXJhKVxuICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coOTk5OSlcbiAgICAgICAgICAgICAgdGhpcy5udW0gLS07XG4gICAgICAgICAgICAgIHRoaXMuY29kZVRleHQgPSB0aGlzLm51bSArICfnp5LlkI7lj5HpgIEnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgfSwxMDAwKVxuICAgICAgICBcblxuICAgICAgfSxcbiAgICAgIC8vIOmqjOivgemqjOivgeeggVxuICAgICAgY2hlY2tDb2RlKCl7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY29kZSlcbiAgICAgICAgbGV0IHJlZ0NvZGUgPSAvXlswLTldezR9JC87XG4gICAgICAgIGlmKHRoaXMuY29kZSl7XG4gICAgICAgICAgaWYoIXJlZ0NvZGUudGVzdCggdGhpcy5jb2RlICkpe1xuICAgICAgICAgICAgdGhpcy5SQ29kZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvLyB0aGlzLnRpcFRleHQgPSAn6aqM6K+B56CB5qC85byP6ZSZ6K+vJ1xuICAgICAgICAgICAgLy8gdGhpcy5lcnJvckZ1bigpO1xuICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgICBjb250ZW50OiAn6aqM6K+B56CB5qC85byP6ZSZ6K+vJyxcbiAgICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5SQ29kZSA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB0aGlzLlJDb2RlID0gZmFsc2VcbiAgICAgICAgICAvLyB0aGlzLnRpcFRleHQgPSAn6K+36L6T5YWl6aqM6K+B56CBJ1xuICAgICAgICAgIC8vIHRoaXMuZXJyb3JGdW4oKTtcbiAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgY29udGVudDogJ+mqjOivgeeggeS4uuepuicsXG4gICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGxvZ2luKCl7XG4gICAgICAgIHNldFRpbWVvdXQoKCk9PntcbiAgICAgICAgICBjb25zb2xlLmxvZyggdGhpcy5waG9uZSAsIHRoaXMuUlBob25lICwgdGhpcy5jb2RlICwgdGhpcy5SQ29kZSlcbiAgICAgICAgICBpZih0aGlzLnBob25lICYmICF0aGlzLlJQaG9uZSl7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygn5omL5py65Y+3MScpXG4gICAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6ICfmiYvmnLrlj7fnoIHmoLzlvI/plJnor68nLFxuICAgICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcbiAgICAgICAgICAgICAgZHVyYXRpb246IDEwMDBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfWVsc2UgaWYoIXRoaXMucGhvbmUpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ+aJi+acuuWPtzInKVxuICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgICBjb250ZW50OiAn5omL5py65Y+356CB5Li656m6JyxcbiAgICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZih0aGlzLmNvZGUgJiYgIXRoaXMuUkNvZGUpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ+mqjOivgeeggTEnKVxuICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgICBjb250ZW50OiAn6aqM6K+B56CB6ZSZ6K+vJyxcbiAgICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1lbHNlIGlmKCF0aGlzLmNvZGUpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ+mqjOivgeeggTInKVxuICAgICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgICBjb250ZW50OiAn6aqM6K+B56CB5Li656m6JyxcbiAgICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgIFxuICAgICAgICAgIGlmKHRoaXMuUkNvZGUgJiYgdGhpcy5SUGhvbmUpe1xuICAgICAgICAgICAgdGhpcy5sb2dpbkZ1bigpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwxMDApXG4gICAgICAgIFxuICAgICAgICAvKiBsZXQgcmVnQ29kZSA9IC9eWzAtOV17NH0kLztcbiAgICAgICAgaWYodGhpcy5jb2RlKXtcbiAgICAgICAgICBpZighcmVnQ29kZS50ZXN0KCB0aGlzLmNvZGUgKSl7XG4gICAgICAgICAgICB0aGlzLnRpcFRleHQgPSAn6aqM6K+B56CB5qC85byP6ZSZ6K+vJ1xuICAgICAgICAgICAgdGhpcy5lcnJvckZ1bigpO1xuICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyB0aGlzLiRuYXZpZ2F0ZSgnL3BhZ2VzL2dyb3VwLWRldGFpbCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgdGhpcy50aXBUZXh0ID0gJ+ivt+i+k+WFpemqjOivgeeggSdcbiAgICAgICAgICB0aGlzLmVycm9yRnVuKCk7XG4gICAgICAgIH0gKi9cbiAgICAgIH0sXG4gICAgfVxuICAgIGV2ZW50cyA9IHt9XG4gICAgLy8g55m75b2VXG4gICAgbG9naW5GdW4oKXtcbiAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgIHd4UmVxdWVzdCh7IG1ldGhvZDoncG9zdCcsZGF0YTp7IHBob25lOnRoaXMucGhvbmUsc21zX2NvZGU6dGhpcy5jb2RlICB9IH0sJy9iaW5kUGhvbmUnKS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ0FjdGljaXR5VXNlcicsIHJlcy5kYXRhLmRhdGEudXNlcilcbiAgICAgICAgaWYocmVzLmRhdGEuY29kZSA9PSAxKXtcbiAgICAgICAgICBpZih0aGF0LmZyb20gPT0gJy9wYWdlcy9vcmRlcicpe1xuICAgICAgICAgICAgdGhhdC4kc3dpdGNoKHRoYXQuZnJvbSlcbiAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHRoYXQuJHJlZGlyZWN0KHRoYXQuZnJvbSx7YWN0aXZpdHlJZDp0aGF0LmFjdGl2aXR5SWQsZ3JvdXBJbnZpdGVySWQ6dGhhdC5ncm91cEludml0ZXJJZCxmcm9tOidsb2dpbicsYnV5UHJpY2U6dGhpcy5idXlQcmljZX0pXG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICBjb250ZW50OiByZXMuZGF0YS5tc2csXG4gICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgLy8g6aqM6K+B5omL5py65Y+3XG4gICAgY2hlY2tQaG9uZSgpe1xuICAgICAgbGV0IHJlZ1Bob25lID0gL15bMV1bMyw0LDUsNyw4XVswLTldezl9JC87XG4gICAgICBpZih0aGlzLnBob25lKXtcbiAgICAgICAgaWYoIXJlZ1Bob25lLnRlc3QoIHRoaXMucGhvbmUgKSl7XG4gICAgICAgICAgdGhpcy5SUGhvbmUgPSBmYWxzZTtcbiAgICAgICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICAgICAgdGl0bGU6ICfmj5DnpLonLFxuICAgICAgICAgICAgY29udGVudDogJ+aJi+acuuWPt+eggeagvOW8j+S4jeato+ehricsXG4gICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZSxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwXG4gICAgICAgICAgfSlcbiAgICAgICAgICAvLyB0aGlzLnRpcFRleHQgPSAn5omL5py65Y+356CB5qC85byP5LiN5q2j56GuJ1xuICAgICAgICAgIC8vIHRoaXMuZXJyb3JGdW4oKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICB0aGlzLlJQaG9uZSA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfWVsc2V7XG4gICAgICAgIHRoaXMuUlBob25lID0gZmFsc2U7XG4gICAgICAgIC8vIHRoaXMudGlwVGV4dCA9ICfmiYvmnLrlj7fnoIHkuI3og73kuLrnqbonXG4gICAgICAgIC8vIHRoaXMuZXJyb3JGdW4oKTtcbiAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgIGNvbnRlbnQ6ICfmiYvmnLrlj7fnoIHkuI3og73kuLrnqbonLFxuICAgICAgICAgICAgc2hvd0NhbmNlbDogZmFsc2UsXG4gICAgICAgICAgICBkdXJhdGlvbjogMTAwMFxuICAgICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vIGVycm9yRnVuKCl7XG4gICAgLy8gICB0aGlzLmlzRXJyb3IgPSB0cnVlO1xuICAgIC8vICAgdGhpcy5pc0hpZGUgPSBmYWxzZTtcbiAgICAvLyAgIHNldFRpbWVvdXQoKCk9PntcbiAgICAvLyAgICAgdGhpcy5pc0Vycm9yID0gZmFsc2U7XG4gICAgLy8gICAgIHRoaXMuaXNIaWRlID0gdHJ1ZTtcbiAgICAvLyAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAvLyAgIH0sMjAwMClcbiAgICAvLyB9XG4gICAgLy/ojrflj5bpqozor4HnoIFcbiAgICBnZXRDb2RlKCl7XG4gICAgICB3eFJlcXVlc3QoeyBtZXRob2Q6J3Bvc3QnLGRhdGE6eyBwaG9uZTp0aGlzLnBob25lIH0gfSwnL3NlbmRTbXNDb2RlJykudGhlbihyZXMgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmKHJlcy5kYXRhLmNvZGUgPT0gMSl7XG4gICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgIGNvbnRlbnQ6J+WPkemAgeaIkOWKnywg6K+35rOo5oSP5p+l5pS255+t5L+hJyxcbiAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlXG4gICAgICAgICAgfSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHJlcy5kYXRhLm1zZyxcbiAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIFxuXG4gICAgb25Mb2FkKHBhcmFtKSB7XG4gICAgICB0aGlzLmZyb20gPSBwYXJhbS5mcm9tO1xuICAgICAgdGhpcy5hY3Rpdml0eUlkID0gcGFyYW0uYWN0aXZpdHlJZDtcbiAgICAgIHRoaXMuZ3JvdXBJbnZpdGVySWQgPSBwYXJhbS5ncm91cEludml0ZXJJZDtcbiAgICAgIHRoaXMuYnV5UHJpY2UgPSBwYXJhbS5idXlQcmljZTtcbiAgICBcbiAgICAgIC8vIOafpeeci+aYr+WQpuaOiOadg+i/h1xuICAgICAgLy8gd3guZ2V0U2V0dGluZyh7XG4gICAgICAvLyAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgIC8vICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAvLyAgICAgdmFyIGRhdGEgPSByZXMuYXV0aFNldHRpbmc7XG4gICAgICAvLyAgICAgaWYoIWRhdGEuYXV0aFNldHRpbmcpe1xuICAgICAgLy8gICAgICAgd3guYXV0aG9yaXplKHtcbiAgICAgIC8vICAgICAgICAgICBzY29wZTogJ3Njb3BlLnVzZXJJbmZvJyxcbiAgICAgIC8vICAgICAgICAgICBzdWNjZXNzKHJlcykge1xuICAgICAgLy8gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgIC8vICAgICAgICAgICB9XG4gICAgICAvLyAgICAgICB9KVxuICAgICAgLy8gICAgIH1cbiAgICAgIC8vICAgfVxuICAgICAgLy8gfSlcbiAgICB9XG4gICBcbiAgICBvblVubG9hZCgpe1xuICAgICAgY29uc29sZS5sb2coJ3VubG9hZCcpXG4gICAgICBjbGVhckludGVydmFsKHRoaXMudGltZXJhKVxuICAgICAgdGhpcy5udW0gPSA2MDtcbiAgICB9XG4gIH1cbiJdfQ==