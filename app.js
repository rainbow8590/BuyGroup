'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

require('./npm/wepy-async-function/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _default = function (_wepy$app) {
  _inherits(_default, _wepy$app);

  function _default() {
    _classCallCheck(this, _default);

    var _this = _possibleConstructorReturn(this, (_default.__proto__ || Object.getPrototypeOf(_default)).call(this));

    _this.config = {
      "pages": ["pages/index", // 支付成功
      "pages/share-pic", // 生成分享图片
      "pages/pay-success", // 支付成功
      "pages/launch-group", // 发起拼团成功页面
      "pages/group-detail", // 拼团详情
      "pages/order", // 订单列表
      "pages/login-phone", // 手机验证码登录
      "pages/login", "pages/order-detail"],
      "window": {
        "backgroundTextStyle": "light",
        "navigationBarBackgroundColor": "#fff",
        "navigationBarTitleText": "高思乐享",
        "navigationBarTextStyle": "black"
      },
      "tabBar": {
        "color": "#999999",
        "selectedColor": "#3dcc6f",
        "list": [{
          "pagePath": "pages/index",
          "iconPath": "image/order.png",
          "selectedIconPath": "image/order-active.png",
          "text": "热门活动"
        }, {
          "pagePath": "pages/order",
          "iconPath": "image/index.png",
          "selectedIconPath": "image/index-active.png",
          "text": "订单"
        }]
      }
    };
    _this.globalData = {
      userInfo: null,
      appId: 'web',
      appKey: 'test',
      isBuy: false, //是否买了商品,用与订单列表请求
      already: 0 //未登录时0, 登录1
    };

    _this.use('requestfix');
    // this.router = routerList
    return _this;
  }

  _createClass(_default, [{
    key: 'onLaunch',
    value: function onLaunch() {
      console.log(23);
      var res = wx.getSystemInfoSync();
      this.globalData.windowHeight = res.windowHeight;
      // console.log(wx.getStorageSync('token'))


      var isCan = wx.canIUse('getUpdateManager');
      // console.log(isCan)
      // console.log(isCan)
      //更新
      if (isCan) {
        var updateManager = wx.getUpdateManager();
        updateManager.onCheckForUpdate(function (res) {
          // 请求完新版本信息的回调
          console.log(res.hasUpdate);
          if (res.hasUpdate) {
            wx.showToast({
              title: '提示',
              mask: true,
              content: '该应用有新版本, 即将下载,请稍等',
              success: function success(res) {}
            });
          }
        });
        updateManager.onUpdateReady(function () {
          wx.showToast({
            title: '更新提示',
            mask: true,
            content: '新版本已经可以应用了',
            success: function success(res) {
              if (res.confirm) {
                updateManager.applyUpdate();
              }
            }
          });
        });
        updateManager.onUpdateFailed(function () {
          wx.showToast({
            title: '提示',
            mask: true,
            content: '下载失败, 请检查网络。',
            success: function success(res) {}
          });
        });
      } else {
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '当前微信版本过低，请升级最新微信版本。',
          success: function success() {
            wx.navigateBack({
              delta: 1
            });
          }
        });
      }
    }
  }, {
    key: 'onHide',
    value: function onHide() {
      this.isBuy = false; //是否买了商品,用与订单列表请求
      this.already = 0; //未登录时0, 登录1
    }

    // sleep (s) {
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve('promise resolved')
    //     }, s * 1000)
    //   })
    // }

    // async testAsync () {
    //   const data = await this.sleep(3)
    //   console.log(data)
    // }

    // getUserInfo(cb) {
    //   const that = this
    //   if (this.globalData.userInfo) {
    //     return this.globalData.userInfo
    //   }
    //   wepy.getUserInfo({
    //     success (res) {
    //       that.globalData.userInfo = res.userInfo
    //       cb && cb(res.userInfo)
    //     }
    //   })
    // }

  }]);

  return _default;
}(_wepy2.default.app);


