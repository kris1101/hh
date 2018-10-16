import React, { Component } from 'react';
import { Divider, Tooltip, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { humansize, timesince } from '../../../../utils/vm'

import SGUpdate from '../SGUpdate';
import ApprovalBox from '../ApprovalBox';


export function getColumes() {
  return [{
    title: '名称',
    dataIndex: 'name',
    render: (text, record) => <Link to={`/vm/networks/network/${record.id}`} className="href-class">{text}</Link>
  }, {
    title: 'ID',
    dataIndex: 'uuid',
  },{
    title: '描述',
    dataIndex: 'description',
  },{
    title: '操作',
    render: (record) => (
      <div>
        <Tooltip  title="详情">
          <Link to={`/vm/networks/network/${record.id}`} className="href-class"><Icon type="bars" /></Link>
        </Tooltip>
        <Divider type="vertical" />
        <SGUpdate record={ record } refresh={this.refresh} />
      </div>
    )
  }];
}


export function getApprovingColumes() {
  return [{
    title: '网络名',
    dataIndex: 'name',
    render: (text, record) => <Link to={`/vm/networks/network/${record.id}/approval`} className="href-class">{text}</Link>
  }, {
    title: '子网',
    dataIndex: 'subnet',
    render: (text, record) => [record.subnet.map(val => {return val.cidr})].join("\n"),
  },{
    title: '共享',
    dataIndex: 'shared',
    render: (text, record) => record.shared ? '是' : '否',
  },{
    title: '外部',
    dataIndex: 'router_external',
    render: (text, record) => record.router_external ? '是' : '否',
  },{
    title: '管理状态',
    dataIndex: 'admin_state_up',
    render: (text, record) => record.admin_state_up ? 'UP' : 'DOWN',
  },{
    title: '审批状态',
    dataIndex: 'status',
    render: (text, record) => record.approval_status_display,
  },{
    title: '操作',
    render: (record) => (
      <div>
        <Tooltip  title="审核详情">
          <Link to={`/vm/networks/network/${record.id}/approval`} className="href-class"><Icon type="bars" /></Link>
        </Tooltip>
        <Divider type="vertical" />
      </div>
    )
  }];
}


export function getApprovalListColumes() {
  return [{
    title: '创建人',
    dataIndex: 'create_user',
  }, {
    title: '审批人',
    dataIndex: 'censor_user',
    render: (text, record) => record.censor_user || '-',
  },{
    title: '审批时间',
    dataIndex: 'censor_time',
    render: (text, record) => record.censor_time || '-',
  },{
    title: '审批备注',
    dataIndex: 'remark',
    render: (text, record) => record.remark || '-',
  },{
    title: '状态',
    dataIndex: 'status_display',
  },{
    title: '操作',
    render: (record) => record.level === 1 ? (
      <ApprovalBox t="group_admin" record={ record } network_id={this.props.match.params.id} refresh={this.start} />
    ) : (
      <ApprovalBox t="admin" record={ record } network_id={this.props.match.params.id} refresh={this.start} />
    )
  }];
}
