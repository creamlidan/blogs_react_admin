import React,{Component} from 'react'
import { BrowserRouter, Route,Switch} from 'react-router-dom'
import Login from '../pages/login/login'
import MyLayout from '../pages/frame/frame'
import UserList from '../pages/user/userList'
import ArticleList from '../pages/article/articleList'
import ArticleWrite from '../pages/article/articleWrite'
import LeaveList from '../pages/leave/leaveList'
import LabelList from '../pages/label/labelList'
import ClassifyList from '../pages/classify/classifyList'
import ProjectList from '../pages/project/projectList'
class RouterMap extends Component {
	render() {
		const  {props} = this;
		return (
		  	<BrowserRouter history={props.history}>
				<Switch>
					<Route path="/login" component={Login} />
					<MyLayout>
						<Route path="/userManage/list" component={UserList}/>
						<Route path="/article/list" component={ArticleList}/>
						<Route path="/article/write" component={ArticleWrite}/>
						<Route path="/leave/list" component={LeaveList}/>
						<Route path="/label/list" component={LabelList}/>
						<Route path="/classify/list" component={ClassifyList}/>
						<Route path="/project/list" component={ProjectList}/>
					</MyLayout>
				</Switch>
		  	</BrowserRouter>
		)
	}
};

export default RouterMap;
