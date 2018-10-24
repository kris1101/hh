/*
#=========================================================
# 作者：韩望、秦海荣
# 时间：2018-10-15
# 功能：cluster 编辑项目表单组件
# 版本: v 0.0.0.1.base
# 公司：中化能源互联科技组
# 更新：无
# 备注：无
#=========================================================
*/
import React, { Component } from 'react';
import { Modal, Button, Form } from 'antd';
import { connect } from 'react-redux';
import DaasRdbClusterUpdateForm from './clusterupdateform';
import { rdbClusterUpdate, rdbClusterFetch } from '../../../../containers/Daas/actions/rdb_cluster';

class DaasRdbClusterUpdateModelManager extends Component {
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
    const clusterobj = this.clusterform.props.form.getFieldsValue();
    this.props.rdbClusterUpdate(this.props.pk, clusterobj);
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
        <Button onClick={this.showModal}>
          编辑
        </Button>
        <Modal title="编辑"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <DaasRdbClusterUpdateForm wrappedComponentRef={(form) => this.clusterform = form} clusterId={this.props.pk} />
        </Modal>
      </div>
    );
  }
}

const DaasRdbClusterUpdateModel = Form.create()(DaasRdbClusterUpdateModelManager);
export default connect(state => state.daasRdbCluster, { rdbClusterFetch, rdbClusterUpdate }) (DaasRdbClusterUpdateModel);
