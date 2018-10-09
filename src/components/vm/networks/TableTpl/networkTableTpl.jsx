import React, { Component } from 'react';
import { Divider, Tooltip, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { humansize } from '../../../../utils/vm'

import NetworkDetail from '../NetworkDetail';


export function getColumes() {
  return [{
    title: '网络名',
    dataIndex: 'name',
    render: (text, record) => <Link to={`/vm/networks/network/${record.id}`} className="href-class">{text}</Link>
  }, {
    title: '子网',
    dataIndex: 'id',
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


