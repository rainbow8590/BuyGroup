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

var LanuchGroup = function (_wepy$page) {
  _inherits(LanuchGroup, _wepy$page);

  function LanuchGroup() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, LanuchGroup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LanuchGroup.__proto__ || Object.getPrototypeOf(LanuchGroup)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '发起拼团'
      // disableScroll: true
    }, _this.components = {}, _this.mixins = [], _this.data = {
      show: false,
      hide: false,
      isShowFriend: false, // 邀请好友
      showFriend: false,
      hideFriend: false,
      projectGroupNum: 0, // 成团人数
      ActicityUser: wx.getStorageSync('ActicityUser'), // 账户信息
      activityInfo: {}
    }, _this.computed = {}, _this.methods = {
      // 拼团详情
      goGroupDetail: function goGroupDetail() {
        this.$navigate('/pages/group-detail', { activityId: this.activityInfo.id, activityStatus: this.activityInfo.order_status });
      },

      // 生成图片
      goSharePic: function goSharePic() {
        var groupInviterId = this.activityInfo.project_group_user.length > 0 ? this.activityInfo.project_group_user[0].user_id : this.ActicityUser.user_id;
        this.$navigate('/pages/share-pic', { project_id: this.activityInfo.id, group_inviter_id: groupInviterId });
      },

      // 邀请好友
      showFriend: function showFriend() {
        (0, _public.showFriend)(this);
      },

      // 关闭支付弹窗
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
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(LanuchGroup, [{
    key: 'onShareAppMessage',

    //分享给好友
    value: function onShareAppMessage() {
      var that = this;
      var groupInviterId = this.activityInfo.project_group_user[0].user_id;
      var groupTitle = this.activityInfo.project_title;
      var groupId = this.activityInfo.id;
      return {
        title: groupTitle,
        path: '/pages/group-detail?groupInviterId=' + groupInviterId + '&activityId=' + groupId,
        imageUrl: this.activityInfo.project_cover_image ? this.activityInfo.project_cover_image : this.activityInfo.project_top_image,
        success: function success(res) {
          that.showFriend = false;
          that.hideFriend = true;
          that.$apply();
        },
        fail: function fail() {
          // console.log(333333)
        }
      };
    }
    // 获取活动详情数据

  }, {
    key: 'getActivity',
    value: function getActivity() {
      var _this2 = this;

      var users = this.activity.project_group_user;
      var groupInviterId = users.length > 0 && users.length < this.activity.project_group_num ? users[0].user_id : this.ActicityUser.user_id;
      var params = {
        method: 'post',
        data: { id: this.activity.id, group_inviter_id: groupInviterId
          // data:{id: 42, group_inviter_id: 0}
        } };
      (0, _request2.default)(params, '/project/item').then(function (res) {
        // console.log('测试昵称')
        console.log(res.data.data);
        _this2.activityInfo = res.data.data;
        _this2.ajaxOver = true;
        _this2.$apply();
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad(params) {

      this.activity = JSON.parse(params.activityInfo);
      this.ActicityUser = wx.getStorageSync('ActicityUser');
      // console.log(this.activity)
      // console.log(this.activity.project_group_num)
      // console.log(this.activity.project_group_user.length)
      this.getActivity();
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

  return LanuchGroup;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(LanuchGroup , 'pages/launch-group'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxhdW5jaC1ncm91cC5qcyJdLCJuYW1lcyI6WyJMYW51Y2hHcm91cCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJjb21wb25lbnRzIiwibWl4aW5zIiwiZGF0YSIsInNob3ciLCJoaWRlIiwiaXNTaG93RnJpZW5kIiwic2hvd0ZyaWVuZCIsImhpZGVGcmllbmQiLCJwcm9qZWN0R3JvdXBOdW0iLCJBY3RpY2l0eVVzZXIiLCJ3eCIsImdldFN0b3JhZ2VTeW5jIiwiYWN0aXZpdHlJbmZvIiwiY29tcHV0ZWQiLCJtZXRob2RzIiwiZ29Hcm91cERldGFpbCIsIiRuYXZpZ2F0ZSIsImFjdGl2aXR5SWQiLCJpZCIsImFjdGl2aXR5U3RhdHVzIiwib3JkZXJfc3RhdHVzIiwiZ29TaGFyZVBpYyIsImdyb3VwSW52aXRlcklkIiwicHJvamVjdF9ncm91cF91c2VyIiwibGVuZ3RoIiwidXNlcl9pZCIsInByb2plY3RfaWQiLCJncm91cF9pbnZpdGVyX2lkIiwiY2xvc2VGcmllbmQiLCJzaG93R3JvdXBDb2RlIiwiY2xvc2VHcm91cENvZGUiLCJldmVudHMiLCJ0aGF0IiwiZ3JvdXBUaXRsZSIsInByb2plY3RfdGl0bGUiLCJncm91cElkIiwidGl0bGUiLCJwYXRoIiwiaW1hZ2VVcmwiLCJwcm9qZWN0X2NvdmVyX2ltYWdlIiwicHJvamVjdF90b3BfaW1hZ2UiLCJzdWNjZXNzIiwicmVzIiwiJGFwcGx5IiwiZmFpbCIsInVzZXJzIiwiYWN0aXZpdHkiLCJwcm9qZWN0X2dyb3VwX251bSIsInBhcmFtcyIsIm1ldGhvZCIsInRoZW4iLCJjb25zb2xlIiwibG9nIiwiYWpheE92ZXIiLCJKU09OIiwicGFyc2UiLCJnZXRBY3Rpdml0eSIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7SUFDcUJBLFc7Ozs7Ozs7Ozs7Ozs7O2dNQUNuQkMsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQUN4QjtB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VixFQUFpQixlQUFqQixFQUFrQ0UsSUFBbEMsQ0FBdUMsZUFBTztBQUM1QztBQUNBQyxnQkFBUUMsR0FBUixDQUFZVixJQUFJeEMsSUFBSixDQUFTQSxJQUFyQjtBQUNBLGVBQUtVLFlBQUwsR0FBb0I4QixJQUFJeEMsSUFBSixDQUFTQSxJQUE3QjtBQUNBLGVBQUttRCxRQUFMLEdBQWlCLElBQWpCO0FBQ0EsZUFBS1YsTUFBTDtBQUNELE9BTkQ7QUFPRDs7OzJCQUVNSyxNLEVBQVE7O0FBR2IsV0FBS0YsUUFBTCxHQUFnQlEsS0FBS0MsS0FBTCxDQUFXUCxPQUFPcEMsWUFBbEIsQ0FBaEI7QUFDQSxXQUFLSCxZQUFMLEdBQW9CQyxHQUFHQyxjQUFILENBQWtCLGNBQWxCLENBQXBCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBSzZDLFdBQUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRDs7OztFQXJIc0NDLGVBQUtDLEk7O2tCQUF6QjdELFciLCJmaWxlIjoibGF1bmNoLWdyb3VwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGltcG9ydCB3eFJlcXVlc3QgZnJvbSAnLi4vdXRpbC9yZXF1ZXN0J1xuICBpbXBvcnQge3Nob3dGcmllbmQsY2xvc2VGcmllbmQsc2hvd0dyb3VwQ29kZSxjbG9zZUdyb3VwQ29kZX0gZnJvbSAnLi4vdXRpbC9wdWJsaWMnXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIExhbnVjaEdyb3VwIGV4dGVuZHMgd2VweS5wYWdlIHtcbiAgICBjb25maWcgPSB7XG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Y+R6LW35ou85ZuiJyxcbiAgICAgIC8vIGRpc2FibGVTY3JvbGw6IHRydWVcbiAgICB9XG4gICAgY29tcG9uZW50cyA9IHtcbiAgICB9XG5cbiAgICBtaXhpbnMgPSBbXVxuXG4gICAgZGF0YSA9IHtcbiAgICAgIHNob3c6IGZhbHNlLFxuICAgICAgaGlkZTpmYWxzZSxcbiAgICAgIGlzU2hvd0ZyaWVuZDogZmFsc2UsIC8vIOmCgOivt+WlveWPi1xuICAgICAgc2hvd0ZyaWVuZDogZmFsc2UsXG4gICAgICBoaWRlRnJpZW5kOiBmYWxzZSxcbiAgICAgIHByb2plY3RHcm91cE51bTogMCwgLy8g5oiQ5Zui5Lq65pWwXG4gICAgICBBY3RpY2l0eVVzZXI6IHd4LmdldFN0b3JhZ2VTeW5jKCdBY3RpY2l0eVVzZXInKSwgLy8g6LSm5oi35L+h5oGvXG4gICAgICBhY3Rpdml0eUluZm86e31cbiAgICB9XG5cbiAgICBjb21wdXRlZCA9IHtcbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgICAgLy8g5ou85Zui6K+m5oOFXG4gICAgICBnb0dyb3VwRGV0YWlsKCl7XG4gICAgICAgIHRoaXMuJG5hdmlnYXRlKCcvcGFnZXMvZ3JvdXAtZGV0YWlsJyx7YWN0aXZpdHlJZDp0aGlzLmFjdGl2aXR5SW5mby5pZCxhY3Rpdml0eVN0YXR1czp0aGlzLmFjdGl2aXR5SW5mby5vcmRlcl9zdGF0dXN9KTtcbiAgICAgIH0sXG4gICAgICAvLyDnlJ/miJDlm77niYdcbiAgICAgIGdvU2hhcmVQaWMoKXtcbiAgICAgICAgbGV0IGdyb3VwSW52aXRlcklkID0gdGhpcy5hY3Rpdml0eUluZm8ucHJvamVjdF9ncm91cF91c2VyLmxlbmd0aCA+IDAgPyB0aGlzLmFjdGl2aXR5SW5mby5wcm9qZWN0X2dyb3VwX3VzZXJbMF0udXNlcl9pZDp0aGlzLkFjdGljaXR5VXNlci51c2VyX2lkXG4gICAgICAgIHRoaXMuJG5hdmlnYXRlKCcvcGFnZXMvc2hhcmUtcGljJyx7cHJvamVjdF9pZDp0aGlzLmFjdGl2aXR5SW5mby5pZCxncm91cF9pbnZpdGVyX2lkOmdyb3VwSW52aXRlcklkfSk7XG4gICAgICB9LFxuICAgICAgLy8g6YKA6K+35aW95Y+LXG4gICAgICBzaG93RnJpZW5kKCl7XG4gICAgICAgIHNob3dGcmllbmQodGhpcylcbiAgICAgIH0sXG4gICAgICAvLyDlhbPpl63mlK/ku5jlvLnnqpdcbiAgICAgIGNsb3NlRnJpZW5kKCl7XG4gICAgICAgIGNsb3NlRnJpZW5kKHRoaXMpXG4gICAgICB9LFxuICAgICAgLy8g54K55Ye75Yqg5b6u5L+h576kIFxuICAgICAgc2hvd0dyb3VwQ29kZSgpe1xuICAgICAgICBzaG93R3JvdXBDb2RlKHRoaXMpO1xuICAgICAgfSxcbiAgICAgICAvLyDlhbPpl63liqDnvqTlvLnnqpdcbiAgICAgIGNsb3NlR3JvdXBDb2RlKCl7XG4gICAgICAgIGNsb3NlR3JvdXBDb2RlKHRoaXMpO1xuICAgICAgfSxcbiAgICB9XG5cbiAgICBldmVudHMgPSB7XG4gICAgIFxuICAgIH1cbiAgICAvL+WIhuS6q+e7meWlveWPi1xuICAgIG9uU2hhcmVBcHBNZXNzYWdlKCl7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICBsZXQgZ3JvdXBJbnZpdGVySWQgPSB0aGlzLmFjdGl2aXR5SW5mby5wcm9qZWN0X2dyb3VwX3VzZXJbMF0udXNlcl9pZFxuICAgICAgbGV0IGdyb3VwVGl0bGUgPSB0aGlzLmFjdGl2aXR5SW5mby5wcm9qZWN0X3RpdGxlO1xuICAgICAgbGV0IGdyb3VwSWQgPSB0aGlzLmFjdGl2aXR5SW5mby5pZDtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRpdGxlOmdyb3VwVGl0bGUsXG4gICAgICAgIHBhdGg6ICcvcGFnZXMvZ3JvdXAtZGV0YWlsP2dyb3VwSW52aXRlcklkPScrZ3JvdXBJbnZpdGVySWQrJyZhY3Rpdml0eUlkPScrZ3JvdXBJZCxcbiAgICAgICAgaW1hZ2VVcmw6dGhpcy5hY3Rpdml0eUluZm8ucHJvamVjdF9jb3Zlcl9pbWFnZSA/IHRoaXMuYWN0aXZpdHlJbmZvLnByb2plY3RfY292ZXJfaW1hZ2UgOiB0aGlzLmFjdGl2aXR5SW5mby5wcm9qZWN0X3RvcF9pbWFnZSxcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgICB0aGF0LnNob3dGcmllbmQgPSBmYWxzZTtcbiAgICAgICAgICB0aGF0LmhpZGVGcmllbmQgPSB0cnVlO1xuICAgICAgICAgIHRoYXQuJGFwcGx5KCk7XG4gICAgICAgIH0sXG4gICAgICAgIGZhaWw6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coMzMzMzMzKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgLy8g6I635Y+W5rS75Yqo6K+m5oOF5pWw5o2uXG4gICAgZ2V0QWN0aXZpdHkoKXtcbiAgICAgIGxldCB1c2VycyA9IHRoaXMuYWN0aXZpdHkucHJvamVjdF9ncm91cF91c2VyO1xuICAgICAgbGV0IGdyb3VwSW52aXRlcklkID0gKHVzZXJzLmxlbmd0aCA+IDAgJiYgdXNlcnMubGVuZ3RoIDwgdGhpcy5hY3Rpdml0eS5wcm9qZWN0X2dyb3VwX251bSkgPyB1c2Vyc1swXS51c2VyX2lkOnRoaXMuQWN0aWNpdHlVc2VyLnVzZXJfaWQ7XG4gICAgICBsZXQgcGFyYW1zID0ge1xuICAgICAgICBtZXRob2Q6J3Bvc3QnLFxuICAgICAgICBkYXRhOntpZDogdGhpcy5hY3Rpdml0eS5pZCwgZ3JvdXBfaW52aXRlcl9pZDogZ3JvdXBJbnZpdGVySWR9XG4gICAgICAgIC8vIGRhdGE6e2lkOiA0MiwgZ3JvdXBfaW52aXRlcl9pZDogMH1cbiAgICAgIH1cbiAgICAgIHd4UmVxdWVzdChwYXJhbXMsJy9wcm9qZWN0L2l0ZW0nKS50aGVuKHJlcyA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCfmtYvor5XmmLXnp7AnKVxuICAgICAgICBjb25zb2xlLmxvZyhyZXMuZGF0YS5kYXRhKVxuICAgICAgICB0aGlzLmFjdGl2aXR5SW5mbyA9IHJlcy5kYXRhLmRhdGE7XG4gICAgICAgIHRoaXMuYWpheE92ZXIgPSAgdHJ1ZTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgb25Mb2FkKHBhcmFtcykge1xuICAgICAgXG4gICAgICBcbiAgICAgIHRoaXMuYWN0aXZpdHkgPSBKU09OLnBhcnNlKHBhcmFtcy5hY3Rpdml0eUluZm8pXG4gICAgICB0aGlzLkFjdGljaXR5VXNlciA9IHd4LmdldFN0b3JhZ2VTeW5jKCdBY3RpY2l0eVVzZXInKVxuICAgICAgLy8gY29uc29sZS5sb2codGhpcy5hY3Rpdml0eSlcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuYWN0aXZpdHkucHJvamVjdF9ncm91cF9udW0pXG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLmFjdGl2aXR5LnByb2plY3RfZ3JvdXBfdXNlci5sZW5ndGgpXG4gICAgICB0aGlzLmdldEFjdGl2aXR5KClcbiAgICAgIC8vIOafpeeci+aYr+WQpuaOiOadg+i/h1xuICAgICAgLy8gd3guZ2V0U2V0dGluZyh7XG4gICAgICAvLyAgIHN1Y2Nlc3M6IChyZXMpID0+IHtcbiAgICAgIC8vICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAvLyAgICAgdmFyIGRhdGEgPSByZXMuYXV0aFNldHRpbmc7XG4gICAgICAvLyAgICAgaWYoIWRhdGEuYXV0aFNldHRpbmcpe1xuICAgICAgLy8gICAgICAgd3guYXV0aG9yaXplKHtcbiAgICAgIC8vICAgICAgICAgICBzY29wZTogJ3Njb3BlLnVzZXJJbmZvJyxcbiAgICAgIC8vICAgICAgICAgICBzdWNjZXNzKHJlcykge1xuICAgICAgLy8gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgIC8vICAgICAgICAgICB9XG4gICAgICAvLyAgICAgICB9KVxuICAgICAgLy8gICAgIH1cbiAgICAgIC8vICAgfVxuICAgICAgLy8gfSlcbiAgICB9XG4gIH1cbiJdfQ==