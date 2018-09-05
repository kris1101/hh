import React, { Component } from 'react';
import { Divider } from 'antd';


export function getColumes() {
  return [{
    title: '项目名',
    dataIndex: 'name',
  }, {
    title: '项目ID',
    dataIndex: 'id'
  }, {
    title: '域名',
    dataIndex: 'domain_id',
  },{
    title: '父项目',
    dataIndex: 'parent_name',
    render: (text, record) => record.parent_name ? record.parent_name : '无',
  },{
    title: '描述',
    dataIndex: 'description',
  },{
    title: '是否是域',
    dataIndex: 'is_domain',
    render: (text, record) => record.is_domain ? '是' : '否',
  },{
    title: '状态',
    dataIndex: 'status',
    render: (text, record) => record.status === 1 ? <span className="mygreen">正常</span> : <span className="myred">禁用</span>,
  },{
    title: '操作',
    render: (record) => (
      <div>
        <Divider type="vertical" />
      </div>
    )
  }];
}
