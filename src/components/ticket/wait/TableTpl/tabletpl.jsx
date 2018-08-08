import React, { Component } from 'react';

export function getmachines() {
    return [{
        title: '编号',
        dataIndex: 'id',
    }, {
        title: '名称',
        dataIndex: 'name'
    },{
        title: '类型',
        dataIndex: 'type'
    }, {
        title: '优先级',
        dataIndex: 'priority',
    },{
        title: '申请日期',
        dataIndex: 'date',
    },{
        title: '发起人',
        dataIndex: 'sponsor',
    },{
        title: '受理人',
        dataIndex: 'assignee',
    },{
        title: '状态',
        dataIndex: 'status',
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