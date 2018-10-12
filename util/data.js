// import Mock from 'mockjs';
// let API_HOST = "http://bh.com";
/* function ajax(router,fn){
    var res;
    if(router == '/index'){
        res = Mock.mock({
            'data|2': [{
                'id|+1':0,
                'activityCode':'@string(7)',
                "activityTitle": "@ctitle(6,9)", // 活动名称
                "activityDate": "@date(MM-dd)", // 活动日期
                "activityBeginTime": "@time(HH:mm)", // 活动开始时间
                "activityEndTime": "@time(HH:mm)", // 活动结束时间
                "activityNowPrice": "@natural(0,10)", // 优惠价
                "activityOldPrice": "@natural(10,100)", // 原价
                "activityGroupNum": "@natural(3,10)", // 满团人数
                "activityBuyNum": "@natural(500,2000)" // 已买人数
            }]
        })
    }else if(router == '/detail'){
        res = Mock.mock({
            'data': {
                'activityTitle': '@ctitle(6,9)',          // 活动标题
                'activityDate': '@date(yyyy-MM-dd)',     // 活动开始日期
                'activityBeginTime': '@time(HH:mm)',    // 活动开始时间
                'activityEndTime': '@time(HH:mm)',      // 活动结束时间
                'activityNowPrice': '@natural(0,10)',   // 优惠价
                'activityOldPrice': '@natural(10,100)',  // 原价
                'activityGroupNum': '@natural(3,10)',   // 团满人数
                'activityNowGroupNum': '@natural(3,5)', // 参团人数
                'activityBuyNum': '@natural(500,2000)', // 已买人数
                'activityBuyStatus':'@boolean(1, 2, true)', // 是否已买
                'activityBuyTime':'@date(yyyy-MM-dd HH:mm:ss)', // 购买时间
                'activityOver': '@boolean(1, 2, true)',  // 活动是否结束
                'activityPay':'@boolean(1, 2, true)', // 是否买过
                'activityType':0  // 0拼团+直接  1 拼团  2 直接
            }
        })
    }

    fn(res)
}
 */

// // 获取活动列表的数据


