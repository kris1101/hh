import React, { Component } from 'react';
import { Divider, Tooltip, Icon } from 'antd';
import { Link } from 'react-router-dom';

import GroupUpdate from '../GroupUpdate';


export function getColumes() {
  return [{
    title: '组名',
    dataIndex: 'name',
  }, {
    title: '组ID',
    dataIndex: 'uuid'
  }, {
    title: '域',
    dataIndex: 'domain_id'
  }, {
    title: '创建时间',
    dataIndex: 'create_time'
  }, {
    title: '描述',
    dataIndex: 'description'
  },{
    title: '操作',
    render: (record) => (
      <div>
        <GroupUpdate record={ record } refresh={this.refresh} />
        <Divider type="vertical" />
      </div>
    )
  }];
}
