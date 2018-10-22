import React, { Component } from 'react';
import { notification, Button, Modal, Form, Input } from 'antd';

import { keypairCreate } from '../../../services/vm/user';

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

const CollectionCreateForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form, confirmLoading } = props;
    const { getFieldDecorator } = form;
    return (
      <Modal visible={visible} title="新增密钥" okText="创建" onCancel={onCancel} onOk={onCreate} confirmLoading={confirmLoading} >
        <Form>
          <FormItem {...formItemLayout} label="密钥对名称">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入密钥对名称!' }],
            })(
              <Input placeholder="密钥对名称" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="公钥">
            {getFieldDecorator('public_key', {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{ required: true, message: '请输入公钥!' }, ],
            })(
              <TextArea placeholder="公钥" autosize={{ minRows: 6, }} />
            )}
          </FormItem>

        </Form>
      </Modal>
    );
  }
);

class KeyCreate extends Component {
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
      keypairCreate({
        name: values.name, public_key: values.public_key,
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
        <Button type="primary" onClick={this.showModal} style={{ marginBottom: 16 }}>新增密钥</Button>
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


export default KeyCreate;
