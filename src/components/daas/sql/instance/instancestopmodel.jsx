import React, { Component } from 'react';
import { Modal, Button, Form, message } from 'antd';
import { connect } from 'react-redux';
import { BASE_URL } from '../../../../containers/Daas/constants';
import { rdbInstanceFetch } from '../../../../containers/Daas/actions/rdb_instance';
import { putAjax } from '../../../../utils/daas/newaxios';

const confirm = Modal.confirm;

class DaasRdbInstanceStopModelManager extends Component {
  
  rdbInstanceStop(){
    const _that = this;
    const pk = _that.props.pk;
    const base_url = BASE_URL + '/v1/api/rdb/instances' + '/' + pk;
    putAjax(base_url, {'operate': 'stop'}, function(response){
      if (response.data.code) {
        message.error('实例停止失败: ' + response.data.message);
      } else {
        message.success('实例停止成功...');
      }
      _that.props.rdbInstanceFetch();
    })
  }

  showStopConfirm() {
    const _that = this;
    confirm({
      title: '确定要停止此实例?',
      content: '停止后可以进行再次启动,两次操作建议间隔时间180s以上......',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        _that.rdbInstanceStop();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  render() {
    return (
      <div>
        <Button onClick={this.showStopConfirm.bind(this)}>
          停止
        </Button>
      </div>
    );
  } 
}

const DaasRdbInstanceStopModel = Form.create()(DaasRdbInstanceStopModelManager);
export default connect(state => state.daasRdbInstance, { rdbInstanceFetch }) (DaasRdbInstanceStopModel);
