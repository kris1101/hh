import React, { Component } from 'react';
import { Button } from 'antd';

import { formatStrDate } from '../../../../utils/time_helper'

export function getprojects() {
    return [{
        title: '项目名称',
        dataIndex: 'name'
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
        title: '创建时间',
        dataIndex: 'creation_time',
        render: (data) => formatStrDate(data)
    },{
        title: '更新时间',
        dataIndex: 'update_time',
        render: (data) => formatStrDate(data)
    },{
        title: '操作',
        render: (data) => (
            <div>
              <Button size="small" icon="delete">delete</Button>
            </div>
        )
    }];
}
