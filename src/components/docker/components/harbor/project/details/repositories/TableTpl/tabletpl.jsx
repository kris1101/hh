import React, { Component } from 'react';
import { Button, Popconfirm, message } from 'antd';

import { Link  } from 'react-router-dom';
import { deleteAjax  } from '../../../../../../utils/axios'

import { formatStrDate } from '../../../../../../utils/time_helper'

function confirm(project_id, _that) {
  const hide = message.loading('Action in progress..', 0);
  deleteAjax('/harbor/repositories/', "project_id=" + project_id, function (res){
    hide();
    if(res.data.code == 0){
        message.success(res.data.msg);
        _that.handleProjectListWithArgs(1, 10);
    }else{
        message.error(res.data.msg);
    }
  })
}


export function getrepositories() {
    return [{
        title: '名称',
        dataIndex: 'name'
    },{
        title: '标签数',
        dataIndex: 'tags_count',
    },{
        title: '下载数',
        dataIndex: 'pull_count',
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
