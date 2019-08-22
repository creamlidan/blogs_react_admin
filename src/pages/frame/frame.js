import React,{Component} from 'react'
import './frame.less'
import menuList from '../../config/menu.config.js'
import { Link } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class Frame extends Component{
	constructor(props) {
		console.log(props)
		super(props)
		this.state = {
			openKeys:[]
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
			      		<img src="src/static/images/logo.png"/>
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
			          style={{ height: '100%', borderRight: 0 }}
			        >
			        	{SubMenuList}
			        </Menu>
			      </Sider>
			      <Layout style={{ padding: '12px' }}>
			        <Content
			          style={{
			            background: '#fff',
			            padding: 24,
			            margin: 0,
			            minHeight: 280,
			          }}
			        >
			        { this.props.children }
			        </Content>
			      </Layout>
			    </Layout>
  			</Layout>
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
		return <Menu.Item key={Item.key}>
			<Link to={Item.path}>{Item.item_text}</Link>
		</Menu.Item>
	}
}
