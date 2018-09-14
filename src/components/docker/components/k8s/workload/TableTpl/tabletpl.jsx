import React, { Component } from 'react';
import { Icon, Popconfirm, message, Row, Col } from 'antd';
import { PodUpdateForm  } from '../podsforms/podsupdateform'

import { Link  } from 'react-router-dom';
import { deleteAjax  } from '../../../../utils/axios'

import { formatStrDate } from '../../../../utils/time_helper'

function confirm(cluster_id, _that) {
  const hide = message.loading('Action in progress..', 0);
  deleteAjax('/k8s/pod_list/', "cluster_id=" + cluster_id, function (res){
    hide();
    if(res.data.code == 0){
        message.success(res.data.msg);
        _that.handlePodListWithArgs(1, 10);
    }else{
        message.error(res.data.msg);
    }
  })
}


export function getk8spods() {
    return [{
        title: '名称',
        dataIndex: 'cluster_name'
    }, {
        title: '创建时间',
        dataIndex: 'dns_type'
    },{
        title: '命名空间',
        dataIndex: 'cluster_address'
    },{
        title: '节点',
        dataIndex: 'server_address'
    },{
        title: '状态',
        dataIndex: 'time',
        render: (data) => formatStrDate(data)
    },{
        title: '已重启',
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
                 <Icon type="form" theme="outlined" style={{cursor: "pointer"}} onClick={this.showPodUpdateModel}/>
                 <PodUpdateForm
                   wrappedComponentRef={this.savePodUpdateFormRef}
                   visible={this.state.PodUpdateVisible}
                   podinfo={record}
                   confirmLoading={this.state.PodUpdateConfirmLoading}
                   onCancel={this.handlePodUpdateCancel}
                   onCreate={() => this.handlePodUpdate(record.id)}
                 />
            </div>
            </Col>
            </Row>
        )}
    }];
}
