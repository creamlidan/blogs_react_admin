import React,{ Component } from 'react';
import { Form, Icon, Input, Button,Select,message} from 'antd';
const { Option } = Select;
import LzEditor from 'react-lz-editor'
import ReactMarkdown from 'react-markdown';


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
			status:1,
			isAuto:0,
			content:''
		}
	}
	handleChange = (value) =>{
		console.log(value)
	}
	receiveHtml=(content)=> {
	    console.log("recieved HTML content", content);
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
	      		console.log('Received values of form: ', values);
	      	}else{
				message.error('文字内容必须填写');
	      	}
	      }
	    });
	};
	render(){
		const { getFieldDecorator ,getFieldsError} = this.props.form;
		return (
			<div>
				<Form onSubmit={this.handleSubmit} className="write-form">
					<Form.Item>
						{getFieldDecorator('title', {
							rules: [{ required: true, message: '请输入标题!' }],
						})(
							<Input addonBefore="标题" placeholder="标题"/>,
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
							<Select defaultValue="0" onChange={this.handleChange}>
								<Option value="0">原创</Option>
								<Option value="1">混合</Option>
								<Option value="1">转载</Option>
						    </Select>
						</Form.Item>
						<Form.Item style={{ display: 'inline-block', width: 180, marginRight:6 }}>
							<Select defaultValue="1" onChange={this.handleChange}>
								<Option value="1">发布</Option>
								<Option value="0">草稿</Option>
						    </Select>
						</Form.Item>
						<Form.Item  style={{display: 'inline-block', width: 180,marginRight:6}}>
							{getFieldDecorator('tag', {
								rules: [{ required: true, message: '请输入标签!' }],
							})(
								<Input placeholder="标签"/>
							)}
			        	</Form.Item>
			        	<Form.Item  style={{display: 'inline-block',width: 180,marginRight:6}}>
							{getFieldDecorator('classify', {
								rules: [{ required: true, message: '请输入文章分类!' }],
							})(
								<Input placeholder="文章分类"/>
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