import React, { Component } from 'react';

import KeyDetail from '../KeyDetail'

export function getColumes() {
  return [{
    title: '名称',
    dataIndex: 'name',
  }, {
    title: '指纹',
    dataIndex: 'fingerprint'
  }, {
    title: '创建时间',
    dataIndex: 'created_at',
  },{
    title: '操作',
    render: (record) => (
      <div>
        <KeyDetail record={ record } />
        <span className="ant-divider" />
        <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}}>删除</span>
      </div>
    )
  }];
}
