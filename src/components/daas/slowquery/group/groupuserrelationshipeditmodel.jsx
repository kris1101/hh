import React, { Component } from 'react';
import { Modal, Button, Form, message } from 'antd';
import { connect } from 'react-redux';
import DaasSlowQueryGroupUserRelationshipForm  from './groupuserrelationshipeditform';
import { slowQueryGroupUserRelationshipUpdate } from '../../../../containers/Daas/actions/slow_query_group_user_relationship';

class DaasSlowQueryGroupUserRelationshipEditManager extends Component {
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
    // const userList = this.props.usersList;
    // const groupId = this.props.pk;
    // const params = {group: groupId, userlist: userList};
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
      // this.props.slowQueryGroupUserRelationshipUpdate(params);
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
          <DaasSlowQueryGroupUserRelationshipForm groupId={this.props.pk} />
        </Modal>
      </div>
    );
  }
}

const DaasSlowQueryGroupUserRelationshipEditModel = Form.create()(DaasSlowQueryGroupUserRelationshipEditManager);
export default connect(state=>state.daasSlowQueryGroupUserRelationship, {slowQueryGroupUserRelationshipUpdate}) (DaasSlowQueryGroupUserRelationshipEditModel);
