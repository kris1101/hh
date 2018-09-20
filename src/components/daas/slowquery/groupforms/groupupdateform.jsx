import React from 'react'
import { Icon, Button, Upload, message, Modal, Form, Input, Radio } from 'antd';
import axios from 'axios'

const FormItem = Form.Item;

const GroupUpdateForm = Form.create()(
  class extends React.Component {
    render() {
      const { confirmLoading, visible, onCancel, onCreate, groupinfo, form } = this.props;
      const { getFieldDecorator } = form;
      const _that = this;
      return (
        <Modal
          visible={visible}
          title="组编辑"
          okText="提交"
          onCancel={onCancel}
          onOk={onCreate}
          centered={true}
          confirmLoading={confirmLoading}
        >
          <Form>
            <FormItem label="组名称"  labelCol={{span: 5}}  wrapperCol={{ span: 19 }} hasFeedback={true}>
              {getFieldDecorator('name', { initialValue: groupinfo.fields.name,
              rules: [{ required: true, message: "组名称不能为空"}],
              })(
                <Input disabled={confirmLoading} />
              )}
            </FormItem>
            <FormItem label="描述"  labelCol={{span: 5}}  wrapperCol={{ span: 19 }} hasFeedback={true}>
              {getFieldDecorator('description', {initialValue: groupinfo.fields.description,
              rules: [{ required: true}],
              })(
                <Input disabled={confirmLoading} />
              )}
            </FormItem>
            <FormItem label="组类型"  labelCol={{span: 5}}  wrapperCol={{ span: 19  }}>
              {getFieldDecorator('type', {
                initialValue: groupinfo.fields.type, rules: [{required: true}],
              })(
                <Radio.Group disabled={confirmLoading}>
                  <Radio value="0">DBA组</Radio>
                  <Radio value="1">其他</Radio>
                </Radio.Group>
              )}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

export { GroupUpdateForm }
