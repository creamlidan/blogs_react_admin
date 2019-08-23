import React,{ Component } from 'react';
import { Breadcrumb, Switch, Icon } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";

const breadcrumbNameMap = {
    '/': '首页',
    '/userManage': '用户管理',
    '/userManage/List': '用户列表',
    '/article': '文章',
    '/article/list':"文章列表",
    '/article/write':"文章创作",
    '/leave': '留言',
    '/leave/list': '留言列表',
}
export default class Breadcrumb extends Component{
	//利用PropTypes记住所跳转每个页面的位置 
	static contextTypes ={
		router:PropTypes.object
	}
	constructor(props,context){
		super(props,content);
		this.state = {
			pathSnippet:null,
			extraBreadcrumbItems: null
		}
	}
	getPath(){
		this.state.pathSnippet = this.context.router.history.location.pathname.split('/').filter(i=>i);
		this.state.extraBreadcrumbItems = this.state.pathSnippet.map((_,index)=>{
			
		})
	}
	render(){
		return (
			<div>
				我是Home
			</div>
		)
	}
}