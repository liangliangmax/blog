/**
 * 应用程序的启动入口
 */
//加载express模块
var express = require("express");
//加载模板引擎
var swig = require("swig");
//加载数据库
var mongoose = require("mongoose");
//加载body-parser,来处理post提交过来的数据
var bodyParser = require("body-parser");

//创建app应用
var app = express();

var PORT=process.env.PORT || 8080;

//设置静态资源托管
//当用户请求的url包含public，则直接指向public文件夹
app.use('/public',express.static(__dirname+"/public"));

//配置应用模板
//定义当前应用所使用的模板引擎，第一个参数表示模板引擎的名称，同时也是后缀；第二个参数是处理模板内容的方法
app.engine('html',swig.renderFile);
//设置模板文件存放的目录
app.set('views','./views');
//注册使用的模板引擎
app.set('view engine','html');

//去掉模板缓存
swig.setDefaults({cache:false});

//bodyParse设置
app.use(bodyParser.urlencoded({extended:true}));


//添加路由，根据不同的功能划分模块
app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));
app.use('/',require('./routers/main'));


mongoose.connect('mongodb://localhost:27017/blog',function (err) {
    if(err){
        console.log("数据库链接失败");

    }else{

        console.log("数据库链接成功");

        //监听http请求
        app.listen(PORT);

        console.log("start at "+PORT);
    }
});

