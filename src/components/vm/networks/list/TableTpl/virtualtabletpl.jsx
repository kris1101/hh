import React from 'react';

export function getvirtual() {
    return [{
        title: '名称',
        dataIndex: 'name',
    }, {
        title: '网段',
        dataIndex: 'subnet'
    }, {
        title: '子网数量',
        dataIndex: 'date',
    },{
        title: '是否默认',
        dataIndex: 'manage',
    },{
        title: '状态',
        dataIndex: 'status',
    },{
        title: '操作',
        render: (data) => (
            <div>
                <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}}>回滚</span>
                <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}}>删除</span>
                <span style={{cursor: 'pointer',color:'#0350CF'}}>添加描述</span>
            </div>
        )
    }];
}
