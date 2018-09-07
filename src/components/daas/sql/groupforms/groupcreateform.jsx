import React from 'react'
import { message, Modal, Form, Input, Radio } from 'antd';
import { getAjax  } from '../../../../utils/axios'

const FormItem = Form.Item;
const groupnamePatten = new RegExp("^[0-9a-z][0-9a-z\._-]{1,}$"); 
const defaultMessage = "项目名称由小写字符、数字和._-组成且至少两个字符并以小写字符或者数字开头"

const GroupCreateForm = Form.create()(
  class extends React.Component {
    checkgroupexists = (rule, value, callback) =>{
      if(!groupnamePatten.test(value)){
           callback(defaultMessage); 
      }
      {/*else{
          getAjax('/harbor/checkproject/', {group_name: value}, function(res){
            if(res.data.code == 0){
                if(res.data){
                    callback("组名称已经存在");
                }else{
                    callback();
                }
            }else{
                callback("未知错误,无法判断组是否存在,请查看后端日志");
            }
          })
          }*/}
    }

    render() {
      const { confirmLoading, visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="慢查询组创建"
          okText="创建"
          onCancel={onCancel}
          onOk={onCreate}
          confirmLoading={confirmLoading}
        >
          <Form>
            <FormItem label="组名称"  labelCol={{span: 4}}  wrapperCol={{ span: 20 }} hasFeedback={true}>
              {getFieldDecorator('group_name', {
              rules: [{ required: true}],
              })(
                <Input disabled={confirmLoading} />
              )}
            </FormItem>
            <FormItem label="描述"  labelCol={{span: 4}}  wrapperCol={{ span: 20 }} hasFeedback={true}>
              {getFieldDecorator('description', {
              rules: [{ required: true}],
              })(
                <Input disabled={confirmLoading} />
              )}
            </FormItem>
            <FormItem label="组类型"  labelCol={{span: 4}}  wrapperCol={{ span: 20  }}>
              {getFieldDecorator('manager', {
                initialValue: 'true', rules: [{required: true}],
              })(
                <Radio.Group disabled={confirmLoading}>
                  <Radio value="true">DBA组</Radio>
                  <Radio value="false">其他</Radio>
                </Radio.Group>
              )}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

export { GroupCreateForm }
