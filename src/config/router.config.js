import React,{Component} from 'react'
import { BrowserRouter, Route,Switch} from 'react-router-dom'
import Login from '../pages/login/login'
import MyLayout from '../pages/frame/frame'
import UserList from '../pages/user/userList.js'

class RouterMap extends Component {
  render() {
  	const  {props} = this;
    return (
      	<BrowserRouter history={props.history}>
			<Switch>
				<Route path="/login" component={Login} />
				<MyLayout>
					<Route path="/user/List" component={UserList} />
					<Route path="/writeArticle" component={UserList} />
					</MyLayout>
			</Switch>
      	</BrowserRouter>
    )
  }
};

export default RouterMap;
