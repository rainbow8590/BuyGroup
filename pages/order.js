'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _request = require('./../util/request.js');

var _request2 = _interopRequireDefault(_request);

var _public = require('./../util/public.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Order = function (_wepy$page) {
  _inherits(Order, _wepy$page);

  function Order() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Order);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Order.__proto__ || Object.getPrototypeOf(Order)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '个人中心'
      // disableScroll: true
    }, _this.components = {}, _this.mixins = [], _this.data = {
      // token: wx.getStorageSync('token'),
      ActicityUser: wx.getStorageSync('user'),
      orderList: []
    }, _this.computed = {}, _this.methods = {
      goOrderDetail: function goOrderDetail(tipIndex, e) {
        var activityInfo = this.orderList[tipIndex];
        this.$navigate('/pages/order-detail', { orderId: activityInfo.order_id, formId: e.detail.formId });
        // this.$navigate('/pages/launch-group',{orderId: activityInfo.order_id,formId:e.detail.formId})
      },
      goLogin: function goLogin(res) {
        var _this2 = this;

        console.log(1111);
        console.log(res);
        if (res.detail.errMsg.indexOf('ok') != -1) {
          // 授权信息后登陆
          wx.login({
            success: function success(re) {
              if (re.code) {
                var params = {
                  method: 'post',
                  data: {
                    code: re.code,
                    type: 1,
                    encrypted_data: res.detail.encryptedData,
                    iv: res.detail.iv
                  }
                };
                console.log(121212121212121);
                // 登录
                (0, _request2.default)(params, '/login').then(function (r) {

                  console.log(r);
                  // 储存token
                  wx.setStorageSync('token', r.data.data.token);
                  // wx.setStorageSync('user', r.data.data.user)
                  // 登录完成 跳转到登录之前的页面,并将携带用户信息
                  _this2.$navigate('/pages/login', {
                    from: '/' + _this2.$wxpage.route,
                    // raw_data: res.detail.rawData,
                    // signature: res.detail.signature,
                    encrypted_data: res.detail.encryptedData,
                    iv: res.detail.iv
                  });
                });
              }
            }

          });
        }
      }
    }, _this.events = {}
    // 组件上的事件


    /* onTabItemTap(item) {
      // console.log(this.$wxpage.route)
      // 点击订单页面的时候, 检查是否登录过
      if(item.index == 1){
        // 没有登录就跳到登录页面
        if(!this.username){
          this.$navigate('/pages/login',{from:'/'+this.$wxpage.route})
        }
      }
    } */
    // 获取订单列表数据
    , _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Order, [{
    key: 'getOrderList',
    value: function getOrderList() {
      var _this3 = this;

      this.orderList = [];
      console.log(this.orderList);
      (0, _request2.default)({ method: 'post' }, '/order/list').then(function (res) {
        if (res.data.code == 1) {
          console.log(res.data.data);
          // this.orderList = res.data.data;
          for (var i = 0; i < res.data.data.length; i++) {
            var order = res.data.data[i];
            order.create_time = order.create_time.substr(0, order.create_time.lastIndexOf(':'));
            if (order.order_type == 1) {
              if (order.order_status == 1) {
                order.order_state = '购买成功';
              } else if (order.order_status == 0) {
                order.order_state = '未付款';
              } else {
                order.order_state = '已退款';
              }
            } else if (order.order_type == 2) {
              if (order.order_status == 1) {
                order.order_state = '团购成功';
              } else if (order.order_status == 0) {
                order.order_state = '团购中';
              } else {
                order.order_state = '已退款';
              }
            }

            if (order.order_status == 1) {
              _this3.orderList.push(order);
            }
            // var times = timestampToTime(order.create_time)
            // order.create_date = times.Y +'/'+times.M +'/'+times.D +'  '+ times.h +':' + times.m
            // order.order_state = order.order_status == 0?'购买成功':'购买失败'
          }
          console.log(_this3.orderList);
          _this3.$apply();
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false
          });
        }

        // console.log(this.orderList)
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad(params) {
      console.log(34434);

      // this.token =  wx.getStorageSync('token');
      //首次进入订单页面, 先判断是否登录, 登录了再请求订单列表
      this.ActicityUser = wx.getStorageSync('ActicityUser');
      // if(this.ActicityUser){
      //   this.getOrderList();
      // }
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      // console.log(this.$parent.globalData.already)
      //因为switch不执行onLoad, 需要在onShow中再判断一次 
      // onLoad没有登录,获取onShow时的登录状态,
      if (!this.ActicityUser) {
        this.ActicityUser = wx.getStorageSync('ActicityUser');
      }
      //检测到登录后再获取订单列表
      // if(this.ActicityUser && this.$parent.globalData.isBuy || this.$parent.globalData.already == 1){
      //   this.getOrderList();
      // }
      if (this.ActicityUser) {
        this.getOrderList();
      }
    }
  }, {
    key: 'onHide',
    value: function onHide() {
      // console.log(1221212) 
      this.$parent.globalData.already = 0;
      this.$parent.globalData.isBuy = false;
    }
  }]);

  return Order;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Order , 'pages/order'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyLmpzIl0sIm5hbWVzIjpbIk9yZGVyIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJtaXhpbnMiLCJkYXRhIiwiQWN0aWNpdHlVc2VyIiwid3giLCJnZXRTdG9yYWdlU3luYyIsIm9yZGVyTGlzdCIsImNvbXB1dGVkIiwibWV0aG9kcyIsImdvT3JkZXJEZXRhaWwiLCJ0aXBJbmRleCIsImUiLCJhY3Rpdml0eUluZm8iLCIkbmF2aWdhdGUiLCJvcmRlcklkIiwib3JkZXJfaWQiLCJmb3JtSWQiLCJkZXRhaWwiLCJnb0xvZ2luIiwicmVzIiwiY29uc29sZSIsImxvZyIsImVyck1zZyIsImluZGV4T2YiLCJsb2dpbiIsInN1Y2Nlc3MiLCJyZSIsImNvZGUiLCJwYXJhbXMiLCJtZXRob2QiLCJ0eXBlIiwiZW5jcnlwdGVkX2RhdGEiLCJlbmNyeXB0ZWREYXRhIiwiaXYiLCJ0aGVuIiwiciIsInNldFN0b3JhZ2VTeW5jIiwidG9rZW4iLCJmcm9tIiwiJHd4cGFnZSIsInJvdXRlIiwiZXZlbnRzIiwiaSIsImxlbmd0aCIsIm9yZGVyIiwiY3JlYXRlX3RpbWUiLCJzdWJzdHIiLCJsYXN0SW5kZXhPZiIsIm9yZGVyX3R5cGUiLCJvcmRlcl9zdGF0dXMiLCJvcmRlcl9zdGF0ZSIsInB1c2giLCIkYXBwbHkiLCJzaG93TW9kYWwiLCJ0aXRsZSIsImNvbnRlbnQiLCJtc2ciLCJzaG93Q2FuY2VsIiwiZ2V0T3JkZXJMaXN0IiwiJHBhcmVudCIsImdsb2JhbERhdGEiLCJhbHJlYWR5IiwiaXNCdXkiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFDeEI7QUFGTyxLLFFBSVRDLFUsR0FBYSxFLFFBRWJDLE0sR0FBUyxFLFFBRVRDLEksR0FBTztBQUNMO0FBQ0FD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YUFBS0EsWUFBTCxHQUFxQkMsR0FBR0MsY0FBSCxDQUFrQixjQUFsQixDQUFyQjtBQUNEO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFHLEtBQUtGLFlBQVIsRUFBcUI7QUFDbkIsYUFBS3VELFlBQUw7QUFDRDtBQUNGOzs7NkJBQ087QUFDTjtBQUNBLFdBQUtDLE9BQUwsQ0FBYUMsVUFBYixDQUF3QkMsT0FBeEIsR0FBa0MsQ0FBbEM7QUFDQSxXQUFLRixPQUFMLENBQWFDLFVBQWIsQ0FBd0JFLEtBQXhCLEdBQWdDLEtBQWhDO0FBQ0Q7Ozs7RUFsS2dDQyxlQUFLQyxJOztrQkFBbkJuRSxLIiwiZmlsZSI6Im9yZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCB3eFJlcXVlc3QgZnJvbSAnLi4vdXRpbC9yZXF1ZXN0J1xuICBpbXBvcnQge3RpbWVzdGFtcFRvVGltZX0gZnJvbSAnLi4vdXRpbC9wdWJsaWMnXG4gIFxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBPcmRlciBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+S4quS6uuS4reW/gycsXG4gICAgICAvLyBkaXNhYmxlU2Nyb2xsOiB0cnVlXG4gICAgfVxuICAgIGNvbXBvbmVudHMgPSB7fVxuXG4gICAgbWl4aW5zID0gW11cblxuICAgIGRhdGEgPSB7XG4gICAgICAvLyB0b2tlbjogd3guZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJyksXG4gICAgICBBY3RpY2l0eVVzZXI6IHd4LmdldFN0b3JhZ2VTeW5jKCd1c2VyJyksXG4gICAgICBvcmRlckxpc3Q6W11cbiAgICB9XG5cbiAgICBjb21wdXRlZCA9IHt9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgZ29PcmRlckRldGFpbCh0aXBJbmRleCxlKXtcbiAgICAgICAgbGV0IGFjdGl2aXR5SW5mbyA9IHRoaXMub3JkZXJMaXN0W3RpcEluZGV4XVxuICAgICAgICB0aGlzLiRuYXZpZ2F0ZSgnL3BhZ2VzL29yZGVyLWRldGFpbCcse29yZGVySWQ6IGFjdGl2aXR5SW5mby5vcmRlcl9pZCxmb3JtSWQ6ZS5kZXRhaWwuZm9ybUlkfSlcbiAgICAgICAgLy8gdGhpcy4kbmF2aWdhdGUoJy9wYWdlcy9sYXVuY2gtZ3JvdXAnLHtvcmRlcklkOiBhY3Rpdml0eUluZm8ub3JkZXJfaWQsZm9ybUlkOmUuZGV0YWlsLmZvcm1JZH0pXG4gICAgICB9LFxuICAgICAgZ29Mb2dpbihyZXMpe1xuICAgICAgICBjb25zb2xlLmxvZygxMTExKVxuICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGlmKHJlcy5kZXRhaWwuZXJyTXNnLmluZGV4T2YoJ29rJykgIT0gLTEpe1xuICAgICAgICAgIC8vIOaOiOadg+S/oeaBr+WQjueZu+mZhlxuICAgICAgICAgIHd4LmxvZ2luKHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHJlID0+IHtcbiAgICAgICAgICAgICAgaWYocmUuY29kZSl7XG4gICAgICAgICAgICAgICAgbGV0IHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICAgIG1ldGhvZDoncG9zdCcsXG4gICAgICAgICAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgICAgICAgICAgY29kZTpyZS5jb2RlLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAxLFxuICAgICAgICAgICAgICAgICAgICBlbmNyeXB0ZWRfZGF0YTpyZXMuZGV0YWlsLmVuY3J5cHRlZERhdGEsXG4gICAgICAgICAgICAgICAgICAgIGl2OiByZXMuZGV0YWlsLml2LFxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygxMjEyMTIxMjEyMTIxMjEpXG4gICAgICAgICAgICAgICAgICAvLyDnmbvlvZVcbiAgICAgICAgICAgICAgICAgIHd4UmVxdWVzdChwYXJhbXMsJy9sb2dpbicpLnRoZW4ociA9PiB7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyKVxuICAgICAgICAgICAgICAgICAgICAgIC8vIOWCqOWtmHRva2VuXG4gICAgICAgICAgICAgICAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoJ3Rva2VuJywgci5kYXRhLmRhdGEudG9rZW4pXG4gICAgICAgICAgICAgICAgICAgICAgLy8gd3guc2V0U3RvcmFnZVN5bmMoJ3VzZXInLCByLmRhdGEuZGF0YS51c2VyKVxuICAgICAgICAgICAgICAgICAgICAgIC8vIOeZu+W9leWujOaIkCDot7PovazliLDnmbvlvZXkuYvliY3nmoTpobXpnaIs5bm25bCG5pC65bim55So5oi35L+h5oGvXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy4kbmF2aWdhdGUoJy9wYWdlcy9sb2dpbicse1xuICAgICAgICAgICAgICAgICAgICAgICAgZnJvbTogJy8nK3RoaXMuJHd4cGFnZS5yb3V0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJhd19kYXRhOiByZXMuZGV0YWlsLnJhd0RhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzaWduYXR1cmU6IHJlcy5kZXRhaWwuc2lnbmF0dXJlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZW5jcnlwdGVkX2RhdGE6cmVzLmRldGFpbC5lbmNyeXB0ZWREYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXY6cmVzLmRldGFpbC5pdixcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICB9KVxuICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICB9XG4gICAgfVxuICAgIGV2ZW50cyA9IHtcbiAgICAgIC8vIOe7hOS7tuS4iueahOS6i+S7tlxuICAgIH1cbiAgICBcbiAgICAvKiBvblRhYkl0ZW1UYXAoaXRlbSkge1xuICAgICAgLy8gY29uc29sZS5sb2codGhpcy4kd3hwYWdlLnJvdXRlKVxuICAgICAgLy8g54K55Ye76K6i5Y2V6aG16Z2i55qE5pe25YCZLCDmo4Dmn6XmmK/lkKbnmbvlvZXov4dcbiAgICAgIGlmKGl0ZW0uaW5kZXggPT0gMSl7XG4gICAgICAgIC8vIOayoeacieeZu+W9leWwsei3s+WIsOeZu+W9lemhtemdolxuICAgICAgICBpZighdGhpcy51c2VybmFtZSl7XG4gICAgICAgICAgdGhpcy4kbmF2aWdhdGUoJy9wYWdlcy9sb2dpbicse2Zyb206Jy8nK3RoaXMuJHd4cGFnZS5yb3V0ZX0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9ICovXG4gICAgLy8g6I635Y+W6K6i5Y2V5YiX6KGo5pWw5o2uXG4gICAgZ2V0T3JkZXJMaXN0KCl7XG4gICAgICB0aGlzLm9yZGVyTGlzdCA9IFtdO1xuICAgICAgY29uc29sZS5sb2codGhpcy5vcmRlckxpc3QpXG4gICAgICB3eFJlcXVlc3Qoe21ldGhvZDoncG9zdCd9LCcvb3JkZXIvbGlzdCcpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgaWYocmVzLmRhdGEuY29kZSA9PSAxKXtcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YS5kYXRhKVxuICAgICAgICAgIC8vIHRoaXMub3JkZXJMaXN0ID0gcmVzLmRhdGEuZGF0YTtcbiAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgcmVzLmRhdGEuZGF0YS5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBsZXQgb3JkZXIgPSByZXMuZGF0YS5kYXRhW2ldXG4gICAgICAgICAgICBvcmRlci5jcmVhdGVfdGltZSA9IG9yZGVyLmNyZWF0ZV90aW1lLnN1YnN0cigwLCBvcmRlci5jcmVhdGVfdGltZS5sYXN0SW5kZXhPZignOicpKVxuICAgICAgICAgICAgaWYob3JkZXIub3JkZXJfdHlwZSA9PSAxKXtcbiAgICAgICAgICAgICAgaWYob3JkZXIub3JkZXJfc3RhdHVzID09IDEpe1xuICAgICAgICAgICAgICAgIG9yZGVyLm9yZGVyX3N0YXRlID0n6LSt5Lmw5oiQ5YqfJ1xuICAgICAgICAgICAgICB9ZWxzZSBpZihvcmRlci5vcmRlcl9zdGF0dXMgPT0gMCl7XG4gICAgICAgICAgICAgICAgb3JkZXIub3JkZXJfc3RhdGUgPSfmnKrku5jmrL4nXG4gICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIG9yZGVyLm9yZGVyX3N0YXRlID0n5bey6YCA5qy+J1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZSBpZihvcmRlci5vcmRlcl90eXBlID09IDIpe1xuICAgICAgICAgICAgICBpZihvcmRlci5vcmRlcl9zdGF0dXMgPT0gMSl7XG4gICAgICAgICAgICAgICAgb3JkZXIub3JkZXJfc3RhdGUgPSflm6LotK3miJDlip8nXG4gICAgICAgICAgICAgIH1lbHNlIGlmKG9yZGVyLm9yZGVyX3N0YXR1cyA9PSAwKXtcbiAgICAgICAgICAgICAgICBvcmRlci5vcmRlcl9zdGF0ZSA9J+Wboui0reS4rSdcbiAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgb3JkZXIub3JkZXJfc3RhdGUgPSflt7LpgIDmrL4nXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYob3JkZXIub3JkZXJfc3RhdHVzID09IDEpe1xuICAgICAgICAgICAgICB0aGlzLm9yZGVyTGlzdC5wdXNoKG9yZGVyKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gdmFyIHRpbWVzID0gdGltZXN0YW1wVG9UaW1lKG9yZGVyLmNyZWF0ZV90aW1lKVxuICAgICAgICAgICAgLy8gb3JkZXIuY3JlYXRlX2RhdGUgPSB0aW1lcy5ZICsnLycrdGltZXMuTSArJy8nK3RpbWVzLkQgKycgICcrIHRpbWVzLmggKyc6JyArIHRpbWVzLm1cbiAgICAgICAgICAgIC8vIG9yZGVyLm9yZGVyX3N0YXRlID0gb3JkZXIub3JkZXJfc3RhdHVzID09IDA/J+i0reS5sOaIkOWKnyc6J+i0reS5sOWksei0pSdcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc29sZS5sb2codGhpcy5vcmRlckxpc3QpXG4gICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgICAgIHRpdGxlOiAn5o+Q56S6JyxcbiAgICAgICAgICAgIGNvbnRlbnQ6IHJlcy5kYXRhLm1zZyxcbiAgICAgICAgICAgIHNob3dDYW5jZWw6IGZhbHNlXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5vcmRlckxpc3QpXG4gICAgICB9KVxuICAgIH1cbiAgICBcbiAgICBvbkxvYWQocGFyYW1zKSB7XG4gICAgICBjb25zb2xlLmxvZygzNDQzNClcbiAgICAgICBcbiAgICAgIC8vIHRoaXMudG9rZW4gPSAgd3guZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJyk7XG4gICAgICAvL+mmluasoei/m+WFpeiuouWNlemhtemdoiwg5YWI5Yik5pat5piv5ZCm55m75b2VLCDnmbvlvZXkuoblho3or7fmsYLorqLljZXliJfooahcbiAgICAgIHRoaXMuQWN0aWNpdHlVc2VyID0gIHd4LmdldFN0b3JhZ2VTeW5jKCdBY3RpY2l0eVVzZXInKTtcbiAgICAgIC8vIGlmKHRoaXMuQWN0aWNpdHlVc2VyKXtcbiAgICAgIC8vICAgdGhpcy5nZXRPcmRlckxpc3QoKTtcbiAgICAgIC8vIH1cbiAgICAgXG4gICAgfVxuICAgIFxuICAgIG9uU2hvdygpe1xuICAgICAgLy8gY29uc29sZS5sb2codGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuYWxyZWFkeSlcbiAgICAgIC8v5Zug5Li6c3dpdGNo5LiN5omn6KGMb25Mb2FkLCDpnIDopoHlnKhvblNob3fkuK3lho3liKTmlq3kuIDmrKEgXG4gICAgICAvLyBvbkxvYWTmsqHmnInnmbvlvZUs6I635Y+Wb25TaG935pe255qE55m75b2V54q25oCBLFxuICAgICAgaWYoIXRoaXMuQWN0aWNpdHlVc2VyKXtcbiAgICAgICAgdGhpcy5BY3RpY2l0eVVzZXIgPSAgd3guZ2V0U3RvcmFnZVN5bmMoJ0FjdGljaXR5VXNlcicpO1xuICAgICAgfSBcbiAgICAgIC8v5qOA5rWL5Yiw55m75b2V5ZCO5YaN6I635Y+W6K6i5Y2V5YiX6KGoXG4gICAgICAvLyBpZih0aGlzLkFjdGljaXR5VXNlciAmJiB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5pc0J1eSB8fCB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5hbHJlYWR5ID09IDEpe1xuICAgICAgLy8gICB0aGlzLmdldE9yZGVyTGlzdCgpO1xuICAgICAgLy8gfVxuICAgICAgaWYodGhpcy5BY3RpY2l0eVVzZXIpe1xuICAgICAgICB0aGlzLmdldE9yZGVyTGlzdCgpO1xuICAgICAgfVxuICAgIH1cbiAgICBvbkhpZGUoKXtcbiAgICAgIC8vIGNvbnNvbGUubG9nKDEyMjEyMTIpIFxuICAgICAgdGhpcy4kcGFyZW50Lmdsb2JhbERhdGEuYWxyZWFkeSA9IDA7XG4gICAgICB0aGlzLiRwYXJlbnQuZ2xvYmFsRGF0YS5pc0J1eSA9IGZhbHNlXG4gICAgfVxuICBcbiAgfVxuIl19