import React,{ Component } from 'react';
import {
	Row,Col,Card,Form,Input,Button,
	Table,notification,Popconfirm,Switch,Tag,Select,Typography,Icon,
	Avatar,Modal,message
} from 'antd';
import { leave } from '@c/api'
const FormItem = Form.Item,
	{ Paragraph } = Typography;
import moment from 'moment';
import './leaveList.less'
export default class LeaveList extends Component {
	constructor(props){
		super(props);
		this.state = {
			loading: false,
			pageNum: 1,
			pageSize: 10,
			total:null,
			keyword: '',
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
					render: val => <Avatar src={val} />
		        },{
					title: '内容',
					dataIndex: 'leave_desc',
					render: val => <div title={val}>
							<Paragraph copyable>{val.substring(0,20)}...</Paragraph>
						</div>
		        },{
		          title: '状态',
		          dataIndex: 'leave_status',
		          // 0：禁用 1：启用
		          render: (val,record) =>
		            !val ? <Tag color="red" onClick={() => this.propMessage(val, record)}>未回复</Tag>
			            : <Tag color="green">已回复</Tag>
		        },{
		          title: '创建时间',
		          dataIndex: 'create_time',
		          sorter: true,
		          render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
		        }
		    ],
		    leaveList:[],
		    isShowMessage:false,
		    replyContent:'22',
		    currentReplyId:''
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
		                placeholder="留言内容"
		                value={this.state.keyword}
		                onChange={this.handleChangeKeyword}
		              />
		            </FormItem>
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
		leave.leaveList().then(res=>{
			let leaveList = [...this.state.leaveList]
			leaveList = leaveList.concat(res.data.leaveList)
			this.setState({
				leaveList,
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
					dataSource={this.state.leaveList}
	            />
	            <Modal
		          title="回复留言:"
		          visible={this.state.isShowMessage}
		          onOk={this.handleOk}
		          onCancel={this.handleCancel}
		          cancelText="取消"
		          okText="确认回复"
		        >
		        	<Input placeholder="回复留言" value={this.state.replyContent} onChange={this.changeReplyContent}/>
		        </Modal>
      		</div>
        )
    }
	//修改搜索关键词
	handleChangeKeyword = (event)=> {
		this.setState({
		  keyword: event.target.value,
		});
		console.log(this.state.keyword)
	}
	changeReplyContent = (event)=>{
		this.setState({
		  replyContent: event.target.value,
		});
	}
    //搜索用户
    handleSearch = ()=>{
		this.setState({
      		loading: true,
    	});
    	let $state = this.state
    	leave.searchLeaveList($state.keyword,$state.type,$state.pageNum,$state.pageSize).then(res=>{
    		let leaveList = []
			leaveList = leaveList.concat(res.data.leaveList)
			this.setState({
				leaveList,
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
  	//弹出回复消息框
  	propMessage(val,record){
		this.setState({
			isShowMessage:true,
			currentReplyId:record.id
		})
  	}
  	handleOk = e => {
  		if(this.state.replyContent){
			leave.replyContent(this.state.currentReplyId,this.state.replyContent).then(res=>{
				let leaveList = [...this.state.leaveList]
				for(let i = 0; i < leaveList.length; i++){
					if(leaveList[i].id == this.state.currentReplyId){
						leaveList[i].leave_status = 1;
						break;
					}
				}
				this.setState({
					leaveList,
					isShowMessage: false,
					replyContent:'',
					currentReplyId:''
				})
			})
  		}else{
  			message.error('回复留言内容必须填写');
  		}

	}

	handleCancel = e => {
		this.setState({
		  isShowMessage: false,
		});
	}
}