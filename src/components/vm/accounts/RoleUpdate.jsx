import React, { Component } from 'react';
import { notification, Select, Tooltip, Icon, Button, Modal, Form, Input } from 'antd';

import { roleUpdate } from '../../../services/vm/user';

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
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.visible === false){
      return;
    }

  }

  render() {
    const { visible, onCancel, onCreate, record, form, confirmLoading } = this.props;
    const { getFieldDecorator, getFieldValue } = form;

    return (
      <Modal visible={visible} title="编辑角色" okText="编辑" onCancel={onCancel} onOk={onCreate} confirmLoading={confirmLoading} >
        <Form>
          <FormItem {...formItemLayout} label="角色名">
            {getFieldDecorator('name', {
              rules: [
                { required: true, message: '请输入角色名!' },
              ],
              initialValue: record.name,
            })(
              <Input placeholder="只能是小写字母，数字，.-_，字母数字开头" disabled={true} />
            )}
          </FormItem>

        </Form>
      </Modal>
    );
  }
}
const CollectionCreateForm = Form.create()(CreateForm);

class RoleUpdate extends Component {
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
      roleUpdate(this.props.record.id, {
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
        <Tooltip  title="编辑角色信息">
          <a onClick={this.showModal} ><Icon type="edit" /></a>
        </Tooltip>
        <CollectionCreateForm
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          record={this.props.record}
          confirmLoading={this.state.confirmLoading}
        />
      </span>
    );
  }
}


export default RoleUpdate;
