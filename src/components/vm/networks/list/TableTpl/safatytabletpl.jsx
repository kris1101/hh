import React from 'react';

export function getsafaty(){
    return [{
        title: '名称',
        dataIndex: 'name',
    }, {
        title: '云服务器数量',
        dataIndex: 'host'
    }, {
        title: '物理机数量',
        dataIndex: 'machine',
    },{
        title: '入站规则',
        dataIndex: 'input',
    },{
        title: '出战规则',
        dataIndex: 'output',
    },{
        title: '操作',
        render: (data) => (
            <div>
                <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}}>编辑</span>
                <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}}>详情</span>
            </div>
        )
    }];
}
