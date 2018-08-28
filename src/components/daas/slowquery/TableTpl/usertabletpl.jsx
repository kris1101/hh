import React, { Component } from 'react';

export function getusers() {
    return [{
        title: '用户名',
        dataIndex: 'name',
    },{
        title: '邮箱',
        dataIndex: 'email'
    },{
        title: '电话',
        dataIndex: 'phone'
    },{ 
        title: '创建时间',
        dataIndex: 'create_time'
    },{
        title: '更新时间',
        dataIndex: 'update_time',
    },{
        title: '操作',
        render: (data) => (
            <div>
                <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}}>详情</span>
                <span style={{cursor: 'pointer',color:'#0350CF'}}>编辑</span>
                <span style={{cursor: 'pointer',color:'#0350CF'}}>删除</span>
            </div>
        )
    }];
}
