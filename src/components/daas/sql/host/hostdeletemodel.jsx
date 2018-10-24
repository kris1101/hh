import React, { Component } from 'react';
import { Modal, Button, Form, message } from 'antd';
import { connect } from 'react-redux';
import { BASE_URL } from '../../../../containers/Daas/constants';
import { rdbHostFetch, rdbHostDelete } from '../../../../containers/Daas/actions/rdb_host';
import { deleteAjax } from '../../../../utils/daas/newaxios';

const confirm = Modal.confirm;

class DaasRdbHostDeleteModelManager extends Component {
  
    rdbHostDelete(){
        const _that = this;
        const pk = _that.props.pk;
        const base_url = BASE_URL + '/v1/api/rdb/hosts/' + pk;
        deleteAjax(base_url, function(response){
            if (response.data.code) {
                message.error('主机删除失败: ' + response.data.message);
            } else {
                message.success('主机删除成功...');
            }
            _that.props.rdbHostFetch();
        });
    }

  showDeleteConfirm() {
    const _that = this;
    confirm({
      title: '确定要删除此主机?',
      content: '删除主机后不可恢复，主机中的实例也会被删除，实例集群关系实例也会被删除...',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        console.log('OK');
        _that.rdbHostDelete();
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

const DaasRdbHostDeleteModel = Form.create()(DaasRdbHostDeleteModelManager);
export default connect(state => state.daasRdbHost, { rdbHostDelete, rdbHostFetch }) (DaasRdbHostDeleteModel);
