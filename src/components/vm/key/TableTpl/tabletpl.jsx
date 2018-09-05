import React, { Component } from 'react';
import { Divider } from 'antd';

import KeyDetail from '../KeyDetail'
import KeyDelete from '../KeyDelete'

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
        <Divider type="vertical" />
        <KeyDelete id={ record.id } refresh={this.refresh} />
      </div>
    )
  }];
}
