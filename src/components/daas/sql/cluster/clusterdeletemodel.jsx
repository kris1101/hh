import React, { Component } from 'react';
import { Modal, Button, Form, message } from 'antd';
import { connect } from 'react-redux';
import { BASE_URL } from '../../../../containers/Daas/constants';
import { rdbClusterFetch, rdbClusterDelete } from '../../../../containers/Daas/actions/rdb_cluster';
import { deleteAjax } from '../../../../utils/daas/newaxios';

const confirm = Modal.confirm;

class DaasRdbClusterDeleteModelManager extends Component {
  
  rdbInstanceDelete(){
    const _that = this;
    const pk = _that.props.pk;
    const base_url = BASE_URL + '/v1/api/rdb/clusters/' + pk;
    deleteAjax(base_url, function(response){
      if (response.data.code) {
        message.error('集群删除失败: ' + response.data.message);
      } else {
        message.success('集群删除成功...');
      }
      _that.props.rdbClusterFetch();
    })
  }

  showDeleteConfirm() {
    const _that = this;
    confirm({
      title: '确定要删除此集群?',
      content: '删除集群后不可恢复，集群中的机器也会被删除。。。',
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

const DaasRdbClusterDeleteModel = Form.create()(DaasRdbClusterDeleteModelManager);
export default connect(state => state.daasRdbCluster, { rdbClusterDelete, rdbClusterFetch }) (DaasRdbClusterDeleteModel);
