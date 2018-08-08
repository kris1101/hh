import React, { Component } from 'react';

export function getmachines() {
    return [{
        title: '实例名称',
        dataIndex: 'name',
    }, {
        title: '监控',
        dataIndex: 'ip'
    },{
        title: 'IP地址',
        dataIndex: 'ip'
    }, {
        title: '配置',
        dataIndex: 'config',
    },{
        title: '状态',
        dataIndex: 'type',
    },{
        title: '所属网络',
        dataIndex: 'network',
    },{
        title: '创建时间',
        dataIndex: 'date',
    },{
        title: '操作',
        render: (data) => (
            <div>
                <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}}>查看</span>
                <span style={{cursor: 'pointer',color:'#0350CF'}}>添加</span>
            </div>
        )
    }];
}