import React,{ Component } from 'react';
import {
	Row,Col,Card,Form,Input,Button,
	Table,notification,Popconfirm,Switch,Tag,Select,Typography,Icon,
	Avatar,Modal,message,DatePicker,TextArea
} from 'antd';
import { project } from '@c/api'
const FormItem = Form.Item,
	{ Paragraph } = Typography,
	{ Option } = Select;
import moment from 'moment';
import './projectList.less'
class ProjectList extends Component {
	constructor(props){
		super(props);
		this.state = {
			loading: false,
			keyword: '',
			searchStatus:null,
			visible: false,
			addStartTime: null,
		    addEndTime: null,
		    endOpen: false,
			columns: [
		        {
		          title: '标题',
		          dataIndex: 'project_name',
		        },{
		          title: '描述',
		          dataIndex: 'project_desc',
		          render: val => <div title={val}>
							<Paragraph copyable>{val.substring(0,6)}...</Paragraph>
						</div>
		        },{
		          title: '链接',
		          dataIndex: 'project_url',
		          render: val => <Paragraph copyable>{val}</Paragraph>,
		        },{
		          title: '开始时间',
		          dataIndex: 'project_startTime',
		          render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
		        },{
		          title: '结束时间',
		          dataIndex: 'project_endTime',
		          render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
		        },{
		          title: '状态',
		          dataIndex: 'project_status',
		          // 0：已上线 1：未上线
		          render: val => 
		          	val ? <span style={{color:"green"}}>已上线</span>:<span style={{color:"red"}}>未上线</span>
		        },{
		          title: '操作',
		          dataIndex: 'id',
		          // 0：禁用 1：启用
		          render: (val,record) => 
		          	<Popconfirm title="确定要删除此项目?" onConfirm={() => this.handleDelete(val,record)}>
						<a href="">删除</a>
		            </Popconfirm>
		        }
		    ],
		    projectList:[],
		    projctStatus:1
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
		                placeholder="项目标题"
		                value={this.state.keyword}
		                onChange={this.handleChangeKeyword}
		              />
		            </FormItem>
		            <Select
		              style={{ width: 200, marginRight: 20 }}
		              placeholder="选择状态"
		              onChange={this.handleChangeType}
		            >
		              <Select.Option value="">所有</Select.Option>
		              <Select.Option value="1">已上线</Select.Option>
		              <Select.Option value="0">未上线</Select.Option>
		            </Select>
		            <span>
		              <Button
		                onClick={this.handleSearch}
		                style={{ marginTop: '3px' ,marginRight:'6px'}}
		                type="primary"
		                icon="search"
		              >
		                Search
		              </Button>
		              <Button
		                onClick={this.showModal}
		                style={{ marginTop: '3px' }}
		                type="primary"
		              >
		                新增
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
		project.projectList().then(res=>{
			let projectList = [...this.state.projectList]
			projectList = projectList.concat(res.data.projectList)
			this.setState({
				projectList
			})
		})
	}
    render() {
    	const { startValue, endValue, endOpen ,visible,addStatus} = this.state;
    	const { getFieldDecorator ,getFieldsError} = this.props.form;
    	const { TextArea } = Input;
        return (
      		<div className="">
        		<div className="">{this._renderSimpleForm()}</div>
	            <Table
					columns={this.state.columns}
					loading={this.state.loading}
					bordered
					pagination={false}
					dataSource={this.state.projectList}
					rowKey="_id"
	            />
	            <Modal
		          title="新增项目"
		          visible={visible}
		          onOk={this.handleSubmit}
		          onCancel={this.handleCancel}
		          cancelText="取消"
		          okText="确定"
		        >
		        <Form onSubmit={this.handleSubmit} className="write-form">
					<Form.Item label="标题" hasFeedback>
						{getFieldDecorator('project_name', {
							rules: [{ required: true, message: '请输入项目标题!' }],
						})(
							<Input placeholder="标题"/>
						)}
			        </Form.Item>
			        <Form.Item label="描述" hasFeedback>
						{getFieldDecorator('project_desc', {
							rules: [{ required: true, message: '请输入项目描述!' }],
						})(
							<TextArea
					          placeholder="描述"
					          autosize={{ minRows: 3, maxRows: 5 }}
					        />
						)}
			        </Form.Item>
			        <Form.Item label="链接">
						{getFieldDecorator('project_url', {
							rules: [{ required: true, message: '请输入项目链接!' }],
						})(
							<Input placeholder="链接"/>
						)}
			        </Form.Item>
			        <Form.Item label="项目时间">
				        <Form.Item style={{ display: 'inline-block', width: 180, marginRight:'20px',marginBottom:'0px' }}>
							{getFieldDecorator('startTime', {
								rules: [{ required: true, message: '请选择项目开始时间!' }],
							})(
								<DatePicker
						          disabledDate={this.disabledStartDate}
						          showTime
						          format="YYYY-MM-DD HH:mm:ss"
						          placeholder="开始时间"
						          onChange={this.onStartChange}
						          onOpenChange={this.handleStartOpenChange}
						        />
							)}
				        </Form.Item>
			        	<Form.Item style={{ display: 'inline-block', width: 180,marginBottom:'0px'}}>
							{getFieldDecorator('endTime', {
								rules: [{ required: true, message: '请选择项目结束时间!' }],
							})(
								<DatePicker
						          disabledDate={this.disabledEndDate}
						          showTime
						          format="YYYY-MM-DD HH:mm:ss"
						          placeholder="结束时间"
						          onChange={this.onEndChange}
						          open={endOpen}
						          onOpenChange={this.handleEndOpenChange}
						        />
							)}
			        	</Form.Item>
			        </Form.Item>
			        <Form.Item label="项目状态">
			        	<Select defaultValue="1" style={{ width: 120 }} onChange={this.handleChangeStatus}>
					      <Option value="0">待上线</Option>
					      <Option value="1">已上线</Option>
					    </Select>
			        </Form.Item>
			    </Form>
		        </Modal>
      		</div>
        )
    }

    disabledStartDate = startValue => {
	    const { endValue } = this.state;
	    if (!startValue || !endValue) {
	      return false;
	    }
	    return startValue.valueOf() > endValue.valueOf();
	};

	disabledEndDate = endValue => {
	    const { startValue } = this.state;
	    if (!endValue || !startValue) {
	      return false;
	    }
	    return endValue.valueOf() <= startValue.valueOf();
	};

	onChange = (field, value) => {
	    this.setState({
	      [field]: value,
	    });
	};

	onStartChange = value => {
	   	this.onChange('startValue', value);
	};

	onEndChange = value => {
	    this.onChange('endValue', value);
	};

	handleStartOpenChange = open => {
	    if (!open) {
	      this.setState({ endOpen: true });
	    }
	};

	handleEndOpenChange = open => {
		this.setState({ endOpen: open });
	};
	//修改搜索关键词
	handleChangeKeyword = (event)=> {
		this.setState({
		  keyword: event.target.value,
		});
	}
    //搜索标签
    handleSearch = ()=>{
		this.setState({
      		loading: true,
    	});
    	project.searchProjectList(this.state.keyword,this.state.searchStatus).then(res=>{
    		let projectList = []
			projectList = projectList.concat(res.data.projectList)
			this.setState({
				projectList,
				total:res.data.total,
				loading:false
			})
    	})
    }
    handleChangeStatus = (value)=>{
    	console.log(value)
    	this.setState({
    		projctStatus:value
    	})
	}
    //删除标签
    handleDelete(val,record){
    	project.delProject(record._id).then(res=>{
    		if(res.code == 200){
    			message.success("删除成功~")
    			let projectList = [...this.state.projectList]
				for(let i = 0; i < projectList.length; i++){
					if(projectList[i].key == val){
						projectList.splice(i,1)
						break;
					}
				}
				this.setState({
					projectList
				})
    		}else{
    			message.error("删除失败~")
    		}

    	})

    }
        //修改type
    handleChangeType = (searchStatus)=> {
	    this.setState(
	      {
	        searchStatus,
	      },
	      () => {
	        this.handleSearch();
	      }
	    );
  	}
  	showModal = () => {
	    this.setState({
			visible: true,
	    });
  	};
  	handleOk = () => {
  		if(this.state.addLabel){
  			
  		}else{
  			message.error('请输入需要添加的标签');
  		}
  	};	
  	handleSubmit = e => {
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      if (!err) {
	      	values.project_startTime = values.startTime.valueOf()
	      	values.project_endTime = values.endTime.valueOf()
	      	values.project_status = this.state.projctStatus
	      	project.addProject(values).then(res=>{
  				this.setState({
					visible: false
				});
  			})
	      }
	    });
	};
  	changeLabel = (event)=> {
		this.setState({
		  addLabel: event.target.value,
		});
	}
	
	handleCancel = () => {
		this.setState({
		  visible: false,
		});
	};
}

export default Form.create({ name: 'normal_projectList' })(ProjectList);