import React from 'react';

export function getmachines() {
    return [{
        title: '主机名',
        dataIndex: 'host',
    }, {
        title: 'IP',
        dataIndex: 'ip'
    }, {
        title: '端口',
        dataIndex: 'port',
    },{
        title: '创建时间',
        dataIndex: 'date',
    },{
        title: '更新时间',
        dataIndex: 'update',
    },{
        title: '操作',
        render: (data) => (
            <div>
                <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}}>详情</span>
                <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}}>编辑</span>
                <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}}>删除</span>
                <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}}>关联组</span>
            </div>
        )
    }];
}