import React, { Component } from 'react';
import { Modal, Button, Form } from 'antd';
import { connect } from 'react-redux';
import DaasRdbProjectCreateform  from './projectcreateform';
import { rdbProjectFetch, rdbProjectCreate } from '../../../../containers/Daas/actions/rdb_project';

class DaasRdbProjectCreateManager extends Component {
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
    this.props.rdbProjectCreate(projectobj);
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
        <Button type="primary" onClick={this.showModal}>
          项目创建
        </Button>
        <Modal title="项目创建"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <DaasRdbProjectCreateform wrappedComponentRef={(form) => this.projectform = form} projectlist={this.props.projectlist} />
        </Modal>
      </div>
    );
  }
}

const DaasRdbProjectCreateModel = Form.create()(DaasRdbProjectCreateManager);
export default connect(state => state.daasRdbProject, { rdbProjectCreate,rdbProjectFetch }) (DaasRdbProjectCreateModel);
