/*
#=========================================================
# 作者：韩望、秦海荣
# 时间：2018-10-16
# 功能：reducer rdb cluster 创建表单组件
# 版本: v 0.0.0.1.base
# 公司：中化能源互联科技组
# 更新：无
# 备注：无
#=========================================================
*/
import React, { Component } from 'react';
import { Modal, Button, Form } from 'antd';
import { connect } from 'react-redux';
import DaasRdbClusterCreateform  from './clustercreateform';
import { rdbClusterFetch, rdbClusterCreate } from '../../../../containers/Daas/actions/rdb_cluster';

class DaasRdbClusterCreateModelManager extends Component {
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
    const clusterobj = this.clusterform.props.form.getFieldsValue();
    this.props.rdbClusterCreate(clusterobj);
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.props.rdbClusterFetch();
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  }

  handleCancel = () => {
    console.log(this.clusterform.props.form.getFieldsValue());
    this.setState({
      visible: false,
    });
  }

  render() {
    const { visible, confirmLoading } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          集群创建
        </Button>
        <Modal title="集群创建"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <DaasRdbClusterCreateform wrappedComponentRef={(form) => this.clusterform = form} />
        </Modal>
      </div>
    );
  }
}

const DaasRdbClusterCreateModel = Form.create()(DaasRdbClusterCreateModelManager);
export default connect(state => state.daasRdbCluster, { rdbClusterCreate,rdbClusterFetch }) (DaasRdbClusterCreateModel);
