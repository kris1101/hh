import React, { Component } from 'react';
import { Modal, Button, Form } from 'antd';
import { connect } from 'react-redux';
import DaasSlowQueryInstanceGroupRelationshipForm  from './instancegrouprelationshipeditform';
import { slowQueryInstanceGroupRelationshipUpdate } from '../../../../containers/Daas/actions/slow_query_instance_group_relationship';

class DaasSlowQueryInstanceGroupRelationshipEditManager extends Component {
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
    // const groupsList = this.props.groupsList;
    // const instanceId = this.props.pk;
    // const params = {instance: instanceId, groupslist: groupsList};
    // console.log(params);
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
      // this.props.slowQueryInstanceGroupRelationshipUpdate(params);
    }, 2000);
  }

  handleCancel = () => {
    // console.log(this.groupform.props.form.getFieldsValue());
    this.setState({
      visible: false,
    });
  }

  render() {
    const { visible, confirmLoading } = this.state;
    return (
      <div>
        <Button onClick={this.showModal}>
          编辑成员
        </Button>
        <Modal title="编辑成员"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <DaasSlowQueryInstanceGroupRelationshipForm instanceId={this.props.pk} />
        </Modal>
      </div>
    );
  }
}

const DaasSlowQueryInstanceGroupRelationshipEditModel = Form.create()(DaasSlowQueryInstanceGroupRelationshipEditManager);
export default connect(state=>state.daasSlowQueryInstanceGroupRelationship, {slowQueryInstanceGroupRelationshipUpdate}) (DaasSlowQueryInstanceGroupRelationshipEditModel);
