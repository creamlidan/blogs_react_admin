// JS打包入口文件
// 1. 导入包
import React from 'react'
import ReactDOM from 'react-dom'
import './static/css/base.less';

import App from './App'

// 使用 render 函数渲染 虚拟DOM
ReactDOM.render(<App/>, document.getElementById('app'))