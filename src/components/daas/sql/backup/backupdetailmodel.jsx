import React, { Component } from 'react';
import { Modal, Button, Form } from 'antd';
import { connect } from 'react-redux';
import RDBInstanceBackupDetail  from './backupdetail';
// import { slowQueryGroupFetch } from '../../../../containers/Daas/actions/slow_query_group';

class RDBInstanceBackupDetailManager extends Component {
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
      visible: false,
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
        <Modal title="备份详情"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <RDBInstanceBackupDetail backupId={this.props.pk} />
        </Modal>
      </div>
    );
  }
}

const RDBInstanceBackupDetailModel = Form.create()(RDBInstanceBackupDetailManager);
export default connect(state => state.RDBInstanceBackup) (RDBInstanceBackupDetailModel);
