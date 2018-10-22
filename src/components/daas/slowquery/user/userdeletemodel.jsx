import React, { Component } from 'react';
import { Modal, Button, Form, message } from 'antd';
import { connect } from 'react-redux';
import { BASE_URL } from '../../../../containers/Daas/constants';
import { getSlowQueryUsersList } from '../../../../containers/Daas/actions/slow_query_user';
import axios from 'axios';

const confirm = Modal.confirm;

class DaasSlowQueryUserDeleteManager extends Component {
  
  slowQueryUserDelete(){
    const _that = this;
    const pk = _that.props.pk.toString();
    axios.delete(BASE_URL+'/v1/api/slow/query/users/'+pk)
        .then(function (response) {
            _that.props.getSlowQueryUsersList();
            message.success('删除成功');
        })
        .catch(function (error) {
            console.log(error);
    });
  }

  showDeleteConfirm() {
    const _that = this;
    confirm({
      title: '确定要删除此用户?',
      content: '删除用户后不可恢复',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        console.log('OK');
        _that.slowQueryUserDelete();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  render() {
    return (
      <div>
        <Button onClick={this.showDeleteConfirm.bind(this)}>
          删除
        </Button>
      </div>
    );
  } 
}

const DaasSlowQueryUserDeleteModel = Form.create()(DaasSlowQueryUserDeleteManager);
export default connect(state => state.daasSlowQueryUser, { getSlowQueryUsersList }) (DaasSlowQueryUserDeleteModel);
