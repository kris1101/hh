/*
#=========================================================
# 作者：韩望、秦海荣
# 时间：2018-10-15
# 功能：instace 编辑项目表单组件
# 版本: v 0.0.0.1.base
# 公司：中化能源互联科技组
# 更新：无
# 备注：无
#=========================================================
*/
import React, { Component } from 'react';
import { Modal, Button, Form } from 'antd';
import { connect } from 'react-redux';
import DaasRdbInstanceUpdateForm from './instanceupdateform';
import { rdbInstanceFetch, rdbInstanceUpdate } from '../../../../containers/Daas/actions/rdb_instance';

class DaasRdbInstanceUpdateModelManager extends Component {
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
    const instanceobj = this.instanceform.props.form.getFieldsValue();
    this.props.rdbInstanceUpdate(this.props.pk, instanceobj);
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.props.rdbInstanceFetch();
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);

  }

  handleCancel = () => {
    console.log(this.instanceform.props.form.getFieldsValue());
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
        <Modal title="实例编辑"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <DaasRdbInstanceUpdateForm wrappedComponentRef={(form) => this.instanceform = form} instanceId={this.props.pk} />
        </Modal>
      </div>
    );
  }
}

const DaasRdbInstanceUpdateModel = Form.create()(DaasRdbInstanceUpdateModelManager);
export default connect(state => state.daasRdbInstance, { rdbInstanceFetch, rdbInstanceUpdate }) (DaasRdbInstanceUpdateModel);
