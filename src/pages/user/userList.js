import React,{ Component } from 'react';
import {
	Row,Col,Card,Form,Input,Button,
	Table,notification,Popconfirm,Switch,Tag,Select,Typography,Icon,
	Avatar,message
} from 'antd';
import { user } from '@c/api'
const FormItem = Form.Item,
	{ Paragraph } = Typography;
import moment from 'moment';
import './userList.less'
export default class userList extends Component {
	constructor(props){
		super(props);
		this.state = {
			loading: false,
			pageNum: 1,
			pageSize: 10,
			useList:null,
			total:null,
			keyword: '',
      		type: '', // 1 :其他友情用户 2: 是管理员的个人用户 ,'' 代表所有用户
			columns: [
		        {
		          title: '用户名',
		          dataIndex: 'name',
		        },{
		          title: '密码',
		          dataIndex: 'password',
		        },{
		          title: '邮箱',
		          dataIndex: 'email',
		        },{
		          title: '头像',
		          dataIndex: 'image',
		          render: val => <Avatar src={val} />
		        },{
		          title: '类型',
		          dataIndex: 'type',
		          // 0：管理员 1:普通用户
		          render: (val,record) =>
		            !Boolean(val) ?
		            	<Popconfirm title="确定要取消此用户管理员权限?" cancelText="取消" okText="确定" onConfirm={() => this.handleAdmin(val,record,1)}>
							<Tag color="green">管理员{Boolean(val)}</Tag> 
			            </Popconfirm>
			            :
			            <Popconfirm title="确定要为该用户增加管理员权限?" cancelText="取消" okText="确定" onConfirm={() => this.handleAdmin(val,record,0)}>
							<Tag color="blue">{Boolean(val)}普通用户</Tag>
			            </Popconfirm>
		        },{
		          title: '用户状态',
		          dataIndex: 'status',
		          // 0：禁用 1：启用
		          render: (val,record) =>
		            val ? <Popconfirm title="确定禁止此用户操作?" cancelText="取消" okText="确定" onConfirm={() => this.handleSetting(val,record,0)}>
							<Tag color="green">启用 <Icon type="setting" /></Tag>
			            </Popconfirm>
			            : <Popconfirm title="恢复此用户操作?" cancelText="取消" okText="确定" onConfirm={() => this.handleSetting(val, record,1)}>
							<Tag color="red">禁用 <Icon type="setting" /></Tag>
			            </Popconfirm>
		        },{
		          title: '创建时间',
		          dataIndex: 'create_time',
		          sorter: true,
		          render: val => <span>{moment(Number(val)).format('YYYY-MM-DD HH:mm:ss')}</span>,
		        },
		    ],
		    userList:[]
		}
	}
	//渲染搜索板块
	_renderSimpleForm = ()=>{
		return(
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
		              <Select.Option value="1">普通用户</Select.Option>
		              <Select.Option value="0">管理员</Select.Option>
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
		)
	}
	componentDidMount(){
		this.getData();
	}
	//初始化数据
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
    render() {
	    const { pageNum, pageSize,total,columns } = this.state;
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
					rowKey="_id"
	            />
      		</div>
        )
    }
    //禁止此用户在论坛操作
    handleSetting(text, record,status){
    	user.changeStatus(record._id,status).then(res=>{
    		if(res.code == 200){
    			message.success('修改成功~');
	    		let userList = [...this.state.userList]
				for(let i = 0; i < userList.length; i++){
					if(userList[i]._id == record._id){
						userList[i].status = status;
						break;
					}
				}
				this.setState({
					userList
				})
    		}else{
    			message.error('修改出错！');
    		}
    	})
    }
	//修改此用户权限
	handleAdmin(text, record,type){
    	user.changeType(record._id,type).then(res=>{
    		if(res.code == 200){
    			message.success('修改成功~');
	    		let userList = [...this.state.userList]
				for(let i = 0; i < userList.length; i++){
					if(userList[i]._id == record._id){
						userList[i].type = type;
						break;
					}
				}
				this.setState({
					userList
				})
    		}else{
    			message.error('修改出错！');
    		}
    	})
    }
    //修改type
    handleChangeType = (type)=> {
	    this.setState(
	      {
	        type,
	      },
	      () => {
	        this.handleSearch();
	      }
	    );
  	}
	//修改搜索关键词
	handleChangeKeyword = (event)=> {
		this.setState({
		  keyword: event.target.value,
		});
	}
    //搜索用户
    handleSearch = ()=>{
		this.setState({
      		loading: true,
    	});
    	let $state = this.state
    	user.searchUserList($state.keyword,$state.type,$state.pageNum,$state.pageSize).then(res=>{
    		let userList = []
			userList = userList.concat(res.data.userList)
			this.setState({
				userList,
				total:res.data.total,
				loading:false
			})
    	})
    }
    //改变一页展示的数据条数
    handleChangePageParam = (pageNum, pageSize)=>{
	    this.setState(
			{
				pageNum,
				pageSize,
			},
			() => {
				this.handleSearch();
			}
	    );
  	}
}