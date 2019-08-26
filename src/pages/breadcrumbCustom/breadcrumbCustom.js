import React,{ Component } from 'react';
import { Breadcrumb, Switch, Icon } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";

const breadcrumbNameMap = {
    '/': '首页',
    '/userManage':'用户管理',
    '/userManage/list':'用户列表',
    '/article':'文章',
    '/article/list':"文章列表",
    '/article/write':"文章创作",
    '/leave':'留言',
    '/leave/list':'留言列表'
}
export default class BreadcrumbCustom extends Component{
  static contextTypes ={
    router:PropTypes.object
  }
  constructor(props,context){
    super(props,context);
    this.state = {
      pathSnippet:null,
      extraBreadcrumbItems: null
    }
  }
  getPath(){
    this.state.pathSnippet = this.context.router.history.location.pathname.split('/').filter(i=>i);
    let BreadcrumbList = [];
    this.state.pathSnippet.forEach((item,index)=>{
      const url = `/${this.state.pathSnippet.slice(0, index + 1).join('/')}`;
      BreadcrumbList.push(this._renderItem(url))
    })
    this.state.extraBreadcrumbItems = BreadcrumbList
  }
  _renderItem(url){
    return (
      <Breadcrumb.Item key={url}>
          {breadcrumbNameMap[url]}
      </Breadcrumb.Item>
    )
  }
  componentWillMount() {
    this.getPath();
  }
  componentWillReceiveProps(){
    this.getPath();
  }
  render(){
    if(this.state.extraBreadcrumbItems.length>0){
      return (
        <Breadcrumb style={{ margin: '12px 0' }}>
          <Breadcrumb.Item>
            <Link to='/'>
                首页
            </Link>
          </Breadcrumb.Item>
          {this.state.extraBreadcrumbItems}
        </Breadcrumb>
      )
    }else{
      return null;
    }
  }
}