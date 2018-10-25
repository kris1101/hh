/*
#=========================================================
# 作者：韩望、秦海荣
# 时间：2018-10-15
# 功能：host 编辑项目表单组件
# 版本: v 0.0.0.1.base
# 公司：中化能源互联科技组
# 更新：无
# 备注：无
#=========================================================
*/
import React, { Component } from 'react';
import { Modal, Button, Form } from 'antd';
import { connect } from 'react-redux';
import DaasRdbHostUpdateForm from './hostupdateform';
import { rdbHostUpdate, rdbHostFetch } from '../../../../containers/Daas/actions/rdb_host';

class DaasRdbHostUpdateModelManager extends Component {
  constructor(props){
    super(props);
    this.state = {
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    const hostobj = this.hostform.props.form.getFieldsValue();
    this.props.rdbHostUpdate(this.props.pk, hostobj);
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
        <Button onClick={this.showModal}>
          编辑
        </Button>
        <Modal title="编辑"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <DaasRdbHostUpdateForm wrappedComponentRef={(form) => this.hostform = form} hostId={this.props.pk} />
        </Modal>
      </div>
    );
  }
}

const DaasRdbHostUpdateModel = Form.create()(DaasRdbHostUpdateModelManager);
export default connect(state => state.daasRdbHost, { rdbHostFetch, rdbHostUpdate }) (DaasRdbHostUpdateModel);
