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
    render: (text, record) => <Link to={`/vm/networks/security_groups/${record.id}/rules`} className="href-class">{text}</Link>
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
          <Link to={`/vm/networks/security_groups/${record.id}/rules`} className="href-class"><Icon type="bars" /></Link>
        </Tooltip>
        <Divider type="vertical" />
        <SGUpdate record={ record } refresh={this.refresh} />
      </div>
    )
  }];
}

export function getRuleColumes() {
  return [{
    title: '方向',
    dataIndex: 'direction_display',
  }, {
    title: '以太网类型',
    dataIndex: 'ethertype_display',
  },{
    title: 'IP协议',
    dataIndex: 'protocol_display',
  },{
    title: '端口范围',
    dataIndex: 'port_range_display',
  },{
    title: '远端IP前缀',
    dataIndex: 'remote_ip_prefix_display',
  },{
    title: '远端安全组',
    dataIndex: 'remote_group_name',
  },{
    title: '操作',
    render: (record) => (
      <div>
        <SGUpdate record={ record } refresh={this.refresh} />
        <Divider type="vertical" />
      </div>
    )
  }];
}

export function getApprovingColumes() {
  return [{
    title: '方向',
    dataIndex: 'direction_display',
  }, {
    title: '以太网类型',
    dataIndex: 'ethertype_display',
  },{
    title: 'IP协议',
    dataIndex: 'protocol_display',
  },{
    title: '端口范围',
    dataIndex: 'port_range_display',
  },{
    title: '远端IP前缀',
    dataIndex: 'remote_ip_prefix_display',
  },{
    title: '远端安全组',
    dataIndex: 'remote_group_name',
  },{
    title: '审批状态',
    dataIndex: 'status',
    render: (text, record) => record.approval_status_display,
  },{
    title: '操作',
    render: (record) => (
      <div>
        <Tooltip  title="审核详情">
          <Link to={`/vm/networks/security_groups/rules/${record.id}/approval`} className="href-class"><Icon type="bars" /></Link>
        </Tooltip>
        <Divider type="vertical" />
      </div>
    )
  }];
}

export function getDetailColumes() {
  return [{
    dataIndex: 'title',
    width: '30%',
  }, {
    dataIndex: 'value',
    render: (text, record) => <span className="display-linebreak"> {text} </span>
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
