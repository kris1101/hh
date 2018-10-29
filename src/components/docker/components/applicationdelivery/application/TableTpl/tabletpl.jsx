import React from 'react';
import { Button } from 'antd';

export function getApplication() {
    return [{
        title: '集群名称',
        dataIndex: 'repo_name'
    }, {
        title: '应用名称',
        dataIndex: '1'
    }, {
        title: '容器数量',
        dataIndex: '2'
    }, {
        title: '创建时间',
        dataIndex: '3'
    }, {
        title: '运行状态',
        dataIndex: 'description'
    },{
        title: '操作',
        render: (data, record, index) => {
            return (
            <div>
              <Button size="small" icon="cloud-upload">部署</Button>
            </div>
        )}
    }];
}
