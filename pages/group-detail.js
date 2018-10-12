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
      selfHours: 0,
      selfMins: 0,
      selfSecs: 0,
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
      ActivityStatus: null,
      activity_id: 0, // 用于数据分析
      nowTime: 0,
      selfStatus: 0, // 用户自身的状态 
      timer: null,
      timer1: null,
      timer2: null,
      userLen: 0,
      remainTime: 0,
      countDown: 0,
      groupInviterId: 0
    }, _this.computed = {}, _this.methods = {
      /* see(){
        let arr = ['http://caihong.ucong.net/democode.jpg']
        wx.previewImage({
          urls:arr,
          current:'http://caihong.ucong.net/democode.jpg'
        })
      }, */
      // 返回首页
      goIndex: function goIndex() {
        console.log(123);
        this.$switch('/pages/index');
      },

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
                      groupInviterId: _this2.groupInviterId,
                      buyPrice: price
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
        var users = this.activity.project_group_user;
        var params = {
          method: 'post',
          data: {
            // price:this.buyPrice,
            project_id: this.activityId,
            buy_type: this.buy_type,
            //group_inviter_id: (userLength > 0 && userLength < this.activity.project_group_num )? this.activity.project_group_user[0].user_id:this.ActicityUser.user_id
            group_inviter_id: users.length > 0 && users.length < this.activity.project_group_num ? users[0].user_id : this.ActicityUser.user_id
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
                var flag = false;
                for (var i = 0; i < that.activity.project_group_user.length; i++) {
                  var user = that.activity.project_group_user[i];
                  if (user.user_id == that.ActicityUser.user_id) {
                    flag = true;
                    break;
                  }
                }
                if (!flag) {
                  that.activity.project_group_user.push({
                    avatar_url: that.ActicityUser.avatar_url,
                    nickname: that.ActicityUser.nick_name,
                    order_status: 1,
                    user_id: that.ActicityUser.user_id
                  });
                }
                that.activity.order_status = 1;
                that.$apply();
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
                      // console.log('支付成功')
                      // console.log(re)
                      //支付成功转到拼团成功页
                      //this.$navigate('/pages/pay-success');
                      if (that.activity.project_type == 1 || that.activity.project_type == 3 && that.buy_type == 1) {
                        that.activity.order_status = 1;
                        that.$apply();
                        that.$navigate('/pages/pay-success', { activityInfo: JSON.stringify(that.activity) });
                      } else {
                        var _flag = false;
                        for (var _i = 0; _i < that.activity.project_group_user.length; _i++) {
                          var _user = that.activity.project_group_user[_i];
                          if (_user.user_id == that.ActicityUser.user_id) {
                            _flag = true;
                            break;
                          }
                        }
                        if (!_flag) {
                          that.activity.project_group_user.push({
                            avatar_url: that.ActicityUser.avatar_url,
                            nickname: that.ActicityUser.nick_name,
                            order_status: 1,
                            user_id: that.ActicityUser.user_id
                          });
                        }
                        //支付成功 order_status 为 1 
                        that.activity.order_status = 1;
                        that.$apply();
                        that.$navigate('/pages/launch-group', { activityInfo: JSON.stringify(that.activity), projectGroupNum: that.activity.project_group_num });
                      }
                    }
                  });
                },
                'fail': function fail(_fail) {
                  that.show = false;
                  that.hide = false;
                  that.showPay = false;
                  that.hidePay = false;
                  that.showFriend = false;
                  that.hideFriend = false;
                  that.hours = 0;
                  that.mins = 0;
                  that.secs = 0;
                  that.selfHours = 0;
                  that.selfMins = 0;
                  that.selfSecs = 0;
                  that.selfInUsers = true;
                  that.selfStatus = 0;
                  that.getActivity();
                  that.$apply();
                  /*  console.log(fail)
                   // 取消订单 隐藏按钮
                   that.hidePay = true;
                   that.showPay = false;
                   // that.$apply();
                   that.selfInUsers = true;
                   that.selfStatus = 0;
                   
                   clearInterval(that.timer2)
                   let nowCountDown = 60*10;
                   
                   // that.timer2 = setInterval(()=>{
                   //   let hours = Number(that.Countdown(nowCountDown).hour) + that.Countdown(nowCountDown).day*24;
                   //   that.selfHours = hours < 10? '0'+hours : hours;
                   //   that.selfMins = that.Countdown(nowCountDown).min;
                   //   that.selfSecs = that.Countdown(nowCountDown).sec;
                   //   nowCountDown--;
                   //   that.$apply();
                   // },1000)
                   console.log(that)
                   that.$apply();
                   console.log(that.selfStatus,that.selfInUsers) */
                }
              });
            }
          }
        });
      }
    }, _this.events = {}, _this.watch = {}
    // selfInUsers (newValue, oldValue) {
    //   console.log(newValue,  oldValue)
    //     this.$apply();
    // },

    // selfStatus (newValue, oldValue) {
    //   console.log(newValue,  oldValue)
    //     this.$apply();
    // },

    // 倒计时
    , _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(GroupDetail, [{
    key: 'Countdown',
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
        // res.data.data.project_group_user.pop()
        var users = res.data.data.project_group_user;
        var selfId = _this3.ActicityUser.user_id;
        _this3.userLen = users.length;
        // 倒计时为负值 且 团不满 退款状态
        if (_this3.activity.project_group_countdown <= 0 && _this3.activity.project_group_num > _this3.activity.project_group_user.length) {
          _this3.ActivityStatus = 2;
        }
        // 倒计时
        if (_this3.activity.project_group_countdown > 0 && _this3.activity.project_group_num > _this3.activity.project_group_user.length) {
          _this3.ActivityStatus = 0;
        }
        // 团满 成功状态
        if (_this3.activity.project_group_num == _this3.activity.project_group_user.length) {
          _this3.ActivityStatus = 1;
        }

        // console.log('ActivityStatus-ajax:'+this.ActivityStatus)

        if (users.length > 0) {
          for (var i = 0; i < users.length; i++) {
            if (selfId == users[i].user_id) {
              if (users[i].order_status == 0) {
                _this3.userLen--;
              }

              // 用户在团购数组中
              _this3.selfInUsers = true;
              // 用户的状态  是否付款
              _this3.selfStatus = users[i].order_status;
              break;
            }
          }
        } else {
          _this3.selfInUsers = false;
        }

        if (_this3.activity.project_group_countdown > 0 && _this3.activity.project_group_num > _this3.activity.project_group_user.length) {
          _this3.countDown = _this3.activity.project_group_countdown;
          // this.countDown = 10;
          clearInterval(_this3.timer);
          _this3.timer = setInterval(function () {
            var countdown = _this3.activity.project_group_countdown;
            if (countdown <= 0) {
              clearInterval(_this3.timer);
              _this3.ActivityStatus = 2;
              // this.$apply();
            } else {
              var hours = Number(_this3.Countdown(countdown).hour) + _this3.Countdown(countdown).day * 24;
              _this3.hours = hours < 10 ? '0' + hours : hours;
              _this3.mins = _this3.Countdown(countdown).min;
              _this3.secs = _this3.Countdown(countdown).sec;
              _this3.activity.project_group_countdown--;
              _this3.countDown--;
            }
            _this3.$apply();
          }, 1000);
        }

        // 本人下单未付款的倒计时
        if (_this3.activity.remain_time > 0) {
          _this3.remainTime = _this3.activity.remain_time;
          _this3.selfHours = 0;
          _this3.selfMins = 0;
          _this3.selfSecs = 0;
          clearInterval(_this3.timer1);
          _this3.timer1 = setInterval(function () {

            if (_this3.activity.remain_time < 0) {
              // 删除自己
              var len = _this3.activity.project_group_user.length;
              for (var _i2 = 0; _i2 < len; _i2++) {
                var user = _this3.activity.project_group_user[_i2];
                if (user.user_id == _this3.ActicityUser.user_id) {
                  _this3.activity.project_group_user.splice(_i2, 1);
                }
              }
              _this3.userLen = _this3.activity.project_group_user.length;
              _this3.selfInUsers = false;
              // this.$apply();
              clearInterval(_this3.timer);
              clearInterval(_this3.timer1);
            } else {
              var hours = Number(_this3.Countdown(_this3.activity.remain_time).hour) + _this3.Countdown(_this3.activity.remain_time).day * 24;
              _this3.selfHours = hours < 10 ? '0' + hours : hours;
              _this3.selfMins = _this3.Countdown(_this3.activity.remain_time).min;
              _this3.selfSecs = _this3.Countdown(_this3.activity.remain_time).sec;
              _this3.activity.remain_time--;
              _this3.remainTime--;
              // this.$apply();
            }
            _this3.$apply();
          }, 1000);
        }
        _this3.ajaxOver = true;
        _this3.$apply();
      });
    }
  }, {
    key: 'tt',
    value: function tt(countdown, hours, mins, secs, timer) {
      // console.log(countdown)
      if (countdown < 0) {
        this.ActivityStatus = 2;
        clearInterval(timer);
      } else {
        var _hours = Number(this.Countdown(countdown).hour) + this.Countdown(countdown).day * 24;
        _hours = _hours < 10 ? '0' + _hours : _hours;
        mins = this.Countdown(countdown).min;
        secs = this.Countdown(countdown).sec;
      }
    }
    //分享给好友

  }, {
    key: 'onShareAppMessage',
    value: function onShareAppMessage() {
      console.log('share');
      var users = this.activity.project_group_user;
      var that = this;
      var groupInviterId = users.length > 0 && users.length < this.activity.project_group_num ? users[0].user_id : this.ActicityUser.user_id;
      var groupTitle = this.activity.project_title;
      var groupId = this.activity.id;
      return {
        title: groupTitle,
        path: '/pages/group-detail?groupInviterId=' + groupInviterId + '&activityId=' + groupId, // 传递邀请者Id
        imageUrl: this.activity.project_cover_image ? this.activity.project_cover_image : this.activity.project_top_image, // 有配置图片就用配置的, 没有就用头图
        // imageUrl:'../image/demo.png',
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
      console.log(params);
      if (params.from == 'login') {
        this.showPay = true;
        this.hidePay = false;
      } else {
        this.showPay = false;
        this.hidePay = false;
      }

      // this.show = false;
      // this.hide = false;
      // this.showFriend = false;
      // this.hideFriend = false;
      // this.hours = 0;
      // this.mins = 0;
      // this.secs = 0;
      // this.selfHours = 0;
      // this.selfMins = 0;
      // this.selfSecs = 0;


      this.ActicityUser = wx.getStorageSync('ActicityUser');

      if (params.scene) {
        // 通过分享图片进入页面
        params = decodeURIComponent(params.scene);
        var paramArr = params.split(',');
        if (!paramArr[0] || !paramArr[1]) {
          this.$switch('/pages/index');
        } else {
          this.activityId = paramArr[0];
          this.groupInviterId = paramArr[1];
        }
        console.log(paramArr);
      } else {
        //小程序内跳转进入

        this.activityId = params.activityId;
        this.groupInviterId = params.groupInviterId == undefined ? 0 : params.groupInviterId;
        this.ActivityStatus = params.activityStatus;
        this.buyPrice = params.buyPrice;
        console.log('ActivityStatus-load:' + this.ActivityStatus);
      }
      this.activity = {};

      // console.log(this.ActivityStatus)
      this.nowTime = new Date().getTime();
      this.$apply();
    }
  }, {
    key: 'onShow',
    value: function onShow() {

      console.log(this.ActicityUser);
      this.ActicityUser = wx.getStorageSync('ActicityUser');
      this.getActivity();
      // console.log(this.ActivityStatus)
    }
  }, {
    key: 'onHide',
    value: function onHide() {
      console.log('hide');
      // this.show = false;
      // this.hide = false;
      // this.showPay = false;
      // this.hidePay = false;
      // this.showFriend = false;
      // this.hideFriend = false;
      // this.hours = 0;
      // this.mins = 0;
      // this.secs = 0;
      // this.selfHours = 0;
      // this.selfMins = 0;
      // this.selfSecs = 0;
      // clearInterval(this.timer)
      // clearInterval(this.timer1)
      // clearInterval(that.timer2)
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
      this.hours = 0;
      this.mins = 0;
      this.secs = 0;
      this.selfHours = 0;
      this.selfMins = 0;
      this.selfSecs = 0;
      clearInterval(this.timer);
      clearInterval(this.timer1);
      // clearInterval(that.timer2)
      // console.log('2232323')
    }
  }]);

  return GroupDetail;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(GroupDetail , 'pages/group-detail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyb3VwLWRldGFpbC5qcyJdLCJuYW1lcyI6WyJHcm91cERldGFpbCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwibWl4aW5zIiwiZGF0YSIsImlzU2hvd1BheSIsImlzU2hvd0dyb3VwQ29kZSIsImhvdXJzIiwibWlucyIsInNlY3MiLCJzZWxmSG91cnMiLCJzZWxmTWlucyIsInNlbGZTZWNzIiwic2hvd0ZyaWVuZCIsImhpZGVGcmllbmQiLCJzaG93UGF5IiwiaGlkZVBheSIsInNob3ciLCJoaWRlIiwiYWN0aXZpdHkiLCJ0b2tlbiIsInd4IiwiZ2V0U3RvcmFnZVN5bmMiLCJBY3RpY2l0eVVzZXIiLCJidXlQcmljZSIsImFqYXhPdmVyIiwic2VsZkluVXNlcnMiLCJBY3Rpdml0eVN0YXR1cyIsImFjdGl2aXR5X2lkIiwibm93VGltZSIsInNlbGZTdGF0dXMiLCJ0aW1lciIsInRpbWVyMSIsInRpbWVyMiIsInVzZXJMZW4iLCJyZW1haW5UaW1lIiwiY291bnREb3duIiwiZ3JvdXBJbnZpdGVySWQiLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJnb0luZGV4IiwiY29uc29sZSIsImxvZyIsIiRzd2l0Y2giLCJnb09yZGVyRGV0YWlsIiwiJG5hdmlnYXRlIiwib3JkZXJJZCIsIm9yZGVyX2lkIiwibG9va1BheSIsImJ1eVR5cGUiLCJwcmljZSIsInJlcyIsImJ1eV90eXBlIiwidGhhdCIsInVzZXIiLCJkZXRhaWwiLCJlcnJNc2ciLCJpbmRleE9mIiwibG9naW4iLCJzdWNjZXNzIiwicmUiLCJjb2RlIiwicGFyYW1zIiwibWV0aG9kIiwidHlwZSIsImVuY3J5cHRlZF9kYXRhIiwiZW5jcnlwdGVkRGF0YSIsIml2IiwidGhlbiIsInIiLCJzZXRTdG9yYWdlU3luYyIsIiRyZWRpcmVjdCIsImZyb20iLCIkd3hwYWdlIiwicm91dGUiLCJhY3Rpdml0eUlkIiwiJGFwcGx5IiwiY2xvc2VQYXkiLCJnb1NoYXJlUGljIiwicHJvamVjdF9ncm91cF91c2VyIiwibGVuZ3RoIiwidXNlcl9pZCIsInByb2plY3RfaWQiLCJpZCIsImdyb3VwX2ludml0ZXJfaWQiLCJjbG9zZUZyaWVuZCIsInNob3dHcm91cENvZGUiLCJjbG9zZUdyb3VwQ29kZSIsInBheSIsInVzZXJzIiwicHJvamVjdF9ncm91cF9udW0iLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImlzQnV5IiwicHJvamVjdF90eXBlIiwib3JkZXJfc3RhdHVzIiwiYWN0aXZpdHlJbmZvIiwiSlNPTiIsInN0cmluZ2lmeSIsImZsYWciLCJpIiwicHVzaCIsImF2YXRhcl91cmwiLCJuaWNrbmFtZSIsIm5pY2tfbmFtZSIsInByb2plY3RHcm91cE51bSIsInBheU1vZGVsIiwib3JkZXIiLCJyZXF1ZXN0UGF5bWVudCIsInRpbWVTdGFtcCIsIm5vbmNlU3RyIiwicGFja2FnZSIsInNpZ25UeXBlIiwicGF5U2lnbiIsInNob3dUb2FzdCIsInRpdGxlIiwiaWNvbiIsImR1cmF0aW9uIiwibWFzayIsImZhaWwiLCJnZXRBY3Rpdml0eSIsImV2ZW50cyIsIndhdGNoIiwiY291bnRkb3duIiwiZGlmZiIsImRheSIsImhvdXIiLCJtaW4iLCJzZWMiLCJnZXRUd28iLCJwYXJzZUludCIsIm51bSIsInNlbGZJZCIsInByb2plY3RfZ3JvdXBfY291bnRkb3duIiwiY2xlYXJJbnRlcnZhbCIsInNldEludGVydmFsIiwiTnVtYmVyIiwiQ291bnRkb3duIiwicmVtYWluX3RpbWUiLCJsZW4iLCJzcGxpY2UiLCJncm91cFRpdGxlIiwicHJvamVjdF90aXRsZSIsImdyb3VwSWQiLCJwYXRoIiwiaW1hZ2VVcmwiLCJwcm9qZWN0X2NvdmVyX2ltYWdlIiwicHJvamVjdF90b3BfaW1hZ2UiLCJzY2VuZSIsImRlY29kZVVSSUNvbXBvbmVudCIsInBhcmFtQXJyIiwic3BsaXQiLCJ1bmRlZmluZWQiLCJhY3Rpdml0eVN0YXR1cyIsIkRhdGUiLCJnZXRUaW1lIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRDs7OytCQUNTO0FBQ1JELGNBQVFDLEdBQVIsQ0FBWSxVQUFaO0FBQ0EsV0FBS3pCLElBQUwsR0FBWSxLQUFaO0FBQ0EsV0FBS0MsSUFBTCxHQUFZLEtBQVo7QUFDQSxXQUFLSCxPQUFMLEdBQWUsS0FBZjtBQUNBLFdBQUtDLE9BQUwsR0FBZSxLQUFmO0FBQ0EsV0FBS0gsVUFBTCxHQUFrQixLQUFsQjtBQUNBLFdBQUtDLFVBQUwsR0FBa0IsS0FBbEI7QUFDQSxXQUFLUCxLQUFMLEdBQWEsQ0FBYjtBQUNBLFdBQUtDLElBQUwsR0FBWSxDQUFaO0FBQ0EsV0FBS0MsSUFBTCxHQUFZLENBQVo7QUFDQSxXQUFLQyxTQUFMLEdBQWlCLENBQWpCO0FBQ0EsV0FBS0MsUUFBTCxHQUFnQixDQUFoQjtBQUNBLFdBQUtDLFFBQUwsR0FBZ0IsQ0FBaEI7QUFDQTBILG9CQUFjLEtBQUt2RyxLQUFuQjtBQUNBdUcsb0JBQWMsS0FBS3RHLE1BQW5CO0FBQ0E7QUFDQTtBQUNEOzs7O0VBMWtCc0M0SCxlQUFLQyxJOztrQkFBekI5SixXIiwiZmlsZSI6Imdyb3VwLWRldGFpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICBpbXBvcnQgd3hSZXF1ZXN0IGZyb20gJy4uL3V0aWwvcmVxdWVzdCdcbiAgaW1wb3J0IHtzaG93R3JvdXBDb2RlLGNsb3NlR3JvdXBDb2RlLHNob3dGcmllbmQsY2xvc2VGcmllbmR9IGZyb20gJy4uL3V0aWwvcHVibGljJ1xuICAvLyBpbXBvcnQgQVBJIGZyb20gJy4uL3V0aWwvZGF0YSdcbiAgXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyb3VwRGV0YWlsIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5rS75Yqo6K+m5oOFJyxcbiAgICAgIC8vIGRpc2FibGVTY3JvbGw6IHRydWVcbiAgICB9XG4gICAgY29tcG9uZW50cyA9IHtcbiAgICB9XG5cbiAgICBtaXhpbnMgPSBbXVxuXG4gICAgZGF0YSA9IHtcbiAgICAgIGlzU2hvd1BheTogZmFsc2UsLy8g5pSv5LuY5by556qXXG4gICAgICBpc1Nob3dHcm91cENvZGU6IGZhbHNlLCAvLyDljrvliqDnvqTlvLnnqpdcbiAgICAgIGhvdXJzOjAsXG4gICAgICBtaW5zOjAsXG4gICAgICBzZWNzOjAsXG4gICAgICBzZWxmSG91cnM6MCxcbiAgICAgIHNlbGZNaW5zOjAsXG4gICAgICBzZWxmU2VjczowLFxuICAgICAgc2hvd0ZyaWVuZDogZmFsc2UsXG4gICAgICBoaWRlRnJpZW5kOiBmYWxzZSxcbiAgICAgIHNob3dQYXk6IGZhbHNlLFxuICAgICAgaGlkZVBheTogZmFsc2UsXG4gICAgICBzaG93OiBmYWxzZSxcbiAgICAgIGhpZGU6IGZhbHNlLFxuICAgICAgYWN0aXZpdHk6e30sXG4gICAgICB0b2tlbjogd3guZ2V0U3RvcmFnZVN5bmMoJ3Rva2VuJyksXG4gICAgICBBY3RpY2l0eVVzZXI6IHd4LmdldFN0b3JhZ2VTeW5jKCdBY3RpY2l0eVVzZXInKSxcbiAgICAgIGJ1eVByaWNlOiAwLC8v6LSt5Lmw5Lu35qC8XG4gICAgICBhamF4T3ZlcjogZmFsc2UsXG4gICAgICBzZWxmSW5Vc2VyczogZmFsc2UsIC8vIOW9k+WJjeeUqOaIt+aYr+WQpuWcqOi0reS5sOiAheaVsOe7hOmHjFxuICAgICAgQWN0aXZpdHlTdGF0dXM6bnVsbCxcbiAgICAgIGFjdGl2aXR5X2lkOjAsIC8vIOeUqOS6juaVsOaNruWIhuaekFxuICAgICAgbm93VGltZTowLFxuICAgICAgc2VsZlN0YXR1czowLCAvLyDnlKjmiLfoh6rouqvnmoTnirbmgIEgXG4gICAgICB0aW1lcjpudWxsLFxuICAgICAgdGltZXIxOm51bGwsXG4gICAgICB0aW1lcjI6IG51bGwsXG4gICAgICB1c2VyTGVuOjAsXG4gICAgICByZW1haW5UaW1lOjAsXG4gICAgICBjb3VudERvd246MCxcbiAgICAgIGdyb3VwSW52aXRlcklkOjBcbiAgICB9XG5cbiAgICBjb21wdXRlZCA9IHt9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgLyogc2VlKCl7XG4gICAgICAgIGxldCBhcnIgPSBbJ2h0dHA6Ly9jYWlob25nLnVjb25nLm5ldC9kZW1vY29kZS5qcGcnXVxuICAgICAgICB3eC5wcmV2aWV3SW1hZ2Uoe1xuICAgICAgICAgIHVybHM6YXJyLFxuICAgICAgICAgIGN1cnJlbnQ6J2h0dHA6Ly9jYWlob25nLnVjb25nLm5ldC9kZW1vY29kZS5qcGcnXG4gICAgICAgIH0pXG4gICAgICB9LCAqL1xuICAgICAgLy8g6L+U5Zue6aaW6aG1XG4gICAgICBnb0luZGV4KCl7XG4gICAgICAgIGNvbnNvbGUubG9nKDEyMylcbiAgICAgICAgdGhpcy4kc3dpdGNoKCcvcGFnZXMvaW5kZXgnKVxuICAgICAgfSxcbiAgICAgIC8vIOafpeeci+iuouWNlVxuICAgICAgZ29PcmRlckRldGFpbCgpe1xuICAgICAgICBjb25zb2xlLmxvZyggdGhpcy5hY3Rpdml0eSlcbiAgICAgICAgdGhpcy4kbmF2aWdhdGUoJy9wYWdlcy9vcmRlci1kZXRhaWwnLHtvcmRlcklkOiB0aGlzLmFjdGl2aXR5Lm9yZGVyX2lkfSk7XG4gICAgICB9LFxuICAgICAgLy8g54K55Ye756uL5Y2z5oql5ZCNIOaYvuekuuaUr+S7mOW8ueeql1xuICAgICAgbG9va1BheShidXlUeXBlLHByaWNlLHJlcyl7XG4gICAgICAgIHRoaXMuYnV5X3R5cGUgPSBidXlUeXBlO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgICAgLy8gdGhpcy50b2tlbiA9IHd4LmdldFN0b3JhZ2VTeW5jKCd0b2tlbicpO1xuICAgICAgICB0aGlzLnVzZXIgPSB3eC5nZXRTdG9yYWdlU3luYygnQWN0aWNpdHlVc2VyJyk7XG4gICAgICAgIC8vIOWPquacieaOiOadg+aIkOWKn+aJjeiDvei/m+ihjOaUr+S7mFxuICAgICAgICBpZihyZXMuZGV0YWlsLmVyck1zZy5pbmRleE9mKCdvaycpICE9IC0xKXtcbiAgICAgICAgIGNvbnNvbGUubG9nKHRoYXQudXNlcilcbiAgICAgICAgICBpZighdGhpcy51c2VyKXtcbiAgICAgICAgICAgIHd4LmxvZ2luKHtcbiAgICAgICAgICAgICAgc3VjY2VzczogcmUgPT4ge1xuICAgICAgICAgICAgICAgIGlmKHJlLmNvZGUpe1xuICAgICAgICAgICAgICAgICAgbGV0IHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOidwb3N0JyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTp7XG4gICAgICAgICAgICAgICAgICAgICAgY29kZTpyZS5jb2RlLFxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgZW5jcnlwdGVkX2RhdGE6cmVzLmRldGFpbC5lbmNyeXB0ZWREYXRhLFxuICAgICAgICAgICAgICAgICAgICAgIGl2OiByZXMuZGV0YWlsLml2LFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAvLyDnmbvlvZVcbiAgICAgICAgICAgICAgICAgIHd4UmVxdWVzdChwYXJhbXMsJy9sb2dpbicpLnRoZW4ociA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHIpXG4gICAgICAgICAgICAgICAgICAgICAgLy8g5YKo5a2YdG9rZW5cbiAgICAgICAgICAgICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYygndG9rZW4nLCByLmRhdGEuZGF0YS50b2tlbilcbiAgXG4gICAgICAgICAgICAgICAgICAgICAgLy8g55m75b2V5a6M5oiQIOi3s+i9rOWIsOeZu+W9leS5i+WJjeeahOmhtemdoizlubblsIbmkLrluKbnlKjmiLfkv6Hmga9cbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLiRyZWRpcmVjdCgnL3BhZ2VzL2xvZ2luJyx7XG4gICAgICAgICAgICAgICAgICAgICAgICBmcm9tOiAnLycrdGhpcy4kd3hwYWdlLnJvdXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZW5jcnlwdGVkX2RhdGE6cmVzLmRldGFpbC5lbmNyeXB0ZWREYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXY6cmVzLmRldGFpbC5pdixcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5SWQ6dGhpcy5hY3Rpdml0eUlkICxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwSW52aXRlcklkOnRoaXMuZ3JvdXBJbnZpdGVySWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBidXlQcmljZTogcHJpY2VcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5idXlQcmljZSA9IHByaWNlO1xuICAgICAgICAgICAgdGhpcy5zaG93UGF5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuaGlkZVBheSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gdGhpcy5idXlQcmljZSA9IHByaWNlO1xuICAgICAgICAgIC8vIHRoaXMuc2hvd1BheSA9IHRydWU7XG4gICAgICAgICAgLy8gdGhpcy5oaWRlUGF5ID0gZmFsc2U7XG4gICAgICAgICAgLy8gdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIC8vIOWFs+mXreaUr+S7mOW8ueeql1xuICAgICAgY2xvc2VQYXkoKXtcbiAgICAgICAgdGhpcy5zaG93UGF5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaGlkZVBheSA9IHRydWU7XG4gICAgICB9LFxuXG4gICAgICAvLyDnlJ/miJDlm77niYdcbiAgICAgIGdvU2hhcmVQaWMoKXtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5hY3Rpdml0eSlcbiAgICAgICAgbGV0IGdyb3VwSW52aXRlcklkID0gdGhpcy5hY3Rpdml0eS5wcm9qZWN0X2dyb3VwX3VzZXIubGVuZ3RoID4gMCA/IHRoaXMuYWN0aXZpdHkucHJvamVjdF9ncm91cF91c2VyWzBdLnVzZXJfaWQ6dGhpcy5BY3RpY2l0eVVzZXIudXNlcl9pZFxuICAgICAgICB0aGlzLiRuYXZpZ2F0ZSgnL3BhZ2VzL3NoYXJlLXBpYycse3Byb2plY3RfaWQ6dGhpcy5hY3Rpdml0eS5pZCxncm91cF9pbnZpdGVyX2lkOmdyb3VwSW52aXRlcklkfSk7XG4gICAgICB9LFxuICAgICAgXG4gICAgICAvLyDpgoDor7flpb3lj4tcbiAgICAgIHNob3dGcmllbmQoKXtcbiAgICAgICAgc2hvd0ZyaWVuZCh0aGlzKVxuICAgICAgfSxcbiAgICAgIC8vIOWFs+mXreWlveWPi+W8ueeql1xuICAgICAgY2xvc2VGcmllbmQoKXtcbiAgICAgICAgY2xvc2VGcmllbmQodGhpcylcbiAgICAgIH0sXG4gICAgICAvLyDngrnlh7vliqDlvq7kv6HnvqQgXG4gICAgICBzaG93R3JvdXBDb2RlKCl7XG4gICAgICAgIHNob3dHcm91cENvZGUodGhpcyk7XG4gICAgICB9LFxuICAgICAgLy8g5YWz6Zet5Yqg576k5by556qXXG4gICAgICBjbG9zZUdyb3VwQ29kZSgpe1xuICAgICAgICBjbG9zZUdyb3VwQ29kZSh0aGlzKTtcbiAgICAgIH0sXG4gICAgICBcbiAgICAgIC8vIOW+ruS/oeaUr+S7mOaIkOWKn1xuICAgICAgcGF5KCl7XG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgICAgbGV0IHVzZXJzID0gdGhpcy5hY3Rpdml0eS5wcm9qZWN0X2dyb3VwX3VzZXI7XG4gICAgICAgIGxldCBwYXJhbXMgPSB7XG4gICAgICAgICAgbWV0aG9kOidwb3N0JyxcbiAgICAgICAgICBkYXRhOntcbiAgICAgICAgICAgIC8vIHByaWNlOnRoaXMuYnV5UHJpY2UsXG4gICAgICAgICAgICBwcm9qZWN0X2lkOnRoaXMuYWN0aXZpdHlJZCxcbiAgICAgICAgICAgIGJ1eV90eXBlOnRoaXMuYnV5X3R5cGUsXG4gICAgICAgICAgICAvL2dyb3VwX2ludml0ZXJfaWQ6ICh1c2VyTGVuZ3RoID4gMCAmJiB1c2VyTGVuZ3RoIDwgdGhpcy5hY3Rpdml0eS5wcm9qZWN0X2dyb3VwX251bSApPyB0aGlzLmFjdGl2aXR5LnByb2plY3RfZ3JvdXBfdXNlclswXS51c2VyX2lkOnRoaXMuQWN0aWNpdHlVc2VyLnVzZXJfaWRcbiAgICAgICAgICAgIGdyb3VwX2ludml0ZXJfaWQ6ICh1c2Vycy5sZW5ndGggPiAwICYmIHVzZXJzLmxlbmd0aCA8IHRoaXMuYWN0aXZpdHkucHJvamVjdF9ncm91cF9udW0pID8gdXNlcnNbMF0udXNlcl9pZDp0aGlzLkFjdGljaXR5VXNlci51c2VyX2lkXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHRoaXMuYWN0aXZpdHkgPSB7fTtcbiAgICAgICAgd3hSZXF1ZXN0KHBhcmFtcywnL29yZGVyL2NyZWF0ZScpLnRoZW4ocmVzPT57XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgIGlmKHJlcy5kYXRhLmNvZGUgPT0gMSl7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygxMTEpXG4gICAgICAgICAgICAvLyDmlK/ku5jmiJDlip8sIOS4lOS7t+agvOS4ujAsIOi3s+i9rOWIsOaUr+S7mOaIkOWKn1xuICAgICAgICAgICAgaWYodGhhdC5idXlQcmljZSA9PSAnMC4wMCcpe1xuICAgICAgICAgICAgICB0aGF0LiRwYXJlbnQuZ2xvYmFsRGF0YS5pc0J1eSA9IHRydWVcbiAgICAgICAgICAgICAgLy8g5Y2V54us6LSt5LmwIOWSjCDmiJDlm6LljZXni6zotK3kubBcbiAgICAgICAgICAgICAgaWYodGhhdC5hY3Rpdml0eS5wcm9qZWN0X3R5cGUgPT0gMSB8fCAodGhhdC5hY3Rpdml0eS5wcm9qZWN0X3R5cGUgPT0gMyAmJiB0aGF0LmJ1eV90eXBlID09IDEpICl7XG4gICAgICAgICAgICAgICAgdGhhdC5hY3Rpdml0eS5vcmRlcl9zdGF0dXMgPSAxO1xuICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgdGhhdC4kbmF2aWdhdGUoJy9wYWdlcy9wYXktc3VjY2Vzcycse2FjdGl2aXR5SW5mbzpKU09OLnN0cmluZ2lmeSh0aGF0LmFjdGl2aXR5KX0pO1xuICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBsZXQgZmxhZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGF0LmFjdGl2aXR5LnByb2plY3RfZ3JvdXBfdXNlci5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgICBsZXQgdXNlciA9IHRoYXQuYWN0aXZpdHkucHJvamVjdF9ncm91cF91c2VyW2ldO1xuICAgICAgICAgICAgICAgICAgaWYodXNlci51c2VyX2lkID09IHRoYXQuQWN0aWNpdHlVc2VyLnVzZXJfaWQpe1xuICAgICAgICAgICAgICAgICAgICBmbGFnID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKCFmbGFnKXtcbiAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aXZpdHkucHJvamVjdF9ncm91cF91c2VyLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgIGF2YXRhcl91cmw6IHRoYXQuQWN0aWNpdHlVc2VyLmF2YXRhcl91cmwsXG4gICAgICAgICAgICAgICAgICAgICAgbmlja25hbWU6dGhhdC5BY3RpY2l0eVVzZXIubmlja19uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgIG9yZGVyX3N0YXR1czoxLFxuICAgICAgICAgICAgICAgICAgICAgIHVzZXJfaWQ6dGhhdC5BY3RpY2l0eVVzZXIudXNlcl9pZFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGF0LmFjdGl2aXR5Lm9yZGVyX3N0YXR1cyA9IDE7XG4gICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICB0aGF0LiRuYXZpZ2F0ZSgnL3BhZ2VzL2xhdW5jaC1ncm91cCcse2FjdGl2aXR5SW5mbzpKU09OLnN0cmluZ2lmeSh0aGF0LmFjdGl2aXR5KSxwcm9qZWN0R3JvdXBOdW06dGhhdC5hY3Rpdml0eS5wcm9qZWN0X2dyb3VwX251bX0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoYXQuc2hvd1BheSA9IGZhbHNlO1xuICAgICAgICAgICAgICB0aGF0LmhpZGVQYXkgPSB0cnVlO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKDIyMjIpXG4gICAgICAgICAgICAgIHZhciBwYXlNb2RlbCA9IHJlcy5kYXRhLmRhdGEub3JkZXI7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHBheU1vZGVsKVxuICAgICAgICAgICAgICB3eC5yZXF1ZXN0UGF5bWVudCh7XG4gICAgICAgICAgICAgICAgJ3RpbWVTdGFtcCc6IHBheU1vZGVsLnRpbWVTdGFtcCxcbiAgICAgICAgICAgICAgICAnbm9uY2VTdHInOiBwYXlNb2RlbC5ub25jZVN0cixcbiAgICAgICAgICAgICAgICAncGFja2FnZSc6IHBheU1vZGVsLnBhY2thZ2UsXG4gICAgICAgICAgICAgICAgJ3NpZ25UeXBlJzogIHBheU1vZGVsLnNpZ25UeXBlLFxuICAgICAgICAgICAgICAgICdwYXlTaWduJzogcGF5TW9kZWwucGF5U2lnbixcbiAgICAgICAgICAgICAgICAnc3VjY2Vzcyc6IGZ1bmN0aW9uIChyKSB7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyKVxuICAgICAgICAgICAgICAgICAgdGhhdC4kcGFyZW50Lmdsb2JhbERhdGEuaXNCdXkgPSB0cnVlXG4gICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+aUr+S7mOaIkOWKnycsXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDAsXG4gICAgICAgICAgICAgICAgICAgIG1hc2s6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlID0+e1xuICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCfmlK/ku5jmiJDlip8nKVxuICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlKVxuICAgICAgICAgICAgICAgICAgICAgIC8v5pSv5LuY5oiQ5Yqf6L2s5Yiw5ou85Zui5oiQ5Yqf6aG1XG4gICAgICAgICAgICAgICAgICAgICAgLy90aGlzLiRuYXZpZ2F0ZSgnL3BhZ2VzL3BheS1zdWNjZXNzJyk7XG4gICAgICAgICAgICAgICAgICAgICAgaWYodGhhdC5hY3Rpdml0eS5wcm9qZWN0X3R5cGUgPT0gMSB8fCAodGhhdC5hY3Rpdml0eS5wcm9qZWN0X3R5cGUgPT0gMyAmJiB0aGF0LmJ1eV90eXBlID09IDEpICl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmFjdGl2aXR5Lm9yZGVyX3N0YXR1cyA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC4kbmF2aWdhdGUoJy9wYWdlcy9wYXktc3VjY2Vzcycse2FjdGl2aXR5SW5mbzpKU09OLnN0cmluZ2lmeSh0aGF0LmFjdGl2aXR5KX0pO1xuICAgICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmxhZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhhdC5hY3Rpdml0eS5wcm9qZWN0X2dyb3VwX3VzZXIubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB1c2VyID0gdGhhdC5hY3Rpdml0eS5wcm9qZWN0X2dyb3VwX3VzZXJbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodXNlci51c2VyX2lkID09IHRoYXQuQWN0aWNpdHlVc2VyLnVzZXJfaWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxhZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIWZsYWcpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aXZpdHkucHJvamVjdF9ncm91cF91c2VyLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdmF0YXJfdXJsOiB0aGF0LkFjdGljaXR5VXNlci5hdmF0YXJfdXJsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuaWNrbmFtZTp0aGF0LkFjdGljaXR5VXNlci5uaWNrX25hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVyX3N0YXR1czoxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyX2lkOnRoYXQuQWN0aWNpdHlVc2VyLnVzZXJfaWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8v5pSv5LuY5oiQ5YqfIG9yZGVyX3N0YXR1cyDkuLogMSBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuYWN0aXZpdHkub3JkZXJfc3RhdHVzID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LiRuYXZpZ2F0ZSgnL3BhZ2VzL2xhdW5jaC1ncm91cCcse2FjdGl2aXR5SW5mbzpKU09OLnN0cmluZ2lmeSh0aGF0LmFjdGl2aXR5KSxwcm9qZWN0R3JvdXBOdW06dGhhdC5hY3Rpdml0eS5wcm9qZWN0X2dyb3VwX251bX0pO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdmYWlsJzogZnVuY3Rpb24gKGZhaWwpIHtcbiAgICAgICAgICAgICAgICAgIHRoYXQuc2hvdyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgdGhhdC5oaWRlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICB0aGF0LnNob3dQYXkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgIHRoYXQuaGlkZVBheSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgdGhhdC5zaG93RnJpZW5kID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICB0aGF0LmhpZGVGcmllbmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgIHRoYXQuaG91cnMgPSAwO1xuICAgICAgICAgICAgICAgICAgdGhhdC5taW5zID0gMDtcbiAgICAgICAgICAgICAgICAgIHRoYXQuc2VjcyA9IDA7XG4gICAgICAgICAgICAgICAgICB0aGF0LnNlbGZIb3VycyA9IDA7XG4gICAgICAgICAgICAgICAgICB0aGF0LnNlbGZNaW5zID0gMDtcbiAgICAgICAgICAgICAgICAgIHRoYXQuc2VsZlNlY3MgPSAwO1xuICAgICAgICAgICAgICAgICAgdGhhdC5zZWxmSW5Vc2VycyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICB0aGF0LnNlbGZTdGF0dXMgPSAwO1xuICAgICAgICAgICAgICAgICAgdGhhdC5nZXRBY3Rpdml0eSgpO1xuICAgICAgICAgICAgICAgICAgdGhhdC4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICAgLyogIGNvbnNvbGUubG9nKGZhaWwpXG4gICAgICAgICAgICAgICAgICAvLyDlj5bmtojorqLljZUg6ZqQ6JeP5oyJ6ZKuXG4gICAgICAgICAgICAgICAgICB0aGF0LmhpZGVQYXkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgdGhhdC5zaG93UGF5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAvLyB0aGF0LiRhcHBseSgpO1xuICAgICAgICAgICAgICAgICAgdGhhdC5zZWxmSW5Vc2VycyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICB0aGF0LnNlbGZTdGF0dXMgPSAwO1xuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRoYXQudGltZXIyKVxuICAgICAgICAgICAgICAgICAgbGV0IG5vd0NvdW50RG93biA9IDYwKjEwO1xuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAvLyB0aGF0LnRpbWVyMiA9IHNldEludGVydmFsKCgpPT57XG4gICAgICAgICAgICAgICAgICAvLyAgIGxldCBob3VycyA9IE51bWJlcih0aGF0LkNvdW50ZG93bihub3dDb3VudERvd24pLmhvdXIpICsgdGhhdC5Db3VudGRvd24obm93Q291bnREb3duKS5kYXkqMjQ7XG4gICAgICAgICAgICAgICAgICAvLyAgIHRoYXQuc2VsZkhvdXJzID0gaG91cnMgPCAxMD8gJzAnK2hvdXJzIDogaG91cnM7XG4gICAgICAgICAgICAgICAgICAvLyAgIHRoYXQuc2VsZk1pbnMgPSB0aGF0LkNvdW50ZG93bihub3dDb3VudERvd24pLm1pbjtcbiAgICAgICAgICAgICAgICAgIC8vICAgdGhhdC5zZWxmU2VjcyA9IHRoYXQuQ291bnRkb3duKG5vd0NvdW50RG93bikuc2VjO1xuICAgICAgICAgICAgICAgICAgLy8gICBub3dDb3VudERvd24tLTtcbiAgICAgICAgICAgICAgICAgIC8vICAgdGhhdC4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgICAgIC8vIH0sMTAwMClcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoYXQpXG4gICAgICAgICAgICAgICAgICB0aGF0LiRhcHBseSgpO1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhhdC5zZWxmU3RhdHVzLHRoYXQuc2VsZkluVXNlcnMpICovXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBldmVudHMgPSB7XG4gICAgIFxuICAgIH1cbiAgICB3YXRjaCA9IHtcbiAgICAgIC8vIHNlbGZJblVzZXJzIChuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgIC8vICAgY29uc29sZS5sb2cobmV3VmFsdWUsICBvbGRWYWx1ZSlcbiAgICAgIC8vICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgLy8gfSxcbiAgIFxuICAgICAgLy8gc2VsZlN0YXR1cyAobmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAvLyAgIGNvbnNvbGUubG9nKG5ld1ZhbHVlLCAgb2xkVmFsdWUpXG4gICAgICAvLyAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIC8vIH0sXG4gICAgfVxuICAgIC8vIOWAkuiuoeaXtlxuICAgIENvdW50ZG93bihjb3VudGRvd24pe1xuICAgICAgLy8gbGV0IGZ1dHVyZSA9IG5ldyBEYXRlKGZ1dHVyZVRpbWUpLmdldFRpbWUoKTtcbiAgICAgIC8vIGxldCBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgIGxldCBkaWZmID0gY291bnRkb3duO1xuICAgICAgaWYoZGlmZiA8IDApIHJldHVybntcbiAgICAgICAgZGF5OiAnMDAnLFxuICAgICAgICBob3VyOiAnMDAnLFxuICAgICAgICBtaW46ICcwMCcsXG4gICAgICAgIHNlYzogJzAwJ1xuICAgICAgfVxuICAgICAgLy/ojrflj5bml7bpl7Tlt67nmoTlpKlcbiAgICAgIGxldCBkYXkgPSBnZXRUd28ocGFyc2VJbnQoZGlmZi8oMjQqNjAqNjApKSkgPT0gJzAwJz8gJzAwJyA6IGdldFR3byhwYXJzZUludChkaWZmLygyNCo2MCo2MCkpKTtcbiAgICAgIC8v6I635Y+W5pe26Ze05beu55qE5pe2XG4gICAgICBsZXQgaG91ciA9IGdldFR3byhwYXJzZUludChkaWZmLyg2MCo2MCklMjQpKSA9PSAnMDAnPyAnMDAnOiBnZXRUd28ocGFyc2VJbnQoZGlmZi8oNjAqNjApJTI0KSk7XG4gICAgICAvL+iOt+WPluaXtumXtOW3rueahOWIhlxuICAgICAgbGV0IG1pbiA9IGdldFR3byhwYXJzZUludChkaWZmLzYwJTYwKSkgPT0gJzAwJz8gJzAwJzogZ2V0VHdvKHBhcnNlSW50KGRpZmYvNjAlNjApKTtcbiAgICAgIC8v6I635Y+W5pe26Ze05beu55qE56eSXG4gICAgICBsZXQgc2VjID0gZ2V0VHdvKHBhcnNlSW50KGRpZmYgJSA2MCkpID09ICcwMCc/ICcwMCc6IGdldFR3byhwYXJzZUludChkaWZmICUgNjApKTtcbiAgICAgIC8v5aSE55CG5Liq5L2N5pWwXG4gICAgICBmdW5jdGlvbiBnZXRUd28obnVtKXtcbiAgICAgICAgcmV0dXJuIG51bSA8IDEwPyAnMCcgKyBudW0gOiBudW1cbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRheTogZGF5LFxuICAgICAgICBob3VyOiBob3VyLFxuICAgICAgICBtaW46IG1pbixcbiAgICAgICAgc2VjOiBzZWNcbiAgICAgIH1cbiAgICB9XG4gICAgLy8g6I635Y+W5rS75Yqo6K+m5oOF5pWw5o2uXG4gICAgZ2V0QWN0aXZpdHkoKXtcbiAgICAgIHRoaXMuc2VsZkluVXNlcnMgPSBmYWxzZTtcbiAgICAgIGxldCBwYXJhbXMgPSB7XG4gICAgICAgIG1ldGhvZDoncG9zdCcsXG4gICAgICAgIGRhdGE6e2lkOiB0aGlzLmFjdGl2aXR5SWQsIGdyb3VwX2ludml0ZXJfaWQ6IHRoaXMuZ3JvdXBJbnZpdGVySWR9XG4gICAgICB9XG4gICAgICB3eFJlcXVlc3QocGFyYW1zLCcvcHJvamVjdC9pdGVtJykudGhlbihyZXMgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygn5rWL6K+V5pi156ewJylcbiAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICB0aGlzLmFjdGl2aXR5ID0gcmVzLmRhdGEuZGF0YTtcbiAgICAgICAgLy8gcmVzLmRhdGEuZGF0YS5wcm9qZWN0X2dyb3VwX3VzZXIucG9wKClcbiAgICAgICAgbGV0IHVzZXJzID0gcmVzLmRhdGEuZGF0YS5wcm9qZWN0X2dyb3VwX3VzZXI7XG4gICAgICAgIGxldCBzZWxmSWQgPSB0aGlzLkFjdGljaXR5VXNlci51c2VyX2lkO1xuICAgICAgICB0aGlzLnVzZXJMZW4gPSB1c2Vycy5sZW5ndGg7XG4gICAgICAgIC8vIOWAkuiuoeaXtuS4uui0n+WAvCDkuJQg5Zui5LiN5ruhIOmAgOasvueKtuaAgVxuICAgICAgICBpZih0aGlzLmFjdGl2aXR5LnByb2plY3RfZ3JvdXBfY291bnRkb3duPD0wICYmIHRoaXMuYWN0aXZpdHkucHJvamVjdF9ncm91cF9udW0gPiB0aGlzLmFjdGl2aXR5LnByb2plY3RfZ3JvdXBfdXNlci5sZW5ndGgpe1xuICAgICAgICAgIHRoaXMuQWN0aXZpdHlTdGF0dXMgPSAyO1xuICAgICAgICB9XG4gICAgICAgIC8vIOWAkuiuoeaXtlxuICAgICAgICBpZih0aGlzLmFjdGl2aXR5LnByb2plY3RfZ3JvdXBfY291bnRkb3duPjAgJiYgdGhpcy5hY3Rpdml0eS5wcm9qZWN0X2dyb3VwX251bSA+IHRoaXMuYWN0aXZpdHkucHJvamVjdF9ncm91cF91c2VyLmxlbmd0aCl7XG4gICAgICAgICAgdGhpcy5BY3Rpdml0eVN0YXR1cyA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgLy8g5Zui5ruhIOaIkOWKn+eKtuaAgVxuICAgICAgICBpZih0aGlzLmFjdGl2aXR5LnByb2plY3RfZ3JvdXBfbnVtID09IHRoaXMuYWN0aXZpdHkucHJvamVjdF9ncm91cF91c2VyLmxlbmd0aCl7XG4gICAgICAgICAgdGhpcy5BY3Rpdml0eVN0YXR1cyA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjb25zb2xlLmxvZygnQWN0aXZpdHlTdGF0dXMtYWpheDonK3RoaXMuQWN0aXZpdHlTdGF0dXMpXG5cbiAgICAgICAgaWYodXNlcnMubGVuZ3RoID4gMCl7XG4gICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHVzZXJzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIGlmKHNlbGZJZCA9PSB1c2Vyc1tpXS51c2VyX2lkKXtcbiAgICAgICAgICAgICAgaWYodXNlcnNbaV0ub3JkZXJfc3RhdHVzID09IDApe1xuICAgICAgICAgICAgICAgICAgdGhpcy51c2VyTGVuLS07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIC8vIOeUqOaIt+WcqOWboui0reaVsOe7hOS4rVxuICAgICAgICAgICAgICB0aGlzLnNlbGZJblVzZXJzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgLy8g55So5oi355qE54q25oCBICDmmK/lkKbku5jmrL5cbiAgICAgICAgICAgICAgdGhpcy5zZWxmU3RhdHVzID0gdXNlcnNbaV0ub3JkZXJfc3RhdHVzO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHRoaXMuc2VsZkluVXNlcnMgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICBcbiAgICAgICAgaWYodGhpcy5hY3Rpdml0eS5wcm9qZWN0X2dyb3VwX2NvdW50ZG93biA+IDAgJiYgdGhpcy5hY3Rpdml0eS5wcm9qZWN0X2dyb3VwX251bSA+IHRoaXMuYWN0aXZpdHkucHJvamVjdF9ncm91cF91c2VyLmxlbmd0aCApe1xuICAgICAgICAgIHRoaXMuY291bnREb3duID0gdGhpcy5hY3Rpdml0eS5wcm9qZWN0X2dyb3VwX2NvdW50ZG93bjtcbiAgICAgICAgICAvLyB0aGlzLmNvdW50RG93biA9IDEwO1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcilcbiAgICAgICAgICB0aGlzLnRpbWVyID0gc2V0SW50ZXJ2YWwoKCk9PntcbiAgICAgICAgICAgIGxldCBjb3VudGRvd24gPSB0aGlzLmFjdGl2aXR5LnByb2plY3RfZ3JvdXBfY291bnRkb3duO1xuICAgICAgICAgICAgaWYoY291bnRkb3duIDw9IDApe1xuICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMudGltZXIpXG4gICAgICAgICAgICAgIHRoaXMuQWN0aXZpdHlTdGF0dXMgPSAyO1xuICAgICAgICAgICAgICAvLyB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgIGxldCBob3VycyA9IE51bWJlcih0aGlzLkNvdW50ZG93bihjb3VudGRvd24pLmhvdXIpICsgdGhpcy5Db3VudGRvd24oY291bnRkb3duKS5kYXkqMjQ7XG4gICAgICAgICAgICAgIHRoaXMuaG91cnMgPSBob3VycyA8IDEwPyAnMCcraG91cnMgOiBob3VycztcbiAgICAgICAgICAgICAgdGhpcy5taW5zID0gdGhpcy5Db3VudGRvd24oY291bnRkb3duKS5taW47XG4gICAgICAgICAgICAgIHRoaXMuc2VjcyA9IHRoaXMuQ291bnRkb3duKGNvdW50ZG93bikuc2VjO1xuICAgICAgICAgICAgICB0aGlzLmFjdGl2aXR5LnByb2plY3RfZ3JvdXBfY291bnRkb3duLS07XG4gICAgICAgICAgICAgIHRoaXMuY291bnREb3duLS07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgIH0sMTAwMClcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOacrOS6uuS4i+WNleacquS7mOasvueahOWAkuiuoeaXtlxuICAgICAgICBpZih0aGlzLmFjdGl2aXR5LnJlbWFpbl90aW1lID4gMCl7XG4gICAgICAgICAgdGhpcy5yZW1haW5UaW1lID0gdGhpcy5hY3Rpdml0eS5yZW1haW5fdGltZVxuICAgICAgICAgIHRoaXMuc2VsZkhvdXJzID0gMDtcbiAgICAgICAgICB0aGlzLnNlbGZNaW5zID0gMDtcbiAgICAgICAgICB0aGlzLnNlbGZTZWNzID0gMDtcbiAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyMSlcbiAgICAgICAgICB0aGlzLnRpbWVyMSA9IHNldEludGVydmFsKCgpPT57XG4gICAgICBcbiAgICAgICAgICAgIGlmKHRoaXMuYWN0aXZpdHkucmVtYWluX3RpbWUgPCAwKXtcbiAgICAgICAgICAgICAgLy8g5Yig6Zmk6Ieq5bexXG4gICAgICAgICAgICAgIHZhciBsZW4gPSB0aGlzLmFjdGl2aXR5LnByb2plY3RfZ3JvdXBfdXNlci5sZW5ndGg7XG4gICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBsZW47IGkrKyl7XG4gICAgICAgICAgICAgICAgbGV0IHVzZXIgPSB0aGlzLmFjdGl2aXR5LnByb2plY3RfZ3JvdXBfdXNlcltpXTtcbiAgICAgICAgICAgICAgICBpZih1c2VyLnVzZXJfaWQgPT0gdGhpcy5BY3RpY2l0eVVzZXIudXNlcl9pZCl7XG4gICAgICAgICAgICAgICAgICB0aGlzLmFjdGl2aXR5LnByb2plY3RfZ3JvdXBfdXNlci5zcGxpY2UoaSwxKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aGlzLnVzZXJMZW4gPSB0aGlzLmFjdGl2aXR5LnByb2plY3RfZ3JvdXBfdXNlci5sZW5ndGg7XG4gICAgICAgICAgICAgIHRoaXMuc2VsZkluVXNlcnMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgLy8gdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyKVxuICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMudGltZXIxKVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgIGxldCBob3VycyA9IE51bWJlcih0aGlzLkNvdW50ZG93bih0aGlzLmFjdGl2aXR5LnJlbWFpbl90aW1lKS5ob3VyKSArIHRoaXMuQ291bnRkb3duKHRoaXMuYWN0aXZpdHkucmVtYWluX3RpbWUpLmRheSoyNDtcbiAgICAgICAgICAgICAgdGhpcy5zZWxmSG91cnMgPSBob3VycyA8IDEwPyAnMCcraG91cnMgOiBob3VycztcbiAgICAgICAgICAgICAgdGhpcy5zZWxmTWlucyA9IHRoaXMuQ291bnRkb3duKHRoaXMuYWN0aXZpdHkucmVtYWluX3RpbWUpLm1pbjtcbiAgICAgICAgICAgICAgdGhpcy5zZWxmU2VjcyA9IHRoaXMuQ291bnRkb3duKHRoaXMuYWN0aXZpdHkucmVtYWluX3RpbWUpLnNlYztcbiAgICAgICAgICAgICAgdGhpcy5hY3Rpdml0eS5yZW1haW5fdGltZS0tO1xuICAgICAgICAgICAgICB0aGlzLnJlbWFpblRpbWUtLTtcbiAgICAgICAgICAgICAgLy8gdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgICAgfSwxMDAwKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuYWpheE92ZXIgPSAgdHJ1ZTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH0pXG4gICAgfVxuICAgIHR0KGNvdW50ZG93bixob3VycyxtaW5zLHNlY3MsdGltZXIpe1xuICAgICAgLy8gY29uc29sZS5sb2coY291bnRkb3duKVxuICAgICAgaWYoY291bnRkb3duIDwgMCl7XG4gICAgICAgIHRoaXMuQWN0aXZpdHlTdGF0dXMgPSAyO1xuICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKVxuICAgICAgfWVsc2V7XG4gICAgICAgIGxldCBob3VycyA9IE51bWJlcih0aGlzLkNvdW50ZG93bihjb3VudGRvd24pLmhvdXIpICsgdGhpcy5Db3VudGRvd24oY291bnRkb3duKS5kYXkqMjQ7XG4gICAgICAgIGhvdXJzID0gaG91cnMgPCAxMD8gJzAnK2hvdXJzIDogaG91cnM7XG4gICAgICAgIG1pbnMgPSB0aGlzLkNvdW50ZG93bihjb3VudGRvd24pLm1pbjtcbiAgICAgICAgc2VjcyA9IHRoaXMuQ291bnRkb3duKGNvdW50ZG93bikuc2VjO1xuICAgICAgfVxuICAgIH1cbiAgICAvL+WIhuS6q+e7meWlveWPi1xuICAgIG9uU2hhcmVBcHBNZXNzYWdlKCl7XG4gICAgICBjb25zb2xlLmxvZygnc2hhcmUnKVxuICAgICAgbGV0IHVzZXJzID0gdGhpcy5hY3Rpdml0eS5wcm9qZWN0X2dyb3VwX3VzZXJcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIGxldCBncm91cEludml0ZXJJZCA9ICh1c2Vycy5sZW5ndGggPiAwICYmIHVzZXJzLmxlbmd0aCA8IHRoaXMuYWN0aXZpdHkucHJvamVjdF9ncm91cF9udW0pID8gdXNlcnNbMF0udXNlcl9pZDp0aGlzLkFjdGljaXR5VXNlci51c2VyX2lkXG4gICAgICBsZXQgZ3JvdXBUaXRsZSA9IHRoaXMuYWN0aXZpdHkucHJvamVjdF90aXRsZTtcbiAgICAgIGxldCBncm91cElkID0gdGhpcy5hY3Rpdml0eS5pZDtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRpdGxlOiBncm91cFRpdGxlLFxuICAgICAgICBwYXRoOiAnL3BhZ2VzL2dyb3VwLWRldGFpbD9ncm91cEludml0ZXJJZD0nK2dyb3VwSW52aXRlcklkKycmYWN0aXZpdHlJZD0nK2dyb3VwSWQsICAvLyDkvKDpgJLpgoDor7fogIVJZFxuICAgICAgICBpbWFnZVVybDogdGhpcy5hY3Rpdml0eS5wcm9qZWN0X2NvdmVyX2ltYWdlID8gdGhpcy5hY3Rpdml0eS5wcm9qZWN0X2NvdmVyX2ltYWdlIDogdGhpcy5hY3Rpdml0eS5wcm9qZWN0X3RvcF9pbWFnZSwgLy8g5pyJ6YWN572u5Zu+54mH5bCx55So6YWN572u55qELCDmsqHmnInlsLHnlKjlpLTlm75cbiAgICAgICAgLy8gaW1hZ2VVcmw6Jy4uL2ltYWdlL2RlbW8ucG5nJyxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGF0LmFjdGl2aXR5KVxuICAgICAgICAgIHRoYXQuc2hvd0ZyaWVuZCA9IGZhbHNlO1xuICAgICAgICAgIHRoYXQuaGlkZUZyaWVuZCA9IHRydWU7XG4gICAgICAgICAgdGhhdC4kYXBwbHkoKTtcbiAgICAgICAgfSxcbiAgICAgICAgZmFpbDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygzMzMzMzMpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgb25Mb2FkKHBhcmFtcykge1xuICAgICAgY29uc29sZS5sb2cocGFyYW1zKVxuICAgICAgaWYocGFyYW1zLmZyb20gPT0gJ2xvZ2luJyl7XG4gICAgICAgIHRoaXMuc2hvd1BheSA9IHRydWU7XG4gICAgICAgIHRoaXMuaGlkZVBheSA9IGZhbHNlO1xuICAgICAgICBcbiAgICAgIH1lbHNle1xuICAgICAgICB0aGlzLnNob3dQYXkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5oaWRlUGF5ID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC8vIHRoaXMuc2hvdyA9IGZhbHNlO1xuICAgICAgLy8gdGhpcy5oaWRlID0gZmFsc2U7XG4gICAgICAvLyB0aGlzLnNob3dGcmllbmQgPSBmYWxzZTtcbiAgICAgIC8vIHRoaXMuaGlkZUZyaWVuZCA9IGZhbHNlO1xuICAgICAgLy8gdGhpcy5ob3VycyA9IDA7XG4gICAgICAvLyB0aGlzLm1pbnMgPSAwO1xuICAgICAgLy8gdGhpcy5zZWNzID0gMDtcbiAgICAgIC8vIHRoaXMuc2VsZkhvdXJzID0gMDtcbiAgICAgIC8vIHRoaXMuc2VsZk1pbnMgPSAwO1xuICAgICAgLy8gdGhpcy5zZWxmU2VjcyA9IDA7XG5cbiBcblxuICAgICAgdGhpcy5BY3RpY2l0eVVzZXIgPSB3eC5nZXRTdG9yYWdlU3luYygnQWN0aWNpdHlVc2VyJyk7XG4gICAgICBcbiAgXG4gICAgICBpZihwYXJhbXMuc2NlbmUpeyAvLyDpgJrov4fliIbkuqvlm77niYfov5vlhaXpobXpnaJcbiAgICAgICAgcGFyYW1zID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhcmFtcy5zY2VuZSlcbiAgICAgICAgbGV0IHBhcmFtQXJyID0gcGFyYW1zLnNwbGl0KCcsJylcbiAgICAgICAgaWYoIXBhcmFtQXJyWzBdIHx8ICFwYXJhbUFyclsxXSl7XG4gICAgICAgICAgdGhpcy4kc3dpdGNoKCcvcGFnZXMvaW5kZXgnKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICB0aGlzLmFjdGl2aXR5SWQgPSBwYXJhbUFyclswXTtcbiAgICAgICAgICB0aGlzLmdyb3VwSW52aXRlcklkID0gcGFyYW1BcnJbMV07XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2cocGFyYW1BcnIpXG4gICAgICB9ZWxzZXsgLy/lsI/nqIvluo/lhoXot7Povazov5vlhaVcblxuICAgICAgICAgdGhpcy5hY3Rpdml0eUlkID0gcGFyYW1zLmFjdGl2aXR5SWQ7XG4gICAgICAgICB0aGlzLmdyb3VwSW52aXRlcklkID0gcGFyYW1zLmdyb3VwSW52aXRlcklkID09IHVuZGVmaW5lZCA/IDAgOiBwYXJhbXMuZ3JvdXBJbnZpdGVySWQ7XG4gICAgICAgICB0aGlzLkFjdGl2aXR5U3RhdHVzID0gcGFyYW1zLmFjdGl2aXR5U3RhdHVzO1xuICAgICAgICAgdGhpcy5idXlQcmljZSA9IHBhcmFtcy5idXlQcmljZTtcbiAgICAgICAgIGNvbnNvbGUubG9nKCdBY3Rpdml0eVN0YXR1cy1sb2FkOicrdGhpcy5BY3Rpdml0eVN0YXR1cylcbiAgICAgIH1cbiAgICAgIHRoaXMuYWN0aXZpdHkgPSB7fTtcbiAgICAgXG4gICAgICBcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuQWN0aXZpdHlTdGF0dXMpXG4gICAgICB0aGlzLm5vd1RpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICBcbiAgICAgIFxuICAgICAgXG4gICAgfVxuICAgIG9uU2hvdygpe1xuXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLkFjdGljaXR5VXNlcilcbiAgICAgIHRoaXMuQWN0aWNpdHlVc2VyID0gd3guZ2V0U3RvcmFnZVN5bmMoJ0FjdGljaXR5VXNlcicpO1xuICAgICAgdGhpcy5nZXRBY3Rpdml0eSgpO1xuICAgICAgLy8gY29uc29sZS5sb2codGhpcy5BY3Rpdml0eVN0YXR1cylcbiAgICB9XG4gICAgb25IaWRlKCl7XG4gICAgICBjb25zb2xlLmxvZygnaGlkZScpXG4gICAgICAvLyB0aGlzLnNob3cgPSBmYWxzZTtcbiAgICAgIC8vIHRoaXMuaGlkZSA9IGZhbHNlO1xuICAgICAgLy8gdGhpcy5zaG93UGF5ID0gZmFsc2U7XG4gICAgICAvLyB0aGlzLmhpZGVQYXkgPSBmYWxzZTtcbiAgICAgIC8vIHRoaXMuc2hvd0ZyaWVuZCA9IGZhbHNlO1xuICAgICAgLy8gdGhpcy5oaWRlRnJpZW5kID0gZmFsc2U7XG4gICAgICAvLyB0aGlzLmhvdXJzID0gMDtcbiAgICAgIC8vIHRoaXMubWlucyA9IDA7XG4gICAgICAvLyB0aGlzLnNlY3MgPSAwO1xuICAgICAgLy8gdGhpcy5zZWxmSG91cnMgPSAwO1xuICAgICAgLy8gdGhpcy5zZWxmTWlucyA9IDA7XG4gICAgICAvLyB0aGlzLnNlbGZTZWNzID0gMDtcbiAgICAgIC8vIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcilcbiAgICAgIC8vIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcjEpXG4gICAgICAvLyBjbGVhckludGVydmFsKHRoYXQudGltZXIyKVxuICAgIH1cbiAgICBvblVubG9hZCgpe1xuICAgICAgY29uc29sZS5sb2coJ29uVW5sb2FkJylcbiAgICAgIHRoaXMuc2hvdyA9IGZhbHNlO1xuICAgICAgdGhpcy5oaWRlID0gZmFsc2U7XG4gICAgICB0aGlzLnNob3dQYXkgPSBmYWxzZTtcbiAgICAgIHRoaXMuaGlkZVBheSA9IGZhbHNlO1xuICAgICAgdGhpcy5zaG93RnJpZW5kID0gZmFsc2U7XG4gICAgICB0aGlzLmhpZGVGcmllbmQgPSBmYWxzZTtcbiAgICAgIHRoaXMuaG91cnMgPSAwO1xuICAgICAgdGhpcy5taW5zID0gMDtcbiAgICAgIHRoaXMuc2VjcyA9IDA7XG4gICAgICB0aGlzLnNlbGZIb3VycyA9IDA7XG4gICAgICB0aGlzLnNlbGZNaW5zID0gMDtcbiAgICAgIHRoaXMuc2VsZlNlY3MgPSAwO1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyKVxuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnRpbWVyMSlcbiAgICAgIC8vIGNsZWFySW50ZXJ2YWwodGhhdC50aW1lcjIpXG4gICAgICAvLyBjb25zb2xlLmxvZygnMjIzMjMyMycpXG4gICAgfVxuICB9XG4iXX0=