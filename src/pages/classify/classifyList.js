import React,{ Component } from 'react';
import {
	Row,Col,Card,Form,Input,Button,
	Table,notification,Popconfirm,Switch,Tag,Select,Typography,Icon,
	Avatar,Modal,message
} from 'antd';
import { classify } from '@c/api'
const FormItem = Form.Item,
	{ Paragraph } = Typography;
import moment from 'moment';
import '../../static/css/common.less';
export default class ClassifyList extends Component {
	constructor(props){
		super(props);
		this.state = {
			loading: false,
			keyword: '',
			visible: false,
			columns: [
		        {
		          title: '标题',
		          dataIndex: 'title',
		        },{
		          title: '创建时间',
		          dataIndex: 'createTime',
		          sorter: true,
		          render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
		        },{
		          title: '操作',
		          dataIndex: 'id',
		          // 0：禁用 1：启用
		          render: val => <Popconfirm title="确定要删除此标签?" onConfirm={() => this.handleDelete(val)}>
							<a href="">删除</a>
			            </Popconfirm>
		        }
		    ],
		    classifyList:[]
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
		                placeholder="分类"
		                value={this.state.keyword}
		                onChange={this.handleChangeKeyword}
		              />
		            </FormItem>
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
		classify.classifyList().then(res=>{
			let classifyList = [...this.state.classifyList]
			classifyList = classifyList.concat(res.data.classifyList)
			this.setState({
				classifyList
			})
		})
	}
    render() {
    	const { visible} = this.state;
        return (
      		<div className="">
        		<div className="">{this._renderSimpleForm()}</div>
	            <Table
					columns={this.state.columns}
					loading={this.state.loading}
					bordered
					pagination={false}
					dataSource={this.state.classifyList}
	            />
	            <Modal
		          title="新增分类"
		          visible={visible}
		          onOk={this.handleOk}
		          onCancel={this.handleCancel}
		          cancelText="取消"
		          okText="确定"
		        >
		          <Input addonBefore="分类" onChange={this.changeClassify}/>
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
    //搜索标签
    handleSearch = ()=>{
		this.setState({
      		loading: true,
    	});
    	classify.classifyList(this.state.keyword).then(res=>{
    		let classifyList = []
			classifyList = classifyList.concat(res.data.classifyList)
			this.setState({
				classifyList,
				loading:false
			})
    	})
    }
    //删除标签
    handleDelete(val){
		let classifyList = [...this.state.classifyList]
		for(let i = 0; i < classifyList.length; i++){
			if(classifyList[i].id == val){
				classifyList.splice(i,1)
				break;
			}
		}
		this.setState({
			classifyList
		})
    }
    showModal = () => {
	    this.setState({
			visible: true,
	    });
  	};
  	handleOk = () => {
  		if(this.state.addClassify){
  			classify.addClassify(this.state.addClassify).then(res=>{
  				this.setState({
					visible: false
				});
  			})
  		}else{
  			message.error('请输入需要添加的分类');
  		}
  	};	
  	changeClassify = (event)=> {
		this.setState({
		  addClassify: event.target.value,
		});
	}
	
	handleCancel = () => {
		this.setState({
		  visible: false,
		});
	};
}