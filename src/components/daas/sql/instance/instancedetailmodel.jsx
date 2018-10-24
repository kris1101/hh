import React, { Component } from 'react';
import { Modal, Button, Form } from 'antd';
import { connect } from 'react-redux';
import DaasRdbInstanceDetailForm  from './instancedetailform';

class DaasRdbInstanceDetailModleManager extends Component {
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
    this.setState({
      confirmLoading: true,
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
        <Modal title="实例详情"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <DaasRdbInstanceDetailForm instanceId={this.props.pk} />
        </Modal>
      </div>
    );
  }
}

const DaasRdbInstanceDetailModle = Form.create()(DaasRdbInstanceDetailModleManager);
export default connect() (DaasRdbInstanceDetailModle);
