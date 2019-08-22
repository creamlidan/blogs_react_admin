import React,{Component} from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './login.less'

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.history.push('/frame')
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
    	<div className="login_page">
	    	<Form onSubmit={this.handleSubmit} className="login-form">
		        <Form.Item>
		          {getFieldDecorator('username', {
		            rules: [{ required: true, message: '请输入您的用户名!' }],
		          })(
		            <Input
		              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
		              placeholder="用户名"
		            />,
		          )}
		        </Form.Item>
		        <Form.Item>
		          {getFieldDecorator('password', {
		            rules: [{ required: true, message: '请输入您的密码!' }],
		          })(
		            <Input
		              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
		              type="password"
		              placeholder="密码"
		            />,
		          )}
		        </Form.Item>
		        <Form.Item>
		          {getFieldDecorator('remember', {
		            valuePropName: 'checked',
		            initialValue: true,
		          })(<Checkbox>记住我</Checkbox>)}
		          <Button type="primary" htmlType="submit" className="login-form-button">
		            Log in
		          </Button>
		        </Form.Item>
	      	</Form>
    	</div>
    );
  }
}

export default Form.create({ name: 'normal_login' })(NormalLoginForm);
