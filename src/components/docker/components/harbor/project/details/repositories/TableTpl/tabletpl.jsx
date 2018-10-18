import React from 'react';
import { Button, Popconfirm, message } from 'antd';

import { Link  } from 'react-router-dom';
import { deleteAjax  } from '../../../../../../utils/axios'

import { formatStrDate } from '../../../../../../utils/time_helper'

function confirm(repo_name, _that) {
  const hide = message.loading('Action in progress..', 0);
  deleteAjax('/harbor/repositories/', "repo_name=" + repo_name, function (res){
    hide();
    if(res.data.code === 0){
        message.success(res.data.msg);
        _that.handleRepositoriesQuery();
    }else{
        message.error(res.data.msg);
    }
  })
}


export function getrepositories() {
    return [{
        title: '名称',
        dataIndex: 'name',
        render: (data, record, index) => {
          let path = '/paas/registryproject/repositories/?repo_name=' + record.name; 
          return <Link to={path}>{data}</Link>
        }   
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
              <Popconfirm title={"确定删除" + record.name + "镜像?"} onConfirm={() => confirm(record.name, this)} okText="是" cancelText="否">
            <div>
              <Button size="small" icon="delete">删除</Button>
            </div>
              </Popconfirm>
        )}
    }];
}
