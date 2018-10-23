import React from 'react';
import { formatStrDate } from '../../../../utils/daas/time_helper'

export function getclusters() {
    return [{
        title: '集群码',
        dataIndex: 'fields.uuid',
    }, {
        title: '名称',
        dataIndex: 'fields.name'
    }, {
        title: '端口',
        dataIndex: 'fields.port',
    },{
        title: '创建时间',
        dataIndex: 'fields.create_time',
        render: (data) => formatStrDate(data)
    },{
        title: '操作',
        render: (data) => (
            <div>
                <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}}>详情</span>
                <span style={{cursor: 'pointer',color:'#0350CF',marginRight:30}}>编辑</span>
                <span style={{cursor: 'pointer',color:'#cf1f0f',marginRight:30}}>删除</span>
                <span style={{cursor: 'pointer',color:'#cf1f0f',marginRight:30}}>编辑成员</span>
            </div>
        )
    }];
}
