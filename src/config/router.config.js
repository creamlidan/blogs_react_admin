import React from 'react'
import { BrowserRouter, Route,Switch} from 'react-router-dom'
import Login from '../pages/login/login'
import Home from '../pages/home/home'
const List = () =>(
	<div>21321</div>
)
export default ()=>(
	<BrowserRouter>
		<Switch>
			<Route path='/' exact component={Login}/>
			<Route path='/login' component={Login}/>
			<Route path='/home' component={Home}/>
		</Switch>
	</BrowserRouter>
)