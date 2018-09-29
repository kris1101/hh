import React from 'react'
import {Button, message, Modal, Form, Radio } from 'antd';
import { connect } from 'react-redux';
import { getCodeRepoList } from '../../../../../../containers/Paas/k8s/paascodebase.redux'
import { putAjax  } from '../../../../utils/axios'

const FormItem = Form.Item;

const CodeInfoUpdateForm = Form.create()(
  class extends React.Component {
    state ={
       public: "false"
    }

    render() {
      const { confirmLoading, visible, onCancel, onUpdate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="更新代码仓库"
          okText="更新"
          centered
          maskClosable={false}
          onCancel={onCancel}
          onOk={onUpdate}
          confirmLoading={confirmLoading}
        >
          <Form hideRequiredMark={true}>
            <FormItem label="TOKEN"  labelCol={{span: 4}}  wrapperCol={{ span: 20 }} hasFeedback={true}>
               {getFieldDecorator('private_token', {
               rules: [{ required: true, message: "token不能为空"}],
               })(
                  <Input placeholder="私有token" disabled={confirmLoading} />
               )}
            </FormItem>
            <FormItem label="公开"  labelCol={{span: 4}}  wrapperCol={{ span: 20  }}>
              {getFieldDecorator('public', {
                initialValue: this.state.public, rules: [{required: true}],
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
  { getCodeRepoList })(CodeInfoUpdateForm);
