import React, { Component } from 'react';
import { Modal, Button, Form, message } from 'antd';
import { connect } from 'react-redux';
import DaasSlowQueryInstanceditForm from '../instance/instanceeditform';
import { slowQueryInstanceUpdate, slowQueryInstatncesFetch } from '../../../../containers/Daas/actions/slow_query_instance';

class DaasSlowQueryInstanceEditManager extends Component {
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
    console.log(instanceobj);
    console.log(this.props.pk);
    this.props.slowQueryInstanceUpdate(this.props.pk, instanceobj);
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.props.slowQueryInstatncesFetch();
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
        <Button onClick={this.showModal}>
          编辑
        </Button>
        <Modal title="用户创建"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <DaasSlowQueryInstanceditForm wrappedComponentRef={(form) => this.instanceform = form} instanceId={this.props.pk} />
        </Modal>
      </div>
    );
  }
}

const DaasSlowQueryInstanceEditModel = Form.create()(DaasSlowQueryInstanceEditManager);
export default connect(state => state.daasSlowQueryInstance, { slowQueryInstanceUpdate, slowQueryInstatncesFetch }) (DaasSlowQueryInstanceEditModel);
