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
// import 'wepy-async-function'
// import API from '../mixins/data'


var Index = function (_wepy$page) {
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '高思乐享'
      // disableScroll: true
    }, _this.components = {}, _this.mixins = [], _this.data = {
      activityList: [],
      windowHeight: 0,
      activityId: null
      // countDown:10,
      // status: 1
    }, _this.computed = {}, _this.methods = {
      goGroupDetail: function goGroupDetail(id, e) {
        console.log(id);
        this.activityId = id; // 用于数据分析
        console.log(id);
        // 将formId绑定到活动列表页面. 点击就获取formId, 然后后台存储备用
        console.log(e.detail.formId);
        this.$navigate('/pages/group-detail', { activityId: id, form_id: e.detail.formId });
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'getActivityList',


    /*  timeD(){
      
           this.countDown = 10;
           clearInterval(this.timer)
           this.timer = setInterval(()=>{
             
             if(this.countDown <=0){
               clearInterval(this.timer)
               this.status = 2;
               // this.$apply();
             }else{
               // let hours = Number(this.Countdown(countdown).hour) + this.Countdown(countdown).day*24;
               // this.hours = hours < 10? '0'+hours : hours;
               // this.mins = this.Countdown(countdown).min;
               // this.secs = this.Countdown(countdown).sec;
               this.countDown--;
             }
             this.$apply();
           },1000)
        
     } */
    /* 
        onTabItemTap(item) {
          console.log(this.$wxpage.route)
          // 点击订单页面的时候, 检查是否登录过
          if(item.index == 1){
            // 没有登录就跳到登录页面
            if(!this.username){
              this.$redirect('/pages/login',{from:'/'+this.$wxpage.route})
            }
            //已经登录 跳到订单页面
            else  
            {
              //this.$navigate('/pages/login')
            }
          }
          
        } */

    // 获取活动列表数据
    value: function getActivityList() {
      var _this2 = this;

      (0, _request2.default)({ method: 'post' }, '/list').then(function (res) {
        console.log(res);
        // this.activityList[0] = res.data.data[0]
        _this2.activityList = res.data.data;
        _this2.$apply();
      });
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      console.log();
      // var res = wx.getSystemInfoSync()
      this.windowHeight = this.$parent.globalData.windowHeight;
      // this.timeD()
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      // 获取活动列表
      this.getActivityList();
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImNvbXBvbmVudHMiLCJtaXhpbnMiLCJkYXRhIiwiYWN0aXZpdHlMaXN0Iiwid2luZG93SGVpZ2h0IiwiYWN0aXZpdHlJZCIsImNvbXB1dGVkIiwibWV0aG9kcyIsImdvR3JvdXBEZXRhaWwiLCJpZCIsImUiLCJjb25zb2xlIiwibG9nIiwiZGV0YWlsIiwiZm9ybUlkIiwiJG5hdmlnYXRlIiwiZm9ybV9pZCIsImV2ZW50cyIsIm1ldGhvZCIsInRoZW4iLCJyZXMiLCIkYXBwbHkiLCIkcGFyZW50IiwiZ2xvYmFsRGF0YSIsImdldEFjdGl2aXR5TGlzdCIsIndlcHkiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUdBOzs7Ozs7Ozs7OztBQUZBO0FBQ0E7OztJQUdxQkEsSzs7Ozs7Ozs7Ozs7Ozs7b0xBQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCO0FBQ3hCO0FBRk8sSyxRQUlUQyxVLEdBQWEsRSxRQUdiQyxNLEdBQVMsRSxRQUVUQyxJLEdBQU87QUFDTEMsb0JBQWEsRUFEUjtBQUVMQyxvQkFBYSxDQUZSO0FBR0xDLGtCQUFXO0FBQ1g7QUFDQTtBQUxLLEssUUFRUEMsUSxHQUFXLEUsUUFJWEMsTyxHQUFVO0FBQ1JDLG1CQURRLHlCQUNNQyxFQUROLEVBQ1NDLENBRFQsRUFDVztBQUNqQkMsZ0JBQVFDLEdBQVIsQ0FBWUgsRUFBWjtBQUNBLGFBQUtKLFVBQUwsR0FBa0JJLEVBQWxCLENBRmlCLENBRUs7QUFDdEJFLGdCQUFRQyxHQUFSLENBQVlILEVBQVo7QUFDQTtBQUNBRSxnQkFBUUMsR0FBUixDQUFZRixFQUFFRyxNQUFGLENBQVNDLE1BQXJCO0FBQ0EsYUFBS0MsU0FBTCxDQUFlLHFCQUFmLEVBQXFDLEVBQUNWLFlBQVdJLEVBQVosRUFBZU8sU0FBUU4sRUFBRUcsTUFBRixDQUFTQyxNQUFoQyxFQUFyQztBQUNEO0FBUk8sSyxRQTBCVkcsTSxHQUFTLEU7Ozs7Ozs7QUFLVjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQkk7c0NBQ2lCO0FBQUE7O0FBQ2YsNkJBQVUsRUFBQ0MsUUFBTyxNQUFSLEVBQVYsRUFBMEIsT0FBMUIsRUFBbUNDLElBQW5DLENBQXdDLGVBQUs7QUFDM0NSLGdCQUFRQyxHQUFSLENBQVlRLEdBQVo7QUFDQTtBQUNBLGVBQUtqQixZQUFMLEdBQW9CaUIsSUFBSWxCLElBQUosQ0FBU0EsSUFBN0I7QUFDQSxlQUFLbUIsTUFBTDtBQUNELE9BTEQ7QUFNRDs7OzZCQUNRO0FBQ1BWLGNBQVFDLEdBQVI7QUFDQTtBQUNBLFdBQUtSLFlBQUwsR0FBb0IsS0FBS2tCLE9BQUwsQ0FBYUMsVUFBYixDQUF3Qm5CLFlBQTVDO0FBQ0E7QUFDRDs7OzZCQUNPO0FBQ047QUFDQSxXQUFLb0IsZUFBTDtBQUNEOzs7O0VBL0dnQ0MsZUFBS0MsSTs7a0JBQW5CN0IsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuICAvLyBpbXBvcnQgJ3dlcHktYXN5bmMtZnVuY3Rpb24nXG4gIC8vIGltcG9ydCBBUEkgZnJvbSAnLi4vbWl4aW5zL2RhdGEnXG4gIGltcG9ydCB3eFJlcXVlc3QgZnJvbSAnLi4vdXRpbC9yZXF1ZXN0J1xuICBcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfpq5jmgJ3kuZDkuqsnLFxuICAgICAgLy8gZGlzYWJsZVNjcm9sbDogdHJ1ZVxuICAgIH1cbiAgICBjb21wb25lbnRzID0ge1xuICAgIH1cblxuICAgIG1peGlucyA9IFtdXG5cbiAgICBkYXRhID0ge1xuICAgICAgYWN0aXZpdHlMaXN0OltdLFxuICAgICAgd2luZG93SGVpZ2h0OjAsXG4gICAgICBhY3Rpdml0eUlkOm51bGxcbiAgICAgIC8vIGNvdW50RG93bjoxMCxcbiAgICAgIC8vIHN0YXR1czogMVxuICAgIH1cblxuICAgIGNvbXB1dGVkID0ge1xuXG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIGdvR3JvdXBEZXRhaWwoaWQsZSl7XG4gICAgICAgIGNvbnNvbGUubG9nKGlkKVxuICAgICAgICB0aGlzLmFjdGl2aXR5SWQgPSBpZDsgLy8g55So5LqO5pWw5o2u5YiG5p6QXG4gICAgICAgIGNvbnNvbGUubG9nKGlkKVxuICAgICAgICAvLyDlsIZmb3JtSWTnu5HlrprliLDmtLvliqjliJfooajpobXpnaIuIOeCueWHu+WwseiOt+WPlmZvcm1JZCwg54S25ZCO5ZCO5Y+w5a2Y5YKo5aSH55SoXG4gICAgICAgIGNvbnNvbGUubG9nKGUuZGV0YWlsLmZvcm1JZClcbiAgICAgICAgdGhpcy4kbmF2aWdhdGUoJy9wYWdlcy9ncm91cC1kZXRhaWwnLHthY3Rpdml0eUlkOmlkLGZvcm1faWQ6ZS5kZXRhaWwuZm9ybUlkfSlcbiAgICAgIH0sXG5cbiAgICAgIFxuICAgICAgIFxuICAgICAgLyogZ29CdXkoY29kZSl7XG4gICAgICAgIC8v5qC55o2u5rS75Yqo57yW56CB6L+b5YWl5Yiw6K+m5oOF6aG1XG4gICAgICAgIHRoaXMuJG5hdmlnYXRlKCcvcGFnZXMvZ3JvdXAtZGV0YWlsJyx7YWN0aXZpdHlJZDppZH0pXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGluZGV4KVxuICAgICAgICAvLyDmnKrnmbvlvZXml7Yg5YWI55m75b2VXG4gICAgICAgIC8vIGlmKCF0aGlzLnVzZXJuYW1lKXtcbiAgICAgICAgLy8gICB0aGlzLiRuYXZpZ2F0ZSgnL3BhZ2VzL2xvZ2luJyx7ZnJvbTp0aGlzLiR3eHBhZ2Uucm91dGV9KVxuICAgICAgICAvLyB9ZWxzZXtcbiAgICAgICAgLy8gICAvLyDnmbvlvZXml7Yg6Lez6L2s5Yiw6K+m5oOF6aG1XG4gICAgICAgIC8vICAgdGhpcy4kbmF2aWdhdGUoJy9wYWdlcy9ncm91cC1kZXRhaWwnLHtpbmRleDppbmRleH0pXG4gICAgICAgIC8vIH1cbiAgICAgIH0gKi9cbiAgICB9XG5cbiAgICBldmVudHMgPSB7XG4gICAgIFxuICAgIH1cblxuXG4gICAvKiAgdGltZUQoKXtcbiAgICAgXG4gICAgICAgICAgdGhpcy5jb3VudERvd24gPSAxMDtcbiAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMudGltZXIpXG4gICAgICAgICAgdGhpcy50aW1lciA9IHNldEludGVydmFsKCgpPT57XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKHRoaXMuY291bnREb3duIDw9MCl7XG4gICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcilcbiAgICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSAyO1xuICAgICAgICAgICAgICAvLyB0aGlzLiRhcHBseSgpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgIC8vIGxldCBob3VycyA9IE51bWJlcih0aGlzLkNvdW50ZG93bihjb3VudGRvd24pLmhvdXIpICsgdGhpcy5Db3VudGRvd24oY291bnRkb3duKS5kYXkqMjQ7XG4gICAgICAgICAgICAgIC8vIHRoaXMuaG91cnMgPSBob3VycyA8IDEwPyAnMCcraG91cnMgOiBob3VycztcbiAgICAgICAgICAgICAgLy8gdGhpcy5taW5zID0gdGhpcy5Db3VudGRvd24oY291bnRkb3duKS5taW47XG4gICAgICAgICAgICAgIC8vIHRoaXMuc2VjcyA9IHRoaXMuQ291bnRkb3duKGNvdW50ZG93bikuc2VjO1xuICAgICAgICAgICAgICB0aGlzLmNvdW50RG93bi0tO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgICAgICB9LDEwMDApXG4gICAgICAgXG4gICAgfSAqL1xuLyogXG4gICAgb25UYWJJdGVtVGFwKGl0ZW0pIHtcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuJHd4cGFnZS5yb3V0ZSlcbiAgICAgIC8vIOeCueWHu+iuouWNlemhtemdoueahOaXtuWAmSwg5qOA5p+l5piv5ZCm55m75b2V6L+HXG4gICAgICBpZihpdGVtLmluZGV4ID09IDEpe1xuICAgICAgICAvLyDmsqHmnInnmbvlvZXlsLHot7PliLDnmbvlvZXpobXpnaJcbiAgICAgICAgaWYoIXRoaXMudXNlcm5hbWUpe1xuICAgICAgICAgIHRoaXMuJHJlZGlyZWN0KCcvcGFnZXMvbG9naW4nLHtmcm9tOicvJyt0aGlzLiR3eHBhZ2Uucm91dGV9KVxuICAgICAgICB9XG4gICAgICAgIC8v5bey57uP55m75b2VIOi3s+WIsOiuouWNlemhtemdolxuICAgICAgICBlbHNlICBcbiAgICAgICAge1xuICAgICAgICAgIC8vdGhpcy4kbmF2aWdhdGUoJy9wYWdlcy9sb2dpbicpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIFxuICAgIH0gKi9cblxuXG4gICAgLy8g6I635Y+W5rS75Yqo5YiX6KGo5pWw5o2uXG4gICAgZ2V0QWN0aXZpdHlMaXN0KCl7XG4gICAgICB3eFJlcXVlc3Qoe21ldGhvZDoncG9zdCd9LCcvbGlzdCcpLnRoZW4ocmVzPT57XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcylcbiAgICAgICAgLy8gdGhpcy5hY3Rpdml0eUxpc3RbMF0gPSByZXMuZGF0YS5kYXRhWzBdXG4gICAgICAgIHRoaXMuYWN0aXZpdHlMaXN0ID0gcmVzLmRhdGEuZGF0YTtcbiAgICAgICAgdGhpcy4kYXBwbHkoKTtcbiAgICAgIH0pXG4gICAgfVxuICAgIG9uTG9hZCgpIHtcbiAgICAgIGNvbnNvbGUubG9nKClcbiAgICAgIC8vIHZhciByZXMgPSB3eC5nZXRTeXN0ZW1JbmZvU3luYygpXG4gICAgICB0aGlzLndpbmRvd0hlaWdodCA9IHRoaXMuJHBhcmVudC5nbG9iYWxEYXRhLndpbmRvd0hlaWdodDtcbiAgICAgIC8vIHRoaXMudGltZUQoKVxuICAgIH1cbiAgICBvblNob3coKXtcbiAgICAgIC8vIOiOt+WPlua0u+WKqOWIl+ihqFxuICAgICAgdGhpcy5nZXRBY3Rpdml0eUxpc3QoKTtcbiAgICB9XG4gIH1cbiJdfQ==