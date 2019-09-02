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
		let url= "/api/userList";
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
    let url= "/api/searchUserList";
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
  }
}
export const article = {
  articleList(){
    let url= "/api/articleList";
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
    let url= "/api/searchArticleList";
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
  }
}

export const leave = {
  leaveList(){
    let url= "/api/leaveList";
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
  searchLeaveList(keyword,type,pageNum,pageSize){
    let url= "/api/searchLeaveList";
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
  replyContent(id,content){
    let url="/api/replyContent";
    return axios.post(url,{
      open_id:getLocalStore("open_id"),
      id,
      content
    })
  }
}

export const label ={
  labelList(keyword){
    let url= "/api/labelList";
    return axios.get(url,{
      params:{
        open_id:getLocalStore("open_id"),
        keyword
      }
    }).then(res=>{
        return requestHandle(res);
    }).catch(function (error) {
        return requestHandle(error.response);
    });
  }
}
export const classify ={
  classifyList(){
    let url= "/api/classifyList";
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
}
export const project ={
  projectList(){
    let url= "/api/projectList";
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
  searchProjectList(keyword,type){
    let url= "/api/searchProjectList";
    return axios.post(url,{
      keyword,
      type,
      open_id:getLocalStore("open_id")
    }).then(res=>{
        return requestHandle(res);
    }).catch(function (error) {
        return requestHandle(error.response);
    });
  },
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