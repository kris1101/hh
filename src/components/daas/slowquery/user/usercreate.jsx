import React, { Component } from 'react';
import { Modal, Button, Form } from 'antd';
import { connect } from 'react-redux';
import DaasSlowQueryUserCreateForm  from './usercreateform';
import { slowQueryUsersCreate, getSlowQueryUsersList } from '../../../../containers/Daas/actions/slow_query_user';

class DaasSlowQueryUserCreateManager extends Component {
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
    this.props.slowQueryUsersCreate(userobj);
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
        <Button type="primary" onClick={this.showModal}>
          用户创建
        </Button>
        <Modal title="用户创建"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <DaasSlowQueryUserCreateForm wrappedComponentRef={(form) => this.userform = form} />
        </Modal>
      </div>
    );
  }
}

const DaasSlowQueryUserCreateModel = Form.create()(DaasSlowQueryUserCreateManager);
export default connect(state => state.daasSlowQueryUser, { slowQueryUsersCreate,getSlowQueryUsersList }) (DaasSlowQueryUserCreateModel);
