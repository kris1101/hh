import React from 'react'
import { Modal, Form, Input, Radio } from 'antd';

const FormItem = Form.Item;
const groupnamePatten = new RegExp("^[0-9a-z][0-9a-z\._-]{1,}$");
const defaultMessage = "项目名称由小写字符、数字和._-组成且至少两个字符并以小写字符或者数字开头";

const GroupCreateForm = Form.create()(
  class extends React.Component {
    checkgroupexists = (rule, value, callback) =>{
      if(!groupnamePatten.test(value)){
           callback(defaultMessage); 
      }
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
          centered={true}
          confirmLoading={confirmLoading}
        >
          <Form>
            <FormItem label="组名称"  labelCol={{span: 4}}  wrapperCol={{ span: 20 }} hasFeedback={true}>
              {getFieldDecorator('name', {
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
              {getFieldDecorator('type', {
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
