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
							<Paragraph copyable>{val}...</Paragraph>
						</div>
		        },{
		          title: '状态',
		          dataIndex: 'leave_status',
		          // 0：未回复 1：已回复
		          render: (val,record) =>
		            !val ? <Tag color="red" onClick={() => this.propMessage(val, record)}>未回复</Tag>
			            : <div>
			            	<Tag color="green">已回复</Tag>
			            	<div style={{color:'#999'}}>
			            		@回复:{record.writeBack}
			            		<Popconfirm title="确定要屏蔽掉此条留言吗?" onConfirm={()=>this.handleRevocation(val,record)}>
									<Tag style={{marginLeft:'6px'}}>撤销</Tag>
					            </Popconfirm>
			            		
			            	</div>
			            </div>
		        },{
		          title: '是否显示',
		          dataIndex: 'leave_show',
		          // 0：不显示 1：显示
		          render: (val,record) =>
		            val ? 
		            	<Popconfirm title="确定要屏蔽掉此条留言吗?" onConfirm={() => this.handleSettingShow(val,record,0)}>
							<Tag color="green">已显示<Icon type="setting" style={{marginLeft:'6px'}}/></Tag>
			            </Popconfirm>:
			            <Popconfirm title="确定要显示此条留言吗?" onConfirm={() => this.handleSettingShow(val,record,1)}>
							<Tag color="red">已屏蔽<Icon type="setting" style={{marginLeft:'6px'}}/></Tag>
			            </Popconfirm>
						
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
					rowKey="_id"
	            />
	            <Modal
		          title="回复留言:"
		          visible={this.state.isShowMessage}
		          onOk={this.handleReplyOk}
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
			currentReplyId:record._id
		})
  	}
  	//回复留言
  	handleReplyOk = e => {
  		if(this.state.replyContent){
			leave.replyContent(this.state.currentReplyId,this.state.replyContent).then(res=>{
				if(res.code == 200){
					let leaveList = [...this.state.leaveList]
					for(let i = 0; i < leaveList.length; i++){
						if(leaveList[i]._id == this.state.currentReplyId){
							leaveList[i] = {
								...leaveList[i],
								leave_status:1,
								writeBack:this.state.replyContent
							}
							break;
						}
					}
					this.setState({
						leaveList,
						isShowMessage: false,
						replyContent:'',
						currentReplyId:''
					})
				}else{
					message.error('回复留言失败~');
				}
			})
  		}else{
  			message.error('回复留言内容必须填写');
  		}
	}
	//取消留言
	handleCancel = e => {
		this.setState({
		  isShowMessage: false,
		});
	}
	//删除留言回复
	handleRevocation(val,record){
		leave.delReplyContent(record._id).then(res=>{
			if(res.code == 200){
				let leaveList = [...this.state.leaveList]
				for(let i = 0; i < leaveList.length; i++){
					if(leaveList[i]._id == record._id){
						leaveList[i] = {
							...leaveList[i],
							leave_status:0,
							writeBack:''
						}
						break;
					}
				}
				this.setState({
					leaveList
				})
			}else{
				message.error('删除留言失败~');
			}
		})
	}
	//显示隐藏留言内容
	handleSettingShow(val,record,leave_show){
		leave.settingShow(record._id,leave_show).then(res=>{
			if(res.code == 200){
				let leaveList = [...this.state.leaveList]
				for(let i = 0; i < leaveList.length; i++){
					if(leaveList[i]._id == record._id){
						leaveList[i] = {
							...leaveList[i],
							leave_show,
						}
						break;
					}
				}
				this.setState({
					leaveList
				})
			}else{
				message.error('更新失败~');
			}
		})
	}
}