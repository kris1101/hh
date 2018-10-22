import React, { Component } from 'react';
import { Modal, Button, Form, message } from 'antd';
import { connect } from 'react-redux';
import { BASE_URL } from '../../../../containers/Daas/constants';
import { rdbInstanceFetch } from '../../../../containers/Daas/actions/rdb_instance';
import axios from 'axios';
import { putAjax } from '../../../../utils/daas/newaxios';

const confirm = Modal.confirm;

class DaasRdbInstanceStartModelManager extends Component {
  constructor(props){
    super(props);
  }
  
  rdbInstanceStart(){
    const _that = this;
    const pk = _that.props.pk;
    const base_url = BASE_URL + '/v1/api/rdb/instances/' + pk;
    putAjax(base_url, {'operate': 'start'}, function(response){
      if (response.data.code) {
        message.error('实例启动失败: ' + response.data.message);
      } else {
        message.success('实例启动成功...');
      }
      _that.props.rdbInstanceFetch();
    })
  }

  showStartConfirm() {
    const _that = this;
    const pk = _that.props.pk;
    confirm({
      title: '确定要启动此实例?',
      content: '启动后可以进行再次重启或者停操作，两次操作建议间隔时间180s以上...',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        _that.rdbInstanceStart();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  render() {
    return (
      <div>
        <Button onClick={this.showStartConfirm.bind(this)}>
          开始
        </Button>
      </div>
    );
  } 
}

const DaasRdbInstanceStartModel = Form.create()(DaasRdbInstanceStartModelManager);
export default connect(state => state.daasRdbInstance, { rdbInstanceFetch }) (DaasRdbInstanceStartModel);
