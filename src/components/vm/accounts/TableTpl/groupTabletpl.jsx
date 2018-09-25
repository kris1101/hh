import React, { Component } from 'react';
import { Divider, Tooltip, Icon } from 'antd';
import { Link } from 'react-router-dom';

import GroupUpdate from '../GroupUpdate';
import GroupMemberDelete from '../GroupMemberDelete';


export function getColumes() {
  return [{
    title: '组名',
    dataIndex: 'name',
    render: (text, record) => <Link to={`/vm/accounts/groups/${record.id}`} className="href-class">{text}</Link>
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
        <Tooltip  title="管理成员">
          <Link to={`/vm/accounts/groups/${record.id}`} className="href-class"><Icon type="team" /></Link>
        </Tooltip>
        <Divider type="vertical" />
        <GroupUpdate record={ record } refresh={this.refresh} />
      </div>
    )
  }];
}


export function getMemberColumes() {
  return [{
    title: '用户名',
    dataIndex: 'username',
  }, {
    title: '用户ID',
    dataIndex: 'user_id'
  }, {
    title: '姓名',
    dataIndex: 'first_name'
  },{
    title: '操作',
    render: (record) => (
      <div>
        <GroupMemberDelete record={ record } group_id={this.props.match.params.id} refresh={this.refresh} />
        <Divider type="vertical" />
      </div>
    )
  }];
}
