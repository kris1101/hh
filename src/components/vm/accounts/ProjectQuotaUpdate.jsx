import React, { Component } from 'react';
import { notification, Spin, Tooltip, Icon, Modal, Form, InputNumber } from 'antd';

import { projectQuotaUpdate, projectDetail } from '../../../services/vm/user';

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
    loading: false,
    record: {},
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.visible === false || this.state.record.instances){
      return;
    }
    this.setState({ loading: true });

    projectDetail(this.props.record.id, {tab: 'quota'}).then(res => {
      if(res.code === -2){
        notification['warning']({message: res.msg});
        this.setState({loading: false});
        return
      } else if(res.code === -1){
        notification['warning']({message: res.msg});
        this.setState({loading: false});
        return
      }
      this.setState({ record: res.data, loading: false, });
    });
  };

  render() {
    const { visible, onCancel, onCreate, form, confirmLoading } = this.props;
    const { getFieldDecorator } = form;
    // console.log(record);

    return (
      <Modal visible={visible} title="编辑项目配额" okText="编辑" onCancel={onCancel} onOk={onCreate} confirmLoading={confirmLoading} >
        <Spin spinning={this.state.loading}>
        <Form>
          <FormItem {...formItemLayout} label="实例数">
            {getFieldDecorator('instances', {
              rules: [
                { required: true, message: '请输入实例数!' },
              ],
              initialValue: this.state.record.instances,
            })(
              <InputNumber placeholder="实例数" />
            )}
            <span className="ant-form-text"> 个</span>
          </FormItem>
          <FormItem {...formItemLayout} label="VCPU数量">
            {getFieldDecorator('cores', {
              rules: [
                { required: true, message: '请输入VCPU数量!' },
              ],
              initialValue: this.state.record.cores,
            })(
              <InputNumber placeholder="VCPU数量" />
            )}
            <span className="ant-form-text"> 个</span>
          </FormItem>
          <FormItem {...formItemLayout} label="内存">
            {getFieldDecorator('ram', {
              rules: [
                { required: true, message: '请输入内存!' },
              ],
              initialValue: this.state.record.ram,
            })(
              <InputNumber placeholder="内存" />
            )}
            <span className="ant-form-text"> MB</span>
          </FormItem>
          <FormItem {...formItemLayout} label="密钥对">
            {getFieldDecorator('key_pairs', {
              rules: [
                { required: true, message: '请输入密钥对!' },
              ],
              initialValue: this.state.record.key_pairs,
            })(
              <InputNumber placeholder="密钥对" />
            )}
            <span className="ant-form-text"> 个</span>
          </FormItem>

        </Form>
        </Spin>
      </Modal>
    );
  }
}
const CollectionCreateForm = Form.create()(CreateForm);

class ProjectQuotaUpdate extends Component {
  state = {
    visible: false,
    confirmLoading: false,
  };
  // componentDidMount() {
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
      projectQuotaUpdate(this.props.record.id, {
        instances: values.instances, ram: values.ram, cores: values.cores,
        key_pairs: values.key_pairs,
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
        <Tooltip  title="编辑项目配额">
          <a onClick={this.showModal} ><Icon type="wallet" /></a>
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


export default ProjectQuotaUpdate;
