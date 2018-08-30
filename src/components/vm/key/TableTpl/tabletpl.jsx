import React, { Component } from 'react';

export function getColumes() {
    return [{
        title: '名称',
        dataIndex: 'name',
    }, {
        title: '指纹',
        dataIndex: 'status'
    }, {
        title: '创建时间',
        dataIndex: 'date',
    },{
        title: '操作',
        render: (data) => (
            <div>
                <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}}>详情</span>
                <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}}>删除</span>
            </div>
        )
    }];
}