/* let DEBUG = true;//切换数据入口


function ajax(data = '', fn, method = "get", header = {},router='') {
    if (!DEBUG) {

        wx.request({
            url: config.API_HOST +router + data,
            method: method ? method : 'get',
            data: {},
            header: header ? header : { "Content-Type": "application/json" },
            success: function (res) {
                console.log(API_HOST)
                fn(res);
            }
        });
    } else {

        // 模拟数据
        var res = Mock.mock({
            'error_code': '',
            'error_msg': '',
            'data|10': [{
                'id|+1': 1,
                'img': "@image('200x100', '#4A7BF7','#fff','pic')",
                'title': '@ctitle(3,8)',
                'city': "@county(true)",
                'stock_num': '@integer(0,100)',//库存数量  
                'marketing_start': '@datetime()',
                'marketing_stop': '@now()',
                'price': '@integer(100,2000)',//现价，单位：分  
                'original_price': '@integer(100,3000)'
            }]  
        })
        // 输出结果
       // console.log(JSON.stringify(res, null, 2))
        fn(res);
    }
} */
/* module.exports = {
    ajax: ajax
} */
"use strict";
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGEuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEyQ0E7OztBQUlBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1Q0EiLCJmaWxlIjoiZGF0YS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCBNb2NrIGZyb20gJ21vY2tqcyc7XHJcbi8vIGxldCBBUElfSE9TVCA9IFwiaHR0cDovL2JoLmNvbVwiO1xyXG4vKiBmdW5jdGlvbiBhamF4KHJvdXRlcixmbil7XHJcbiAgICB2YXIgcmVzO1xyXG4gICAgaWYocm91dGVyID09ICcvaW5kZXgnKXtcclxuICAgICAgICByZXMgPSBNb2NrLm1vY2soe1xyXG4gICAgICAgICAgICAnZGF0YXwyJzogW3tcclxuICAgICAgICAgICAgICAgICdpZHwrMSc6MCxcclxuICAgICAgICAgICAgICAgICdhY3Rpdml0eUNvZGUnOidAc3RyaW5nKDcpJyxcclxuICAgICAgICAgICAgICAgIFwiYWN0aXZpdHlUaXRsZVwiOiBcIkBjdGl0bGUoNiw5KVwiLCAvLyDmtLvliqjlkI3np7BcclxuICAgICAgICAgICAgICAgIFwiYWN0aXZpdHlEYXRlXCI6IFwiQGRhdGUoTU0tZGQpXCIsIC8vIOa0u+WKqOaXpeacn1xyXG4gICAgICAgICAgICAgICAgXCJhY3Rpdml0eUJlZ2luVGltZVwiOiBcIkB0aW1lKEhIOm1tKVwiLCAvLyDmtLvliqjlvIDlp4vml7bpl7RcclxuICAgICAgICAgICAgICAgIFwiYWN0aXZpdHlFbmRUaW1lXCI6IFwiQHRpbWUoSEg6bW0pXCIsIC8vIOa0u+WKqOe7k+adn+aXtumXtFxyXG4gICAgICAgICAgICAgICAgXCJhY3Rpdml0eU5vd1ByaWNlXCI6IFwiQG5hdHVyYWwoMCwxMClcIiwgLy8g5LyY5oOg5Lu3XHJcbiAgICAgICAgICAgICAgICBcImFjdGl2aXR5T2xkUHJpY2VcIjogXCJAbmF0dXJhbCgxMCwxMDApXCIsIC8vIOWOn+S7t1xyXG4gICAgICAgICAgICAgICAgXCJhY3Rpdml0eUdyb3VwTnVtXCI6IFwiQG5hdHVyYWwoMywxMClcIiwgLy8g5ruh5Zui5Lq65pWwXHJcbiAgICAgICAgICAgICAgICBcImFjdGl2aXR5QnV5TnVtXCI6IFwiQG5hdHVyYWwoNTAwLDIwMDApXCIgLy8g5bey5Lmw5Lq65pWwXHJcbiAgICAgICAgICAgIH1dXHJcbiAgICAgICAgfSlcclxuICAgIH1lbHNlIGlmKHJvdXRlciA9PSAnL2RldGFpbCcpe1xyXG4gICAgICAgIHJlcyA9IE1vY2subW9jayh7XHJcbiAgICAgICAgICAgICdkYXRhJzoge1xyXG4gICAgICAgICAgICAgICAgJ2FjdGl2aXR5VGl0bGUnOiAnQGN0aXRsZSg2LDkpJywgICAgICAgICAgLy8g5rS75Yqo5qCH6aKYXHJcbiAgICAgICAgICAgICAgICAnYWN0aXZpdHlEYXRlJzogJ0BkYXRlKHl5eXktTU0tZGQpJywgICAgIC8vIOa0u+WKqOW8gOWni+aXpeacn1xyXG4gICAgICAgICAgICAgICAgJ2FjdGl2aXR5QmVnaW5UaW1lJzogJ0B0aW1lKEhIOm1tKScsICAgIC8vIOa0u+WKqOW8gOWni+aXtumXtFxyXG4gICAgICAgICAgICAgICAgJ2FjdGl2aXR5RW5kVGltZSc6ICdAdGltZShISDptbSknLCAgICAgIC8vIOa0u+WKqOe7k+adn+aXtumXtFxyXG4gICAgICAgICAgICAgICAgJ2FjdGl2aXR5Tm93UHJpY2UnOiAnQG5hdHVyYWwoMCwxMCknLCAgIC8vIOS8mOaDoOS7t1xyXG4gICAgICAgICAgICAgICAgJ2FjdGl2aXR5T2xkUHJpY2UnOiAnQG5hdHVyYWwoMTAsMTAwKScsICAvLyDljp/ku7dcclxuICAgICAgICAgICAgICAgICdhY3Rpdml0eUdyb3VwTnVtJzogJ0BuYXR1cmFsKDMsMTApJywgICAvLyDlm6Lmu6HkurrmlbBcclxuICAgICAgICAgICAgICAgICdhY3Rpdml0eU5vd0dyb3VwTnVtJzogJ0BuYXR1cmFsKDMsNSknLCAvLyDlj4Llm6LkurrmlbBcclxuICAgICAgICAgICAgICAgICdhY3Rpdml0eUJ1eU51bSc6ICdAbmF0dXJhbCg1MDAsMjAwMCknLCAvLyDlt7LkubDkurrmlbBcclxuICAgICAgICAgICAgICAgICdhY3Rpdml0eUJ1eVN0YXR1cyc6J0Bib29sZWFuKDEsIDIsIHRydWUpJywgLy8g5piv5ZCm5bey5LmwXHJcbiAgICAgICAgICAgICAgICAnYWN0aXZpdHlCdXlUaW1lJzonQGRhdGUoeXl5eS1NTS1kZCBISDptbTpzcyknLCAvLyDotK3kubDml7bpl7RcclxuICAgICAgICAgICAgICAgICdhY3Rpdml0eU92ZXInOiAnQGJvb2xlYW4oMSwgMiwgdHJ1ZSknLCAgLy8g5rS75Yqo5piv5ZCm57uT5p2fXHJcbiAgICAgICAgICAgICAgICAnYWN0aXZpdHlQYXknOidAYm9vbGVhbigxLCAyLCB0cnVlKScsIC8vIOaYr+WQpuS5sOi/h1xyXG4gICAgICAgICAgICAgICAgJ2FjdGl2aXR5VHlwZSc6MCAgLy8gMOaLvOWboivnm7TmjqUgIDEg5ou85ZuiICAyIOebtOaOpVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBmbihyZXMpXHJcbn1cclxuICovXHJcblxyXG5cclxuLy8gLy8g6I635Y+W5rS75Yqo5YiX6KGo55qE5pWw5o2uXHJcblxyXG5cclxuXHJcbi8qIGxldCBERUJVRyA9IHRydWU7Ly/liIfmjaLmlbDmja7lhaXlj6NcclxuXHJcblxyXG5mdW5jdGlvbiBhamF4KGRhdGEgPSAnJywgZm4sIG1ldGhvZCA9IFwiZ2V0XCIsIGhlYWRlciA9IHt9LHJvdXRlcj0nJykge1xyXG4gICAgaWYgKCFERUJVRykge1xyXG5cclxuICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgdXJsOiBjb25maWcuQVBJX0hPU1QgK3JvdXRlciArIGRhdGEsXHJcbiAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kID8gbWV0aG9kIDogJ2dldCcsXHJcbiAgICAgICAgICAgIGRhdGE6IHt9LFxyXG4gICAgICAgICAgICBoZWFkZXI6IGhlYWRlciA/IGhlYWRlciA6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coQVBJX0hPU1QpXHJcbiAgICAgICAgICAgICAgICBmbihyZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAvLyDmqKHmi5/mlbDmja5cclxuICAgICAgICB2YXIgcmVzID0gTW9jay5tb2NrKHtcclxuICAgICAgICAgICAgJ2Vycm9yX2NvZGUnOiAnJyxcclxuICAgICAgICAgICAgJ2Vycm9yX21zZyc6ICcnLFxyXG4gICAgICAgICAgICAnZGF0YXwxMCc6IFt7XHJcbiAgICAgICAgICAgICAgICAnaWR8KzEnOiAxLFxyXG4gICAgICAgICAgICAgICAgJ2ltZyc6IFwiQGltYWdlKCcyMDB4MTAwJywgJyM0QTdCRjcnLCcjZmZmJywncGljJylcIixcclxuICAgICAgICAgICAgICAgICd0aXRsZSc6ICdAY3RpdGxlKDMsOCknLFxyXG4gICAgICAgICAgICAgICAgJ2NpdHknOiBcIkBjb3VudHkodHJ1ZSlcIixcclxuICAgICAgICAgICAgICAgICdzdG9ja19udW0nOiAnQGludGVnZXIoMCwxMDApJywvL+W6k+WtmOaVsOmHjyAgXHJcbiAgICAgICAgICAgICAgICAnbWFya2V0aW5nX3N0YXJ0JzogJ0BkYXRldGltZSgpJyxcclxuICAgICAgICAgICAgICAgICdtYXJrZXRpbmdfc3RvcCc6ICdAbm93KCknLFxyXG4gICAgICAgICAgICAgICAgJ3ByaWNlJzogJ0BpbnRlZ2VyKDEwMCwyMDAwKScsLy/njrDku7fvvIzljZXkvY3vvJrliIYgIFxyXG4gICAgICAgICAgICAgICAgJ29yaWdpbmFsX3ByaWNlJzogJ0BpbnRlZ2VyKDEwMCwzMDAwKSdcclxuICAgICAgICAgICAgfV0gIFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy8g6L6T5Ye657uT5p6cXHJcbiAgICAgICAvLyBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXMsIG51bGwsIDIpKVxyXG4gICAgICAgIGZuKHJlcyk7XHJcbiAgICB9XHJcbn0gKi9cclxuLyogbW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBhamF4OiBhamF4XHJcbn0gKi8iXX0=