// 初始化应用
var myApp = new Framework7();

// 自定义DOM库读取表示我们用 $$ 标识符:
var $$ = Framework7.$;

// 增加视图标签
var mainView = myApp.addView('.view-main', {
    dynamicNavbar: true // 设置动态导航栏
});

// 添加事件侦听器的“pageinit”事件,监听点击链接进入页面方法:
$$(document).on('pageInit', function (e) {
    // 当链接跳转新页面会触发 pageInit 事件，并获取相关页面信息
    var page = e.detail.page;
    if (page.name === 'about') {
        // 判断当前页面进入的是about页面时执行弹出框消息
        myApp.alert('来自关于我们页面');
    }
    if (page.name === 'index') {
        // 判断当前页面进入的是about页面时执行弹出框消息
        myApp.alert('来自index页面');
    }
})
