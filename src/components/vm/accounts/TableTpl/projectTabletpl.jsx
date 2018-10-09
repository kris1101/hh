import React, { Component } from 'react';
import { Divider, Tooltip, Icon } from 'antd';
import { Link } from 'react-router-dom';

import ProjectUpdate from '../ProjectUpdate';
import ProjectQuotaUpdate from '../ProjectQuotaUpdate';
import ProjectMemberUpdate from '../ProjectMemberUpdate';
import ProjectMemberDelete from '../ProjectMemberDelete';
import ProjectGroupUpdate from '../ProjectGroupUpdate';
import ProjectGroupDelete from '../ProjectGroupDelete';
import { timezoneFormat } from '../../../../utils/vm'


export function getColumes() {
  return [{
    title: '项目名',
    dataIndex: 'name',
    render: (text, record) => <Link to={`/vm/accounts/projects/${record.id}`} className="href-class">{text}</Link>
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
        <Tooltip  title="项目详情">
          <Link to={`/vm/accounts/projects/${record.id}`} className="href-class"><Icon type="bars" /></Link>
        </Tooltip>
        <Divider type="vertical" />
        <ProjectUpdate record={ record } refresh={this.refresh} />
        <Divider type="vertical" />
        <ProjectQuotaUpdate record={ record } refresh={this.refresh} />
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

export function getDetailQuotaColumes() {
  return [{
    dataIndex: 'title',
    width: '10%',
  }, {
    dataIndex: 'value',
    render: (text, record) => <span className="display-linebreak"> {text} </span>
  }];
}

export function getDetailMemeberColumes() {
  return [{
    title: '用户名',
    dataIndex: 'username',
  }, {
    title: '角色',
    dataIndex: 'role_name',
  }, {
    title: '添加时间',
    dataIndex: 'create_time',
    render: (text, record) => timezoneFormat(record.create_time),
  }, {
    title: '操作',
    key: 'action',
    width: 120,
    render: (text, record) => (
      <span>
        <ProjectMemberUpdate record={ record } project_id={this.props.match.params.id} refresh={this.refresh_member} />
        <Divider type="vertical" />
        <ProjectMemberDelete record={ record } project_id={this.props.match.params.id} refresh={this.refresh_member} />
      </span>
    ),
  }];
}

export function getDetailGroupColumes() {
  return [{
    title: '组名',
    dataIndex: 'group_name',
  }, {
    title: '角色',
    dataIndex: 'role_name',
  }, {
    title: '添加时间',
    dataIndex: 'create_time',
    render: (text, record) => timezoneFormat(record.create_time),
  }, {
    title: '操作',
    key: 'action',
    width: 120,
    render: (text, record) => (
      <span>
        <ProjectGroupUpdate record={ record } project_id={this.props.match.params.id} refresh={this.refresh_group} />
        <Divider type="vertical" />
        <ProjectGroupDelete record={ record } project_id={this.props.match.params.id} refresh={this.refresh_group} />
      </span>
    ),
  }];
}
