import React, { Component } from 'react';
import { Divider, Tooltip, Icon } from 'antd';
import { Link } from 'react-router-dom';

import RoleUpdate from '../RoleUpdate';


export function getColumes() {
  return [{
    title: '角色名',
    dataIndex: 'name',
  }, {
    title: '角色ID',
    dataIndex: 'uuid'
  }, {
    title: '描述',
    dataIndex: 'create_time'
  },{
    title: '操作',
    render: (record) => (
      <div>
        <RoleUpdate record={ record } refresh={this.refresh} />
        <Divider type="vertical" />
      </div>
    )
  }];
}