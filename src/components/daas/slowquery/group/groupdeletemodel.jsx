import React, { Component } from 'react';
import { Modal, Button, Form, message } from 'antd';
import { connect } from 'react-redux';
import { BASE_URL } from '../../../../containers/Daas/constants';
import { slowQueryGroupFetch } from '../../../../containers/Daas/actions/slow_query_group';
import axios from 'axios';

const confirm = Modal.confirm;

class DaasSlowQueryGroupDeleteManager extends Component {
 
  slowQueryGroupDelete(){
    const _that = this;
    const pk = _that.props.pk;
    axios.delete(BASE_URL + '/v1/api/slow/query/groups/' + pk)
        .then(function (response) {
            _that.props.slowQueryGroupFetch();
            message.success('删除成功');
        })
        .catch(function (error) {
            console.log(error);
    });
  }

  showDeleteConfirm() {
    const _that = this;
    confirm({
      title: '确定要删除此组?',
      content: '删除组后不可恢复',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        console.log('OK');
        _that.slowQueryGroupDelete();
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

const DaasSlowQueryGroupDeleteModel = Form.create()(DaasSlowQueryGroupDeleteManager);
export default connect(state => state.daasSlowQueryGroup, { slowQueryGroupFetch }) (DaasSlowQueryGroupDeleteModel);
