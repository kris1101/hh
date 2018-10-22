import React from 'react';

export function getcancels() {
    return [{
        title: '编号',
        dataIndex: 'id',
    }, {
        title: '名称',
        dataIndex: 'title'
    },{
        title: '类型',
        dataIndex: 'ticket_type'
    }, {
        title: '优先级',
        dataIndex: 'priority',
    },{
        title: '申请日期',
        dataIndex: 'create_time',
    },{
        title: '发起人',
        dataIndex: 'create_user',
    },{
        title: '原因',
        dataIndex: 'content',
    },{
        title: '状态',
        dataIndex: 'status',
    },{
        title: '操作',
        render: (data,record) => (
            <div>
                <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}}onClick={(e) => this.openModal(record, e)}>详情</span>
                <span style={{cursor: 'pointer',color:'#0350CF'}}onClick={(e) => this.deleteData(data,e)}>删除</span>
            </div>
        )
    }];
}