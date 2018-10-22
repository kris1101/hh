import React from 'react';
import { Icon, Popconfirm, message, Row, Col } from 'antd';

import { deleteAjax  } from '../../../../utils/axios'

import { formatStrDate } from '../../../../utils/time_helper'

function confirm(cluster_id, _that) {
  const hide = message.loading('Action in progress..', 0);
  deleteAjax('/k8s/kubeconfig/', "cluster_id=" + cluster_id, function (res){
    hide();
    if(res.data.code === 0){
        message.success(res.data.msg);
        _that.handleClusterListWithArgs(1, 10);
    }else{
        message.error(res.data.msg);
    }
  })
}


export function getk8sclusters() {
    return [{
        title: '集群名称',
        dataIndex: 'cluster_name'
    }, {
        title: 'dns类型',
        dataIndex: 'dns_type'
    },{
        title: '地区',
        dataIndex: 'cluster_address'
    },{
        title: '服务地址',
        dataIndex: 'server_address'
    }, {
        title: '创建时间',
        dataIndex: 'time',
        render: (data) => formatStrDate(data)
    },{
        title: '操作',
        render: (data, record, index) => {
            return (
            <Row>
              <Col span={6} offset={6}>
              <Popconfirm title={"确认删除" + record.cluster_name + "集群?"} onConfirm={() => confirm(record.id, this)} okText="确定" cancelText="取消">
            <div>
                 <Icon type="delete" theme="outlined" style={{cursor: "pointer"}}/>
            </div>
              </Popconfirm>
            </Col>
            <Col span={6}>
            <div>
              <Icon type="form" theme="outlined" style={{cursor: "pointer"}} onClick={() => this.showClusterUpdateModel(record)}/>
            </div>
            </Col>
            </Row>
        )}
    }];
}
