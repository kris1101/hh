import React, { Component } from 'react';
import { Modal, Button, Form, message } from 'antd';
import { connect } from 'react-redux';
import { BASE_URL } from '../../../../containers/Daas/constants';
import { rdbProjectDelete, rdbProjectFetch } from '../../../../containers/Daas/actions/rdb_project';
import axios from 'axios';
import { deleteAjax } from '../../../../utils/daas/newaxios';

const confirm = Modal.confirm;

class DaasRdbProjectDeleteModelManager extends Component {
  constructor(props){
    super(props);
  }
  
  rdbProjectDelete(){
    const _that = this;
    const pk = _that.props.pk;
    const base_url = BASE_URL + '/v1/api/rdb/projects' + '/' + pk;
    deleteAjax(base_url, function(response){
      if (response.data.code) {
        message.error('组删除失败: ' + response.data.message);
      } else {
        message.success('组删除成功...');
      }
      _that.props.rdbProjectFetch();
    })
  }

  showDeleteConfirm() {
    const _that = this;
    const pk = _that.props.pk;
    confirm({
      title: '确定要删除此项目?',
      content: '删除项目后不可恢复',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        console.log('OK');
        _that.rdbProjectDelete();
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

const DaasRdbProjectDeleteModel = Form.create()(DaasRdbProjectDeleteModelManager);
export default connect(state => state.daasRdbProject, { rdbProjectDelete, rdbProjectFetch }) (DaasRdbProjectDeleteModel);
