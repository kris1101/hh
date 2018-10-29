import React from 'react';
import { Divider, Tooltip, Icon } from 'antd';
import { Link } from 'react-router-dom';

import { timezoneFormat } from '../../../../utils/vm'


export function getColumes() {
  return [{
    title: '实例名',
    dataIndex: 'name',
    render: (text, record) => <Link to={`/vm/instances/${record.id}`} className="href-class">{text}</Link>
  }, {
    title: '镜像名',
    dataIndex: 'image_name',
    render: (text, record) => record.image_name || '-'
  },{
    title: 'IP',
    dataIndex: 'ip',
    render: (text, record) => record.ip
  },{
    title: '类型',
    dataIndex: 'flavor_name',
  },{
    title: '可用域',
    dataIndex: 'domain_id',
  },{
    title: '状态',
    dataIndex: 'run_status_display',
  },{
    title: '创建时间',
    dataIndex: 'create_time',
    render: (text, record) => timezoneFormat(record.create_time),
  },{
    title: '操作',
    render: (record) => (
      <div>
        <Tooltip  title="详情">
          <Link to={`/vm/instances/${record.id}`} className="href-class"><Icon type="bars" /></Link>
        </Tooltip>
        <Divider type="vertical" />
      </div>
    )
  }];
}


export function getDetailColumes() {
  return [{
    dataIndex: 'title',
    width: '10%',
  }, {
    dataIndex: 'value',
    render: (text, record) => <span className="display-linebreak"> {text} </span>
  }];
}


export function getLogColumes() {
  return [{
    title: '操作时间',
    dataIndex: 'create_time',
    render: (text, record) => timezoneFormat(record.create_time),
  }, {
    title: '操作人',
    dataIndex: 'username',
  },{
    title: '操作',
    dataIndex: 'ip',
  },{
    title: '描述',
    dataIndex: 'description',
  }];
}


