import React, { Component } from 'react';
import { Button, Popconfirm, message } from 'antd';

import { Link  } from 'react-router-dom';
import { deleteAjax  } from '../../../../utils/axios'

import { formatStrDate } from '../../../../utils/time_helper'
const roleDict = {1: "项目管理员", 2: "开发者", 3: "访客"}

function confirm(project_id, _that) {
  const hide = message.loading('Action in progress..', 0);
  deleteAjax('/harbor/projects/', "project_id=" + project_id, function (res){
    hide();
    if(res.data.code == 0){
        message.success(res.data.msg);
        _that.handleProjectListWithArgs(1, 10);
    }else{
        message.error(res.data.msg);
    }
  })
}


export function getprojects() {
    return [{
        title: '项目名称',
        dataIndex: 'name',
        render: (data, record, index) => {
          let path = '/paas/registryproject/details/?project_id=' + record.project_id + "&project_name=" + record.name; 
          return <Link to={path}>{data}</Link>
        } 
    }, {
        title: '镜像仓库数量',
        dataIndex: 'repo_count'
    },{
        title: '访问级别',
        dataIndex: 'metadata.public',
        render: (data) => {
          if (data == "true"){
            return "公开";
          }else{
            return "私有";
          }

        } 
    }, {
        title: '角色',
        dataIndex: 'current_user_role_id',
        render: (data) => roleDict[data]
    }, {
        title: '创建时间',
        dataIndex: 'creation_time',
        render: (data) => formatStrDate(data)
    },{
        title: '更新时间',
        dataIndex: 'update_time',
        render: (data) => formatStrDate(data)
    },{
        title: '操作',
        render: (data, record, index) => {
            return (
              <Popconfirm title={"Are you sure delete " + record.name + " project?"} onConfirm={() => confirm(record.project_id, this)} okText="Yes" cancelText="No">
            <div>
              <Button size="small" icon="delete">delete</Button>
            </div>
              </Popconfirm>
        )}
    }];
}
