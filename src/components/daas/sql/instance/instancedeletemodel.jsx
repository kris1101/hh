import React, { Component } from 'react';
import { Modal, Button, Form, message } from 'antd';
import { connect } from 'react-redux';
import { BASE_URL } from '../../../../containers/Daas/constants';
import { rdbInstanceDelete, rdbInstanceFetch } from '../../../../containers/Daas/actions/rdb_instance';
import axios from 'axios';
import { deleteAjax } from '../../../../utils/daas/newaxios';

const confirm = Modal.confirm;

class DaasRdbInstanceDeleteModelManager extends Component {
  constructor(props){
    super(props);
  }
  
  rdbInstanceDelete(){
    const _that = this;
    const pk = _that.props.pk;
    const base_url = BASE_URL + '/v1/api/rdb/instances' + '/' + pk;
    deleteAjax(base_url, function(response){
      if (response.data.code) {
        message.error('组删除失败: ' + response.data.message);
      } else {
        message.success('组删除成功...');
      }
      _that.props.rdbInstanceFetch();
    })
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
        _that.rdbInstanceDelete();
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

const DaasRdbInstanceDeleteModel = Form.create()(DaasRdbInstanceDeleteModelManager);
export default connect(state => state.daasRdbInstance, { rdbInstanceDelete, rdbInstanceFetch }) (DaasRdbInstanceDeleteModel);
