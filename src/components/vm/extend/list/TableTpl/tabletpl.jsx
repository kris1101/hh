import React from 'react';

export function getextends() {
    return [{
        title: '名称',
        dataIndex: 'name',
    }, {
        title: '负载均衡',
        dataIndex: 'load'
    }, {
        title: '创建时间',
        dataIndex: 'date',
    },{
        title: '触发条件',
        dataIndex: 'username',
    },{
        title: '操作',
        render: (data) => (
            <div>
                <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}}>编辑</span>
                <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}}>详情</span>
                <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}}>删除</span>
            </div>
        )
    }];
}
