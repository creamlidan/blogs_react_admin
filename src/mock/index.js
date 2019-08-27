var express = require("express");
var Mock = require("mockjs");
var bodyParser = require("body-parser");
var app = express();

//实现跨域
app.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next()
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({limit:'10mb'}))
app.use(bodyParser.json())


app.listen(8088,function(){
    console.log('启动服务了')
})


/*用户列表*/
app.get("/api/userList",function(req,res){
    var data = Mock.mock({
        'info':'返回成功',
        'data':{
            'userList|5-30':[{
            	user_name:Mock.mock('@csentence(5,10)'),
            	user_email:Mock.mock('@EMAIL()'),
            	user_image:'@image(200x200, #1da5a7, #fff,userImg)',
            	'user_type|1':[1,1,1,1,1,1,1,0],
            	user_createTime:Mock.Random.date(),
            	'key|+1':1
            }],
            total:200
        },
        code:200
    })
     res.end(JSON.stringify(data));
})