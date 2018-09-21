import React, { Component } from 'react';
import { Modal, Button, Form, message } from 'antd';
import { connect } from 'react-redux';
import { BASE_URL } from '../../../../containers/Daas/constants';
import { slowQueryInstatncesDelete, slowQueryInstatncesFetch } from '../../../../containers/Daas/actions/slow_query_instance';
import axios from 'axios';

const confirm = Modal.confirm;

class DaasSlowQueryInstanceDeleteManager extends Component {
  constructor(props){
    super(props);
  }
  
  slowQueryInstanceDelete(){
    const _that = this;
    const pk = _that.props.pk;
    axios.delete(BASE_URL + '/v1/api/slow/query/instances' + '/' + pk)
        .then(function (response) {
            _that.props.slowQueryInstatncesFetch();
            message.success('删除成功');
        })
        .catch(function (error) {
            console.log(error);
    });
  }

  showDeleteConfirm() {
    const _that = this;
    const pk = _that.props.pk;
    confirm({
      title: '确定要删除此实例?',
      content: '删除实例后不可恢复',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        console.log('OK');
        _that.slowQueryInstanceDelete();
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

const DaasSlowQueryInstanceDeleteModel = Form.create()(DaasSlowQueryInstanceDeleteManager);
export default connect(state => state.daasSlowQueryInstance, { slowQueryInstatncesDelete, slowQueryInstatncesFetch }) (DaasSlowQueryInstanceDeleteModel);
