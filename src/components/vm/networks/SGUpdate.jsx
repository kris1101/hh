import React, { Component } from 'react';
import { notification, Select, Tooltip, Icon, Button, Modal, Form, Input } from 'antd';

import { sgUpdate } from '../../../services/vm/user';

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
    const { getFieldDecorator, getFieldValue } = form;
    const group_children = [];
    for (var u of this.state.group_data) {
      group_children.push(<Option key={u.id}>{u.name}</Option>);
    }
    const role_children = [];
    for (var u of this.state.role_data) {
      role_children.push(<Option key={u.id}>{u.name}</Option>);
    }

    return (
      <Modal visible={visible} title="编辑子网" okText="编辑" onCancel={onCancel} onOk={onCreate} confirmLoading={confirmLoading} >
        <Form>
          <FormItem {...formItemLayout} label="名称">
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入名称!' }],
              initialValue: record.name,
            })(
              <Input placeholder="名称" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="描述">
            {getFieldDecorator('description', {
              validateTrigger: ['onChange', 'onBlur'],
              rules: [{ required: false, message: '请输入描述!' }, ],
              initialValue: record.description,
            })(
              <TextArea placeholder="描述" autosize={{ minRows: 4, }} />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
const CollectionCreateForm = Form.create()(CreateForm);

class SGUpdate extends Component {
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
      sgUpdate(this.props.record.id, {
        name: values.name, description: values.description,
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
        <Tooltip title="编辑安全组">
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


export default SGUpdate;
