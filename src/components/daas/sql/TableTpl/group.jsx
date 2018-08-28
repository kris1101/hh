import React, { Component } from 'react';
import chart from '../../../../static/icons/area_chart.png'

export function getgroups() {
    return [{
        title: '组名',
        dataIndex: 'name',
    }, {
        title: '创建时间',
        dataIndex: 'date'
    }, {
        title: '更新时间',
        dataIndex: 'update',
    },{
        title: '操作',
        render: (data) => (
            <div>
                <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}}>详情</span>
                <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}}>编辑</span>
                <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}}>删除</span>
                <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}}>编辑成员</span>
            </div>
        )
    }];
}