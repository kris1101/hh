import React, { Component } from 'react';
import { Divider, Tooltip, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { humansize, timesince } from '../../../../utils/vm'

import NetworkDetail from '../NetworkDetail';
import SubnetUpdate from '../SubnetUpdate';
import SubnetDelete from '../SubnetDelete';


export function getColumes() {
  return [{
    title: '网络名',
    dataIndex: 'name',
    render: (text, record) => <Link to={`/vm/networks/network/${record.id}`} className="href-class">{text}</Link>
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
    title: '状态',
    dataIndex: 'status',
    render: (text, record) => record.status_display,
  },{
    title: '操作',
    render: (record) => (
      <div>
        <Tooltip  title="网络详情">
          <Link to={`/vm/networks/network/${record.id}`} className="href-class"><Icon type="bars" /></Link>
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


export function getDetailSubnetColumes() {
  return [{
    title: '名称',
    dataIndex: 'name',
    render: (text, record) => record.name || record.uuid,
  }, {
    title: 'CIDR',
    dataIndex: 'cidr',
  },{
    title: '启动DHCP',
    dataIndex: 'enable_dhcp',
    render: (text, record) => record.enable_dhcp ? '是' : '否',
  },{
    title: '网关',
    dataIndex: 'gateway_ip',
  },{
    title: 'DNS',
    dataIndex: 'dns_nameservers',
  },{
    title: '地址池',
    dataIndex: 'allocation_pools',
  },{
    title: '操作',
    render: (record) => (
      <div>
        <SubnetUpdate record={ record } network_id={this.props.match.params.id} refresh={this.refresh_subnet} />
        <Divider type="vertical" />
        <SubnetDelete record={ record } network_id={this.props.match.params.id} refresh={this.refresh_subnet} />
      </div>
    )
  }];
}


export function getDetailPortColumes() {
  return [{
    title: '名称',
    dataIndex: 'name',
    render: (text, record) => record.name || record.id,
  }, {
    title: '固定IP',
    dataIndex: 'fixed_ips',
    render: (text, record) => record.fixed_ips[0].ip_address,
  },{
    title: 'MAC地址',
    dataIndex: 'mac_address',
  },{
    title: '连接设备',
    dataIndex: 'device_owner',
  },{
    title: '状态',
    dataIndex: 'status',
  },{
    title: '管理状态',
    dataIndex: 'admin_state_up',
    render: (text, record) => record.admin_state_up ? 'UP' : 'DOWN',
  },{
    title: '操作',
    render: (record) => (
      <div>
        <Divider type="vertical" />
      </div>
    )
  }];
}
export function getDetailDHCPColumes() {
  return [{
    title: 'ID',
    dataIndex: 'id',
  }, {
    title: '主机',
    dataIndex: 'host',
  },{
    title: '状态',
    dataIndex: 'active',
    render: (text, record) => record.active ? '激活' : '未激活',
  },{
    title: '心跳时间',
    dataIndex: 'heartbeat_timestamp',
    render: (text, record) => timesince(record.heartbeat_timestamp, "YYYY-MM-DD HH:mm:ss"),
  },{
    title: '管理状态',
    dataIndex: 'admin_state_up',
    render: (text, record) => record.admin_state_up ? 'UP' : 'DOWN',
  },{
    title: '操作',
    render: (record) => (
      <div>
        <Divider type="vertical" />
      </div>
    )
  }];
}



export function getApprovingColumes() {
  return [{
    title: '网络名',
    dataIndex: 'name',
    render: (text, record) => <Link to={`/vm/networks/network/${record.id}`} className="href-class">{text}</Link>
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
        <Tooltip  title="网络详情">
          <Link to={`/vm/networks/network/${record.id}`} className="href-class"><Icon type="bars" /></Link>
        </Tooltip>
        <Divider type="vertical" />
      </div>
    )
  }];
}

