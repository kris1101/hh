import React from 'react';

export function gettypes() {
    return [{
        title: '编号',
        dataIndex: 'key',
    }, {
        title: '名称',
        dataIndex: 'name'
    },{
        title: '类型',
        dataIndex: 't_type'
    }, {
        title: '创建人',
        dataIndex: 'create_user',
    }, {
        title:  '处理组',
        dataIndex: 'recipient',
    },{
        title: '备注',
        dataIndex: 'comments',
    },{
        title: '操作',
        render: (data,record) => (
            <div>
                <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}}onClick={(e) => this.openModal(record, e)}>编辑</span>
                <span style={{cursor: 'pointer',color:'#0350CF'}}onClick={(e) => this.deleteData(data,e)}>删除</span>
            </div>
        )
    }];
}