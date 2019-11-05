import axios from 'axios'
import qs from 'qs'
import { message } from 'antd';
import { getLocalStore } from '@p/localStorage'

//处理post跨域
axios.defaults.withCredentials=true;

//发送请求
axios.interceptors.request.use((config) => {
  config.data = qs.stringify(config.data);
  return config;
}, function(error) {
  return Promise.reject(error);
});

//收到请求回来的数据
axios.interceptors.response.use(function(response){
  return response  
},function(error){
  return Promise.reject(error)  
});

export const user = {
	userList(){
		let url= "/api/user/List";
		return axios.get(url,{
        params:{
          open_id:getLocalStore("open_id")
        }
	    }).then(res=>{
	        return requestHandle(res);
	    }).catch(function (error) {
	        return requestHandle(error.response);
	    });
	},
  searchUserList(keyword,type,pageNum,pageSize){
    let url= "/api/user/searchList";
    return axios.post(url,{
      keyword,
      type,
      pageNum,
      pageSize
    }).then(res=>{
        return requestHandle(res);
    }).catch(function (error) {
        return requestHandle(error.response);
    });
  },
  changeStatus(id,status){
    let url= "/api/user/changeStatus";
    return axios.post(url,{
      id,
      status
    }).then(res=>{
        return requestHandle(res);
    }).catch(function (error) {
        return requestHandle(error.response);
    });
  },
  changeType(id,type){
    let url= "/api/user/changeType";
    return axios.post(url,{
      id,
      type
    }).then(res=>{
        return requestHandle(res);
    }).catch(function (error) {
        return requestHandle(error.response);
    });
  }
}
export const article = {
  articleList(){
    let url= "/api/article/articleList";
    return axios.get(url,{
        params:{
          open_id:getLocalStore("open_id")
        }
      }).then(res=>{
          return requestHandle(res);
      }).catch(function (error) {
          return requestHandle(error.response);
      });
  },
  searchArticleList(keyword,type,pageNum,pageSize){
    let url= "/api/article/searchList";
    return axios.post(url,{
      keyword,
      type,
      pageNum,
      pageSize
    }).then(res=>{
        return requestHandle(res);
    }).catch(function (error) {
        return requestHandle(error.response);
    });
  },
  changeArticleStatus(id,articleStatus){
    let url= "/api/article/changeArticleStatus";
    return axios.post(url,{
      id,
      articleStatus
    }).then(res=>{
        return requestHandle(res);
    }).catch(function (error) {
        return requestHandle(error.response);
    });
  },
  articleWrite(params){
    let url="/api/article/articleWrite"
    return axios.post(url,params)
    .then(res=>{
        return requestHandle(res);
    }).catch(function (error) {
        return requestHandle(error.response);
    });
  },
  delArticle(_id){
    let url="/api/article/delArticle"
    return axios.post(url,{
      id:_id
    })
    .then(res=>{
        return requestHandle(res);
    }).catch(function (error) {
        return requestHandle(error.response);
    });
  },
  searchOne(_id){
    let url="/api/article/searchOne"
    return axios.post(url,{
      id:_id
    })
    .then(res=>{
        return requestHandle(res);
    }).catch(function (error) {
        return requestHandle(error.response);
    });
  }
}

export const leave = {
  //留言列表
  leaveList(){
    let url= "/api/leave/leaveList";
    return axios.get(url,{
      params:{
        open_id:getLocalStore("open_id")
      }
    }).then(res=>{
        return requestHandle(res);
    }).catch(function (error) {
        return requestHandle(error.response);
    });
  },
  //通过搜索刷选的留言列表
  searchLeaveList(keyword,type,pageNum,pageSize){
    let url= "/api/leave/searchLeaveList";
    return axios.post(url,{
      keyword,
      type,
      pageNum,
      pageSize
    }).then(res=>{
        return requestHandle(res);
    }).catch(function (error) {
        return requestHandle(error.response);
    });
  },
  //回复留言
  replyContent(id,writeBack){
    let url="/api/leave/replyContent";
    return axios.post(url,{
      id,
      writeBack
    }).then(res=>{
        return requestHandle(res);
    }).catch(function (error) {
        return requestHandle(error.response);
    });
  },
  //删除留言的回复信息
  delReplyContent(id){
    let url="/api/leave/delReplyContent";
    return axios.post(url,{
      id
    }).then(res=>{
        return requestHandle(res);
    }).catch(function (error) {
        return requestHandle(error.response);
    });
  },
  settingShow(id,leave_show){
    let url="/api/leave/settingShow";
    return axios.post(url,{
      id,
      leave_show
    }).then(res=>{
        return requestHandle(res);
    }).catch(function (error) {
        return requestHandle(error.response);
    });
  }
}

export const label ={
  labelList(keyword){
    let url= "/api/label/labelList";
    return axios.get(url,{
      params:{
        keyword
      }
    }).then(res=>{
        return requestHandle(res);
    }).catch(function (error) {
        return requestHandle(error.response);
    });
  },
  addLabel(labelName){
    let url= "/api/label/addLabel";
    return axios.post(url,{
      labelName
    }).then(res=>{
        return requestHandle(res);
    }).catch(function (error) {
        return requestHandle(error.response);
    });
  },
  delLabel(id){
    let url="/api/label/delLabel";
    return axios.post(url,{
      id
    }).then(res=>{
        return requestHandle(res);
    }).catch(function (error) {
        return requestHandle(error.response);
    });
  }
}
export const classify ={
  classifyList(keyword){
    let url= "/api/classify/classifyList";
    return axios.get(url,{
      params:{
        keyword
      }
    }).then(res=>{
        return requestHandle(res);
    }).catch(function (error) {
        return requestHandle(error.response);
    });
  },
  addClassify(classifyName){
    let url= "/api/classify/addClassify";
    return axios.post(url,{
      classifyName
    }).then(res=>{
        return requestHandle(res);
    }).catch(function (error) {
        return requestHandle(error.response);
    });
  },
  delClassify(id){
    let url="/api/classify/delClassify";
    return axios.post(url,{
      id
    }).then(res=>{
        return requestHandle(res);
    }).catch(function (error) {
        return requestHandle(error.response);
    });
  }
}
export const project ={
  projectList(keyword,project_status){
    let url= "/api/project/projectList";
    return axios.get(url,{
      params:{
        keyword,
        project_status
      }
    }).then(res=>{
        return requestHandle(res);
    }).catch(function (error) {
        return requestHandle(error.response);
    });
  },
  searchProjectList(keyword,project_status){
    let url= "/api/project/searchProjectList";
    return axios.post(url,{
      keyword,
      project_status
    }).then(res=>{
        return requestHandle(res);
    }).catch(function (error) {
        return requestHandle(error.response);
    });
  },
  addProject(values){
    let url= "/api/project/addProject";
    return axios.post(url,{
      ...values
    }).then(res=>{
        return requestHandle(res);
    }).catch(function (error) {
        return requestHandle(error.response);
    });
  },
  delProject(id){
    let url= "/api/project/delProject";
    return axios.post(url,{
      id
    }).then(res=>{
        return requestHandle(res);
    }).catch(function (error) {
        return requestHandle(error.response);
    });
  }
}

//处理接收到的数据参数
const requestHandle = res => {
  let $data = res.data
  if($data.code == 400){
    if($data.data && $data.data.message){
		message.error($data.data.message);
    }else if($data.info){
    	message.error($data.info);
    }
  }
  return $data;
}