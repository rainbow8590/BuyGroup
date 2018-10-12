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
                console.log(urls);
                console.log(savedFilePaths);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRvd25sb2FkU2F2ZUZpbGVzLmpzIl0sIm5hbWVzIjpbImRvd25sb2FkU2F2ZUZpbGVzIiwiZG93bmxvYWRTYXZlRmlsZSIsIm9iaiIsInN1Y2Nlc3MiLCJmYWlsIiwidXJsIiwid3giLCJkb3dubG9hZEZpbGUiLCJyZXMiLCJzYXZlRmlsZSIsInRlbXBGaWxlUGF0aCIsInJlc3VsdCIsImUiLCJjb25zb2xlIiwiaW5mbyIsInVybHMiLCJzYXZlZEZpbGVQYXRocyIsInVybHNMZW5ndGgiLCJsZW5ndGgiLCJpIiwic2F2ZWRGaWxlUGF0aCIsInB1c2giLCJsb2ciXSwibWFwcGluZ3MiOiI7Ozs7O2tCQWdEd0JBLGlCO0FBaER4Qjs7Ozs7OztBQU9BLFNBQVNDLGdCQUFULENBQTBCQyxHQUExQixFQUErQjtBQUMzQixRQUFJQyxXQUFVRCxJQUFJQyxPQUFsQjtBQUNBLFFBQUlDLFFBQU9GLElBQUlFLElBQWY7QUFDQSxRQUFJQyxNQUFNSCxJQUFJRyxHQUFkO0FBQ0FDLE9BQUdDLFlBQUgsQ0FBZ0I7QUFDWkYsYUFBS0EsR0FETztBQUVaRixpQkFBUyxpQkFBVUssR0FBVixFQUFlO0FBQ3BCRixlQUFHRyxRQUFILENBQVk7QUFDUkMsOEJBQWNGLElBQUlFLFlBRFY7QUFFUlAseUJBQVMsaUJBQVVRLE1BQVYsRUFBa0I7QUFDdkIsd0JBQUlSLFFBQUosRUFBYTtBQUNUQSxpQ0FBUVEsTUFBUjtBQUNIO0FBQ0osaUJBTk87QUFPUlAsc0JBQU0sY0FBVVEsQ0FBVixFQUFhO0FBQ2ZDLDRCQUFRQyxJQUFSLENBQWEsVUFBYjtBQUNBLHdCQUFJVixLQUFKLEVBQVU7QUFDTkEsOEJBQUtRLENBQUw7QUFDSDtBQUNKO0FBWk8sYUFBWjtBQWVILFNBbEJXO0FBbUJaUixjQUFNLGNBQVVRLENBQVYsRUFBYTtBQUNmQyxvQkFBUUMsSUFBUixDQUFhLFVBQWI7QUFDQSxnQkFBSVYsS0FBSixFQUFVO0FBQ05BLHNCQUFLUSxDQUFMO0FBQ0g7QUFFSjtBQXpCVyxLQUFoQjtBQTJCSDs7QUFHRDs7Ozs7OztBQU9lLFNBQVNaLGlCQUFULENBQTJCRSxHQUEzQixFQUFnQztBQUMzQyxRQUFJQyxZQUFVRCxJQUFJQyxPQUFsQjtBQUNBLFFBQUlDLFNBQU9GLElBQUlFLElBQWY7QUFDQSxRQUFJVyxPQUFPYixJQUFJYSxJQUFmO0FBQ0EsUUFBSUMsaUJBQWlCLEVBQXJCLENBSjJDLENBSWxCO0FBQ3pCLFFBQUlDLGFBQWFGLEtBQUtHLE1BQXRCLENBTDJDLENBS1o7O0FBRS9CLFNBQUssSUFBSUMsSUFBSSxDQUFiLEVBQWdCQSxJQUFJRixVQUFwQixFQUFnQ0UsR0FBaEMsRUFBcUM7QUFDakNsQix5QkFBaUI7QUFDYkksaUJBQUtVLEtBQUtJLENBQUwsQ0FEUTtBQUViaEIscUJBQVMsaUJBQVVLLEdBQVYsRUFBZTtBQUNwQixvQkFBSVksZ0JBQWdCWixJQUFJWSxhQUF4QjtBQUNBSiwrQkFBZUssSUFBZixDQUFvQkQsYUFBcEI7QUFDQVAsd0JBQVFTLEdBQVIsQ0FBWVAsSUFBWjtBQUNBRix3QkFBUVMsR0FBUixDQUFZTixjQUFaO0FBQ0M7QUFDRCxvQkFBSUEsZUFBZUUsTUFBZixJQUF5QkQsVUFBN0IsRUFBeUM7QUFDckMsd0JBQUlkLFNBQUosRUFBWTs7QUFFUkEsa0NBQVFhLGNBQVI7QUFDSDtBQUNKO0FBQ0osYUFkWTtBQWViWixrQkFBTSxjQUFVUSxDQUFWLEVBQWE7QUFDZixvQkFBSVIsTUFBSixFQUFVO0FBQ05BLDJCQUFLUSxDQUFMO0FBQ0g7QUFFSjtBQXBCWSxTQUFqQjtBQXVCSDtBQUVKIiwiZmlsZSI6ImRvd25sb2FkU2F2ZUZpbGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIOWNleaWh+S7tuS4i+i9veW5tuS4lOS/neWtmO+8jFxyXG4gKiBvYmogcGFyYW1zIOS4i+i9veeahOmFjee9ruS/oeaBr1xyXG4gKiAgICAgdXJsOiDkuIvovb3otYTmupDot6/lvoRcclxuICogICAgIHN1Y2Nlc3M6IOS4i+i9veaIkOWKn+eahOWkhOeQhuWHveaVsFxyXG4gKiAgICAgZmFpbDog5LiL6L295aSx6LSl55qE5aSE55CG5Ye95pWwXHJcbiAqL1xyXG5mdW5jdGlvbiBkb3dubG9hZFNhdmVGaWxlKG9iaikge1xyXG4gICAgbGV0IHN1Y2Nlc3MgPSBvYmouc3VjY2VzcztcclxuICAgIGxldCBmYWlsID0gb2JqLmZhaWw7XHJcbiAgICBsZXQgdXJsID0gb2JqLnVybDtcclxuICAgIHd4LmRvd25sb2FkRmlsZSh7XHJcbiAgICAgICAgdXJsOiB1cmwsXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICB3eC5zYXZlRmlsZSh7XHJcbiAgICAgICAgICAgICAgICB0ZW1wRmlsZVBhdGg6IHJlcy50ZW1wRmlsZVBhdGgsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyhyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhcIuS/neWtmOS4gOS4quaWh+S7tuWksei0pVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZmFpbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmYWlsKGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmYWlsOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmluZm8oXCLkuIvovb3kuIDkuKrmlofku7blpLHotKVcIik7XHJcbiAgICAgICAgICAgIGlmIChmYWlsKSB7XHJcbiAgICAgICAgICAgICAgICBmYWlsKGUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcblxyXG4vKipcclxuICog5aSa5paH5Lu25LiL6L295bm25LiU5L+d5a2Y77yM5by65Yi26KeE5a6a77yM5b+F6aG75omA5pyJ5paH5Lu25LiL6L295oiQ5Yqf5omN566X6L+U5Zue5oiQ5YqfXHJcbiAqIG9iaiBwYXJhbXMg5LiL6L2955qE6YWN572u5L+h5oGvXHJcbiAqICAgICB1cmxzOiDkuIvovb3otYTmupDot6/lvoTpm4blkIggQXJyYXlcclxuICogICAgIHN1Y2Nlc3M6IOWFqOmDqOS4i+i9veaIkOWKn+eahOWkhOeQhuWHveaVsFxyXG4gKiAgICAgZmFpbDog5LiL6L295aSx6LSl55qE5aSE55CG5Ye95pWwXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkb3dubG9hZFNhdmVGaWxlcyhvYmopIHtcclxuICAgIGxldCBzdWNjZXNzID0gb2JqLnN1Y2Nlc3M7IFxyXG4gICAgbGV0IGZhaWwgPSBvYmouZmFpbDsgXHJcbiAgICBsZXQgdXJscyA9IG9iai51cmxzOyAgXHJcbiAgICBsZXQgc2F2ZWRGaWxlUGF0aHMgPSBbXTsgLy/lgqjlrZjkuIvovb3miJDlip/nmoTmnKzlnLDkuLTml7bot6/lvoRcclxuICAgIGxldCB1cmxzTGVuZ3RoID0gdXJscy5sZW5ndGg7ICAvLyDpnIDopoHkuIvovb3mlofku7bnmoTkuKrmlbBcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHVybHNMZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGRvd25sb2FkU2F2ZUZpbGUoe1xyXG4gICAgICAgICAgICB1cmw6IHVybHNbaV0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzYXZlZEZpbGVQYXRoID0gcmVzLnNhdmVkRmlsZVBhdGg7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBzYXZlZEZpbGVQYXRocy5wdXNoKHNhdmVkRmlsZVBhdGgpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codXJscylcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNhdmVkRmlsZVBhdGhzKVxyXG4gICAgICAgICAgICAgICAgIC8v5aaC5p6c5omA5pyJ55qE5paH5Lu26YO95LiL6L295LiL5p2l5LqGIOaJjei/m+ihjOS4i+i9veWujOaIkOWQjueahOaTjeS9nFxyXG4gICAgICAgICAgICAgICAgaWYgKHNhdmVkRmlsZVBhdGhzLmxlbmd0aCA9PSB1cmxzTGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1Y2Nlc3Mpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyhzYXZlZEZpbGVQYXRocylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZhaWw6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZmFpbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZhaWwoZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==