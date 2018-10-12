"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.showGroupCode = showGroupCode;
exports.closeGroupCode = closeGroupCode;
exports.showFriend = showFriend;
exports.closeFriend = closeFriend;
exports.downLoadFiles = downLoadFiles;
// import MD from './md5';

// 显示加群码弹窗
function showGroupCode(obj) {
    obj.show = true;
    obj.hide = false;
}

// 显示加群码弹窗
function closeGroupCode(obj) {
    obj.show = false;
    obj.hide = true;
}
//打开邀请好友弹窗
function showFriend(obj) {
    obj.showFriend = true;
    obj.hideFriend = false;
}
// 关闭邀请好友弹窗
function closeFriend(obj) {
    obj.showFriend = false;
    obj.hideFriend = true;
}

/* 
**时间戳转时间 
* timestamp  param 时间戳
* Symbol     param 年月日拼接符号
* hasSecond  param 是否要秒
*/
function timestampToTime(timestamp, _Symbol2, hasSecond) {
    var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear();
    var M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    var D = date.getDate();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    return {
        Y: Y,
        M: M,
        D: D,
        h: h,
        m: m,
        s: s
    };
}

exports.timestampToTime = timestampToTime;
function downLoadFiles(obj) {
    // console.info("准备下载。。。");
    var that = this;
    var _success = obj.success; //下载成功
    var _fail = obj.fail; //下载失败
    var urls = obj.urls; //下载地址 数组，支持多个 url下载 [url1,url2]
    console.log(urls);
    // var urlsLength = obj.urls.length;  // 有几个url需要下载
    var savedFilePaths = [];
    console.log(obj.urls.length);
    for (var i = 0; i < obj.urls.length; i++) {
        downLoadFiles({
            url: urls[i],
            success: function success(res) {
                console.dir(res);
                //一个文件下载保存成功
                var savedFilePath = res.savedFilePath;

                savedFilePath.push(savedFilePath);

                if (savedFilePaths.length == obj.urls.length) {
                    //如果所有的url 才算成功
                    if (_success) {
                        _success(savedFilePaths);
                    }
                }
            },
            fail: function fail(e) {
                console.info("下载失败");
                if (_fail) {
                    _fail(e);
                }
            }
        });
    }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB1YmxpYy5qcyJdLCJuYW1lcyI6WyJzaG93R3JvdXBDb2RlIiwiY2xvc2VHcm91cENvZGUiLCJzaG93RnJpZW5kIiwiY2xvc2VGcmllbmQiLCJkb3duTG9hZEZpbGVzIiwib2JqIiwic2hvdyIsImhpZGUiLCJoaWRlRnJpZW5kIiwidGltZXN0YW1wVG9UaW1lIiwidGltZXN0YW1wIiwiU3ltYm9sIiwiaGFzU2Vjb25kIiwiZGF0ZSIsIkRhdGUiLCJZIiwiZ2V0RnVsbFllYXIiLCJNIiwiZ2V0TW9udGgiLCJEIiwiZ2V0RGF0ZSIsImgiLCJnZXRIb3VycyIsIm0iLCJnZXRNaW51dGVzIiwicyIsImdldFNlY29uZHMiLCJ0aGF0Iiwic3VjY2VzcyIsImZhaWwiLCJ1cmxzIiwiY29uc29sZSIsImxvZyIsInNhdmVkRmlsZVBhdGhzIiwibGVuZ3RoIiwiaSIsInVybCIsInJlcyIsImRpciIsInNhdmVkRmlsZVBhdGgiLCJwdXNoIiwiZSIsImluZm8iXSwibWFwcGluZ3MiOiI7Ozs7O1FBR2dCQSxhLEdBQUFBLGE7UUFNQUMsYyxHQUFBQSxjO1FBS0FDLFUsR0FBQUEsVTtRQUtBQyxXLEdBQUFBLFc7UUE4QkFDLGEsR0FBQUEsYTtBQWpEaEI7O0FBRUE7QUFDTyxTQUFTSixhQUFULENBQXVCSyxHQUF2QixFQUEyQjtBQUM5QkEsUUFBSUMsSUFBSixHQUFVLElBQVY7QUFDQUQsUUFBSUUsSUFBSixHQUFXLEtBQVg7QUFDSDs7QUFFRDtBQUNPLFNBQVNOLGNBQVQsQ0FBd0JJLEdBQXhCLEVBQTRCO0FBQy9CQSxRQUFJQyxJQUFKLEdBQVcsS0FBWDtBQUNBRCxRQUFJRSxJQUFKLEdBQVcsSUFBWDtBQUNIO0FBQ0Q7QUFDTyxTQUFTTCxVQUFULENBQW9CRyxHQUFwQixFQUF3QjtBQUMzQkEsUUFBSUgsVUFBSixHQUFpQixJQUFqQjtBQUNBRyxRQUFJRyxVQUFKLEdBQWlCLEtBQWpCO0FBQ0Q7QUFDRDtBQUNLLFNBQVNMLFdBQVQsQ0FBcUJFLEdBQXJCLEVBQXlCO0FBQzVCQSxRQUFJSCxVQUFKLEdBQWlCLEtBQWpCO0FBQ0FHLFFBQUlHLFVBQUosR0FBaUIsSUFBakI7QUFDSDs7QUFFRDs7Ozs7O0FBTU8sU0FBU0MsZUFBVCxDQUF5QkMsU0FBekIsRUFBbUNDLFFBQW5DLEVBQTBDQyxTQUExQyxFQUFxRDtBQUN4RCxRQUFJQyxPQUFPLElBQUlDLElBQUosQ0FBU0osWUFBWSxJQUFyQixDQUFYLENBRHdELENBQ2xCO0FBQ3RDLFFBQUlLLElBQUlGLEtBQUtHLFdBQUwsRUFBUjtBQUNBLFFBQUlDLElBQUtKLEtBQUtLLFFBQUwsS0FBZ0IsQ0FBaEIsR0FBb0IsRUFBcEIsR0FBeUIsT0FBS0wsS0FBS0ssUUFBTCxLQUFnQixDQUFyQixDQUF6QixHQUFtREwsS0FBS0ssUUFBTCxLQUFnQixDQUE1RTtBQUNBLFFBQUlDLElBQUlOLEtBQUtPLE9BQUwsRUFBUjtBQUNBLFFBQUlDLElBQUlSLEtBQUtTLFFBQUwsRUFBUjtBQUNBLFFBQUlDLElBQUlWLEtBQUtXLFVBQUwsRUFBUjtBQUNBLFFBQUlDLElBQUlaLEtBQUthLFVBQUwsRUFBUjtBQUNBLFdBQU87QUFDSFgsWUFERztBQUVIRSxZQUZHO0FBR0hFLFlBSEc7QUFJSEUsWUFKRztBQUtIRSxZQUxHO0FBTUhFO0FBTkcsS0FBUDtBQVFIOzs7QUFHTSxTQUFTckIsYUFBVCxDQUF1QkMsR0FBdkIsRUFBNEI7QUFDL0I7QUFDQSxRQUFJc0IsT0FBTyxJQUFYO0FBQ0EsUUFBSUMsV0FBVXZCLElBQUl1QixPQUFsQixDQUgrQixDQUdKO0FBQzNCLFFBQUlDLFFBQU94QixJQUFJd0IsSUFBZixDQUorQixDQUlWO0FBQ3JCLFFBQUlDLE9BQU96QixJQUFJeUIsSUFBZixDQUwrQixDQUtUO0FBQ3RCQyxZQUFRQyxHQUFSLENBQVlGLElBQVo7QUFDQTtBQUNBLFFBQUlHLGlCQUFpQixFQUFyQjtBQUNBRixZQUFRQyxHQUFSLENBQVkzQixJQUFJeUIsSUFBSixDQUFTSSxNQUFyQjtBQUNBLFNBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJOUIsSUFBSXlCLElBQUosQ0FBU0ksTUFBN0IsRUFBcUNDLEdBQXJDLEVBQTBDO0FBQ3RDL0Isc0JBQWM7QUFDVmdDLGlCQUFLTixLQUFLSyxDQUFMLENBREs7QUFFVlAscUJBQVMsaUJBQVVTLEdBQVYsRUFBZTtBQUNwQk4sd0JBQVFPLEdBQVIsQ0FBWUQsR0FBWjtBQUNBO0FBQ0Esb0JBQUlFLGdCQUFnQkYsSUFBSUUsYUFBeEI7O0FBRUFBLDhCQUFjQyxJQUFkLENBQW1CRCxhQUFuQjs7QUFFQSxvQkFBSU4sZUFBZUMsTUFBZixJQUF5QjdCLElBQUl5QixJQUFKLENBQVNJLE1BQXRDLEVBQThDO0FBQUU7QUFDNUMsd0JBQUlOLFFBQUosRUFBWTtBQUNSQSxpQ0FBUUssY0FBUjtBQUNIO0FBRUo7QUFDSixhQWZTO0FBZ0JWSixrQkFBTSxjQUFVWSxDQUFWLEVBQWE7QUFDZlYsd0JBQVFXLElBQVIsQ0FBYSxNQUFiO0FBQ0Esb0JBQUliLEtBQUosRUFBVTtBQUNOQSwwQkFBS1ksQ0FBTDtBQUNIO0FBRUo7QUF0QlMsU0FBZDtBQXlCSDtBQUdKIiwiZmlsZSI6InB1YmxpYy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCBNRCBmcm9tICcuL21kNSc7XHJcblxyXG4vLyDmmL7npLrliqDnvqTnoIHlvLnnqpdcclxuZXhwb3J0IGZ1bmN0aW9uIHNob3dHcm91cENvZGUob2JqKXtcclxuICAgIG9iai5zaG93PSB0cnVlO1xyXG4gICAgb2JqLmhpZGUgPSBmYWxzZTtcclxufVxyXG5cclxuLy8g5pi+56S65Yqg576k56CB5by556qXXHJcbmV4cG9ydCBmdW5jdGlvbiBjbG9zZUdyb3VwQ29kZShvYmope1xyXG4gICAgb2JqLnNob3cgPSBmYWxzZTtcclxuICAgIG9iai5oaWRlID0gdHJ1ZTtcclxufVxyXG4vL+aJk+W8gOmCgOivt+WlveWPi+W8ueeql1xyXG5leHBvcnQgZnVuY3Rpb24gc2hvd0ZyaWVuZChvYmope1xyXG4gICAgb2JqLnNob3dGcmllbmQgPSB0cnVlO1xyXG4gICAgb2JqLmhpZGVGcmllbmQgPSBmYWxzZTtcclxuICB9XHJcbiAgLy8g5YWz6Zet6YKA6K+35aW95Y+L5by556qXXHJcbmV4cG9ydCBmdW5jdGlvbiBjbG9zZUZyaWVuZChvYmope1xyXG4gICAgb2JqLnNob3dGcmllbmQgPSBmYWxzZTtcclxuICAgIG9iai5oaWRlRnJpZW5kID0gdHJ1ZTtcclxufVxyXG5cclxuLyogXHJcbioq5pe26Ze05oiz6L2s5pe26Ze0IFxyXG4qIHRpbWVzdGFtcCAgcGFyYW0g5pe26Ze05oizXHJcbiogU3ltYm9sICAgICBwYXJhbSDlubTmnIjml6Xmi7zmjqXnrKblj7dcclxuKiBoYXNTZWNvbmQgIHBhcmFtIOaYr+WQpuimgeenklxyXG4qL1xyXG5leHBvcnQgZnVuY3Rpb24gdGltZXN0YW1wVG9UaW1lKHRpbWVzdGFtcCxTeW1ib2wsaGFzU2Vjb25kKSB7XHJcbiAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKHRpbWVzdGFtcCAqIDEwMDApOy8v5pe26Ze05oiz5Li6MTDkvY3pnIAqMTAwMO+8jOaXtumXtOaIs+S4ujEz5L2N55qE6K+d5LiN6ZyA5LmYMTAwMFxyXG4gICAgdmFyIFkgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XHJcbiAgICB2YXIgTSA9IChkYXRlLmdldE1vbnRoKCkrMSA8IDEwID8gJzAnKyhkYXRlLmdldE1vbnRoKCkrMSkgOiBkYXRlLmdldE1vbnRoKCkrMSkgO1xyXG4gICAgdmFyIEQgPSBkYXRlLmdldERhdGUoKTtcclxuICAgIHZhciBoID0gZGF0ZS5nZXRIb3VycygpO1xyXG4gICAgdmFyIG0gPSBkYXRlLmdldE1pbnV0ZXMoKTtcclxuICAgIHZhciBzID0gZGF0ZS5nZXRTZWNvbmRzKCk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIFksXHJcbiAgICAgICAgTSxcclxuICAgICAgICBELFxyXG4gICAgICAgIGgsXHJcbiAgICAgICAgbSxcclxuICAgICAgICBzXHJcbiAgICB9O1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRvd25Mb2FkRmlsZXMob2JqKSB7XHJcbiAgICAvLyBjb25zb2xlLmluZm8oXCLlh4blpIfkuIvovb3jgILjgILjgIJcIik7XHJcbiAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICBsZXQgc3VjY2VzcyA9IG9iai5zdWNjZXNzOyAvL+S4i+i9veaIkOWKn1xyXG4gICAgbGV0IGZhaWwgPSBvYmouZmFpbDsgLy/kuIvovb3lpLHotKVcclxuICAgIGxldCB1cmxzID0gb2JqLnVybHM7ICAvL+S4i+i9veWcsOWdgCDmlbDnu4TvvIzmlK/mjIHlpJrkuKogdXJs5LiL6L29IFt1cmwxLHVybDJdXHJcbiAgICBjb25zb2xlLmxvZyh1cmxzKVxyXG4gICAgLy8gdmFyIHVybHNMZW5ndGggPSBvYmoudXJscy5sZW5ndGg7ICAvLyDmnInlh6DkuKp1cmzpnIDopoHkuIvovb1cclxuICAgIGxldCBzYXZlZEZpbGVQYXRocyA9IFtdO1xyXG4gICAgY29uc29sZS5sb2cob2JqLnVybHMubGVuZ3RoKVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYmoudXJscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGRvd25Mb2FkRmlsZXMoe1xyXG4gICAgICAgICAgICB1cmw6IHVybHNbaV0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKHJlcyk7XHJcbiAgICAgICAgICAgICAgICAvL+S4gOS4quaWh+S7tuS4i+i9veS/neWtmOaIkOWKn1xyXG4gICAgICAgICAgICAgICAgbGV0IHNhdmVkRmlsZVBhdGggPSByZXMuc2F2ZWRGaWxlUGF0aDtcclxuXHJcbiAgICAgICAgICAgICAgICBzYXZlZEZpbGVQYXRoLnB1c2goc2F2ZWRGaWxlUGF0aCk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIGlmIChzYXZlZEZpbGVQYXRocy5sZW5ndGggPT0gb2JqLnVybHMubGVuZ3RoKSB7IC8v5aaC5p6c5omA5pyJ55qEdXJsIOaJjeeul+aIkOWKn1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdWNjZXNzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyhzYXZlZEZpbGVQYXRocylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWlsOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKFwi5LiL6L295aSx6LSlXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGZhaWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBmYWlsKGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG5cclxuXHJcbn0iXX0=