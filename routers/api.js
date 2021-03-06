var express = require('express');

var User = require('../models/User');

var router = express.Router();

//统一返回格式
var responseData;
//进到这个路由里面的所有的请求都会执行use方法，初始化responseData对象
router.use(function (req,res,next) {
    responseData={
        code : 0,
        message : ''
    }
    //这里需要调用一下next方法，保证之后的才做继续执行
    next();
});

//用户注册
/**
 * 用户名不能为空
 * 密码不能为空
 * 两次输入密码一致
 *
 * 验证用户名是否已经被注册
 */
router.post('/user/register',function (req,res,next) {

    var username=req.body.username || 'liang';

    var password = req.body.password || '123456';

    var repassword= req.body.repassword;

    if(username == ''){
        responseData.code = 1;
        responseData.message = '用户名不能为空';

        res.json(responseData);
        return;
    }

    if(password == ''){
        responseData.code = 2;
        responseData.message = '密码不能为空';

        res.json(responseData);
        return;
    }

    //验证用户名是否被占用
    User.findOne({
        username:username
    }).then(function (userInfo) {

        //如果有
        if(userInfo){
            responseData.code = 4;
            responseData.message = '用户名已存在';
            res.json(responseData);
            return;
        }

        //保存到数据库中
        var user = new User({
            username : username,
            password : password
        });

        return user.save();
    }).then(function (newUserInfo) {

        responseData.message = '添加成功';
        res.json(responseData);
    });



});

module.exports = router;