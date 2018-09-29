import React, { Component } from 'react';
import { Modal, Button, Form } from 'antd';
import { connect } from 'react-redux';
import DaasSlowQueryGroupCreateForm  from './groupcreateform';
import { slowQueryGroupCreate, slowQueryGroupFetch } from '../../../../containers/Daas/actions/slow_query_group';

class DaasSlowQueryGroupCreateManager extends Component {
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
    const groupobj = this.groupform.props.form.getFieldsValue();
    this.props.slowQueryGroupCreate(groupobj);
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.props.slowQueryGroupFetch();
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  }

  handleCancel = () => {
    console.log(this.groupform.props.form.getFieldsValue());
    this.setState({
      visible: false,
    });
  }

  render() {
    const { visible, confirmLoading } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          组创建
        </Button>
        <Modal title="组创建"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <DaasSlowQueryGroupCreateForm wrappedComponentRef={(form) => this.groupform = form} />
        </Modal>
      </div>
    );
  }
}

const DaasSlowQueryGroupCreateModel = Form.create()(DaasSlowQueryGroupCreateManager);
export default connect(state => state.daasSlowQueryGroup, { slowQueryGroupCreate, slowQueryGroupFetch }) (DaasSlowQueryGroupCreateModel);
