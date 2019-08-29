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

/*Mock.mock('@csentence(5,10)')*/
/*用户列表*/
app.get("/api/userList",function(req,res){
    var data = Mock.mock({
        'info':'返回成功',
        'data':{
            'userList|5':[{
            	'user_name|1':['ZHANGSAN','LISI','网二','码子'],
            	user_email:Mock.mock('@EMAIL()'),
            	user_image:'@image(200x200, #1da5a7, #fff,userImg)',
            	'user_type|1':[1,1,1,1,1,1,1,0],
                'user_status|1':[1,1,1,0,1,1,1,1,0],
            	user_createTime:Mock.Random.date(),
            	'key|+1':1,
            }],
            total:5
        },
        code:200
    })
     res.end(JSON.stringify(data));
})

/*搜索列表*/
app.post("/api/searchUserList",function(req,res){
    var data = Mock.mock({
        'info':'返回成功',
        'data':{
            'userList|20':[{
                'user_name|1':['ZHANGSAN2222','LISI2222','网二2222'],
                user_email:Mock.mock('@EMAIL()'),
                user_image:'@image(200x200, #1da5a7, #fff,userImg)',
                'user_type|1':[1,1,1,1,1,1,1,0],
                'user_status|1':[1,1,1,0,1,1,1,1,0],
                user_createTime:Mock.Random.date(),
                'key|+1':1,
            }]
        },
        code:200
    })
     res.end(JSON.stringify(data));
})

app.get("/api/articleList",function(req,res){
    var data = Mock.mock({
        'info':'返回成功',
        'data':{
            'articleList|10-30':[{
                title:Mock.mock('@cparagraph()'),
                author:Mock.Random.cname(),
                'keyword|1':['webpack','javascript','html'],
                coverPlan:Mock.mock("@image('200x100', '#894FC4', '#FFF', 'png', 'cover_img')"),
                'tag|1':['webpack','javascript','html'],
                'classify|1':['web前端','生活杂记','后端','服务器'],
                'untreatedCommentNums|1':[0,0,0,1,1,4,3],
                'interactionNums|1':[[2,3,5],[2,5,6],[5,6,7]],
                createTime:Mock.Random.date(),
                'status|1':[0,1,1,0,1,0,0],
                desc:Mock.mock('@cparagraph()'),
                'isAuto|1':[1,1,1,0,0,2,1,2],
                'key|+1':1
            }],
            total:200
        },
        code:200
    })
    res.end(JSON.stringify(data));
})
app.post("/api/searchArticleList",function(req,res){
    var data = Mock.mock({
        'info':'返回成功',
        'data':{
            'articleList|10-30':[{
                title:'222'+Mock.mock('@cparagraph()'),
                author:Mock.Random.cname(),
                'keyword|1':['webpack','javascript','html'],
                coverPlan:Mock.mock("@image('200x100', '#894FC4', '#FFF', 'png', 'cover_img')"),
                'tag|1':['webpack','javascript','html'],
                'classify|1':['web前端','生活杂记','后端','服务器'],
                'untreatedCommentNums|1':[0,0,0,1,1,4,3],
                'interactionNums|1':[[2,3,5],[2,5,6],[5,6,7]],
                createTime:Mock.Random.date(),
                'status|1':[0,1,1,0,1,0,0],
                desc:Mock.mock('@cparagraph()'),
                'isAuto|1':[1,1,1,0,0,2,1,2],
                'key|+1':1
            }],
            total:200
        },
        code:200
    })
    res.end(JSON.stringify(data));
})