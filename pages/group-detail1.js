'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

// import API from '../util/data'

var GroupDetail = function (_wepy$page) {
  _inherits(GroupDetail, _wepy$page);

  function GroupDetail() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, GroupDetail);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = GroupDetail.__proto__ || Object.getPrototypeOf(GroupDetail)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '活动详情'
      // disableScroll: true
    }, _this.components = {}, _this.mixins = [], _this.data = {
      isShowPay: false, // 支付弹窗
      isShowGroupCode: false, // 去加群弹窗
      hours: 0,
      mins: 0,
      secs: 0,
      showFriend: false,
      hideFriend: false,
      showPay: false,
      hidePay: false,
      show: false,
      hide: false,
      activity: {},
      token: wx.getStorageSync('token'),
      ActicityUser: wx.getStorageSync('ActicityUser'),
      buyPrice: 0, //购买价格
      ajaxOver: false,
      selfInUsers: false, // 当前用户是否在购买者数组里
      ActivityStatus: '121',
      nowTime: 0
    }, _this.computed = {}, _this.methods = {
      // 查看订单
      goOrderDetail: function goOrderDetail() {
        console.log(this.activity);
        this.$navigate('/pages/order-detail', { orderId: this.activity.order_id });
      },

      // 点击立即报名 显示支付弹窗
      lookPay: function lookPay(buyType, price, res) {
        var _this2 = this;

        this.buy_type = buyType;
        // console.log(res)
        var that = this;
        // this.token = wx.getStorageSync('token');
        this.user = wx.getStorageSync('ActicityUser');
        // 只有授权成功才能进行支付
        if (res.detail.errMsg.indexOf('ok') != -1) {
          console.log(that.user);
          if (!this.user) {
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
                    // 登录
                  };(0, _request2.default)(params, '/login').then(function (r) {
                    console.log(r);
                    // 储存token
                    wx.setStorageSync('token', r.data.data.token);

                    // 登录完成 跳转到登录之前的页面,并将携带用户信息
                    _this2.$redirect('/pages/login', {
                      from: '/' + _this2.$wxpage.route,
                      encrypted_data: res.detail.encryptedData,
                      iv: res.detail.iv,
                      activityId: _this2.activityId,
                      groupInviterId: _this2.groupInviterId
                    });
                  });
                }
              }
            });
          } else {
            this.buyPrice = price;
            this.showPay = true;
            this.hidePay = false;
            this.$apply();
          }
          // this.buyPrice = price;
          // this.showPay = true;
          // this.hidePay = false;
          // this.$apply();
        }
      },

      // 关闭支付弹窗
      closePay: function closePay() {
        this.showPay = false;
        this.hidePay = true;
      },


      // 生成图片
      goSharePic: function goSharePic() {
        console.log(this.activity);
        var groupInviterId = this.activity.project_group_user.length > 0 ? this.activity.project_group_user[0].user_id : this.ActicityUser.user_id;
        this.$navigate('/pages/share-pic', { project_id: this.activity.id, group_inviter_id: groupInviterId });
      },


      // 邀请好友
      showFriend: function showFriend() {
        (0, _public.showFriend)(this);
      },

      // 关闭好友弹窗
      closeFriend: function closeFriend() {
        (0, _public.closeFriend)(this);
      },

      // 点击加微信群 
      showGroupCode: function showGroupCode() {
        (0, _public.showGroupCode)(this);
      },

      // 关闭加群弹窗
      closeGroupCode: function closeGroupCode() {
        (0, _public.closeGroupCode)(this);
      },

      // 微信支付成功
      pay: function pay() {
        var that = this;
        var params = {
          method: 'post',
          data: {
            price: this.buyPrice,
            project_id: this.activityId,
            buy_type: this.buy_type,
            group_inviter_id: this.activity.project_group_user.length > 0 ? this.activity.project_group_user[0].user_id : this.ActicityUser.user_id
          }
          // this.activity = {};
        };(0, _request2.default)(params, '/order/create').then(function (res) {
          console.log(res);
          if (res.data.code == 1) {
            // console.log(111)
            // 支付成功, 且价格为0, 跳转到支付成功
            if (that.buyPrice == '0.00') {
              that.$parent.globalData.isBuy = true;
              // 单独购买 和 成团单独购买
              if (that.activity.project_type == 1 || that.activity.project_type == 3 && that.buy_type == 1) {
                that.activity.order_status = 1;
                that.$apply();
                that.$navigate('/pages/pay-success', { activityInfo: JSON.stringify(that.activity) });
              } else {
                that.activity.project_group_user.push({
                  avatar_url: that.ActicityUser.avatar_url,
                  nickname: that.ActicityUser.nick_name,
                  order_status: 1,
                  user_id: that.ActicityUser.user_id
                });
                that.$apply();
                that.activity.order_status = 1;
                that.$navigate('/pages/launch-group', { activityInfo: JSON.stringify(that.activity), projectGroupNum: that.activity.project_group_num });
              }
              that.showPay = false;
              that.hidePay = true;
            } else {
              // console.log(2222)
              var payModel = res.data.data.order;
              console.log(payModel);
              wx.requestPayment({
                'timeStamp': payModel.timeStamp,
                'nonceStr': payModel.nonceStr,
                'package': payModel.package,
                'signType': payModel.signType,
                'paySign': payModel.paySign,
                'success': function success(r) {
                  console.log(r);
                  that.$parent.globalData.isBuy = true;
                  wx.showToast({
                    title: '支付成功',
                    icon: 'success',
                    duration: 2000,
                    mask: true,
                    success: function success(re) {
                      console.log('支付成功');
                      console.log(re);
                      //支付成功转到拼团成功页
                      //this.$navigate('/pages/pay-success');
                      if (that.activity.project_type == 1 || that.activity.project_type == 3 && that.buy_type == 1) {
                        that.activity.order_status = 1;
                        that.$apply();
                        that.$navigate('/pages/pay-success', { activityInfo: JSON.stringify(that.activity) });
                      } else {
                        that.activity.project_group_user.push({
                          avatar_url: that.ActicityUser.avatar_url,
                          nickname: that.ActicityUser.nick_name,
                          order_status: 1,
                          user_id: that.ActicityUser.user_id
                        });
                        that.activity.order_status = 1;
                        that.$apply();
                        console.log(that.activity);
                        console.log(that.activity.project_group_user);
                        that.$navigate('/pages/launch-group', { activityInfo: JSON.stringify(that.activity), projectGroupNum: that.activity.project_group_num });
                      }
                    }
                  });
                },
                'fail': function fail(_fail) {
                  console.log(_fail);
                }
              });
            }
          }
        });
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(GroupDetail, [{
    key: 'Countdown',

    // 倒计时
    value: function Countdown(countdown) {
      // let future = new Date(futureTime).getTime();
      // let now = new Date().getTime();
      var diff = countdown;
      if (diff < 0) return {
        day: '00',
        hour: '00',
        min: '00',
        sec: '00'
        //获取时间差的天
      };var day = getTwo(parseInt(diff / (24 * 60 * 60))) == '00' ? '00' : getTwo(parseInt(diff / (24 * 60 * 60)));
      //获取时间差的时
      var hour = getTwo(parseInt(diff / (60 * 60) % 24)) == '00' ? '00' : getTwo(parseInt(diff / (60 * 60) % 24));
      //获取时间差的分
      var min = getTwo(parseInt(diff / 60 % 60)) == '00' ? '00' : getTwo(parseInt(diff / 60 % 60));
      //获取时间差的秒
      var sec = getTwo(parseInt(diff % 60)) == '00' ? '00' : getTwo(parseInt(diff % 60));
      //处理个位数
      function getTwo(num) {
        return num < 10 ? '0' + num : num;
      }
      return {
        day: day,
        hour: hour,
        min: min,
        sec: sec
      };
    }
    // 获取活动详情数据

  }, {
    key: 'getActivity',
    value: function getActivity() {
      var _this3 = this;

      this.selfInUsers = false;
      var params = {
        method: 'post',
        data: { id: this.activityId, group_inviter_id: this.groupInviterId }
      };
      (0, _request2.default)(params, '/project/item').then(function (res) {
        console.log('测试昵称');
        console.log(res);
        _this3.activity = res.data.data;
        var users = res.data.data.project_group_user;
        var selfId = _this3.ActicityUser.user_id;
        if (_this3.activity.project_group_countdown <= 0 && _this3.activity.project_group_num > _this3.activity.project_group_user.length) {
          // console.log(2233333333333333)
          _this3.ActivityStatus = 2;
        }
        if (_this3.activity.project_group_num == _this3.activity.project_group_user.length) {
          _this3.ActivityStatus = 1;
        }
        if (users.length > 0) {
          for (var i = 0; i < users.length; i++) {
            if (selfId == users[i].user_id) {
              _this3.selfInUsers = true;
              break;
            }
          }
        } else {
          _this3.selfInUsers = false;
        }

        console.log(_this3.selfInUsers);
        if (_this3.activity.project_group_countdown > 0 && _this3.activity.project_group_num > _this3.activity.project_group_user.length) {
          console.log('this.activity.project_group_countdown: ' + _this3.activity.project_group_countdown);
          _this3.timer = setInterval(function () {
            _this3.tt();
            _this3.$apply();
          }, 1000);
        }
        _this3.ajaxOver = true;
        _this3.$apply();
      });
    }
  }, {
    key: 'tt',
    value: function tt() {
      if (this.activity.project_group_countdown < 0) {
        this.ActivityStatus = 2;
        clearInterval(this.timer);
      } else {
        var hours = Number(this.Countdown(this.activity.project_group_countdown).hour) + this.Countdown(this.activity.project_group_countdown).day * 24;
        this.hours = hours < 10 ? '0' + hours : hours;
        this.mins = this.Countdown(this.activity.project_group_countdown).min;
        this.secs = this.Countdown(this.activity.project_group_countdown).sec;
        this.activity.project_group_countdown--;
      }
    }
    //分享给好友

  }, {
    key: 'onShareAppMessage',
    value: function onShareAppMessage() {
      var that = this;
      var groupInviterId = this.activity.project_group_user.length > 0 ? this.activity.project_group_user[0].user_id : this.ActicityUser.user_id;
      var groupTitle = this.activity.project_title;
      var groupId = this.activity.id;
      return {
        title: groupTitle,
        path: '/pages/group-detail?groupInviterId=' + groupInviterId + '&activityId=' + groupId, // 传递邀请者Id
        imageUrl: this.activity.project_top_image,
        success: function success(res) {
          // console.log(that.activity)
          that.showFriend = false;
          that.hideFriend = true;
          that.$apply();
        },
        fail: function fail() {
          // console.log(333333)
        }
      };
    }
  }, {
    key: 'onLoad',
    value: function onLoad(params) {

      this.showPay = false;
      this.hidePay = false;
      this.show = false;
      this.hide = false;
      this.showFriend = false;
      this.hideFriend = false;

      console.log(this.show);

      this.ActicityUser = wx.getStorageSync('ActicityUser');

      console.log(1111111111);
      console.log(params);
      if (params.scene) {
        // 通过分享图片进入页面
        params = decodeURIComponent(params.scene);
        console.log(22222, params);
        var paramArr = params.split(',');
        console.log(3333333, paramArr);

        if (!paramArr[0] || !paramArr[1]) {
          this.$switch('/pages/index');
        } else {
          this.activityId = paramArr[0];
          this.groupInviterId = paramArr[1];
        }
      } else {
        //小程序内跳转进入

        this.activityId = params.activityId;
        this.groupInviterId = params.groupInviterId == undefined ? 0 : params.groupInviterId;
        this.ActivityStatus = params.activityStatus;
      }
      this.activity = {};

      // console.log(this.ActivityStatus)
      this.nowTime = new Date().getTime();
      this.$apply();
      this.getActivity();
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      this.ActicityUser = wx.getStorageSync('ActicityUser');

      // console.log(this.ActivityStatus)
    }
  }, {
    key: 'onHide',
    value: function onHide() {
      console.log('hide');
      this.show = false;
      this.hide = false;
      this.showPay = false;
      this.hidePay = false;
      this.showFriend = false;
      this.hideFriend = false;
      clearInterval(this.timer);
    }
  }, {
    key: 'onUnload',
    value: function onUnload() {
      console.log('onUnload');
      this.show = false;
      this.hide = false;
      this.showPay = false;
      this.hidePay = false;
      this.showFriend = false;
      this.hideFriend = false;
      clearInterval(this.timer);
      // console.log('2232323')
    }
  }]);

  return GroupDetail;
}(_wepy2.default.page);

