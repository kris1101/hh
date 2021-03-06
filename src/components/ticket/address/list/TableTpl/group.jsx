import React from 'react';

export function getgroups() {
    return [{
        title: '编号',
        dataIndex: 'key',
    }, {
        title: '组名',
        dataIndex: 'name'
    },{
        title: '创建人',
        dataIndex: 'create_user'
    }, {
        title: '成员',
        dataIndex: 'user_names'

    },{
        title: '备注',
        dataIndex: 'comments',
    },{
        title: '操作',
        render: (data,record) => (
            <div>
                <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}} onClick={(e) => this.openModal(record, e)}>编辑</span>
                <span style={{cursor: 'pointer',color:'#0350CF'}}onClick={(e) => this.deleteData(data,e)}>删除</span>
            </div>
        )
    }];
}