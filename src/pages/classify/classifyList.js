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
		          dataIndex: 'classify_name',
		        },{
		          title: '文章数量',
		          dataIndex: 'article_nums',
		        },{
		          title: '创建时间',
		          dataIndex: 'create_time',
		          sorter: true,
		          render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
		        },{
		          title: '操作',
		          dataIndex: 'id',
		          render: (val,record) => 
		          	record.classify_name == "其它"? <span style={{color:'#999'}}>不可删除</span>:
		          		<Popconfirm title="如果此分类下有关联文章,将全部转移到'其它'分类下,确定要删除此分类?" onConfirm={() => this.handleDelete(val,record)}>
							<Tag color="red">删除</Tag>
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
			let classifyList = [];
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
					rowKey="_id"
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
    handleDelete(val,record){
    	classify.delClassify(record._id).then(res=>{
    		if(res.code == 200){
    			message.success(res.data.message)
    			this.getData();
    		}else{
    			message.error("删除分类失败~")
    		}
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
  				if(res.code == 200){
	  				message.success('添加成功~');
	  				this.getData();
	  				this.setState({
						visible: false
					});
  				}else{
  					message.error('分类添加失败');
  				}
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