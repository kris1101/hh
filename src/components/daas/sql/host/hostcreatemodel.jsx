/*
#=========================================================
# 作者：韩望、秦海荣
# 时间：2018-10-16
# 功能：reducer rdb host 创建表单组件
# 版本: v 0.0.0.1.base
# 公司：中化能源互联科技组
# 更新：无
# 备注：无
#=========================================================
*/
import React, { Component } from 'react';
import { Modal, Button, Form } from 'antd';
import { connect } from 'react-redux';
import DaasRdbHostCreateForm  from './hostcreateform';
import { rdbHostFetch, rdbHostCreate } from '../../../../containers/Daas/actions/rdb_host';

class DaasRdbHostCreateModelManager extends Component {
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
    const hostobj = this.hostform.props.form.getFieldsValue();
    this.props.rdbHostCreate(hostobj);
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.props.rdbHostFetch();
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  }

  handleCancel = () => {
    console.log(this.hostform.props.form.getFieldsValue());
    this.setState({
      visible: false,
    });
  }

  render() {
    const { visible, confirmLoading } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          主机创建
        </Button>
        <Modal title="主机创建"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <DaasRdbHostCreateForm wrappedComponentRef={(form) => this.hostform = form}  />
        </Modal>
      </div>
    );
  }
}

const DaasRdbHostCreateModel = Form.create()(DaasRdbHostCreateModelManager);
export default connect(state => state.daasRdbHost, { rdbHostCreate,rdbHostFetch }) (DaasRdbHostCreateModel);
