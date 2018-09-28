import React, { Component } from 'react';
import { Modal, Button, Form, message } from 'antd';
import { connect } from 'react-redux';
import DaasSlowQueryGroupEditForm  from './groupeditform';
import { slowQueryGroupUpdate, slowQueryGroupFetch } from '../../../../containers/Daas/actions/slow_query_group';

class DaasSlowQueryGroupEditManager extends Component {
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
    console.log(groupobj);
    console.log(this.props.pk);
    this.props.slowQueryGroupUpdate(this.props.pk, groupobj);
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
        <Button onClick={this.showModal}>
          编辑
        </Button>
        <Modal title="用户创建"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <DaasSlowQueryGroupEditForm wrappedComponentRef={(form) => this.groupform = form} groupId={this.props.pk} />
        </Modal>
      </div>
    );
  }
}

const DaasSlowQueryGroupEditModel = Form.create()(DaasSlowQueryGroupEditManager);
export default connect(state => state.daasSlowQueryGroup, { slowQueryGroupUpdate,slowQueryGroupFetch }) (DaasSlowQueryGroupEditModel);
