'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _public = require('./../util/public.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PaySuccess = function (_wepy$page) {
  _inherits(PaySuccess, _wepy$page);

  function PaySuccess() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PaySuccess);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PaySuccess.__proto__ || Object.getPrototypeOf(PaySuccess)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '支付成功'
      // disableScroll: true
    }, _this.components = {}, _this.mixins = [], _this.data = {
      isShowGroupCode: false,
      show: false,
      hide: false,
      activityInfo: {}
    }, _this.computed = {}, _this.methods = {
      // 查看活动
      goGroupDetail: function goGroupDetail() {
        this.$navigate('/pages/group-detail', { activityId: this.activityInfo.id, activityStatus: this.activityInfo.order_status });
      },

      // 点击加微信群 
      showGroupCode: function showGroupCode() {
        (0, _public.showGroupCode)(this);
      },

      // 关闭加群弹窗
      closeGroupCode: function closeGroupCode() {
        (0, _public.closeGroupCode)(this);
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PaySuccess, [{
    key: 'onLoad',
    value: function onLoad(params) {
      console.log(params);
      this.activityInfo = JSON.parse(params.activityInfo);
      console.log(this.activityInfo);
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
  }]);

  return PaySuccess;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(PaySuccess , 'pages/pay-success'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBheS1zdWNjZXNzLmpzIl0sIm5hbWVzIjpbIlBheVN1Y2Nlc3MiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJpc1Nob3dHcm91cENvZGUiLCJzaG93IiwiaGlkZSIsImFjdGl2aXR5SW5mbyIsImNvbXB1dGVkIiwibWV0aG9kcyIsImdvR3JvdXBEZXRhaWwiLCIkbmF2aWdhdGUiLCJhY3Rpdml0eUlkIiwiaWQiLCJhY3Rpdml0eVN0YXR1cyIsIm9yZGVyX3N0YXR1cyIsInNob3dHcm91cENvZGUiLCJjbG9zZUdyb3VwQ29kZSIsImV2ZW50cyIsInBhcmFtcyIsImNvbnNvbGUiLCJsb2ciLCJKU09OIiwicGFyc2UiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7Ozs7Ozs7OztJQUVxQkEsVTs7Ozs7Ozs7Ozs7Ozs7OExBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBQ3hCO0FBRk8sSyxRQUlUQyxVLEdBQWEsRSxRQUdiQyxNLEdBQVMsRSxRQUVUQyxJLEdBQU87QUFDTEMsdUJBQWlCLEtBRFo7QUFFTEMsWUFBTSxLQUZEO0FBR0xDLFlBQU0sS0FIRDtBQUlMQyxvQkFBYTtBQUpSLEssUUFPUEMsUSxHQUFXLEUsUUFJWEMsTyxHQUFVO0FBQ1I7QUFDQUMsbUJBRlEsMkJBRU87QUFDYixhQUFLQyxTQUFMLENBQWUscUJBQWYsRUFBcUMsRUFBQ0MsWUFBVyxLQUFLTCxZQUFMLENBQWtCTSxFQUE5QixFQUFpQ0MsZ0JBQWUsS0FBS1AsWUFBTCxDQUFrQlEsWUFBbEUsRUFBckM7QUFDRCxPQUpPOztBQUtSO0FBQ0FDLG1CQU5RLDJCQU1PO0FBQ2IsbUNBQWMsSUFBZDtBQUNELE9BUk87O0FBU1I7QUFDQUMsb0JBVlEsNEJBVVE7QUFDZCxvQ0FBZSxJQUFmO0FBQ0Q7QUFaTyxLLFFBZVZDLE0sR0FBUyxFOzs7OzsyQkFNRkMsTSxFQUFRO0FBQ2JDLGNBQVFDLEdBQVIsQ0FBWUYsTUFBWjtBQUNBLFdBQUtaLFlBQUwsR0FBb0JlLEtBQUtDLEtBQUwsQ0FBV0osT0FBT1osWUFBbEIsQ0FBcEI7QUFDQWEsY0FBUUMsR0FBUixDQUFZLEtBQUtkLFlBQWpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Q7Ozs7RUE3RHFDaUIsZUFBS0MsSTs7a0JBQXhCM0IsVSIsImZpbGUiOiJwYXktc3VjY2Vzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQge3Nob3dHcm91cENvZGUsY2xvc2VHcm91cENvZGV9IGZyb20gJy4uL3V0aWwvcHVibGljJ1xuICBcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGF5U3VjY2VzcyBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+aUr+S7mOaIkOWKnycsXG4gICAgICAvLyBkaXNhYmxlU2Nyb2xsOiB0cnVlXG4gICAgfVxuICAgIGNvbXBvbmVudHMgPSB7XG4gICAgfVxuXG4gICAgbWl4aW5zID0gW11cblxuICAgIGRhdGEgPSB7XG4gICAgICBpc1Nob3dHcm91cENvZGU6IGZhbHNlLFxuICAgICAgc2hvdzogZmFsc2UsXG4gICAgICBoaWRlOiBmYWxzZSxcbiAgICAgIGFjdGl2aXR5SW5mbzp7fVxuICAgIH1cblxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgXG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIC8vIOafpeeci+a0u+WKqFxuICAgICAgZ29Hcm91cERldGFpbCgpe1xuICAgICAgICB0aGlzLiRuYXZpZ2F0ZSgnL3BhZ2VzL2dyb3VwLWRldGFpbCcse2FjdGl2aXR5SWQ6dGhpcy5hY3Rpdml0eUluZm8uaWQsYWN0aXZpdHlTdGF0dXM6dGhpcy5hY3Rpdml0eUluZm8ub3JkZXJfc3RhdHVzfSk7XG4gICAgICB9LFxuICAgICAgLy8g54K55Ye75Yqg5b6u5L+h576kIFxuICAgICAgc2hvd0dyb3VwQ29kZSgpe1xuICAgICAgICBzaG93R3JvdXBDb2RlKHRoaXMpO1xuICAgICAgfSxcbiAgICAgIC8vIOWFs+mXreWKoOe+pOW8ueeql1xuICAgICAgY2xvc2VHcm91cENvZGUoKXtcbiAgICAgICAgY2xvc2VHcm91cENvZGUodGhpcyk7XG4gICAgICB9LFxuICAgIH1cblxuICAgIGV2ZW50cyA9IHtcbiAgICAgXG4gICAgfVxuICAgIFxuICAgIFxuXG4gICAgb25Mb2FkKHBhcmFtcykge1xuICAgICAgY29uc29sZS5sb2cocGFyYW1zKVxuICAgICAgdGhpcy5hY3Rpdml0eUluZm8gPSBKU09OLnBhcnNlKHBhcmFtcy5hY3Rpdml0eUluZm8pO1xuICAgICAgY29uc29sZS5sb2codGhpcy5hY3Rpdml0eUluZm8pXG4gICAgICAvLyDmn6XnnIvmmK/lkKbmjojmnYPov4dcbiAgICAgIC8vIHd4LmdldFNldHRpbmcoe1xuICAgICAgLy8gICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAvLyAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgLy8gICAgIHZhciBkYXRhID0gcmVzLmF1dGhTZXR0aW5nO1xuICAgICAgLy8gICAgIGlmKCFkYXRhLmF1dGhTZXR0aW5nKXtcbiAgICAgIC8vICAgICAgIHd4LmF1dGhvcml6ZSh7XG4gICAgICAvLyAgICAgICAgICAgc2NvcGU6ICdzY29wZS51c2VySW5mbycsXG4gICAgICAvLyAgICAgICAgICAgc3VjY2VzcyhyZXMpIHtcbiAgICAgIC8vICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAvLyAgICAgICAgICAgfVxuICAgICAgLy8gICAgICAgfSlcbiAgICAgIC8vICAgICB9XG4gICAgICAvLyAgIH1cbiAgICAgIC8vIH0pXG4gICAgfVxuICB9XG4iXX0=