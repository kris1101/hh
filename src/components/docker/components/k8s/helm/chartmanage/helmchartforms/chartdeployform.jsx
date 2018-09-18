import React from 'react'
import { message, Modal, Form, Input } from 'antd';
import { getAjax  } from '../../../../../utils/axios'

const FormItem = Form.Item;

const HelmChartDeployForm = Form.create()(
  class extends React.Component {

    render() {
      const { confirmLoading, visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="部署chart"
          okText="提交"
          onCancel={onCancel}
          onOk={onCreate}
          confirmLoading={confirmLoading}
        >
          <Form>
            <FormItem label="Repo名称"  labelCol={{span: 4}}  wrapperCol={{ span: 20 }} hasFeedback={true}>
              {getFieldDecorator('name', {
              rules: [{ required: true}],
              })(
                <Input disabled={confirmLoading} />
              )}
            </FormItem>
          </Form>
        </Modal>
      );
    }
  }
);

export { HelmChartDeployForm }
