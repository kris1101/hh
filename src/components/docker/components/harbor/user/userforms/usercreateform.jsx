import React from 'react'
import { message, Modal, Form, Input, Radio } from 'antd';
import { getAjax  } from '../../../../utils/axios'

const FormItem = Form.Item;
const usernamePatten = new RegExp("^[0-9a-z]{1,20}$"); 
const emailPatten = new RegExp("^[A-Za-z0-9_-]+@[A-Za-z0-9_-]+\\.[A-Za-z]{2,8}$");
const defaultMessage = "用户名称不能包含特殊字符且长度不能超过20"
const defaultPasswordMessage = "密码长度在8-20之间且至少包含一个大写字母、一个小写字母以及一个数字"
const defaultemailmessage = "请输入正确的邮箱格式1";
const checklengthPatten = new RegExp("^.{8,20}") 
const checkUpper = new RegExp("[A-Z]")
const checklowwer = new RegExp("[a-z]")
const checknumber = new RegExp("[0-9]")

const UserCreateForm = Form.create()(
  class extends React.Component {

    state = {
     confirmDirty: false
    }

    handleConfirmBlur = (e) => {
      const value = e.target.value;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    compareToFirstPassword = (rule, value, callback) => {
      if(!value.length){
        callback("确认密码不能为空");
      }
      if(!(checklengthPatten.test(value) && checkUpper.test(value) && checklowwer.test(value) && checknumber.test(value))){
        callback(defaultPasswordMessage);
      }
      const form = this.props.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('两次密码输入不一致!');
      } else {
        callback();
      }
    }

    validateToNextPassword = (rule, value, callback) => {
      if(!value.length){
        callback("密码不能为空");
      }
      if(!(checklengthPatten.test(value) && checkUpper.test(value) && checklowwer.test(value) && checknumber.test(value))){
        callback(defaultPasswordMessage);
      }
      const form = this.props.form;
      if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    }

    checkusernameexists = (rule, value, callback) =>{
        if(!usernamePatten.test(value)){
           callback(defaultMessage); 
        }else{
          getAjax('/harbor/checkuserexist/', {check_key: "username", check_value: value}, function(res){
            if(res.data.code == 0){
                if(res.data.data){
                    callback("用户名称已经存在");
                }else{
                    callback();
                }
            }else{
                callback(res.data.msg);
            }
          })
        }
    }

    checkuseremailexists = (rule, value, callback) =>{
        if(!emailPatten.test(value)){
           callback(defaultemailmessage); 
        }else{
          getAjax('/harbor/checkuserexist/', {check_key: "email", check_value: value}, function(res){
            if(res.data.code == 0){
                if(res.data.data){
                    callback("邮箱已经存在");
                }else{
                    callback();
                }
            }else{
                callback(res.data.msg);
            }
          })
        }
    }

    render() {
      const { confirmLoading, visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="创建用户"
          okText="创建"
          onCancel={onCancel}
          onOk={onCreate}
          confirmLoading={confirmLoading}
        >
          <Form>
            <FormItem label="用户名"  labelCol={{span: 4}}  wrapperCol={{ span: 20 }} hasFeedback={true}>
              {getFieldDecorator('username', {
              rules: [{ required: true, validator: this.checkusernameexists}],
              })(
                <Input disabled={confirmLoading} id="username"/>
              )}
            </FormItem>
            <FormItem label="邮箱"  labelCol={{span: 4}}  wrapperCol={{ span: 20 }} hasFeedback={true}>
              {getFieldDecorator('email', {
              rules: [{ required: true, validator: this.checkuseremailexists}],
              })(
                <Input disabled={confirmLoading} id="email"/>
              )}
            </FormItem>
            <FormItem label="全名"  labelCol={{span: 4}}  wrapperCol={{ span: 20 }} hasFeedback={true}>
              {getFieldDecorator('realname', {
              rules: [{ required: true, max:20, message: "长度不超过20个字符"}],
              })(
                <Input disabled={confirmLoading} />
              )}
            </FormItem>
            <FormItem label="密码"  labelCol={{span: 4}}  wrapperCol={{ span: 20 }} hasFeedback={true}>
              {getFieldDecorator('password', {
              rules: [{ validator: this.validateToNextPassword ,required: true}],
              })(
                <Input disabled={confirmLoading} type="password"/>
              )}
            </FormItem>
            <FormItem label="确认密码"  labelCol={{span: 4}}  wrapperCol={{ span: 20 }} hasFeedback={true}>
              {getFieldDecorator('confirm', {
              rules: [{validator: this.compareToFirstPassword, required: true}],
              })(
                <Input type="password" onBlur={this.handleConfirmBlur} disabled={confirmLoading} />
              )}
            </FormItem>
            <FormItem label="注释"  labelCol={{span: 4}}  wrapperCol={{ span: 20 }} hasFeedback={true}>
              {getFieldDecorator('comment')(
                <Input disabled={confirmLoading} />
              )}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

export { UserCreateForm }
