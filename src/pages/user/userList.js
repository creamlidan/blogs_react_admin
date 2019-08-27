import React,{ Component } from 'react';
import {
	Row,Col,Card,Form,Input,Button,
	Table,notification,Popconfirm,Switch,Tag,Select
} from 'antd';
import { user } from '@c/api'
const FormItem = Form.Item;
import moment from 'moment';
export default class userList extends Component {
	constructor(props){
		super(props);
		this.state = {
			loading: false,
			pageNum: 1,
			pageSize: 10,
			useList:null,
			total:null,
			columns: [
		        {
		          title: '用户名',
		          dataIndex: 'user_name',
		        },{
		          title: '邮箱',
		          dataIndex: 'user_email',
		        },{
		          title: '头像',
		          dataIndex: 'user_image',
		        },{
		          title: '类型',
		          dataIndex: 'user_type',
		          // 0：管理员 1：其他用户
		          render: val =>
		            !val ? <Tag color="green">管理员</Tag> : <Tag color="blue">普通用户</Tag>,
		        },{
		          title: '创建时间',
		          dataIndex: 'create_time',
		          sorter: true,
		          render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
		        },{
		          title: '操作',
		          render: (text, record) => (
		            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(text, record)}>
		              <a href="javascript:;">Delete</a>
		            </Popconfirm>
		          ),
		        },
		    ],
		    userList:[]
		}
	}
	_renderSimpleForm = ()=>{
		<Form layout="inline" style={{ marginBottom: '20px' }}>
	        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
	          <Col md={24} sm={24}>
	            <FormItem>
	              <Input
	                placeholder="用户名"
	                value={this.state.keyword}
	                onChange={this.handleChangeKeyword}
	              />
	            </FormItem>
	            <Select
	              style={{ width: 200, marginRight: 20 }}
	              placeholder="选择类型"
	              onChange={this.handleChangeType}
	            >
	              <Select.Option value="">所有</Select.Option>
	              <Select.Option value="1">其他用户</Select.Option>
	              <Select.Option value="2">管理员</Select.Option>
	            </Select>
	            <span>
	              <Button
	                onClick={this.handleSearch}
	                style={{ marginTop: '3px' }}
	                type="primary"
	                icon="search"
	              >
	                Search
	              </Button>
	            </span>
	          </Col>
	        </Row>
      </Form>
	}
	componentDidMount(){
		this.getData();
		console.log("22")
	}
	getData(){
		user.userList().then(res=>{
			let userList = [...this.state.userList]
			userList = userList.concat(res.data.userList)
			this.setState({
				userList,
				total:res.data.total
			})
		})
	}
	shouldComponentUpdate(nextProps,nextState){
            //this.props.**   this.state.**表示旧的值
            //nextProps为最新传递过来的值 ，nextState为新的值
        console.log("shouldCompontentUpdate组件是否要被重新渲染");
        console.log(this.state.userList)
        if(this.state.userList !== nextState.userList){
        	return true;
        }else{
        	return false;
        }
    }
    render() {
	    const { pageNum, pageSize,total,columns } = this.state;
	    console.log("渲染了")
	    const pagination = {
	      total,
	      defaultCurrent: pageNum,
	      pageSize,
	      showSizeChanger: true,
	      onShowSizeChange: (current, pageSize) => {
	        this.handleChangePageParam(current, pageSize);
	      },
	      onChange: (current, pageSize) => {
	        this.handleChangePageParam(current, pageSize);
	      },
	    };
        return (
      		<div className="">
        		<div className="">{this._renderSimpleForm()}</div>
	            <Table
					pagination={pagination}
					columns={this.state.columns}
					loading={this.state.loading}
					bordered
					dataSource={this.state.userList}
	            />
      		</div>
        )
    }
}