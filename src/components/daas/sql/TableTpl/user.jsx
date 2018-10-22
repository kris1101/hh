import React from 'react';

export function getusers() {
    return [{
        title: '姓名',
        dataIndex: 'name',
    },{
        title: '邮箱',
        dataIndex: 'email',
    },{
        title: '电话',
        dataIndex: 'phone',
    }, {
        title: '创建时间',
        dataIndex: 'date'
    }, {
        title: '更新时间',
        dataIndex: 'update',
    },{
        title: '操作',
        render: (data) => (
            <div>
                <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}}>详情</span>
                <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}}>编辑</span>
                <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}}>删除</span>
            </div>
        )
    }];
}