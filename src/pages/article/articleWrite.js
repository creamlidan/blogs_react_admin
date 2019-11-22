import React,{ Component } from 'react';
import { Form, Icon, Input, Button,Select,message} from 'antd';
const { Option } = Select;
import LzEditor from 'react-lz-editor'
import ReactMarkdown from 'react-markdown';
import { article,classify,label} from '@c/api'

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class ArticleWrite extends Component{
	constructor(props){
		super(props)
		this.state = {
			markdownContent: "## HEAD 2 \n markdown examples \n ``` welcome ```",
			title: '',
			author: 'liDan',
			keyword: '',
			desc:'',
			coverPlan: '',
			tag: '',
			classify: '',
			articleStatus:1,
			content:'',
			articleType:0,
			classifyList:[],
			labelList:[],

		}
	}
	componentDidMount(){
		if(this.props.match.params.id){
			article.searchOne(this.props.match.params.id).then(res=>{
				let $data = res.data.article;
				this.props.form.setFieldsValue({
				    title: $data.title,
					author: $data.author,
					keyword: $data.keyword,
					desc:$data.desc,
					coverPlan:$data.coverPlan,
					tag:$data.tag,
					classify:$data.classify,
				})
				this.setState({
					markdownContent: $data.content,
					articleStatus:$data.articleStatus,
					content:$data.content,
					articleType:$data.articleType
				})
			})
		}
		//请求分类classify
		classify.classifyList().then(res=>{
			this.setState({
				classifyList:res.data.classifyList
			})
		})
		//请求标配label
		label.labelList().then(res=>{
			this.setState({
				labelList:res.data.labelList
			})
		})
	}
	handleChange_ArticleType = (value) =>{
	    this.setState({
	      articleType:value
	    });
	}
	handleChange_articleStatus = (value) =>{
	    this.setState({
	      articleStatus:value
	    });
	}
	receiveHtml=(content)=> {
	    this.setState({
	      fileList:[],
	      content:content
	    });
	}
	handleSubmit = e => {
	    e.preventDefault();
	    this.props.form.validateFields((err, values) => {
	      if (!err) {
	      	if(this.state.content !== ''){
	      		let params = values;
      			params.articleStatus = this.state.articleStatus;
      			params.articleType = this.state.articleType;
      			params.content = this.state.content;
      			if(this.props.match.params.id){
      				params._id = this.props.match.params.id
      			}
				article.articleWrite(params).then(res=>{
					if(res.code == 200){
						if(params._id){
							message.success('更新成功~');
							setTimeout(()=>{
								this.props.history.push("/article/list")
							},800)
						}else{
							message.success('添加成功~');
							this.props.form.setFieldsValue({
							    title: '',
								author: 'liDan',
								keyword: '',
								desc:'',
								coverPlan: '',
								tag: '',
								classify: '',
							})
							this.setState({
								markdownContent: "## HEAD 2 \n markdown examples \n ``` welcome ```",
								articleStatus:1,
								content:'',
								articleType:0
							})
						}

					}
				})
	      	}else{
				message.error('文字内容必须填写');
	      	}
	      }
	    });
	};
	_renderOptionItem = (item,par) =>{
		if(par == 'label'){
			return(
				<Option title={item.label_name} key={item._id} value={item._id}>{item.label_name}</Option>
			)
		}
		if(par == 'classify'){
			return(
				<Option title={item.classify_name} key={item._id} value={item._id}>{item.classify_name}</Option>
			)
		}
	}
	selectBindTag = (value)=> {
		this.setState({
			tag:value
		})
	}
	selectBindItemClassify = (value)=> {
		this.setState({
			classify:value
		})
	}
	render(){
		const { getFieldDecorator ,getFieldsError} = this.props.form;
		const {labelList,classifyList} = this.state
		return (
			<div>
				<Form onSubmit={this.handleSubmit} className="write-form">
					<Form.Item>
						{getFieldDecorator('title', {
							rules: [{ required: true, message: '请输入标题!' }],
						})(
							<Input addonBefore="标题" placeholder="标题" />,
						)}
			        </Form.Item>
			        <Form.Item>
						{getFieldDecorator('author', {
							rules: [{ required: true, message: '请输入作者!' }],
							initialValue:this.state.author
						})(
							<Input addonBefore="作者"/>,
						)}
			        </Form.Item>
			        <Form.Item>
						{getFieldDecorator('keyword', {
							rules: [{ required: true, message: '请输入关键词!' }],
						})(
							<Input addonBefore="关键词" placeholder="关键词"/>,
						)}
			        </Form.Item>
			        <Form.Item>
						{getFieldDecorator('desc', {
							rules: [{ required: true, message: '请输入描述!' }],
						})(
							<Input addonBefore="描述" placeholder="描述"/>,
						)}
			        </Form.Item>
			        <Form.Item>
						{getFieldDecorator('coverPlan', {
							rules: [{ required: true, message: '请输入封面链接!' }],
						})(
							<Input addonBefore="封面链接" placeholder="封面链接"/>,
						)}
			        </Form.Item>
			        <Form.Item>
						<Form.Item style={{ display: 'inline-block', width: 180, marginRight:6 }}>
							<Select defaultValue="0" onChange={this.handleChange_ArticleType}>
								<Option value="0">原创</Option>
								<Option value="1">混合</Option>
								<Option value="2">转载</Option>
						    </Select>
						</Form.Item>
						<Form.Item style={{ display: 'inline-block', width: 180, marginRight:6 }}>
							<Select defaultValue="1" onChange={this.handleChange_articleStatus}>
								<Option value="1">发布</Option>
								<Option value="0">草稿</Option>
						    </Select>
						</Form.Item>
						<Form.Item  style={{display: 'inline-block', width: 180,marginRight:6}}>
							{getFieldDecorator('tag', {
								rules: [{
										required: true, 
										message: '请选择标签！',
										initialValue:this.state.tag
									}],
								})(
									<Select placeholder="请选择标签" onSelect={this.selectBindTag}>
										{
											labelList &&  labelList.map(item=>{
											 	return this._renderOptionItem(item,'label')
											})
										}
									</Select>
								)
							}
			        	</Form.Item>
			        	<Form.Item  style={{display: 'inline-block',width: 180,marginRight:6}}>
							{getFieldDecorator('classify', {
								rules: [{ 
									required: true,
									message: '请输入文章分类!',
									initialValue:this.state.classify
								}],
							})(
								<Select placeholder="请选择文章分类" onSelect={this.selectBindItemClassify}>
									{
										classifyList &&  classifyList.map(item=>{
										 	return this._renderOptionItem(item,'classify')
										})
									}
								</Select>
							)}
			        	</Form.Item>
			        </Form.Item>
			        <Form.Item>
			        	<LzEditor
							active={true}
							importContent={this.state.markdownContent}
							cbReceiver={this.receiveHtml}
							image={false}
							video={false}
							audio={false}
							convertFormat="markdown"/>
			        </Form.Item>
			        <Form.Item>
			          <Button type="primary" htmlType="submit">提交</Button>
			        </Form.Item>
				</Form>
			</div>
		)
	}
}
export default Form.create({ name: 'normal_articleWrite' })(ArticleWrite);