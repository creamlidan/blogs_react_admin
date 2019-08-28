import React,{ Component } from 'react';
import {
	Row,Col,Card,Form,Input,Button,
	Table,notification,Popconfirm,Switch,Tag,Select,Typography,Icon
} from 'antd';
import { article } from '@c/api'
const FormItem = Form.Item,
	{ Paragraph } = Typography;
import moment from 'moment';
export default class ArticleList extends Component{
	constructor(props){
		super(props);
		this.state = {
			loading: false,
			pageNum: 1,
			pageSize: 10,
			useList:null,
			total:null,
			keyword: '',
      		type: '', // 1 :发布 2: 未发布 ,'' 代表所有
			columns: [
		        {
					title: '标题',
					dataIndex: 'title',
					render: val => <div title={val}>
							<Paragraph copyable>{val.substring(0,12)}...</Paragraph>
						</div>
		        },{
		          title: '作者',
		          dataIndex: 'author'
		        },{
					title: '关键字',
					dataIndex: 'keyword',
					sorter: true,
		        },{
					title: '封面图',
					dataIndex: 'coverPlan',
					render: val => <div 
						style={{width:'50px',height:'30px',display:'flex',alignItems:'center',justifyContent:'center'}} 
						className="coverPlan_wrap"><img src={val} style={{width:'100%'}}/></div>
		        },{
					title: '标签',
					dataIndex: 'tag',
					sorter: true,
		        },{
					title: '分类',
					dataIndex: 'classify',
					sorter: true,
		        },{
					title: '待处理评论数',
					dataIndex: 'untreatedCommentNums',
					render:val =><div style={{color:(val>3?'red':(val>0?'orange':'#ccc')),fontWeight:700}}>{val}</div>
		        },{
					title: `观看/点赞/评论`,
					dataIndex: 'interactionNums',
					render:val => <div>{val[0]+' / '+val[1]+' / '+val[2]}</div>
		        },{
					title: '创建时间',
					dataIndex: 'createTime',
					sorter: true,
					render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>
		        },{
					title: '原创状态',
					dataIndex: 'status',
					sorter: true,
					render: (val,record) =>
		            	val ? <Popconfirm title="确定取消发布?" onConfirm={() => this.handleSetting(val,record,0)}>
								<Tag color="green">已发布 <Icon type="setting" /></Tag>
				            </Popconfirm>
				            : <Popconfirm title="确定马上发布?" onConfirm={() => this.handleSetting(val, record,1)}>
								<Tag color="red">草稿<Icon type="setting" /></Tag>
				            </Popconfirm>
		        }
		    ],
		    articleList:[]
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
		                placeholder="标题/描述"
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
		              <Select.Option value="1">正常</Select.Option>
		              <Select.Option value="2">草稿</Select.Option>
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
		              <Button
		                onClick={this.handleAdd}
		                style={{ marginLeft: '10px' }}
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
		article.articleList().then(res=>{
			let articleList = [...this.state.articleList]
			articleList = articleList.concat(res.data.articleList)
			this.setState({
				articleList,
				total:res.data.total
			})
		})
	}
	render(){
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
					dataSource={this.state.articleList}
	            />
      		</div>
        )
	}
	handleSetting(val,record,status){
		console.log(record)
		let articleList = [...this.state.articleList]
		for(let i = 0; i < articleList.length; i++){
			if(articleList[i].key == record.key){
				articleList[i].status = status;
				break;
			}
		}
		this.setState({
			articleList
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
    	const params = {
	      keyword: this.state.keyword,
	      type: this.state.type,
	      pageNum: this.state.pageNum,
	      pageSize: this.state.pageSize,
    	};
    	article.searchArticleList(params).then(res=>{
    		let articleList = []
			articleList = articleList.concat(res.data.articleList)
			this.setState({
				articleList,
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