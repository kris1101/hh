import React, { Component } from 'react';
import { Icon, Tooltip, notification, Modal } from 'antd';

import { groupMemberDel } from '../../../services/vm/user';


class GroupMemberDelete extends Component {
  state = {
    visible: false,
    confirmLoading: false,
  };
  showModal = () => {
    this.setState({ visible: true });
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleOk = () => {
    this.setState({ confirmLoading: true, });
    groupMemberDel(this.props.group_id, {uid: this.props.record.id}).then(res => {
      if (res.code === 0) {
        notification['success']({message: res.msg});
      }else{
        notification['warning']({message: res.msg});
      }

      this.setState({
        visible: false,
        confirmLoading: false,
      });
      this.props.refresh();
    }).catch(function (error) {
      console.log(error);
      notification['error']({message: error});
    });
  };
  render() {
    return (
      <span>
        <Tooltip title="删除组成员">
          <a onClick={this.showModal}><Icon type="delete" style={{ color: '#bb0606' }} /></a>
        </Tooltip>
        <Modal title="确认删除"
               visible={this.state.visible}
               onOk={this.handleOk}
               confirmLoading={this.state.confirmLoading}
               onCancel={this.handleCancel}
        >
          <p>确定删除该记录吗?</p>
        </Modal>
      </span>
    );
  }
}


export default GroupMemberDelete;
