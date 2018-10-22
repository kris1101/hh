import React from 'react';
import { Icon, Popconfirm, message, Row, Col } from 'antd';

import { deleteAjax  } from '../../../../../utils/axios'

function confirm(tiller_config_id, _that) {
  const hide = message.loading('Action in progress..', 0);
  deleteAjax('/k8s/tillerconfig/', "id=" + tiller_config_id, function (res){
    hide();
    if(res.data.code === 0){
        message.success(res.data.msg);
        _that.handleTillerQuery();
    }else{
        message.error(res.data.msg);
    }
  }, {'Cluster-Id': _that.ClusterSelectFormRef.props.form.getFieldsValue().clustername})
}


export function getTillerConfig() {
    return [{
        title: '所属集群',
        dataIndex: 'clustername'
    }, {
        title: '加密访问',
        dataIndex: 'is_ssl',
        render: (data, record, index) => { return (data ? "是" : "否") }
    }, {
        title: '创建时间',
        dataIndex: 'create_time'
    },{
        title: '操作',
        render: (data, record, index) => {
            return (
            <Row>
              <Col span={6} offset={6}>
              <Popconfirm title={"确认删除" + record.clustername + "Tiller配置吗?"} onConfirm={() => confirm(record.id, this)} okText="确定" cancelText="取消">
            <div>
                 <Icon type="delete" theme="outlined" style={{cursor: "pointer"}}/>
            </div>
              </Popconfirm>
            </Col>
            <Col span={6}>
            <div>
              <Icon type="form" theme="outlined" style={{cursor: "pointer"}} onClick={() => this.showTillerUpdateModel(record)}/>
            </div>
            </Col>
            </Row>
        )}
    }];
}
