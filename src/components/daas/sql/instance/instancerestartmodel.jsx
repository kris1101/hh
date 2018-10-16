import React, { Component } from 'react';
import { Modal, Button, Form, message } from 'antd';
import { connect } from 'react-redux';
import { BASE_URL } from '../../../../containers/Daas/constants';
import { rdbInstanceFetch } from '../../../../containers/Daas/actions/rdb_instance';
import axios from 'axios';
import { putAjax } from '../../../../utils/daas/newaxios';

const confirm = Modal.confirm;

class DaasRdbInstanceRestartModelManager extends Component {
  constructor(props){
    super(props);
  }
  
  rdbInstanceRestart(){
    const _that = this;
    const pk = _that.props.pk;
    const base_url = BASE_URL + '/v1/api/rdb/instances' + '/' + pk;
    putAjax(base_url, {'operate': 'restart'}, function(response){
      if (response.data.code) {
        message.error('实例重启失败: ' + response.data.message);
      } else {
        message.success('实例重启成功...');
      }
      _that.props.rdbInstanceFetch();
    })
  }

  showRestartConfirm() {
    const _that = this;
    const pk = _that.props.pk;
    confirm({
      title: '确定要重启此实例?',
      content: '重启后可以进行再次重启，两次操作建议间隔时间180s以上...',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        _that.rdbInstanceRestart();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  render() {
    return (
      <div>
        <Button onClick={this.showRestartConfirm.bind(this)}>
          重启
        </Button>
      </div>
    );
  } 
}

const DaasRdbInstanceRestartModel = Form.create()(DaasRdbInstanceRestartModelManager);
export default connect(state => state.daasRdbInstance, { rdbInstanceFetch }) (DaasRdbInstanceRestartModel);
