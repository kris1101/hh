import React from 'react';

export function getloads() {
    return [{
        title: '名称',
        dataIndex: 'name',
    }, {
        title: '状态',
        dataIndex: 'status'
    }, {
        title: '所属项目',
        dataIndex: 'item',
    },{
        title: '弹性IP',
        dataIndex: 'ip',
    },{
        title: '监听器数量',
        dataIndex: 'num',
    },{
        title: '操作',
        render: (data) => (
            <div>
                <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}}>详情</span>
                <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}}>编辑</span>
                <span style={{cursor: 'pointer',color:'#0350CF'}}>删除</span>
            </div>
        )
    }];
}
