import React, { Component } from 'react';
import { Modal, Button, Form } from 'antd';
import { connect } from 'react-redux';
import DaasRdbInstanceCreateForm  from './instancecreateform';
import { rdbInstanceCreate,rdbInstanceFetch } from '../../../../containers/Daas/actions/rdb_instance';

class DaasRdbInstanceCreateModelManager extends Component {
  state = {
    ModalText: 'Content of the modal',
    visible: false,
    confirmLoading: false,
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    const instanceobj = this.instanceform.props.form.getFieldsValue();
    this.props.rdbInstanceCreate(instanceobj);
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.props.rdbInstanceFetch();
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  }

  handleCancel = () => {
    console.log(this.instanceform.props.form.getFieldsValue());
    this.setState({
      visible: false,
    });
  }

  render() {
    const { visible, confirmLoading } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          实例创建
        </Button>
        <Modal title="实例创建"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <DaasRdbInstanceCreateForm wrappedComponentRef={(form) => this.instanceform = form} instancelist={this.props.instancelist} />
        </Modal>
      </div>
    );
  }
}

const DaasRdbInstanceCreateModel = Form.create()(DaasRdbInstanceCreateModelManager);
export default connect(state => state.daasRdbInstance, { rdbInstanceCreate,rdbInstanceFetch }) (DaasRdbInstanceCreateModel);
