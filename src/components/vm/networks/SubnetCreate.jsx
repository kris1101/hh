import React, { Component } from 'react';
import { notification, Checkbox, Button, Modal, Form, Input, Radio } from 'antd';

import { subnetCreate } from '../../../services/vm/user';

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
          title="新增子网"
          okText="创建"
          onCancel={onCancel}
          onOk={onCreate}
          confirmLoading={confirmLoading}
      >
        <Form>
          <FormItem {...formItemLayout} label="子网名">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入子网名!' }],
            })(
              <Input placeholder="子网名" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="CIDR">
            {getFieldDecorator('cidr', {
              rules: [{ required: true, message: '请输入CIDR!' }],
            })(
              <Input placeholder="CIDR" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="网关">
            {getFieldDecorator('gateway_ip', {
              rules: [{ required: false, message: '请输入网关!' }],
            })(
              <Input placeholder="网关" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="DNS" extra="一行一条">
            {getFieldDecorator('dns_nameservers', {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{ required: false, message: '请输入DNS!' }, ],
            })(
              <TextArea placeholder="DNS" autosize={{ minRows: 6, }} />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="允许DHCP">
            {getFieldDecorator('enable_dhcp', {
              rules: [{ required: false, message: '请输入允许DHCP!' }],
              initialValue: true,
              valuePropName: 'checked',
            })(
              <Checkbox></Checkbox>
            )}
          </FormItem>

        </Form>
      </Modal>
    );
  }
}
const CollectionCreateForm = Form.create()(CreateForm);


class SubnetCreate extends Component {
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
      subnetCreate(this.props.network_id, {
        name: values.name, enable_dhcp: values.enable_dhcp, dns_nameservers: values.dns_nameservers,
        cidr: values.cidr, gateway_ip: values.gateway_ip,
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
        <Button type="primary" onClick={this.showModal} style={{ marginBottom: 16 }}>新增子网</Button>
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


export default SubnetCreate;
