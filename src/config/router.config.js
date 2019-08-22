import React,{Component} from 'react'
import { BrowserRouter, Route,Switch} from 'react-router-dom'
import Login from '../pages/login/login'
import MyLayout from '../pages/frame/frame'
import UserList from '../pages/user/userList.js'
import Home from '../pages/home.js'

class RouterMap extends Component {
  render() {
  	const  {props} = this;
    return (
      	<BrowserRouter history={props.history}>
			<Switch>
				<Route path="/login" component={Login} />
				<MyLayout>
					<Route path="/userList" component={UserList} />
					<Route path="/writeArticle" component={Home} />
				</MyLayout>
			</Switch>
      	</BrowserRouter>
    )
  }
};

export default RouterMap;
