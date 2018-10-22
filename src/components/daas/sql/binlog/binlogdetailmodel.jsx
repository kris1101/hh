import React, { Component } from 'react';
import { Modal, Button, Form } from 'antd';
import { connect } from 'react-redux';
import RDBInstanceBinlogDetail  from './binlogdetail';
// import { slowQueryGroupFetch } from '../../../../containers/Daas/actions/slow_query_group';

class RDBInstanceBinlogDetailManager extends Component {
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
    }, 20);
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
          <RDBInstanceBinlogDetail binlogId={this.props.pk} />
        </Modal>
      </div>
    );
  }
}

const RDBInstanceBinlogDetailModel = Form.create()(RDBInstanceBinlogDetailManager);
export default connect(state => state.RDBInstanceBinlog) (RDBInstanceBinlogDetailModel);
