import React from 'react'
import { Col, Button, Select, Icon,  message, Modal, Form, Input, Radio } from 'antd';
import { connect } from 'react-redux';
import { getCodeRepoList } from '../../../../../../containers/Paas/k8s/paascodebase.redux'
import { getAjax  } from '../../../../utils/axios'

const FormItem = Form.Item;
const Option = Select.Option;
const codeinfonamePatten = new RegExp("^[0-9a-z][0-9a-z\._-]{1,}$"); 
const defaultMessage = "项目名称由小写字符、数字和._-组成且至少两个字符并以小写字符或者数字开头"
const { TextArea  } = Input;

const CodeInfoCreateForm = Form.create()(
  class extends React.Component {
    checkcodeinfoexists = (rule, value, callback) =>{
        if(!value){
           callback("名称不能为空"); 
           return;
        }
        if(!codeinfonamePatten.test(value)){
           callback(defaultMessage); 
        }else{
          getAjax('/codeinfo/check/', {name: value}, function(res){
            if(res.data.code == 0){
                if(res.data.data){
                    callback("code名称已经存在");
                }else{
                    callback();
                }
            }else{
                callback("未知错误,无法判断项目是否存在,请查看后端日志");
            }
          })
        }
    }
    handleRepolist = () => {
       const form = this.props.form;
       let url = form.getFieldsValue().url; 
       let private_token = form.getFieldsValue().private_token; 
       if (url && private_token){
          this.props.getCodeRepoList({url, private_token});
       }else{
         message.error("缺少url以及token参数");
       }
    }

    render() {
      const { confirmLoading, visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="创建代码仓库"
          okText="创建"
          centered
          maskClosable={false}
          onCancel={onCancel}
          onOk={onCreate}
          confirmLoading={confirmLoading}
        >
          <Form hideRequiredMark={true}>
            <FormItem label="仓库类型"  labelCol={{span: 4}}  wrapperCol={{ span: 20 }}>
                   <Select defaultValue="gitlab">
                       <Option value="1">gitlab</Option>
                    </Select>
            </FormItem>
            <FormItem label="名称"  labelCol={{span: 4}}  wrapperCol={{ span: 20 }} hasFeedback={true}>
              {getFieldDecorator('name', {
              rules: [{validator: this.checkcodeinfoexists}],
              })(
                <Input placeholder="此为镜像仓库项目名称" disabled={confirmLoading} />
              )}
            </FormItem>
            <FormItem label="描述"  labelCol={{span: 4}}  wrapperCol={{ span: 20 }}>
              {getFieldDecorator('description',{initialValue: '',})(
                <TextArea row={1} placeholder="简单描述" disabled={confirmLoading} />
              )}
            </FormItem>
            <FormItem label="URL"  labelCol={{span: 4}}  wrapperCol={{ span: 20 }} hasFeedback={true}>
              {getFieldDecorator('url', {
              rules: [{ required: true, message: "url不能为空"}, {type: "url", message: "请输入正确的url格式"}],
              })(
                <Input placeholder="代码托管地址,url格式,包含协议头" disabled={confirmLoading} />
              )}
            </FormItem>
            <FormItem label="TOKEN"  labelCol={{span: 4}}  wrapperCol={{ span: 20 }} hasFeedback={true}>
                 <Col span={18}>
                 <FormItem>
                   {getFieldDecorator('private_token', {
                   rules: [{ required: true, message: "token不能为空"}],
                   })(
                      <Input placeholder="私有token" disabled={confirmLoading} />
                   )}
                 </FormItem>
                 </Col>
                 <Col span={5} offset={1}>
                 <FormItem>
                      <Button type="primary" onClick={this.handleRepolist} >< Icon type="search" style={{color: "white"}}/>查询</Button>
                 </FormItem>
                 </Col>
            </FormItem>
            <FormItem label="项目代码"  labelCol={{span: 4}}  wrapperCol={{ span: 20 }}>
              {getFieldDecorator('codeproject_id', {
              rules: [{ required: true, message: "项目代码不能为空"}],
              })(
                 <Select
                   showSearch
                   placeholder="选择代码库"
                   notFoundContent="请点击查询"
                   optionFilterProp="children"
                   filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                 >
                   {this.props.coderepoList.map(d => <Option key={d.id}>{d.name}</Option>)}
                 </Select>
                   
              )}
            </FormItem>
            <FormItem label="公开"  labelCol={{span: 4}}  wrapperCol={{ span: 20  }}>
              {getFieldDecorator('public', {
                initialValue: 'true', rules: [{required: true}],
              })(
                <Radio.Group disabled={confirmLoading}>
                  <Radio value="true">是</Radio>
                  <Radio value="false">否</Radio>
                </Radio.Group>
              )}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

export default connect(
  state => state.paasCodeBase,
  { getCodeRepoList })(CodeInfoCreateForm);
