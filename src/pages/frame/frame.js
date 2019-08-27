import React,{Component} from 'react'
import './frame.less'
import menuList from '../../config/menu.config.js'
import { Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd';
import PropTypes from "prop-types";
import BreadcrumbCustom from '../breadcrumbCustom/breadcrumbCustom'
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class Frame extends Component{
	static contextTypes ={
		router:PropTypes.object
	}
	constructor(props,context) {
		super(props,context)
		this.state = {
			openKeys:[],
			current:null
		}
	}
	onOpenChange = (openKeys)=>{
		if(openKeys.length === 1 || openKeys.length === 0){
			this.setState({
				openKeys
			})
			return
		}
		//判断点击的是不是同一个
		const latestOpenKey = openKeys[openKeys.length -1]
		if(latestOpenKey.includes(openKeys[0])){
			this.setState({
				openKeys
			})
		}else{
			this.setState({
				openKeys:[latestOpenKey]
			})
		}
	}
	handleClick = (key)=>{
		this.setState({
			current:key
		})
	}
	render(){
		const {openKeys} = this.state
		let SubMenuList = [];
    	menuList.forEach((item)=>{
    		SubMenuList.push(this._renderSubMenu(item))
    	})
		return (
			<Layout className="home_page">
			    <Header className="header">
			      <div className="logo">
			      	<div className="logo_img">
			      		<img src="/src/static/images/logo.png"/>
			      	</div>
			      	<h1>react-blog</h1>
			      </div>
					<div className="logOut">
						<Icon type="bell" />
						<Icon type="logout"/>
					</div>
			    </Header>
			    <Layout>
			      <Sider width={200} style={{ background: '#fff' }}>
			        <Menu
			          mode="inline"
			          onOpenChange = {this.onOpenChange}
			          openKeys={openKeys}
			          selectedKeys={[this.state.current]}
			          style={{ height: '100%', borderRight: 0 }}
			        >
			        	{SubMenuList}
			        </Menu>
			      </Sider>
			      <Layout style={{ padding: '12px' }}>
			      	<BreadcrumbCustom/>
			        <Content
			          style={{
			            background: '#fff',
			            padding: 24,
			            margin: 0,
			            minHeight: 280,
			          }}
			        >
			        {this.props.location.pathname=="/"?this._renderStatic():this.props.children}
			        </Content>
			      </Layout>
			    </Layout>
  			</Layout>
		)
	}
	_renderStatic(){
		return (
			<div>
				<h2>欢迎来到博客后台管理系统！</h2>
				<p>请在使用前仔细阅读以下内容:</p>
			</div>
		)
	}

	_renderSubMenu(data){
		let ItemList = [];
		data.menuItem.forEach((item)=>{
			ItemList.push(this._renderMenuItem(item))
		})
		return <SubMenu
			key={data.key}
			title={
			  <span>
			    <Icon type={data.icon} />
			    {data.menu_text}
			  </span>
			}
		>
			{ItemList}
        </SubMenu>
	};
	_renderMenuItem(Item){
		return <Menu.Item key={Item.key}
			onClick={()=>this.handleClick(Item.key)}>
			<Link to={Item.path}>{Item.item_text}</Link>
		</Menu.Item>
	}
	componentWillMount() {
		let routerData = this.context.router.history.location.pathname.split('/').filter(i=>i)
    	this.onOpenChange([routerData[0]]);
    	menuList.forEach((item,index)=>{
    		if(item.key == routerData[0]){
    			let itemData = item.menuItem;
    			for(let i = 0; i < itemData.length; i++){
    				if(itemData[i].name == routerData[1]){
    					this.handleClick(itemData[i].key)
    				}
    			}
    		}
    	})
  	}
  	componentWillReceiveProps(){
  		let routerData = this.context.router.history.location.pathname.split('/').filter(i=>i)
  		if(routerData.length == 0){
  			this.setState({
  				openKeys:[],
  				current:null
  			})
  		}
  	}
}
export default Frame
