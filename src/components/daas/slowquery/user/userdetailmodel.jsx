import React, { Component } from 'react';
import { Modal, Button, Form } from 'antd';
import { connect } from 'react-redux';
import SlowQueryUserDetail  from './userdetail';
import { getSlowQueryUsersList } from '../../../../containers/Daas/actions/slow_query_user';
import { BASE_URL } from '../../../../containers/Daas/constants';
import axios from 'axios';

class DaasSlowQueryUserDetailManager extends Component {
  state = {
    ModalText: 'Content of the modal',
    visible: false,
    confirmLoading: false,
    userObj:{}
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  
  handleOk = () => {
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  render() {
    const { visible, confirmLoading } = this.state;
    return (
      <div>
        <Button onClick={this.showModal}>
          详情
        </Button>
        <Modal title="详情"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <SlowQueryUserDetail userId={this.props.pk} />
        </Modal>
      </div>
    );
  }
}

const DaasSlowQueryUserDetailModel = Form.create()(DaasSlowQueryUserDetailManager);
export default connect(state => state.daasSlowQueryUser) (DaasSlowQueryUserDetailModel);
