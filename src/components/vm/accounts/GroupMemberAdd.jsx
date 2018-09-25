import React, { Component } from 'react';
import { notification, Select, Button, Modal, Form, Input, Radio } from 'antd';

import { groupMemberAdd, groupMembers } from '../../../services/vm/user';

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
    data: [],
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.visible === false || this.state.data.length !== 0){
      return;
    }
    groupMembers(this.props.group_id).then(res => {
      if(res.code === -2){
        notification['warning']({message: res.msg});
      }
      this.setState({
        data: [...res.data.map(val => {
            val.key = val.id;
            return val;
        })]
      });
    });

  }
  render() {
    const { visible, onCancel, onCreate, form, confirmLoading } = this.props;
    const { getFieldDecorator } = form;
    const users_children = [];
    for (var u of this.state.data) {
      users_children.push(<Option key={u.id}>{u.username}</Option>);
    }

    return (
      <Modal
          visible={visible}
          title="添加组成员"
          okText="添加"
          onCancel={onCancel}
          onOk={onCreate}
          confirmLoading={confirmLoading}
      >
        <Form>
          <FormItem {...formItemLayout} label="用户">
            {getFieldDecorator('user_id', {
              rules: [{ required: true, message: '请输入用户!' }],
            })(
              <Select
                mode="multiple"
                placeholder="选择用户"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {users_children}
              </Select>

            )}
          </FormItem>

        </Form>
      </Modal>
    );
  }
}
const CollectionCreateForm = Form.create()(CreateForm);


class GroupMemberAdd extends Component {
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
      groupMemberAdd(this.props.group_id, {user_id: values.user_id}).then(res => {
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
        <Button type="primary" onClick={this.showModal} style={{ marginBottom: 16 }}>新增组成员</Button>
        <CollectionCreateForm
            ref={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
            confirmLoading={this.state.confirmLoading}
            group_id={this.props.group_id}
        />
      </span>
    );
  }
}


export default GroupMemberAdd;