App(require('./npm/wepy/lib/wepy.js').default.$createApp(_default, {"noPromiseAPI":["createSelectorQuery"]}));
require('./_wepylogs.js')

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJjb25maWciLCJnbG9iYWxEYXRhIiwidXNlckluZm8iLCJhcHBJZCIsImFwcEtleSIsImlzQnV5IiwiYWxyZWFkeSIsInVzZSIsImNvbnNvbGUiLCJsb2ciLCJyZXMiLCJ3eCIsImdldFN5c3RlbUluZm9TeW5jIiwid2luZG93SGVpZ2h0IiwiaXNDYW4iLCJjYW5JVXNlIiwidXBkYXRlTWFuYWdlciIsImdldFVwZGF0ZU1hbmFnZXIiLCJvbkNoZWNrRm9yVXBkYXRlIiwiaGFzVXBkYXRlIiwic2hvd1RvYXN0IiwidGl0bGUiLCJtYXNrIiwiY29udGVudCIsInN1Y2Nlc3MiLCJvblVwZGF0ZVJlYWR5IiwiY29uZmlybSIsImFwcGx5VXBkYXRlIiwib25VcGRhdGVGYWlsZWQiLCJzaG93TW9kYWwiLCJzaG93Q2FuY2VsIiwibmF2aWdhdGVCYWNrIiwiZGVsdGEiLCJ3ZXB5IiwiYXBwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7O0FBaURFLHNCQUFlO0FBQUE7O0FBQUE7O0FBQUEsVUE5Q2ZBLE1BOENlLEdBOUNOO0FBQ1AsZUFBUyxDQUNQLGFBRE8sRUFDUTtBQUNmLHVCQUZPLEVBRVk7QUFDbkIseUJBSE8sRUFHYztBQUNyQiwwQkFKTyxFQUllO0FBQ3RCLDBCQUxPLEVBS2U7QUFDdEIsbUJBTk8sRUFNUTtBQUNmLHlCQVBPLEVBT2M7QUFDckIsbUJBUk8sRUFTUCxvQkFUTyxDQURGO0FBWVAsZ0JBQVU7QUFDUiwrQkFBdUIsT0FEZjtBQUVSLHdDQUFnQyxNQUZ4QjtBQUdSLGtDQUEwQixNQUhsQjtBQUlSLGtDQUEwQjtBQUpsQixPQVpIO0FBa0JQLGdCQUFVO0FBQ1IsaUJBQVEsU0FEQTtBQUVSLHlCQUFnQixTQUZSO0FBR1IsZ0JBQVEsQ0FDTjtBQUNBLHNCQUFZLGFBRFo7QUFFQSxzQkFBVyxpQkFGWDtBQUdBLDhCQUFtQix3QkFIbkI7QUFJQSxrQkFBUTtBQUpSLFNBRE0sRUFPTjtBQUNFLHNCQUFZLGFBRGQ7QUFFRSxzQkFBVyxpQkFGYjtBQUdFLDhCQUFtQix3QkFIckI7QUFJRSxrQkFBUTtBQUpWLFNBUE07QUFIQTtBQWxCSCxLQThDTTtBQUFBLFVBUmZDLFVBUWUsR0FSRjtBQUNYQyxnQkFBVSxJQURDO0FBRVhDLGFBQU0sS0FGSztBQUdYQyxjQUFPLE1BSEk7QUFJWEMsYUFBTyxLQUpJLEVBSUc7QUFDZEMsZUFBUyxDQUxFLENBS0M7QUFMRCxLQVFFOztBQUViLFVBQUtDLEdBQUwsQ0FBUyxZQUFUO0FBQ0E7QUFIYTtBQUlkOzs7OytCQUVVO0FBQ1RDLGNBQVFDLEdBQVIsQ0FBWSxFQUFaO0FBQ0EsVUFBSUMsTUFBTUMsR0FBR0MsaUJBQUgsRUFBVjtBQUNBLFdBQUtYLFVBQUwsQ0FBZ0JZLFlBQWhCLEdBQStCSCxJQUFJRyxZQUFuQztBQUNBOzs7QUFHQSxVQUFJQyxRQUFRSCxHQUFHSSxPQUFILENBQVcsa0JBQVgsQ0FBWjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQUdELEtBQUgsRUFBUztBQUNQLFlBQU1FLGdCQUFnQkwsR0FBR00sZ0JBQUgsRUFBdEI7QUFDQUQsc0JBQWNFLGdCQUFkLENBQStCLFVBQVVSLEdBQVYsRUFBZTtBQUM1QztBQUNBRixrQkFBUUMsR0FBUixDQUFZQyxJQUFJUyxTQUFoQjtBQUNBLGNBQUdULElBQUlTLFNBQVAsRUFBaUI7QUFDZlIsZUFBR1MsU0FBSCxDQUFhO0FBQ1hDLHFCQUFPLElBREk7QUFFWEMsb0JBQU0sSUFGSztBQUdYQyx1QkFBUyxtQkFIRTtBQUlYQyx1QkFBUyxpQkFBVWQsR0FBVixFQUFlLENBQ3ZCO0FBTFUsYUFBYjtBQU9EO0FBQ0YsU0FaRDtBQWFBTSxzQkFBY1MsYUFBZCxDQUE0QixZQUFZO0FBQ3RDZCxhQUFHUyxTQUFILENBQWE7QUFDWEMsbUJBQU8sTUFESTtBQUVYQyxrQkFBTSxJQUZLO0FBR1hDLHFCQUFTLFlBSEU7QUFJWEMscUJBQVMsaUJBQVVkLEdBQVYsRUFBZTtBQUN0QixrQkFBSUEsSUFBSWdCLE9BQVIsRUFBaUI7QUFDZlYsOEJBQWNXLFdBQWQ7QUFDRDtBQUNGO0FBUlUsV0FBYjtBQVVELFNBWEQ7QUFZQVgsc0JBQWNZLGNBQWQsQ0FBNkIsWUFBWTtBQUN2Q2pCLGFBQUdTLFNBQUgsQ0FBYTtBQUNYQyxtQkFBTyxJQURJO0FBRVhDLGtCQUFNLElBRks7QUFHWEMscUJBQVMsY0FIRTtBQUlYQyxxQkFBUyxpQkFBVWQsR0FBVixFQUFlLENBQUU7QUFKZixXQUFiO0FBTUQsU0FQRDtBQVFELE9BbkNELE1BbUNLO0FBQ0hDLFdBQUdrQixTQUFILENBQWE7QUFDWFIsaUJBQU8sSUFESTtBQUVYUyxzQkFBWSxLQUZEO0FBR1hQLG1CQUFTLHFCQUhFO0FBSVhDLG1CQUFTLG1CQUFVO0FBQ2pCYixlQUFHb0IsWUFBSCxDQUFnQjtBQUNkQyxxQkFBTztBQURPLGFBQWhCO0FBR0Q7QUFSVSxTQUFiO0FBVUQ7QUFDRjs7OzZCQUNPO0FBQ04sV0FBSzNCLEtBQUwsR0FBYSxLQUFiLENBRE0sQ0FDYTtBQUNuQixXQUFLQyxPQUFMLEdBQWUsQ0FBZixDQUZNLENBRVc7QUFDbEI7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztFQTdJMkIyQixlQUFLQyxHIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbmltcG9ydCAnd2VweS1hc3luYy1mdW5jdGlvbidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyB3ZXB5LmFwcCB7XG4gIGNvbmZpZyA9IHtcbiAgICBcInBhZ2VzXCI6IFtcbiAgICAgIFwicGFnZXMvaW5kZXhcIiwgLy8g5pSv5LuY5oiQ5YqfXG4gICAgICBcInBhZ2VzL3NoYXJlLXBpY1wiLCAvLyDnlJ/miJDliIbkuqvlm77niYdcbiAgICAgIFwicGFnZXMvcGF5LXN1Y2Nlc3NcIiwgLy8g5pSv5LuY5oiQ5YqfXG4gICAgICBcInBhZ2VzL2xhdW5jaC1ncm91cFwiLCAvLyDlj5Hotbfmi7zlm6LmiJDlip/pobXpnaJcbiAgICAgIFwicGFnZXMvZ3JvdXAtZGV0YWlsXCIsIC8vIOaLvOWbouivpuaDhVxuICAgICAgXCJwYWdlcy9vcmRlclwiLCAvLyDorqLljZXliJfooahcbiAgICAgIFwicGFnZXMvbG9naW4tcGhvbmVcIiwgLy8g5omL5py66aqM6K+B56CB55m75b2VXG4gICAgICBcInBhZ2VzL2xvZ2luXCIsXG4gICAgICBcInBhZ2VzL29yZGVyLWRldGFpbFwiLCAvLyDorqLljZXor6bmg4VcbiAgICBdLFxuICAgIFwid2luZG93XCI6IHtcbiAgICAgIFwiYmFja2dyb3VuZFRleHRTdHlsZVwiOiBcImxpZ2h0XCIsXG4gICAgICBcIm5hdmlnYXRpb25CYXJCYWNrZ3JvdW5kQ29sb3JcIjogXCIjZmZmXCIsXG4gICAgICBcIm5hdmlnYXRpb25CYXJUaXRsZVRleHRcIjogXCLpq5jmgJ3kuZDkuqtcIixcbiAgICAgIFwibmF2aWdhdGlvbkJhclRleHRTdHlsZVwiOiBcImJsYWNrXCJcbiAgICB9LFxuICAgIFwidGFiQmFyXCI6IHtcbiAgICAgIFwiY29sb3JcIjpcIiM5OTk5OTlcIixcbiAgICAgIFwic2VsZWN0ZWRDb2xvclwiOlwiIzNkY2M2ZlwiLFxuICAgICAgXCJsaXN0XCI6IFtcbiAgICAgICAge1xuICAgICAgICBcInBhZ2VQYXRoXCI6IFwicGFnZXMvaW5kZXhcIixcbiAgICAgICAgXCJpY29uUGF0aFwiOlwiaW1hZ2Uvb3JkZXIucG5nXCIsXG4gICAgICAgIFwic2VsZWN0ZWRJY29uUGF0aFwiOlwiaW1hZ2Uvb3JkZXItYWN0aXZlLnBuZ1wiLFxuICAgICAgICBcInRleHRcIjogXCLng63pl6jmtLvliqhcIlxuICAgICAgICB9LCBcbiAgICAgICAge1xuICAgICAgICAgIFwicGFnZVBhdGhcIjogXCJwYWdlcy9vcmRlclwiLFxuICAgICAgICAgIFwiaWNvblBhdGhcIjpcImltYWdlL2luZGV4LnBuZ1wiLFxuICAgICAgICAgIFwic2VsZWN0ZWRJY29uUGF0aFwiOlwiaW1hZ2UvaW5kZXgtYWN0aXZlLnBuZ1wiLFxuICAgICAgICAgIFwidGV4dFwiOiBcIuiuouWNlVwiXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9XG4gIH1cblxuICBnbG9iYWxEYXRhID0ge1xuICAgIHVzZXJJbmZvOiBudWxsLFxuICAgIGFwcElkOid3ZWInLFxuICAgIGFwcEtleTondGVzdCcsXG4gICAgaXNCdXk6IGZhbHNlLCAvL+aYr+WQpuS5sOS6huWVhuWTgSznlKjkuI7orqLljZXliJfooajor7fmsYJcbiAgICBhbHJlYWR5OiAwLCAvL+acqueZu+W9leaXtjAsIOeZu+W9lTFcbiAgfVxuXG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy51c2UoJ3JlcXVlc3RmaXgnKVxuICAgIC8vIHRoaXMucm91dGVyID0gcm91dGVyTGlzdFxuICB9XG5cbiAgb25MYXVuY2goKSB7XG4gICAgY29uc29sZS5sb2coMjMpXG4gICAgbGV0IHJlcyA9IHd4LmdldFN5c3RlbUluZm9TeW5jKClcbiAgICB0aGlzLmdsb2JhbERhdGEud2luZG93SGVpZ2h0ID0gcmVzLndpbmRvd0hlaWdodFxuICAgIC8vIGNvbnNvbGUubG9nKHd4LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpKVxuICAgIFxuXG4gICAgdmFyIGlzQ2FuID0gd3guY2FuSVVzZSgnZ2V0VXBkYXRlTWFuYWdlcicpXG4gICAgLy8gY29uc29sZS5sb2coaXNDYW4pXG4gICAgLy8gY29uc29sZS5sb2coaXNDYW4pXG4gICAgLy/mm7TmlrBcbiAgICBpZihpc0Nhbil7XG4gICAgICBjb25zdCB1cGRhdGVNYW5hZ2VyID0gd3guZ2V0VXBkYXRlTWFuYWdlcigpXG4gICAgICB1cGRhdGVNYW5hZ2VyLm9uQ2hlY2tGb3JVcGRhdGUoZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAvLyDor7fmsYLlrozmlrDniYjmnKzkv6Hmga/nmoTlm57osINcbiAgICAgICAgY29uc29sZS5sb2cocmVzLmhhc1VwZGF0ZSlcbiAgICAgICAgaWYocmVzLmhhc1VwZGF0ZSl7XG4gICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgIG1hc2s6IHRydWUsXG4gICAgICAgICAgICBjb250ZW50OiAn6K+l5bqU55So5pyJ5paw54mI5pysLCDljbPlsIbkuIvovb0s6K+356iN562JJyxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgdXBkYXRlTWFuYWdlci5vblVwZGF0ZVJlYWR5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICB0aXRsZTogJ+abtOaWsOaPkOekuicsXG4gICAgICAgICAgbWFzazogdHJ1ZSxcbiAgICAgICAgICBjb250ZW50OiAn5paw54mI5pys5bey57uP5Y+v5Lul5bqU55So5LqGJyxcbiAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICBpZiAocmVzLmNvbmZpcm0pIHtcbiAgICAgICAgICAgICAgdXBkYXRlTWFuYWdlci5hcHBseVVwZGF0ZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICAgIHVwZGF0ZU1hbmFnZXIub25VcGRhdGVGYWlsZWQoZnVuY3Rpb24gKCkge1xuICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICBtYXNrOiB0cnVlLFxuICAgICAgICAgIGNvbnRlbnQ6ICfkuIvovb3lpLHotKUsIOivt+ajgOafpee9kee7nOOAgicsXG4gICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge31cbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfWVsc2V7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgIHNob3dDYW5jZWw6IGZhbHNlLFxuICAgICAgICBjb250ZW50OiAn5b2T5YmN5b6u5L+h54mI5pys6L+H5L2O77yM6K+35Y2H57qn5pyA5paw5b6u5L+h54mI5pys44CCJyxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oKXtcbiAgICAgICAgICB3eC5uYXZpZ2F0ZUJhY2soe1xuICAgICAgICAgICAgZGVsdGE6IDFcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuICBvbkhpZGUoKXtcbiAgICB0aGlzLmlzQnV5ID0gZmFsc2UgLy/mmK/lkKbkubDkuobllYblk4Es55So5LiO6K6i5Y2V5YiX6KGo6K+35rGCXG4gICAgdGhpcy5hbHJlYWR5ID0gMCAvL+acqueZu+W9leaXtjAsIOeZu+W9lTFcbiAgfVxuXG4gIC8vIHNsZWVwIChzKSB7XG4gIC8vICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgLy8gICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAvLyAgICAgICByZXNvbHZlKCdwcm9taXNlIHJlc29sdmVkJylcbiAgLy8gICAgIH0sIHMgKiAxMDAwKVxuICAvLyAgIH0pXG4gIC8vIH1cblxuICAvLyBhc3luYyB0ZXN0QXN5bmMgKCkge1xuICAvLyAgIGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLnNsZWVwKDMpXG4gIC8vICAgY29uc29sZS5sb2coZGF0YSlcbiAgLy8gfVxuXG4gIC8vIGdldFVzZXJJbmZvKGNiKSB7XG4gIC8vICAgY29uc3QgdGhhdCA9IHRoaXNcbiAgLy8gICBpZiAodGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvKSB7XG4gIC8vICAgICByZXR1cm4gdGhpcy5nbG9iYWxEYXRhLnVzZXJJbmZvXG4gIC8vICAgfVxuICAvLyAgIHdlcHkuZ2V0VXNlckluZm8oe1xuICAvLyAgICAgc3VjY2VzcyAocmVzKSB7XG4gIC8vICAgICAgIHRoYXQuZ2xvYmFsRGF0YS51c2VySW5mbyA9IHJlcy51c2VySW5mb1xuICAvLyAgICAgICBjYiAmJiBjYihyZXMudXNlckluZm8pXG4gIC8vICAgICB9XG4gIC8vICAgfSlcbiAgLy8gfVxufVxuIl19