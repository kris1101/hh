import React, { Component } from 'react';
import { Modal, Button, Form, message } from 'antd';
import { connect } from 'react-redux';
import { slowQueryInstatncesFetch } from '../../../../containers/Daas/actions/slow_query_instance';
import DaasSlowQueryInstanceCreateForm from './instancecreateform';
import { BASE_URL } from '../../../../containers/Daas/constants';
import axios from 'axios';
import Qs from 'qs';
import { postAjax } from '../../../../utils/daas/axios';

class DaasSlowQueryInstanceCreateManager extends Component {
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

  instanceCreate(){
    const instanceobj = this.instanceform.props.form.getFieldsValue();
    postAjax("slow/query/instances", instanceobj, function(response) {
      console.log(response);
      if (response.data.code) {
        message.error('实例创建失败:' + response.data.message);
      } else {
        message.success('实例创建成功...');
      }
    });
  }

  handleOk = () => {
    this.instanceCreate();
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
          <DaasSlowQueryInstanceCreateForm wrappedComponentRef={(form) => this.instanceform = form} />
        </Modal>
      </div>
    );
  }
}

const DaasSlowQueryInstanceCreateModel = Form.create()(DaasSlowQueryInstanceCreateManager);
export default connect(state => state.daasSlowQueryInstance, {slowQueryInstatncesFetch}) (DaasSlowQueryInstanceCreateModel);
