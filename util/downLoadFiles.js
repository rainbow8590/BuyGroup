"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = downloadSaveFiles;
/**
 * 单文件下载并且保存，
 * obj params 下载的配置信息
 *     url: 下载资源路径
 *     success: 下载成功的处理函数
 *     fail: 下载失败的处理函数
 */
function downloadSaveFile(obj) {
    var _success = obj.success;
    var _fail = obj.fail;
    var url = obj.url;
    wx.downloadFile({
        url: url,
        success: function success(res) {
            wx.saveFile({
                tempFilePath: res.tempFilePath,
                success: function success(result) {
                    if (_success) {
                        _success(result);
                    }
                },
                fail: function fail(e) {
                    console.info("保存一个文件失败");
                    if (_fail) {
                        _fail(e);
                    }
                }
            });
        },
        fail: function fail(e) {
            console.info("下载一个文件失败");
            if (_fail) {
                _fail(e);
            }
        }
    });
}

/**
 * 多文件下载并且保存，强制规定，必须所有文件下载成功才算返回成功
 * obj params 下载的配置信息
 *     urls: 下载资源路径集合 Array
 *     success: 全部下载成功的处理函数
 *     fail: 下载失败的处理函数
 */
function downloadSaveFiles(obj) {
    var _success2 = obj.success;
    var _fail2 = obj.fail;
    var urls = obj.urls;
    var savedFilePaths = []; //储存下载成功的本地临时路径
    var urlsLength = urls.length; // 需要下载文件的个数

    for (var i = 0; i < urlsLength; i++) {
        downloadSaveFile({
            url: urls[i],
            success: function success(res) {
                var savedFilePath = res.savedFilePath;
                savedFilePaths.push(savedFilePath);
                //如果所有的文件都下载下来了 才进行下载完成后的操作
                if (savedFilePaths.length == urlsLength) {
                    if (_success2) {
                        _success2(savedFilePaths);
                    }
                }
            },
            fail: function fail(e) {
                if (_fail2) {
                    _fail2(e);
                }
            }
        });
    }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRvd25Mb2FkRmlsZXMuanMiXSwibmFtZXMiOlsiZG93bmxvYWRTYXZlRmlsZXMiLCJkb3dubG9hZFNhdmVGaWxlIiwib2JqIiwic3VjY2VzcyIsImZhaWwiLCJ1cmwiLCJ3eCIsImRvd25sb2FkRmlsZSIsInJlcyIsInNhdmVGaWxlIiwidGVtcEZpbGVQYXRoIiwicmVzdWx0IiwiZSIsImNvbnNvbGUiLCJpbmZvIiwidXJscyIsInNhdmVkRmlsZVBhdGhzIiwidXJsc0xlbmd0aCIsImxlbmd0aCIsImkiLCJzYXZlZEZpbGVQYXRoIiwicHVzaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBZ0R3QkEsaUI7QUFoRHhCOzs7Ozs7O0FBT0EsU0FBU0MsZ0JBQVQsQ0FBMEJDLEdBQTFCLEVBQStCO0FBQzNCLFFBQUlDLFdBQVVELElBQUlDLE9BQWxCO0FBQ0EsUUFBSUMsUUFBT0YsSUFBSUUsSUFBZjtBQUNBLFFBQUlDLE1BQU1ILElBQUlHLEdBQWQ7QUFDQUMsT0FBR0MsWUFBSCxDQUFnQjtBQUNaRixhQUFLQSxHQURPO0FBRVpGLGlCQUFTLGlCQUFVSyxHQUFWLEVBQWU7QUFDcEJGLGVBQUdHLFFBQUgsQ0FBWTtBQUNSQyw4QkFBY0YsSUFBSUUsWUFEVjtBQUVSUCx5QkFBUyxpQkFBVVEsTUFBVixFQUFrQjtBQUN2Qix3QkFBSVIsUUFBSixFQUFhO0FBQ1RBLGlDQUFRUSxNQUFSO0FBQ0g7QUFDSixpQkFOTztBQU9SUCxzQkFBTSxjQUFVUSxDQUFWLEVBQWE7QUFDZkMsNEJBQVFDLElBQVIsQ0FBYSxVQUFiO0FBQ0Esd0JBQUlWLEtBQUosRUFBVTtBQUNOQSw4QkFBS1EsQ0FBTDtBQUNIO0FBQ0o7QUFaTyxhQUFaO0FBZUgsU0FsQlc7QUFtQlpSLGNBQU0sY0FBVVEsQ0FBVixFQUFhO0FBQ2ZDLG9CQUFRQyxJQUFSLENBQWEsVUFBYjtBQUNBLGdCQUFJVixLQUFKLEVBQVU7QUFDTkEsc0JBQUtRLENBQUw7QUFDSDtBQUVKO0FBekJXLEtBQWhCO0FBMkJIOztBQUdEOzs7Ozs7O0FBT2UsU0FBU1osaUJBQVQsQ0FBMkJFLEdBQTNCLEVBQWdDO0FBQzNDLFFBQUlDLFlBQVVELElBQUlDLE9BQWxCO0FBQ0EsUUFBSUMsU0FBT0YsSUFBSUUsSUFBZjtBQUNBLFFBQUlXLE9BQU9iLElBQUlhLElBQWY7QUFDQSxRQUFJQyxpQkFBaUIsRUFBckIsQ0FKMkMsQ0FJbEI7QUFDekIsUUFBSUMsYUFBYUYsS0FBS0csTUFBdEIsQ0FMMkMsQ0FLWjs7QUFFL0IsU0FBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUlGLFVBQXBCLEVBQWdDRSxHQUFoQyxFQUFxQztBQUNqQ2xCLHlCQUFpQjtBQUNiSSxpQkFBS1UsS0FBS0ksQ0FBTCxDQURRO0FBRWJoQixxQkFBUyxpQkFBVUssR0FBVixFQUFlO0FBQ3BCLG9CQUFJWSxnQkFBZ0JaLElBQUlZLGFBQXhCO0FBQ0FKLCtCQUFlSyxJQUFmLENBQW9CRCxhQUFwQjtBQUNDO0FBQ0Qsb0JBQUlKLGVBQWVFLE1BQWYsSUFBeUJELFVBQTdCLEVBQXlDO0FBQ3JDLHdCQUFJZCxTQUFKLEVBQVk7QUFDUkEsa0NBQVFhLGNBQVI7QUFDSDtBQUNKO0FBQ0osYUFYWTtBQVliWixrQkFBTSxjQUFVUSxDQUFWLEVBQWE7QUFDZixvQkFBSVIsTUFBSixFQUFVO0FBQ05BLDJCQUFLUSxDQUFMO0FBQ0g7QUFFSjtBQWpCWSxTQUFqQjtBQW9CSDtBQUVKIiwiZmlsZSI6ImRvd25Mb2FkRmlsZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICog5Y2V5paH5Lu25LiL6L295bm25LiU5L+d5a2Y77yMXHJcbiAqIG9iaiBwYXJhbXMg5LiL6L2955qE6YWN572u5L+h5oGvXHJcbiAqICAgICB1cmw6IOS4i+i9vei1hOa6kOi3r+W+hFxyXG4gKiAgICAgc3VjY2Vzczog5LiL6L295oiQ5Yqf55qE5aSE55CG5Ye95pWwXHJcbiAqICAgICBmYWlsOiDkuIvovb3lpLHotKXnmoTlpITnkIblh73mlbBcclxuICovXHJcbmZ1bmN0aW9uIGRvd25sb2FkU2F2ZUZpbGUob2JqKSB7XHJcbiAgICBsZXQgc3VjY2VzcyA9IG9iai5zdWNjZXNzO1xyXG4gICAgbGV0IGZhaWwgPSBvYmouZmFpbDtcclxuICAgIGxldCB1cmwgPSBvYmoudXJsO1xyXG4gICAgd3guZG93bmxvYWRGaWxlKHtcclxuICAgICAgICB1cmw6IHVybCxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XHJcbiAgICAgICAgICAgIHd4LnNhdmVGaWxlKHtcclxuICAgICAgICAgICAgICAgIHRlbXBGaWxlUGF0aDogcmVzLnRlbXBGaWxlUGF0aCxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKFwi5L+d5a2Y5LiA5Liq5paH5Lu25aSx6LSlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmYWlsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhaWwoZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIGZhaWw6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhcIuS4i+i9veS4gOS4quaWh+S7tuWksei0pVwiKTtcclxuICAgICAgICAgICAgaWYgKGZhaWwpIHtcclxuICAgICAgICAgICAgICAgIGZhaWwoZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiDlpJrmlofku7bkuIvovb3lubbkuJTkv53lrZjvvIzlvLrliLbop4TlrprvvIzlv4XpobvmiYDmnInmlofku7bkuIvovb3miJDlip/miY3nrpfov5Tlm57miJDlip9cclxuICogb2JqIHBhcmFtcyDkuIvovb3nmoTphY3nva7kv6Hmga9cclxuICogICAgIHVybHM6IOS4i+i9vei1hOa6kOi3r+W+hOmbhuWQiCBBcnJheVxyXG4gKiAgICAgc3VjY2Vzczog5YWo6YOo5LiL6L295oiQ5Yqf55qE5aSE55CG5Ye95pWwXHJcbiAqICAgICBmYWlsOiDkuIvovb3lpLHotKXnmoTlpITnkIblh73mlbBcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRvd25sb2FkU2F2ZUZpbGVzKG9iaikge1xyXG4gICAgbGV0IHN1Y2Nlc3MgPSBvYmouc3VjY2VzczsgXHJcbiAgICBsZXQgZmFpbCA9IG9iai5mYWlsOyBcclxuICAgIGxldCB1cmxzID0gb2JqLnVybHM7ICBcclxuICAgIGxldCBzYXZlZEZpbGVQYXRocyA9IFtdOyAvL+WCqOWtmOS4i+i9veaIkOWKn+eahOacrOWcsOS4tOaXtui3r+W+hFxyXG4gICAgbGV0IHVybHNMZW5ndGggPSB1cmxzLmxlbmd0aDsgIC8vIOmcgOimgeS4i+i9veaWh+S7tueahOS4quaVsFxyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdXJsc0xlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgZG93bmxvYWRTYXZlRmlsZSh7XHJcbiAgICAgICAgICAgIHVybDogdXJsc1tpXSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNhdmVkRmlsZVBhdGggPSByZXMuc2F2ZWRGaWxlUGF0aDsgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHNhdmVkRmlsZVBhdGhzLnB1c2goc2F2ZWRGaWxlUGF0aCk7XHJcbiAgICAgICAgICAgICAgICAgLy/lpoLmnpzmiYDmnInnmoTmlofku7bpg73kuIvovb3kuIvmnaXkuoYg5omN6L+b6KGM5LiL6L295a6M5oiQ5ZCO55qE5pON5L2cXHJcbiAgICAgICAgICAgICAgICBpZiAoc2F2ZWRGaWxlUGF0aHMubGVuZ3RoID09IHVybHNMZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3VjY2Vzcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3Moc2F2ZWRGaWxlUGF0aHMpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmYWlsOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGZhaWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBmYWlsKGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=