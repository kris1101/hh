import React from 'react';

export function getnetwork() {
    return [{
        title: '名称',
        dataIndex: 'name',
    }, {
        title: '关联主机',
        dataIndex: 'host'
    }, {
        title: '创建时间',
        dataIndex: 'date',
    },{
        title: '用户名称',
        dataIndex: 'username',
    },{
        title: '描述',
        dataIndex: 'ps',
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
