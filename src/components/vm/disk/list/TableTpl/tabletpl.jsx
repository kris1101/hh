import React, { Component } from 'react';

export function getdisks() {
    return [{
        title: '名称',
        dataIndex: 'name',
    }, {
        title: '硬盘状态',
        dataIndex: 'status'
    }, {
        title: '挂载主机',
        dataIndex: 'host',
    },{
        title: '硬盘容量',
        dataIndex: 'size',
    },{
        title: '创建时间',
        dataIndex: 'date',
    },{
        title: '操作',
        render: (data) => (
            <div>
                <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}}>创建快照</span>
                <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}}>挂载</span>
                <span style={{cursor: 'pointer',color:'#0350CF'}}>设置自动快照策略</span>
            </div>
        )
    }];
}