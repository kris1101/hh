import React, { Component } from 'react';
import { Modal, Button, Form, message } from 'antd';
import { connect } from 'react-redux';
import DaasSlowQueryUserEditForm  from './usereditform';
import { slowQueryUsersUpdate, getSlowQueryUsersList } from '../../../../containers/Daas/actions/slow_query_user';

class DaasSlowQueryUserEditManager extends Component {
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
    const userobj = this.userform.props.form.getFieldsValue();
    console.log(userobj);
    console.log(this.props.pk);
    this.props.slowQueryUsersUpdate(this.props.pk, userobj);
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.props.getSlowQueryUsersList();
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);

  }

  handleCancel = () => {
    console.log(this.userform.props.form.getFieldsValue());
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
          <DaasSlowQueryUserEditForm wrappedComponentRef={(form) => this.userform = form} userId={this.props.pk} />
        </Modal>
      </div>
    );
  }
}

const DaasSlowQueryUserEditModel = Form.create()(DaasSlowQueryUserEditManager);
export default connect(state => state.daasSlowQueryUser, { slowQueryUsersUpdate,getSlowQueryUsersList }) (DaasSlowQueryUserEditModel);