exports.default = GroupDetail;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyb3VwLWRldGFpbDEuanMiXSwibmFtZXMiOlsiR3JvdXBEZXRhaWwiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJpc1Nob3dQYXkiLCJpc1Nob3dHcm91cENvZGUiLCJob3VycyIsIm1pbnMiLCJzZWNzIiwic2hvd0ZyaWVuZCIsImhpZGVGcmllbmQiLCJzaG93UGF5IiwiaGlkZVBheSIsInNob3ciLCJoaWRlIiwiYWN0aXZpdHkiLCJ0b2tlbiIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJBY3RpY2l0eVVzZXIiLCJidXlQcmljZSIsImFqYXhPdmVyIiwic2VsZkluVXNlcnMiLCJBY3Rpdml0eVN0YXR1cyIsIm5vd1RpbWUiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJnb09yZGVyRGV0YWlsIiwiY29uc29sZSIsImxvZyIsIiRuYXZpZ2F0ZSIsIm9yZGVySWQiLCJvcmRlcl9pZCIsImxvb2tQYXkiLCJidXlUeXBlIiwicHJpY2UiLCJyZXMiLCJidXlfdHlwZSIsInRoYXQiLCJ1c2VyIiwiZGV0YWlsIiwiZXJyTXNnIiwiaW5kZXhPZiIsImxvZ2luIiwic3VjY2VzcyIsInJlIiwiY29kZSIsInBhcmFtcyIsIm1ldGhvZCIsInR5cGUiLCJlbmNyeXB0ZWRfZGF0YSIsImVuY3J5cHRlZERhdGEiLCJpdiIsInRoZW4iLCJyIiwic2V0U3RvcmFnZVN5bmMiLCIkcmVkaXJlY3QiLCJmcm9tIiwiJHd4cGFnZSIsInJvdXRlIiwiYWN0aXZpdHlJZCIsImdyb3VwSW52aXRlcklkIiwiJGFwcGx5IiwiY2xvc2VQYXkiLCJnb1NoYXJlUGljIiwicHJvamVjdF9ncm91cF91c2VyIiwibGVuZ3RoIiwidXNlcl9pZCIsInByb2plY3RfaWQiLCJpZCIsImdyb3VwX2ludml0ZXJfaWQiLCJjbG9zZUZyaWVuZCIsInNob3dHcm91cENvZGUiLCJjbG9zZUdyb3VwQ29kZSIsInBheSIsIiRwYXJlbnQiLCJnbG9iYWxEYXRhIiwiaXNCdXkiLCJwcm9qZWN0X3R5cGUiLCJvcmRlcl9zdGF0dXMiLCJhY3Rpdml0eUluZm8iLCJKU09OIiwic3RyaW5naWZ5IiwicHVzaCIsImF2YXRhcl91cmwiLCJuaWNrbmFtZSIsIm5pY2tfbmFtZSIsInByb2plY3RHcm91cE51bSIsInByb2plY3RfZ3JvdXBfbnVtIiwicGF5TW9kZWwiLCJvcmRlciIsInJlcXVlc3RQYXltZW50IiwidGltZVN0YW1wIiwibm9uY2VTdHIiLCJwYWNrYWdlIiwic2lnblR5cGUiLCJwYXlTaWduIiwic2hvd1RvYXN0IiwidGl0bGUiLCJpY29uIiwiZHVyYXRpb24iLCJtYXNrIiwiZmFpbCIsImV2ZW50cyIsImNvdW50ZG93biIsImRpZmYiLCJkYXkiLCJob3VyIiwibWluIiwic2VjIiwiZ2V0VHdvIiwicGFyc2VJbnQiLCJudW0iLCJ1c2VycyIsInNlbGZJZCIsInByb2plY3RfZ3JvdXBfY291bnRkb3duIiwiaSIsInRpbWVyIiwic2V0SW50ZXJ2YWwiLCJ0dCIsImNsZWFySW50ZXJ2YWwiLCJOdW1iZXIiLCJDb3VudGRvd24iLCJncm91cFRpdGxlIiwicHJvamVjdF90aXRsZSIsImdyb3VwSWQiLCJwYXRoIiwiaW1hZ2VVcmwiLCJwcm9qZWN0X3RvcF9pbWFnZSIsInNjZW5lIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwicGFyYW1BcnIiLCJzcGxpdCIsIiRzd2l0Y2giLCJ1bmRlZmluZWQiLCJhY3Rpdml0eVN0YXR1cyIsIkRhdGUiLCJnZXRUaW1lIiwiZ2V0QWN0aXZpdHkiLCJ3ZXB5IiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0FBQ0E7O0lBRXFCQSxXOzs7Ozs7Ozs7Ozs7OztnTUFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFDeEI7QUFGTyxLLFFBSVRDLFUsR0FBYSxFLFFBR2JDLE0sR0FBUyxFLFFBRVRDLEksR0FBTztBQUNMQyxpQkFBVyxLQUROLEVBQ1k7QUFDakJDLHVCQUFp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QixJQUFMLEdBQVksS0FBWjtBQUNBLFdBQUtDLElBQUwsR0FBWSxLQUFaO0FBQ0EsV0FBS0gsT0FBTCxHQUFlLEtBQWY7QUFDQSxXQUFLQyxPQUFMLEdBQWUsS0FBZjtBQUNBLFdBQUtILFVBQUwsR0FBa0IsS0FBbEI7QUFDQSxXQUFLQyxVQUFMLEdBQWtCLEtBQWxCO0FBQ0E4RyxvQkFBYyxLQUFLSCxLQUFuQjtBQUNBO0FBQ0Q7Ozs7RUF6WXNDc0IsZUFBS0MsSTs7a0JBQXpCOUksVyIsImZpbGUiOiJncm91cC1kZXRhaWwxLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCB3eFJlcXVlc3QgZnJvbSAnLi4vdXRpbC9yZXF1ZXN0J1xuICBpbXBvcnQge3Nob3dHcm91cENvZGUsY2xvc2VHcm91cENvZGUsc2hvd0ZyaWVuZCxjbG9zZUZyaWVuZH0gZnJvbSAnLi4vdXRpbC9wdWJsaWMnXG4gIC8vIGltcG9ydCBBUEkgZnJvbSAnLi4vdXRpbC9kYXRhJ1xuICBcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JvdXBEZXRhaWwgZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfmtLvliqjor6bmg4UnLFxuICAgICAgLy8gZGlzYWJsZVNjcm9sbDogdHJ1ZVxuICAgIH1cbiAgICBjb21wb25lbnRzID0ge1xuICAgIH1cblxuICAgIG1peGlucyA9IFtdXG5cbiAgICBkYXRhID0ge1xuICAgICAgaXNTaG93UGF5OiBmYWxzZSwvLyDmlK/ku5jlvLnnqpdcbiAgICAgIGlzU2hvd0dyb3VwQ29kZTogZmFsc2UsIC8vIOWOu+WKoOe+pOW8ueeql1xuICAgICAgaG91cnM6MCxcbiAgICAgIG1pbnM6MCxcbiAgICAgIHNlY3M6MCxcbiAgICAgIHNob3dGcmllbmQ6IGZhbHNlLFxuICAgICAgaGlkZUZyaWVuZDogZmFsc2UsXG4gICAgICBzaG93UGF5OiBmYWxzZSxcbiAgICAgIGhpZGVQYXk6IGZhbHNlLFxuICAgICAgc2hvdzogZmFsc2UsXG4gICAgICBoaWRlOiBmYWxzZSxcbiAgICAgIGFjdGl2aXR5Ont9LFxuICAgICAgdG9rZW46IHd4LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpLFxuICAgICAgQWN0aWNpdHlVc2VyOiB3eC5nZXRTdG9yYWdlU3luYygnQWN0aWNpdHlVc2VyJyksXG4gICAgICBidXlQcmljZTogMCwvL+i0reS5sOS7t+agvFxuICAgICAgYWpheE92ZXI6IGZhbHNlLFxuICAgICAgc2VsZkluVXNlcnM6IGZhbHNlLCAvLyDlvZPliY3nlKjmiLfmmK/lkKblnKjotK3kubDogIXmlbDnu4Tph4xcbiAgICAgIEFjdGl2aXR5U3RhdHVzOicxMjEnLFxuICAgICAgbm93VGltZTowXG4gICAgfVxuXG4gICAgY29tcHV0ZWQgPSB7fVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIC8vIOafpeeci+iuouWNlVxuICAgICAgZ29PcmRlckRldGFpbCgpe1xuICAgICAgICBjb25zb2xlLmxvZyggdGhpcy5hY3Rpdml0eSlcbiAgICAgICAgdGhpcy4kbmF2aWdhdGUoJy9wYWdlcy9vcmRlci1kZXRhaWwnLHtvcmRlcklkOiB0aGlzLmFjdGl2aXR5Lm9yZGVyX2lkfSk7XG4gICAgICB9LFxuICAgICAgLy8g54K55Ye756uL5Y2z5oql5ZCNIOaYvuekuuaUr+S7mOW8ueeql1xuICAgICAgbG9va1BheShidXlUeXBlLHByaWNlLHJlcyl7XG4gICAgICAgIHRoaXMuYnV5X3R5cGUgPSBidXlUeXBlO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgICAgLy8gdGhpcy50b2tlbiA9IHd4LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpO1xuICAgICAgICB0aGlzLnVzZXIgPSB3eC5nZXRTdG9yYWdlU3luYygnQWN0aWNpdHlVc2VyJyk7XG4gICAgICAgIC8vIOWPquacieaOiOadg+aIkOWKn+aJjeiDvei/m+ihjOaUr+S7mFxuICAgICAgICBpZihyZXMuZGV0YWlsLmVyck1zZy5pbmRleE9mKCdvaycpICE9IC0xKXtcbiAgICAgICAgIGNvbnNvbGUubG9nKHRoYXQudXNlcilcbiAgICAgICAgICBpZighdGhpcy51c2VyKXtcbiAgICAgICAgICAgIHd4LmxvZ2luKHtcbiAgICAgICAgICAgICAgc3VjY2VzczogcmUgPT4ge1xuICAgICAgICAgICAgICAgIGlmKHJlLmNvZGUpe1xuICAgICAgICAgICAgICAgICAgbGV0IHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOidwb3N0JyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTp7XG4gICAgICAgICAgICAgICAgICAgICAgY29kZTpyZS5jb2RlLFxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgZW5jcnlwdGVkX2RhdGE6cmVzLmRldGFpbC5lbmNyeXB0ZWREYXRhLFxuICAgICAgICAgICAgICAgICAgICAgIGl2OiByZXMuZGV0YWlsLml2LFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAvLyDnmbvlvZVcbiAgICAgICAgICAgICAgICAgIHd4UmVxdWVzdChwYXJhbXMsJy9sb2dpbicpLnRoZW4ociA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHIpXG4gICAgICAgICAgICAgICAgICAgICAgLy8g5YKo5a2YdG9rZW5cbiAgICAgICAgICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygndG9rZW4nLCByLmRhdGEuZGF0YS50b2tlbilcbiAgXG4gICAgICAgICAgICAgICAgICAgICAgLy8g55m75b2V5a6M5oiQIOi3s+i9rOWIsOeZu+W9leS5i+WJjeeahOmhtemdoizlubblsIbmkLrluKbnlKjmiLfkv6Hmga9cbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRyZWRpcmVjdCgnL3BhZ2VzL2xvZ2luJyx7XG4gICAgICAgICAgICAgICAgICAgICAgICBmcm9tOiAnLycrdGhpcy4kd3hwYWdlLnJvdXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZW5jcnlwdGVkX2RhdGE6cmVzLmRldGFpbC5lbmNyeXB0ZWREYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXY6cmVzLmRldGFpbC5pdixcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5SWQ6dGhpcy5hY3Rpdml0eUlkICxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwSW52aXRlcklkOnRoaXMuZ3JvdXBJbnZpdGVySWRcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5idXlQcmljZSA9IHByaWNlO1xuICAgICAgICAgICAgdGhpcy5zaG93UGF5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuaGlkZVBheSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gdGhpcy5idXlQcmljZSA9IHByaWNlO1xuICAgICAgICAgIC8vIHRoaXMuc2hvd1BheSA9IHRydWU7XG4gICAgICAgICAgLy8gdGhpcy5oaWRlUGF5ID0gZmFsc2U7XG4gICAgICAgICAgLy8gdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIC8vIOWFs+mXreaUr+S7mOW8ueeql1xuICAgICAgY2xvc2VQYXkoKXtcbiAgICAgICAgdGhpcy5zaG93UGF5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaGlkZVBheSA9IHRydWU7XG4gICAgICB9LFxuXG4gICAgICAvLyDnlJ/miJDlm77niYdcbiAgICAgIGdvU2hhcmVQaWMoKXtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5hY3Rpdml0eSlcbiAgICAgICAgbGV0IGdyb3VwSW52aXRlcklkID0gdGhpcy5hY3Rpdml0eS5wcm9qZWN0X2dyb3VwX3VzZXIubGVuZ3RoID4gMCA/IHRoaXMuYWN0aXZpdHkucHJvamVjdF9ncm91cF91c2VyWzBdLnVzZXJfaWQ6dGhpcy5BY3RpY2l0eVVzZXIudXNlcl9pZFxuICAgICAgICB0aGlzLiRuYXZpZ2F0ZSgnL3BhZ2VzL3NoYXJlLXBpYycse3Byb2plY3RfaWQ6dGhpcy5hY3Rpdml0eS5pZCxncm91cF9pbnZpdGVyX2lkOmdyb3VwSW52aXRlcklkfSk7XG4gICAgICB9LFxuICAgICAgXG4gICAgICAvLyDpgoDor7flpb3lj4tcbiAgICAgIHNob3dGcmllbmQoKXtcbiAgICAgICAgc2hvd0ZyaWVuZCh0aGlzKVxuICAgICAgfSxcbiAgICAgIC8vIOWFs+mXreWlveWPi+W8ueeql1xuICAgICAgY2xvc2VGcmllbmQoKXtcbiAgICAgICAgY2xvc2VGcmllbmQodGhpcylcbiAgICAgIH0sXG4gICAgICAvLyDngrnlh7vliqDlvq7kv6HnvqQgXG4gICAgICBzaG93R3JvdXBDb2RlKCl7XG4gICAgICAgIHNob3dHcm91cENvZGUodGhpcyk7XG4gICAgICB9LFxuICAgICAgLy8g5YWz6Zet5Yqg576k5by556qXXG4gICAgICBjbG9zZUdyb3VwQ29kZSgpe1xuICAgICAgICBjbG9zZUdyb3VwQ29kZSh0aGlzKTtcbiAgICAgIH0sXG4gICAgICAvLyDlvq7kv6HmlK/ku5jmiJDlip9cbiAgICAgIHBheSgpe1xuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICAgIGxldCBwYXJhbXMgPSB7XG4gICAgICAgICAgbWV0aG9kOidwb3N0JyxcbiAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgIHByaWNlOnRoaXMuYnV5UHJpY2UsXG4gICAgICAgICAgICBwcm9qZWN0X2lkOnRoaXMuYWN0aXZpdHlJZCxcbiAgICAgICAgICAgIGJ1eV90eXBlOnRoaXMuYnV5X3R5cGUsXG4gICAgICAgICAgICBncm91cF9pbnZpdGVyX2lkOnRoaXMuYWN0aXZpdHkucHJvamVjdF9ncm91cF91c2VyLmxlbmd0aD4wPyB0aGlzLmFjdGl2aXR5LnByb2plY3RfZ3JvdXBfdXNlclswXS51c2VyX2lkOnRoaXMuQWN0aWNpdHlVc2VyLnVzZXJfaWRcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhpcy5hY3Rpdml0eSA9IHt9O1xuICAgICAgICB3eFJlcXVlc3QocGFyYW1zLCcvb3JkZXIvY3JlYXRlJykudGhlbihyZXM9PntcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgICAgaWYocmVzLmRhdGEuY29kZSA9PSAxKXtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKDExMSlcbiAgICAgICAgICAgIC8vIOaUr+S7mOaIkOWKnywg5LiU5Lu35qC85Li6MCwg6Lez6L2s5Yiw5pSv5LuY5oiQ5YqfXG4gICAgICAgICAgICBpZih0aGF0LmJ1eVByaWNlID09ICcwLjAwJyl7XG4gICAgICAgICAgICAgIHRoYXQuJHBhcmVudC5nbG9iYWxEYXRhLmlzQnV5ID0gdHJ1ZVxuICAgICAgICAgICAgICAvLyDljZXni6zotK3kubAg5ZKMIOaIkOWbouWNleeLrOi0reS5sFxuICAgICAgICAgICAgICBpZih0aGF0LmFjdGl2aXR5LnByb2plY3RfdHlwZSA9PSAxIHx8ICh0aGF0LmFjdGl2aXR5LnByb2plY3RfdHlwZSA9PSAzICYmIHRoYXQuYnV5X3R5cGUgPT0gMSkgKXtcbiAgICAgICAgICAgICAgICB0aGF0LmFjdGl2aXR5Lm9yZGVyX3N0YXR1cyA9IDE7XG4gICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICB0aGF0LiRuYXZpZ2F0ZSgnL3BhZ2VzL3BheS1zdWNjZXNzJyx7YWN0aXZpdHlJbmZvOkpTT04uc3RyaW5naWZ5KHRoYXQuYWN0aXZpdHkpfSk7XG4gICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHRoYXQuYWN0aXZpdHkucHJvamVjdF9ncm91cF91c2VyLnB1c2goe1xuICAgICAgICAgICAgICAgICAgYXZhdGFyX3VybDogdGhhdC5BY3RpY2l0eVVzZXIuYXZhdGFyX3VybCxcbiAgICAgICAgICAgICAgICAgIG5pY2tuYW1lOnRoYXQuQWN0aWNpdHlVc2VyLm5pY2tfbmFtZSxcbiAgICAgICAgICAgICAgICAgIG9yZGVyX3N0YXR1czoxLFxuICAgICAgICAgICAgICAgICAgdXNlcl9pZDp0aGF0LkFjdGljaXR5VXNlci51c2VyX2lkXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xuICAgICAgICAgICAgICAgIHRoYXQuYWN0aXZpdHkub3JkZXJfc3RhdHVzID0gMTtcbiAgICAgICAgICAgICAgICB0aGF0LiRuYXZpZ2F0ZSgnL3BhZ2VzL2xhdW5jaC1ncm91cCcse2FjdGl2aXR5SW5mbzpKU09OLnN0cmluZ2lmeSh0aGF0LmFjdGl2aXR5KSxwcm9qZWN0R3JvdXBOdW06dGhhdC5hY3Rpdml0eS5wcm9qZWN0X2dyb3VwX251bX0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoYXQuc2hvd1BheSA9IGZhbHNlO1xuICAgICAgICAgICAgICB0aGF0LmhpZGVQYXkgPSB0cnVlO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKDIyMjIpXG4gICAgICAgICAgICAgIHZhciBwYXlNb2RlbCA9IHJlcy5kYXRhLmRhdGEub3JkZXI7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHBheU1vZGVsKVxuICAgICAgICAgICAgICB3eC5yZXF1ZXN0UGF5bWVudCh7XG4gICAgICAgICAgICAgICAgJ3RpbWVTdGFtcCc6IHBheU1vZGVsLnRpbWVTdGFtcCxcbiAgICAgICAgICAgICAgICAnbm9uY2VTdHInOiBwYXlNb2RlbC5ub25jZVN0cixcbiAgICAgICAgICAgICAgICAncGFja2FnZSc6IHBheU1vZGVsLnBhY2thZ2UsXG4gICAgICAgICAgICAgICAgJ3NpZ25UeXBlJzogIHBheU1vZGVsLnNpZ25UeXBlLFxuICAgICAgICAgICAgICAgICdwYXlTaWduJzogcGF5TW9kZWwucGF5U2lnbixcbiAgICAgICAgICAgICAgICAnc3VjY2Vzcyc6IGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyKVxuICAgICAgICAgICAgICAgICAgdGhhdC4kcGFyZW50Lmdsb2JhbERhdGEuaXNCdXkgPSB0cnVlXG4gICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+aUr+S7mOaIkOWKnycsXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDAsXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlID0+e1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfmlK/ku5jmiJDlip8nKVxuICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlKVxuICAgICAgICAgICAgICAgICAgICAgIC8v5pSv5LuY5oiQ5Yqf6L2s5Yiw5ou85Zui5oiQ5Yqf6aG1XG4gICAgICAgICAgICAgICAgICAgICAgLy90aGlzLiRuYXZpZ2F0ZSgnL3BhZ2VzL3BheS1zdWNjZXNzJyk7XG4gICAgICAgICAgICAgICAgICAgICAgaWYodGhhdC5hY3Rpdml0eS5wcm9qZWN0X3R5cGUgPT0gMSB8fCAodGhhdC5hY3Rpdml0eS5wcm9qZWN0X3R5cGUgPT0gMyAmJiB0aGF0LmJ1eV90eXBlID09IDEpICl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGl2aXR5Lm9yZGVyX3N0YXR1cyA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kbmF2aWdhdGUoJy9wYWdlcy9wYXktc3VjY2Vzcycse2FjdGl2aXR5SW5mbzpKU09OLnN0cmluZ2lmeSh0aGF0LmFjdGl2aXR5KX0pO1xuICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5hY3Rpdml0eS5wcm9qZWN0X2dyb3VwX3VzZXIucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGF2YXRhcl91cmw6IHRoYXQuQWN0aWNpdHlVc2VyLmF2YXRhcl91cmwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG5pY2tuYW1lOnRoYXQuQWN0aWNpdHlVc2VyLm5pY2tfbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb3JkZXJfc3RhdHVzOjEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJfaWQ6dGhhdC5BY3RpY2l0eVVzZXIudXNlcl9pZFxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aXZpdHkub3JkZXJfc3RhdHVzID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGF0LmFjdGl2aXR5KVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhhdC5hY3Rpdml0eS5wcm9qZWN0X2dyb3VwX3VzZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRuYXZpZ2F0ZSgnL3BhZ2VzL2xhdW5jaC1ncm91cCcse2FjdGl2aXR5SW5mbzpKU09OLnN0cmluZ2lmeSh0aGF0LmFjdGl2aXR5KSxwcm9qZWN0R3JvdXBOdW06dGhhdC5hY3Rpdml0eS5wcm9qZWN0X2dyb3VwX251bX0pO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdmYWlsJzogZnVuY3Rpb24gKGZhaWwpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGZhaWwpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBldmVudHMgPSB7XG4gICAgIFxuICAgIH1cbiAgICAvLyDlgJLorqHml7ZcbiAgICBDb3VudGRvd24oY291bnRkb3duKXtcbiAgICAgIC8vIGxldCBmdXR1cmUgPSBuZXcgRGF0ZShmdXR1cmVUaW1lKS5nZXRUaW1lKCk7XG4gICAgICAvLyBsZXQgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICBsZXQgZGlmZiA9IGNvdW50ZG93bjtcbiAgICAgIGlmKGRpZmYgPCAwKSByZXR1cm57XG4gICAgICAgIGRheTogJzAwJyxcbiAgICAgICAgaG91cjogJzAwJyxcbiAgICAgICAgbWluOiAnMDAnLFxuICAgICAgICBzZWM6ICcwMCdcbiAgICAgIH1cbiAgICAgIC8v6I635Y+W5pe26Ze05beu55qE5aSpXG4gICAgICBsZXQgZGF5ID0gZ2V0VHdvKHBhcnNlSW50KGRpZmYvKDI0KjYwKjYwKSkpID09ICcwMCc/ICcwMCcgOiBnZXRUd28ocGFyc2VJbnQoZGlmZi8oMjQqNjAqNjApKSk7XG4gICAgICAvL+iOt+WPluaXtumXtOW3rueahOaXtlxuICAgICAgbGV0IGhvdXIgPSBnZXRUd28ocGFyc2VJbnQoZGlmZi8oNjAqNjApJTI0KSkgPT0gJzAwJz8gJzAwJzogZ2V0VHdvKHBhcnNlSW50KGRpZmYvKDYwKjYwKSUyNCkpO1xuICAgICAgLy/ojrflj5bml7bpl7Tlt67nmoTliIZcbiAgICAgIGxldCBtaW4gPSBnZXRUd28ocGFyc2VJbnQoZGlmZi82MCU2MCkpID09ICcwMCc/ICcwMCc6IGdldFR3byhwYXJzZUludChkaWZmLzYwJTYwKSk7XG4gICAgICAvL+iOt+WPluaXtumXtOW3rueahOenklxuICAgICAgbGV0IHNlYyA9IGdldFR3byhwYXJzZUludChkaWZmICUgNjApKSA9PSAnMDAnPyAnMDAnOiBnZXRUd28ocGFyc2VJbnQoZGlmZiAlIDYwKSk7XG4gICAgICAvL+WkhOeQhuS4quS9jeaVsFxuICAgICAgZnVuY3Rpb24gZ2V0VHdvKG51bSl7XG4gICAgICAgIHJldHVybiBudW0gPCAxMD8gJzAnICsgbnVtIDogbnVtXG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICBkYXk6IGRheSxcbiAgICAgICAgaG91cjogaG91cixcbiAgICAgICAgbWluOiBtaW4sXG4gICAgICAgIHNlYzogc2VjXG4gICAgICB9XG4gICAgfVxuICAgIC8vIOiOt+WPlua0u+WKqOivpuaDheaVsOaNrlxuICAgIGdldEFjdGl2aXR5KCl7XG4gICAgICB0aGlzLnNlbGZJblVzZXJzID0gZmFsc2U7XG4gICAgICBsZXQgcGFyYW1zID0ge1xuICAgICAgICBtZXRob2Q6J3Bvc3QnLFxuICAgICAgICBkYXRhOntpZDogdGhpcy5hY3Rpdml0eUlkLCBncm91cF9pbnZpdGVyX2lkOiB0aGlzLmdyb3VwSW52aXRlcklkfVxuICAgICAgfVxuICAgICAgd3hSZXF1ZXN0KHBhcmFtcywnL3Byb2plY3QvaXRlbScpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ+a1i+ivleaYteensCcpXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgdGhpcy5hY3Rpdml0eSA9IHJlcy5kYXRhLmRhdGE7XG4gICAgICAgIGxldCB1c2VycyA9IHJlcy5kYXRhLmRhdGEucHJvamVjdF9ncm91cF91c2VyO1xuICAgICAgICBsZXQgc2VsZklkID0gdGhpcy5BY3RpY2l0eVVzZXIudXNlcl9pZDtcbiAgICAgICAgaWYodGhpcy5hY3Rpdml0eS5wcm9qZWN0X2dyb3VwX2NvdW50ZG93bjw9MCAmJiB0aGlzLmFjdGl2aXR5LnByb2plY3RfZ3JvdXBfbnVtID4gdGhpcy5hY3Rpdml0eS5wcm9qZWN0X2dyb3VwX3VzZXIubGVuZ3RoKXtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygyMjMzMzMzMzMzMzMzMzMzKVxuICAgICAgICAgIHRoaXMuQWN0aXZpdHlTdGF0dXMgPSAyO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMuYWN0aXZpdHkucHJvamVjdF9ncm91cF9udW0gPT0gdGhpcy5hY3Rpdml0eS5wcm9qZWN0X2dyb3VwX3VzZXIubGVuZ3RoKXtcbiAgICAgICAgICB0aGlzLkFjdGl2aXR5U3RhdHVzID0gMTtcbiAgICAgICAgfVxuICAgICAgICBpZih1c2Vycy5sZW5ndGggPiAwKXtcbiAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdXNlcnMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgaWYoc2VsZklkID09IHVzZXJzW2ldLnVzZXJfaWQpe1xuICAgICAgICAgICAgICB0aGlzLnNlbGZJblVzZXJzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB0aGlzLnNlbGZJblVzZXJzID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc2VsZkluVXNlcnMpXG4gICAgICAgIGlmKHRoaXMuYWN0aXZpdHkucHJvamVjdF9ncm91cF9jb3VudGRvd24gPiAwICYmIHRoaXMuYWN0aXZpdHkucHJvamVjdF9ncm91cF9udW0gPiB0aGlzLmFjdGl2aXR5LnByb2plY3RfZ3JvdXBfdXNlci5sZW5ndGggKXtcbiAgICAgICAgICBjb25zb2xlLmxvZygndGhpcy5hY3Rpdml0eS5wcm9qZWN0X2dyb3VwX2NvdW50ZG93bjogJyt0aGlzLmFjdGl2aXR5LnByb2plY3RfZ3JvdXBfY291bnRkb3duKVxuICAgICAgICAgIHRoaXMudGltZXIgPSBzZXRJbnRlcnZhbCgoKT0+e1xuICAgICAgICAgICAgdGhpcy50dCgpO1xuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICB9LDEwMDApXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hamF4T3ZlciA9ICB0cnVlO1xuICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgfSlcbiAgICB9XG4gICAgdHQoKXtcbiAgICAgIGlmKHRoaXMuYWN0aXZpdHkucHJvamVjdF9ncm91cF9jb3VudGRvd24gPCAwKXtcbiAgICAgICAgdGhpcy5BY3Rpdml0eVN0YXR1cyA9IDI7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcilcbiAgICAgIH1lbHNle1xuICAgICAgICBsZXQgaG91cnMgPSBOdW1iZXIodGhpcy5Db3VudGRvd24odGhpcy5hY3Rpdml0eS5wcm9qZWN0X2dyb3VwX2NvdW50ZG93bikuaG91cikgKyB0aGlzLkNvdW50ZG93bih0aGlzLmFjdGl2aXR5LnByb2plY3RfZ3JvdXBfY291bnRkb3duKS5kYXkqMjQ7XG4gICAgICAgIHRoaXMuaG91cnMgPSBob3VycyA8IDEwPyAnMCcraG91cnMgOiBob3VycztcbiAgICAgICAgdGhpcy5taW5zID0gdGhpcy5Db3VudGRvd24odGhpcy5hY3Rpdml0eS5wcm9qZWN0X2dyb3VwX2NvdW50ZG93bikubWluO1xuICAgICAgICB0aGlzLnNlY3MgPSB0aGlzLkNvdW50ZG93bih0aGlzLmFjdGl2aXR5LnByb2plY3RfZ3JvdXBfY291bnRkb3duKS5zZWM7XG4gICAgICAgIHRoaXMuYWN0aXZpdHkucHJvamVjdF9ncm91cF9jb3VudGRvd24tLVxuICAgICAgfVxuICAgICAgXG4gICAgfVxuICAgIC8v5YiG5Lqr57uZ5aW95Y+LXG4gICAgb25TaGFyZUFwcE1lc3NhZ2UoKXtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIGxldCBncm91cEludml0ZXJJZCA9IHRoaXMuYWN0aXZpdHkucHJvamVjdF9ncm91cF91c2VyLmxlbmd0aCA+IDAgPyB0aGlzLmFjdGl2aXR5LnByb2plY3RfZ3JvdXBfdXNlclswXS51c2VyX2lkOnRoaXMuQWN0aWNpdHlVc2VyLnVzZXJfaWRcbiAgICAgIGxldCBncm91cFRpdGxlID0gdGhpcy5hY3Rpdml0eS5wcm9qZWN0X3RpdGxlO1xuICAgICAgbGV0IGdyb3VwSWQgPSB0aGlzLmFjdGl2aXR5LmlkO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGl0bGU6IGdyb3VwVGl0bGUsXG4gICAgICAgIHBhdGg6ICcvcGFnZXMvZ3JvdXAtZGV0YWlsP2dyb3VwSW52aXRlcklkPScrZ3JvdXBJbnZpdGVySWQrJyZhY3Rpdml0eUlkPScrZ3JvdXBJZCwgIC8vIOS8oOmAkumCgOivt+iAhUlkXG4gICAgICAgIGltYWdlVXJsOnRoaXMuYWN0aXZpdHkucHJvamVjdF90b3BfaW1hZ2UsXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcyl7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2codGhhdC5hY3Rpdml0eSlcbiAgICAgICAgICB0aGF0LnNob3dGcmllbmQgPSBmYWxzZTtcbiAgICAgICAgICB0aGF0LmhpZGVGcmllbmQgPSB0cnVlO1xuICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coMzMzMzMzKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIG9uTG9hZChwYXJhbXMpIHtcblxuICAgICAgdGhpcy5zaG93UGF5ID0gZmFsc2U7XG4gICAgICB0aGlzLmhpZGVQYXkgPSBmYWxzZTtcbiAgICAgIHRoaXMuc2hvdyA9IGZhbHNlO1xuICAgICAgdGhpcy5oaWRlID0gZmFsc2U7XG4gICAgICB0aGlzLnNob3dGcmllbmQgPSBmYWxzZTtcbiAgICAgIHRoaXMuaGlkZUZyaWVuZCA9IGZhbHNlO1xuXG5cbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuc2hvdylcblxuICAgICAgdGhpcy5BY3RpY2l0eVVzZXIgPSB3eC5nZXRTdG9yYWdlU3luYygnQWN0aWNpdHlVc2VyJyk7XG4gICAgICBcbiAgICAgIGNvbnNvbGUubG9nKDExMTExMTExMTEpXG4gICAgICBjb25zb2xlLmxvZyhwYXJhbXMpXG4gICAgICBpZihwYXJhbXMuc2NlbmUpeyAvLyDpgJrov4fliIbkuqvlm77niYfov5vlhaXpobXpnaJcbiAgICAgICAgcGFyYW1zID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhcmFtcy5zY2VuZSlcbiAgICAgICAgY29uc29sZS5sb2coMjIyMjIscGFyYW1zKVxuICAgICAgICBsZXQgcGFyYW1BcnIgPSBwYXJhbXMuc3BsaXQoJywnKVxuICAgICAgICBjb25zb2xlLmxvZygzMzMzMzMzLHBhcmFtQXJyKVxuICAgICAgICBcbiAgICAgICAgaWYoIXBhcmFtQXJyWzBdIHx8ICFwYXJhbUFyclsxXSl7XG4gICAgICAgICAgdGhpcy4kc3dpdGNoKCcvcGFnZXMvaW5kZXgnKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB0aGlzLmFjdGl2aXR5SWQgPSBwYXJhbUFyclswXTtcbiAgICAgICAgICB0aGlzLmdyb3VwSW52aXRlcklkID0gcGFyYW1BcnJbMV07XG4gICAgICAgIH1cbiAgICAgIH1lbHNleyAvL+Wwj+eoi+W6j+WGhei3s+i9rOi/m+WFpVxuXG4gICAgICAgICB0aGlzLmFjdGl2aXR5SWQgPSBwYXJhbXMuYWN0aXZpdHlJZDtcbiAgICAgICAgIHRoaXMuZ3JvdXBJbnZpdGVySWQgPSBwYXJhbXMuZ3JvdXBJbnZpdGVySWQgPT0gdW5kZWZpbmVkID8gMCA6IHBhcmFtcy5ncm91cEludml0ZXJJZDtcbiAgICAgICAgIHRoaXMuQWN0aXZpdHlTdGF0dXMgPSBwYXJhbXMuYWN0aXZpdHlTdGF0dXM7XG4gICAgICB9XG4gICAgICB0aGlzLmFjdGl2aXR5ID0ge307XG4gICAgIFxuICAgICAgXG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLkFjdGl2aXR5U3RhdHVzKVxuICAgICAgdGhpcy5ub3dUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgdGhpcy5nZXRBY3Rpdml0eSgpO1xuICAgICAgXG4gICAgICBcbiAgICB9XG4gICAgb25TaG93KCl7XG4gICAgICB0aGlzLkFjdGljaXR5VXNlciA9IHd4LmdldFN0b3JhZ2VTeW5jKCdBY3RpY2l0eVVzZXInKTtcbiAgICAgIFxuICAgICAgLy8gY29uc29sZS5sb2codGhpcy5BY3Rpdml0eVN0YXR1cylcbiAgICB9XG4gICAgb25IaWRlKCl7XG4gICAgICBjb25zb2xlLmxvZygnaGlkZScpXG4gICAgICB0aGlzLnNob3cgPSBmYWxzZTtcbiAgICAgIHRoaXMuaGlkZSA9IGZhbHNlO1xuICAgICAgdGhpcy5zaG93UGF5ID0gZmFsc2U7XG4gICAgICB0aGlzLmhpZGVQYXkgPSBmYWxzZTtcbiAgICAgIHRoaXMuc2hvd0ZyaWVuZCA9IGZhbHNlO1xuICAgICAgdGhpcy5oaWRlRnJpZW5kID0gZmFsc2U7XG4gICAgICBjbGVhckludGVydmFsKHRoaXMudGltZXIpXG4gICAgfVxuICAgIG9uVW5sb2FkKCl7XG4gICAgICBjb25zb2xlLmxvZygnb25VbmxvYWQnKVxuICAgICAgdGhpcy5zaG93ID0gZmFsc2U7XG4gICAgICB0aGlzLmhpZGUgPSBmYWxzZTtcbiAgICAgIHRoaXMuc2hvd1BheSA9IGZhbHNlO1xuICAgICAgdGhpcy5oaWRlUGF5ID0gZmFsc2U7XG4gICAgICB0aGlzLnNob3dGcmllbmQgPSBmYWxzZTtcbiAgICAgIHRoaXMuaGlkZUZyaWVuZCA9IGZhbHNlO1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyKVxuICAgICAgLy8gY29uc29sZS5sb2coJzIyMzIzMjMnKVxuICAgIH1cbiAgfVxuIl19