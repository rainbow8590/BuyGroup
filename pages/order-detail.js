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

var OrderDetail = function (_wepy$page) {
  _inherits(OrderDetail, _wepy$page);

  function OrderDetail() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, OrderDetail);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = OrderDetail.__proto__ || Object.getPrototypeOf(OrderDetail)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '订单详情',
      disableScroll: true
    }, _this.components = {}, _this.mixins = [], _this.data = {
      activityInfo: {}
    }, _this.computed = {}, _this.methods = {
      // 查看活动
      goGroupDetail: function goGroupDetail() {
        this.$navigate('/pages/group-detail', { activityId: this.activityInfo.project_id, activityStatus: this.activityInfo.order_status });
      },

      // 全部订单
      goOrders: function goOrders() {
        console.log(1);
        this.$switch('/pages/order');
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(OrderDetail, [{
    key: 'getOrder',


    // 获取订单详情
    value: function getOrder(orderId) {
      var _this2 = this;

      (0, _request2.default)({ method: 'post', data: { id: orderId } }, '/order/item').then(function (res) {
        if (res.data.code == 1) {
          _this2.activityInfo = res.data.data;
          if (_this2.activityInfo.order_type == 1) {
            if (_this2.activityInfo.order_status == 1) {
              _this2.activityInfo.order_state = '购买成功';
            } else if (_this2.activityInfo.order_status == 0) {
              _this2.activityInfo.order_state = '未付款';
            } else {
              _this2.activityInfo.order_state = '已退款';
            }
          } else if (_this2.activityInfo.order_type == 2) {
            if (_this2.activityInfo.order_status == 1) {
              _this2.activityInfo.order_state = '团购成功';
            } else if (_this2.activityInfo.order_status == 0) {
              _this2.activityInfo.order_state = '团购中';
            } else {
              _this2.activityInfo.order_state = '已退款';
            }
          }
          _this2.$apply();
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
    value: function onLoad(params) {
      var orderId = params.orderId;
      console.log(orderId);
      this.getOrder(orderId);
    }
  }]);

  return OrderDetail;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(OrderDetail , 'pages/order-detail'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9yZGVyLWRldGFpbC5qcyJdLCJuYW1lcyI6WyJPcmRlckRldGFpbCIsImNvbmZpZyIsIm5hdmlnYXRpb25CYXJUaXRsZVRleHQiLCJkaXNhYmxlU2Nyb2xsIiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJhY3Rpdml0eUluZm8iLCJjb21wdXRlZCIsIm1ldGhvZHMiLCJnb0dyb3VwRGV0YWlsIiwiJG5hdmlnYXRlIiwiYWN0aXZpdHlJZCIsInByb2plY3RfaWQiLCJhY3Rpdml0eVN0YXR1cyIsIm9yZGVyX3N0YXR1cyIsImdvT3JkZXJzIiwiY29uc29sZSIsImxvZyIsIiRzd2l0Y2giLCJldmVudHMiLCJvcmRlcklkIiwibWV0aG9kIiwiaWQiLCJ0aGVuIiwicmVzIiwiY29kZSIsIm9yZGVyX3R5cGUiLCJvcmRlcl9zdGF0ZSIsIiRhcHBseSIsInd4Iiwic2hvd01vZGFsIiwidGl0bGUiLCJjb250ZW50IiwibXNnIiwic2hvd0NhbmNlbCIsInBhcmFtcyIsImdldE9yZGVyIiwid2VweSIsInBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsVzs7Ozs7Ozs7Ozs7Ozs7Z01BQ25CQyxNLEdBQVM7QUFDUEMsOEJBQXdCLE1BRGpCO0FBRVBDLHFCQUFlO0FBRlIsSyxRQUlUQyxVLEdBQWEsRSxRQUdiQyxNLEdBQVMsRSxRQUVUQyxJLEdBQU87QUFDTEMsb0JBQWE7QUFEUixLLFFBSVBDLFEsR0FBVyxFLFFBSVhDLE8sR0FBVTtBQUNSO0FBQ0FDLG1CQUZRLDJCQUVPO0FBQ2IsYUFBS0MsU0FBTCxDQUFlLHFCQUFmLEVBQXFDLEVBQUNDLFlBQVcsS0FBS0wsWUFBTCxDQUFrQk0sVUFBOUIsRUFBeUNDLGdCQUFlLEtBQUtQLFlBQUwsQ0FBa0JRLFlBQTFFLEVBQXJDO0FBQ0QsT0FKTzs7QUFLUjtBQUNBQyxjQU5RLHNCQU1FO0FBQ1JDLGdCQUFRQyxHQUFSLENBQVksQ0FBWjtBQUNBLGFBQUtDLE9BQUwsQ0FBYSxjQUFiO0FBQ0Q7QUFUTyxLLFFBWVZDLE0sR0FBUyxFOzs7Ozs7O0FBSVQ7NkJBQ1NDLE8sRUFBUTtBQUFBOztBQUNmLDZCQUFVLEVBQUNDLFFBQU8sTUFBUixFQUFlaEIsTUFBSyxFQUFDaUIsSUFBR0YsT0FBSixFQUFwQixFQUFWLEVBQTRDLGFBQTVDLEVBQTJERyxJQUEzRCxDQUFnRSxlQUFPO0FBQ3JFLFlBQUdDLElBQUluQixJQUFKLENBQVNvQixJQUFULElBQWlCLENBQXBCLEVBQXNCO0FBQ3BCLGlCQUFLbkIsWUFBTCxHQUFvQmtCLElBQUluQixJQUFKLENBQVNBLElBQTdCO0FBQ0EsY0FBRyxPQUFLQyxZQUFMLENBQWtCb0IsVUFBbEIsSUFBZ0MsQ0FBbkMsRUFBcUM7QUFDakMsZ0JBQUcsT0FBS3BCLFlBQUwsQ0FBa0JRLFlBQWxCLElBQWtDLENBQXJDLEVBQXVDO0FBQ3JDLHFCQUFLUixZQUFMLENBQWtCcUIsV0FBbEIsR0FBK0IsTUFBL0I7QUFDRCxhQUZELE1BRU0sSUFBRyxPQUFLckIsWUFBTCxDQUFrQlEsWUFBbEIsSUFBa0MsQ0FBckMsRUFBdUM7QUFDM0MscUJBQUtSLFlBQUwsQ0FBa0JxQixXQUFsQixHQUErQixLQUEvQjtBQUNELGFBRkssTUFFRDtBQUNILHFCQUFLckIsWUFBTCxDQUFrQnFCLFdBQWxCLEdBQStCLEtBQS9CO0FBQ0Q7QUFDRixXQVJILE1BUVEsSUFBRyxPQUFLckIsWUFBTCxDQUFrQm9CLFVBQWxCLElBQWdDLENBQW5DLEVBQXFDO0FBQ3pDLGdCQUFHLE9BQUtwQixZQUFMLENBQWtCUSxZQUFsQixJQUFrQyxDQUFyQyxFQUF1QztBQUNyQyxxQkFBS1IsWUFBTCxDQUFrQnFCLFdBQWxCLEdBQStCLE1BQS9CO0FBQ0QsYUFGRCxNQUVNLElBQUcsT0FBS3JCLFlBQUwsQ0FBa0JRLFlBQWxCLElBQWtDLENBQXJDLEVBQXVDO0FBQzNDLHFCQUFLUixZQUFMLENBQWtCcUIsV0FBbEIsR0FBK0IsS0FBL0I7QUFDRCxhQUZLLE1BRUQ7QUFDSCxxQkFBS3JCLFlBQUwsQ0FBa0JxQixXQUFsQixHQUErQixLQUEvQjtBQUNEO0FBQ0Y7QUFDSCxpQkFBS0MsTUFBTDtBQUNELFNBcEJELE1Bb0JLO0FBQ0hDLGFBQUdDLFNBQUgsQ0FBYTtBQUNYQyxtQkFBTyxJQURJO0FBRVhDLHFCQUFTUixJQUFJbkIsSUFBSixDQUFTNEIsR0FGUDtBQUdYQyx3QkFBWTtBQUhELFdBQWI7QUFLRDtBQUNGLE9BNUJEO0FBNkJEOzs7MkJBRU1DLE0sRUFBUTtBQUNiLFVBQUlmLFVBQVVlLE9BQU9mLE9BQXJCO0FBQ0FKLGNBQVFDLEdBQVIsQ0FBWUcsT0FBWjtBQUNBLFdBQUtnQixRQUFMLENBQWNoQixPQUFkO0FBQ0Q7Ozs7RUF2RXNDaUIsZUFBS0MsSTs7a0JBQXpCdkMsVyIsImZpbGUiOiJvcmRlci1kZXRhaWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IHd4UmVxdWVzdCBmcm9tICcuLi91dGlsL3JlcXVlc3QnXG4gIFxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBPcmRlckRldGFpbCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+iuouWNleivpuaDhScsXG4gICAgICBkaXNhYmxlU2Nyb2xsOiB0cnVlXG4gICAgfVxuICAgIGNvbXBvbmVudHMgPSB7XG4gICAgfVxuXG4gICAgbWl4aW5zID0gW11cblxuICAgIGRhdGEgPSB7XG4gICAgICBhY3Rpdml0eUluZm86e31cbiAgICB9XG5cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIFxuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICAvLyDmn6XnnIvmtLvliqhcbiAgICAgIGdvR3JvdXBEZXRhaWwoKXtcbiAgICAgICAgdGhpcy4kbmF2aWdhdGUoJy9wYWdlcy9ncm91cC1kZXRhaWwnLHthY3Rpdml0eUlkOnRoaXMuYWN0aXZpdHlJbmZvLnByb2plY3RfaWQsYWN0aXZpdHlTdGF0dXM6dGhpcy5hY3Rpdml0eUluZm8ub3JkZXJfc3RhdHVzfSlcbiAgICAgIH0sXG4gICAgICAvLyDlhajpg6jorqLljZVcbiAgICAgIGdvT3JkZXJzKCl7XG4gICAgICAgIGNvbnNvbGUubG9nKDEpXG4gICAgICAgIHRoaXMuJHN3aXRjaCgnL3BhZ2VzL29yZGVyJylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBldmVudHMgPSB7XG4gICAgIFxuICAgIH1cbiAgICBcbiAgICAvLyDojrflj5borqLljZXor6bmg4VcbiAgICBnZXRPcmRlcihvcmRlcklkKXtcbiAgICAgIHd4UmVxdWVzdCh7bWV0aG9kOidwb3N0JyxkYXRhOntpZDpvcmRlcklkfX0sJy9vcmRlci9pdGVtJykudGhlbihyZXMgPT4ge1xuICAgICAgICBpZihyZXMuZGF0YS5jb2RlID09IDEpe1xuICAgICAgICAgIHRoaXMuYWN0aXZpdHlJbmZvID0gcmVzLmRhdGEuZGF0YTtcbiAgICAgICAgICBpZih0aGlzLmFjdGl2aXR5SW5mby5vcmRlcl90eXBlID09IDEpe1xuICAgICAgICAgICAgICBpZih0aGlzLmFjdGl2aXR5SW5mby5vcmRlcl9zdGF0dXMgPT0gMSl7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpdml0eUluZm8ub3JkZXJfc3RhdGUgPSfotK3kubDmiJDlip8nXG4gICAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuYWN0aXZpdHlJbmZvLm9yZGVyX3N0YXR1cyA9PSAwKXtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2aXR5SW5mby5vcmRlcl9zdGF0ZSA9J+acquS7mOasvidcbiAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3Rpdml0eUluZm8ub3JkZXJfc3RhdGUgPSflt7LpgIDmrL4nXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNlIGlmKHRoaXMuYWN0aXZpdHlJbmZvLm9yZGVyX3R5cGUgPT0gMil7XG4gICAgICAgICAgICAgIGlmKHRoaXMuYWN0aXZpdHlJbmZvLm9yZGVyX3N0YXR1cyA9PSAxKXtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2aXR5SW5mby5vcmRlcl9zdGF0ZSA9J+Wboui0reaIkOWKnydcbiAgICAgICAgICAgICAgfWVsc2UgaWYodGhpcy5hY3Rpdml0eUluZm8ub3JkZXJfc3RhdHVzID09IDApe1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZpdHlJbmZvLm9yZGVyX3N0YXRlID0n5Zui6LSt5LitJ1xuICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2aXR5SW5mby5vcmRlcl9zdGF0ZSA9J+W3sumAgOasvidcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuJGFwcGx5KCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICB0aXRsZTogJ+aPkOekuicsXG4gICAgICAgICAgICBjb250ZW50OiByZXMuZGF0YS5tc2csXG4gICAgICAgICAgICBzaG93Q2FuY2VsOiBmYWxzZVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgb25Mb2FkKHBhcmFtcykge1xuICAgICAgbGV0IG9yZGVySWQgPSBwYXJhbXMub3JkZXJJZDtcbiAgICAgIGNvbnNvbGUubG9nKG9yZGVySWQpXG4gICAgICB0aGlzLmdldE9yZGVyKG9yZGVySWQpXG4gICAgfVxuICB9XG4iXX0=