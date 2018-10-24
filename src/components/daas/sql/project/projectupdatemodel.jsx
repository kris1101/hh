/*
#=========================================================
# 作者：韩望、秦海荣
# 时间：2018-10-11
# 功能：reducer project 编辑项目表单组件
# 版本: v 0.0.0.1.base
# 公司：中化能源互联科技组
# 更新：无
# 备注：无
#=========================================================
*/
import React, { Component } from 'react';
import { Modal, Button, Form } from 'antd';
import { connect } from 'react-redux';
import DaasRdbProjectUpdateForm from './projectupdateform';
import { rdbProjectFetch, rdbProjectUpdate } from '../../../../containers/Daas/actions/rdb_project';

class DaasRdbProjectUpdateModelManager extends Component {
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
    const projectobj = this.projectform.props.form.getFieldsValue();
    console.log(projectobj);
    console.log(this.props.pk);
    this.props.rdbProjectUpdate(this.props.pk, projectobj);
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.props.rdbProjectFetch();
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);

  }

  handleCancel = () => {
    console.log(this.projectform.props.form.getFieldsValue());
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
        <Modal title="项目编辑"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <DaasRdbProjectUpdateForm wrappedComponentRef={(form) => this.projectform = form} projectId={this.props.pk} />
        </Modal>
      </div>
    );
  }
}

const DaasRdbProjectUpdateModel = Form.create()(DaasRdbProjectUpdateModelManager);
export default connect(state => state.daasRdbProject, { rdbProjectFetch, rdbProjectUpdate }) (DaasRdbProjectUpdateModel);
