// JS打包入口文件
// 1. 导入包
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import './static/css/base.less';
import RouterMap from './config/router.config.js'
import 'babel-polyfill'

// 使用 render 函数渲染 虚拟DOM
ReactDOM.render(<RouterMap/>, document.getElementById('app'))