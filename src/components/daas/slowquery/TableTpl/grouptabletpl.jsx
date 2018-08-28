import React, { Component } from 'react';

export function getgroups() {
    return [{
        title: '组名',
        dataIndex: 'name',
    }, {
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
                <span style={{cursor: 'pointer',color:'#0350CF',marginLeft:30}}>编辑成员</span>
            </div>
        )
    }];
}
