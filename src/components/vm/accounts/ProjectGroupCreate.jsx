import React, { Component } from 'react';
import { notification, Select, Button, Modal, Form, Input, Radio } from 'antd';

import { projectGroupCreate, projectGroupData } from '../../../services/vm/user';

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;


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
    if (nextProps.visible === false || this.state.group_data.length !== 0){
      return;
    }
    projectGroupData(this.props.project_id).then(res => {
      if(res.code === -2){
        notification['warning']({message: res.msg});
      }
      this.setState({
        group_data: [...res.data.group.map(val => {
            val.key = val.id;
            return val;
        })],
        role_data: [...res.data.role.map(val => {
            val.key = val.id;
            return val;
        })],
      });
    });

  }
  render() {
    const { visible, onCancel, onCreate, form, confirmLoading } = this.props;
    const { getFieldDecorator } = form;
    const group_children = [];
    for (var u of this.state.group_data) {
      group_children.push(<Option key={u.id}>{u.name}</Option>);
    }
    const role_children = [];
    for (var u of this.state.role_data) {
      role_children.push(<Option key={u.id}>{u.name}</Option>);
    }

    return (
      <Modal
          visible={visible}
          title="添加项目用户组"
          okText="添加"
          onCancel={onCancel}
          onOk={onCreate}
          confirmLoading={confirmLoading}
      >
        <Form>
          <FormItem {...formItemLayout} label="用户组">
            {getFieldDecorator('group_id', {
              rules: [{ required: true, message: '请选择用户组!' }],
            })(
              <Select
                placeholder="选择用户组"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {group_children}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="角色">
            {getFieldDecorator('role_id', {
              rules: [{ required: true, message: '请选择角色!' }],
            })(
              <Select
                placeholder="选择角色"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {role_children}
              </Select>
            )}
          </FormItem>

        </Form>
      </Modal>
    );
  }
}
const CollectionCreateForm = Form.create()(CreateForm);


class ProjectGroupCreate extends Component {
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
      projectGroupCreate(
        this.props.project_id, {group: values.group_id, role: values.role_id}
      ).then(res => {
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
        <Button type="primary" onClick={this.showModal} style={{ marginBottom: 16 }}>新增项目用户组</Button>
        <CollectionCreateForm
            ref={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
            confirmLoading={this.state.confirmLoading}
            project_id={this.props.project_id}
        />
      </span>
    );
  }
}


export default ProjectGroupCreate;
