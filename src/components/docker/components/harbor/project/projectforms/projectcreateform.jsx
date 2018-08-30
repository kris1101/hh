import React from 'react'
import { Modal, Form, Input, Radio } from 'antd';

const FormItem = Form.Item;

const ProjectCreateForm = Form.create()(
  class extends React.Component {
    render() {
      const { confirmLoading, visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="创建项目"
          okText="创建"
          onCancel={onCancel}
          onOk={onCreate}
          confirmLoading={confirmLoading}
        >
          <Form>
            <FormItem label="项目名称"  labelCol={{span: 4}}  wrapperCol={{ span: 20 }}>
              {getFieldDecorator('project_name', {
                rules: [{ required: true, message: 'Please input the name of project!' }],
              })(
                <Input disabled={confirmLoading} />
              )}
            </FormItem>
            <FormItem label="项目级别"  labelCol={{span: 4}}  wrapperCol={{ span: 20  }}>
              {getFieldDecorator('public', {
                initialValue: 'true', rules: [{required: true}],
              })(
                <Radio.Group disabled={confirmLoading}>
                  <Radio value="true">公开</Radio>
                  <Radio value="false">私有</Radio>
                </Radio.Group>
              )}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

export { ProjectCreateForm }
