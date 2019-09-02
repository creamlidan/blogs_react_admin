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
//文章
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
//留言
app.get("/api/leaveList",function(req,res){
    var data = Mock.mock({
        'info':'返回成功',
        'data':{
            'leaveList|10-30':[{
                'user_name|1':['ZHANGSAN2222','LISI2222','网二2222'],
                user_email:Mock.mock('@EMAIL()'),
                user_image:'@image(200x200, #1da5a7, #fff,userImg)',
                leave_createTime:Mock.Random.date(),
                leave_desc:Mock.mock('@cparagraph()'),
                'leave_status|1':[1,1,1,0,0],
                'key|+1':1,
                'id|+1':1
            }],
            total:200
        },
        code:200
    })
    res.end(JSON.stringify(data));
})

app.post("/api/searchLeaveList",function(req,res){
    var data = Mock.mock({
        'info':'返回成功',
        'data':{
            'leaveList|10-30':[{
                'user_name|1':['ZHANGSAN2222','LISI2222','网二2222'],
                user_email:Mock.mock('@EMAIL()'),
                user_image:'@image(200x200, #1da5a7, #fff,userImg)',
                leave_createTime:Mock.Random.date(),
                leave_desc:Mock.mock('@cparagraph()'),
                leave_status:[1,1,1,0,0,0,0,0],
                'key|+1':1,
                'id|+1':1
            }],
            total:200
        },
        code:200
    })
    res.end(JSON.stringify(data));
})
//回复留言
app.post("/api/replyContent",function(req,res){
    var data = Mock.mock({
        'info':'返回成功',
        'data':{},
        code:200
    })
    res.end(JSON.stringify(data));
})

//标签列表
app.get("/api/labelList",function(req,res){
    var data = Mock.mock({
        'info':'返回成功',
        'data':{
            'labelList':[{
                title:'Html',
                'id':1,
               createTime:Mock.Random.date(),
                key:1
            },{
                title:'Javascript',
                'id':2,
                createTime:Mock.Random.date(),
                key:2
            },{
                title:'Css',
                'id':3,
                createTime:Mock.Random.date(),
                key:3
            },{
                title:'React',
                'id':4,
                lcreateTime:Mock.Random.date(),
                key:4
            },{
                title:'Vue',
                'id':5,
                createTime:Mock.Random.date(),
                key:5
            }]
        },
        code:200
    })
    res.end(JSON.stringify(data));
})

//新增标签


//分类列表
app.get("/api/classifyList",function(req,res){
    var data = Mock.mock({
        'info':'返回成功',
        'data':{
            'classifyList':[{
                title:'web前端',
                id:1,
                key:1,
                createTime:Mock.Random.date(),
            },{
                title:'服务器',
                id:2,
                key:2,
                createTime:Mock.Random.date(),
            },{
                title:'后台',
                id:3,
                key:3,
                createTime:Mock.Random.date(),
            },{
                title:'生活杂记',
                id:4,
                key:4,
                createTime:Mock.Random.date(),
            }]
        },
        code:200
    })
    res.end(JSON.stringify(data));
})

//新增分类


//项目列表
app.get("/api/projectList",function(req,res){
    var data = Mock.mock({
        'info':'返回成功',
        'data':{
            'projectList|4-8':[{
                'title|1':['app','html','微信小程序'],
                desc:'基于微信小程序基于微信小程序基于微信小程序基于微信小程序',
                url:'https://github.com/creamlidan/todos-wx',
                'status|1':[1,1,1,0,0,0],
                startTime:Mock.Random.date(),
                endTime:Mock.Random.date(),
                'key|+1':1,
                'id|+1':1
            }]
        },
        code:200
    })
    res.end(JSON.stringify(data));
})
//项目列表
app.post("/api/searchProjectList",function(req,res){
    var data = Mock.mock({
        'info':'返回成功',
        'data':{
            'projectList|4-8':[{
                'title|1':['app','html','微信小程序'],
                desc:'基于微信小程序基于微信小程序基于微信小程序基于微信小程序',
                url:'https://github.com/creamlidan/todos-wx',
                'status|1':[1,1,1,0,0,0],
                startTime:Mock.Random.date(),
                endTime:Mock.Random.date(),
                'key|+1':1,
                'id|+1':1
            }]
        },
        code:200
    })
    res.end(JSON.stringify(data));
})

//个人信息的设置