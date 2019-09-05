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
			visible: false,
			addStartTime: null,
		    addEndTime: null,
		    endOpen: false,
			columns: [
		        {
		          title: '标题',
		          dataIndex: 'title',
		        },{
		          title: '描述',
		          dataIndex: 'desc',
		          render: val => <div title={val}>
							<Paragraph copyable>{val.substring(0,6)}...</Paragraph>
						</div>
		        },{
		          title: '链接',
		          dataIndex: 'url',
		          render: val => <Paragraph copyable>{val}</Paragraph>,
		        },{
		          title: '开始时间',
		          dataIndex: 'startTime',
		          render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
		        },{
		          title: '结束时间',
		          dataIndex: 'endTime',
		          render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
		        },{
		          title: '状态',
		          dataIndex: 'status',
		          // 0：已上线 1：未上线
		          render: val => 
		          	!val ? <Tag color="green">已上线</Tag>:<Tag color="red">未上线</Tag>
		        },{
		          title: '操作',
		          dataIndex: 'key',
		          // 0：禁用 1：启用
		          render: val => <Popconfirm title="确定要删除此项目?" onConfirm={() => this.handleDelete(val)}>
							<a href="">删除</a>
			            </Popconfirm>
		        }
		    ],
		    projectList:[],
		    addStatus:1
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
						{getFieldDecorator('title', {
							rules: [{ required: true, message: '请输入项目标题!' }],
						})(
							<Input placeholder="标题"/>
						)}
			        </Form.Item>
			        <Form.Item label="描述" hasFeedback>
						{getFieldDecorator('desc', {
							rules: [{ required: true, message: '请输入项目描述!' }],
						})(
							<TextArea
					          placeholder="描述"
					          autosize={{ minRows: 3, maxRows: 5 }}
					        />
						)}
			        </Form.Item>
			        <Form.Item label="链接">
						{getFieldDecorator('url', {
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
			        	<Select defaultValue="1" style={{ width: 120 }} onChange={this.handleChange}>
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
    	project.searchProjectList(this.state.keyword,this.state.type).then(res=>{
    		let projectList = []
			projectList = projectList.concat(res.data.projectList)
			this.setState({
				projectList,
				total:res.data.total,
				loading:false
			})
    	})
    }
    handleChange = (value)=>{
    	this.state.addStatus = value;
	}
    //删除标签
    handleDelete(val){
    	project.delProject(val).then(res=>{
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
	    console.log(this.state.addStatus)
	    this.props.form.validateFields((err, values) => {
	      if (!err) {
	      	values.startTime = values.startTime.valueOf()
	      	values.endTime = values.endTime.valueOf()
	      	values.status = this.state.addStatus
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