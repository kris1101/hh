import React, { Component } from 'react';
import { Button, Popconfirm, message, Icon } from 'antd';
import copy from 'copy-to-clipboard';

import { Link  } from 'react-router-dom';
import { deleteAjax  } from '../../../../../utils/axios'

import { formatStrDate } from '../../../../../utils/time_helper'

function confirm(tag, _that) {
  const hide = message.loading('Action in progress..', 0);
  deleteAjax('/harbor/repositories/tags', "repo_name=" + _that.repo_name + "&tag=" + tag, function (res){
    hide();
    if(res.data.code == 0){
        message.success(res.data.msg);
        _that.handleRepositoriesTagsQuery(1, 10);
    }else{
        message.error(res.data.msg);
    }
  })
}

function handleIconClick(_that, tag){
  copy(_that.props.registry_url + "/" + _that.props.repo_name + ":" + tag); 
  message.success("复制成功");
}
export function getrepositoriestags() {
    return [{
        title: '标签',
        dataIndex: 'name'
    },{
        title: '大小',
        dataIndex: 'size',
      render: (data) => ((data/1024/1024).toFixed(2) + "M")
    },{
        title: 'pull命令',
      render: (data, record, index) => (<Icon type="copy" onClick={() => handleIconClick(this, record.name)} style={{cursor: "pointer"}}/>)
    }, {
        title: '作者',
        dataIndex: 'author',
        render: (data) => (data ? data : "-")

    },{
        title: '创建时间',
        dataIndex: 'created',
        render: (data) => formatStrDate(data)
    },{
        title: 'docker版本',
        dataIndex: 'docker_version'
    },{
        title: '操作',
        render: (data, record, index) => {
            return (
              <Popconfirm title={"Are you sure delete " + record.name + " tag?"} onConfirm={() => confirm(record.name, this)} okText="是" cancelText="否">
            <div>
              <Button size="small" icon="delete">删除</Button>
            </div>
              </Popconfirm>
        )}
    }];
}
