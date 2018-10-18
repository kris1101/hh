import React, { Component } from 'react';
import { notification, Button, Modal, Form, Input } from 'antd';

import { roleCreate } from '../../../services/vm/user';

const FormItem = Form.Item;


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
          title="新增角色"
          okText="创建"
          onCancel={onCancel}
          onOk={onCreate}
          confirmLoading={confirmLoading}
      >
        <Form>
          <FormItem {...formItemLayout} label="角色名">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入角色名!' }],
            })(
              <Input placeholder="角色名" />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
const CollectionCreateForm = Form.create()(CreateForm);


class RoleCreate extends Component {
  state = {
    visible: false,
    confirmLoading: false,
  };
  showModal = () => {
    this.setState({ visible: true });
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      this.setState({ confirmLoading: true });
      roleCreate({
        name: values.name,
      }).then(res => {
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
        <Button type="primary" onClick={this.showModal} style={{ marginBottom: 16 }}>新增角色</Button>
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


export default RoleCreate;
