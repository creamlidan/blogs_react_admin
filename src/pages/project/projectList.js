import React,{ Component } from 'react';
import {
	Row,Col,Card,Form,Input,Button,
	Table,notification,Popconfirm,Switch,Tag,Select,Typography,Icon,
	Avatar
} from 'antd';
import { project } from '@c/api'
const FormItem = Form.Item,
	{ Paragraph } = Typography;
import moment from 'moment';
import '../../static/css/common.less';
export default class ProjectList extends Component {
	constructor(props){
		super(props);
		this.state = {
			loading: false,
			keyword: '',
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
		    projectList:[]
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
		                onClick={this.handleAdd}
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
      		</div>
        )
    }
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
				loading:false
			})
    	})
    }
    //删除标签
    handleDelete(val){
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
}