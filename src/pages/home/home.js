import React,{Component} from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import './home.less'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class Home extends Component{
	constructor(props) {
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
			this.setate({
				openKeys:[latestOpenKey]
			})
		}
	}
	render(){
		const {openKeys} = this.state
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
						<SubMenu
							key="userManage"
							title={
							  <span>
							    <Icon type="user" />
							    用户管理
							  </span>
							}
						>
			            	<Menu.Item key="1">用户列表</Menu.Item>
			          	</SubMenu>
						<SubMenu
							key="article"
							title={
							  <span>
							    <Icon type="profile" />
							    文章
							  </span>
							}
						>
							<Menu.Item key="2">文章列表</Menu.Item>
							<Menu.Item key="3">文章创作</Menu.Item>
						</SubMenu>
						<SubMenu
							key="leave"
							title={
							  <span>
							    <Icon type="message" />
							    留言
							  </span>
							}
						>
							<Menu.Item key="4">留言列表</Menu.Item>
						</SubMenu>
						<SubMenu
							key="label"
							title={
							  <span>
							    <Icon type="tags" />
							    标签
							  </span>
							}
						>
							<Menu.Item key="5">标签列表</Menu.Item>
						</SubMenu>
						<SubMenu
							key="classify"
							title={
							  <span>
							    <Icon type="book" />
							    分类
							  </span>
							}
						>
							<Menu.Item key="6">分类列表</Menu.Item>
						</SubMenu>
			          	<SubMenu
							key="project"
							title={
							  <span>
							    <Icon type="folder" />
							    项目
							  </span>
							}
						>
				            <Menu.Item key="6">项目列表</Menu.Item>
				        </SubMenu>
				       	<SubMenu
							key="imageManage"
							title={
							  <span>
							    <Icon type="picture" />
							    图片
							  </span>
							}
						>
				            <Menu.Item key="6">图片管理</Menu.Item>
				        </SubMenu>
				        <SubMenu
							key="me"
							title={
							  <span>
							    <Icon type="user" />
							    个人中心
							  </span>
							}
						>
				            <Menu.Item key="6">个人设置</Menu.Item>
				        </SubMenu>
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
			          Content
			        </Content>
			      </Layout>
			    </Layout>
  			</Layout>
		)
	}
}

