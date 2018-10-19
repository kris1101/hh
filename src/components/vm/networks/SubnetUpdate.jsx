import React, { Component } from 'react';
import { notification, Select, Tooltip, Icon, Modal, Form, Input } from 'antd';

import { subnetUpdate } from '../../../services/vm/user';

const Option = Select.Option;
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
    group_data: [],
    role_data: [],
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.visible === false){
      return;
    }

  }

  render() {
    const { visible, onCancel, onCreate, record, form, confirmLoading } = this.props;
    const { getFieldDecorator } = form;
    const group_children = [];
    for (var u of this.state.group_data) {
      group_children.push(<Option key={u.id}>{u.name}</Option>);
    }
    const role_children = [];
    for (var p of this.state.role_data) {
      role_children.push(<Option key={p.id}>{p.name}</Option>);
    }

    return (
      <Modal visible={visible} title="编辑子网" okText="编辑" onCancel={onCancel} onOk={onCreate} confirmLoading={confirmLoading} >
        <Form>
          <FormItem {...formItemLayout} label="子网名">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入子网名!' }],
              initialValue: record.name,
            })(
              <Input placeholder="子网名" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="DNS" extra="一行一条">
            {getFieldDecorator('dns_nameservers', {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{ required: false, message: '请输入DNS!' }, ],
              initialValue: JSON.parse(record.dns_nameservers).join('\n'),
            })(
              <TextArea placeholder="DNS" autosize={{ minRows: 6, }} />
            )}
          </FormItem>

        </Form>
      </Modal>
    );
  }
}
const CollectionCreateForm = Form.create()(CreateForm);

class SubnetUpdate extends Component {
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
      subnetUpdate(this.props.network_id, this.props.record.id, {
        name: values.name, dns_nameservers: values.dns_nameservers,
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
        <Tooltip  title="编辑子网">
          <a onClick={this.showModal} ><Icon type="edit" /></a>
        </Tooltip>
        <CollectionCreateForm
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          record={this.props.record}
          project_id={this.props.project_id}
          confirmLoading={this.state.confirmLoading}
        />
      </span>
    );
  }
}


export default SubnetUpdate;
