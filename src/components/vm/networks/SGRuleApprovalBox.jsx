import React, { Component } from 'react';
import { notification, Checkbox, Button, Modal, Form, Input, Radio } from 'antd';

import { sgRuleApprovalGroupAdmin, sgRuleApprovalAdmin } from '../../../services/vm/user';

const FormItem = Form.Item;
const { TextArea } = Input;


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};


class CreateForm extends React.Component {
  state = {
    data: [],
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.visible === false || this.state.data.length !== 0){
      return;
    }
  }
  render() {
    const { visible, onCancel, onCreate, form, confirmLoading } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Modal
          visible={visible}
          title="审核"
          okText="审核通过"
          cancelText="审核不通过"
          onCancel={onCancel}
          onOk={onCreate}
          confirmLoading={confirmLoading}
      >
        <Form>
          <FormItem {...formItemLayout} label="审批备注">
            {getFieldDecorator('remark', {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{ required: false, message: '请输入审批备注!' }, ],
            })(
              <TextArea placeholder="审批备注" autosize={{ minRows: 4, }} />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
const CollectionCreateForm = Form.create()(CreateForm);


class ApprovalBox extends Component {
  state = {
    visible: false,
    confirmLoading: false,
  };
  showModal = () => {
    this.setState({ visible: true });
  };
  handleCancel = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      this.setState({ confirmLoading: true });
      const func = this.props.t === 'group_admin' ? sgRuleApprovalGroupAdmin : sgRuleApprovalAdmin;
      func(this.props.network_id, {}, {remark: values.remark}).then(res => {
        if (res.code === 0) {
          notification['success']({message: res.msg});
          form.resetFields();
          this.setState({ visible: false });
          this.props.refresh();
        }else{
          notification['warning']({message: res.msg});
        }
      }).catch(function (error) {
        console.log(error);
        notification['error']({message: error});
      });
      this.setState({ confirmLoading: false });
    });

  };

  handleCreate = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      this.setState({ confirmLoading: true });
      const func = this.props.t === 'group_admin' ? sgRuleApprovalGroupAdmin : sgRuleApprovalAdmin;
      func(this.props.network_id, {access: 1}, { remark: values.remark }).then(res => {
        if (res.code === 0) {
          notification['success']({message: res.msg});
          form.resetFields();
          this.setState({ visible: false });
          this.props.refresh();
        }else{
          notification['warning']({message: res.msg});
        }
      }).catch(function (error) {
        console.log(error);
        notification['error']({message: error});
      });
      this.setState({ confirmLoading: false });
    });
  };
  saveFormRef = (form) => {
    this.form = form;
  };
  render() {
    return (
      <span>
        <Button size="small" type="primary" onClick={this.showModal}>{this.props.t === 'group_admin' ? '组管理审核' : '管理员审核'}</Button>
        <CollectionCreateForm
            ref={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
            confirmLoading={this.state.confirmLoading}
        />
      </span>
    );
  }
}


export default ApprovalBox;
