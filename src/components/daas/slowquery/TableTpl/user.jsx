import React, { Component } from 'react';
import DaasSlowQueryUserDetailModel from '../user/userdetailmodel';
import DaasSlowQueryUserEditModel from '../user/usereditmodel';
import DaasSlowQueryUserDeleteModel from '../user/userdeletemodel';
import { Row, Col } from 'antd';
export function getusers() {
    return [{
        title: '名称',
        dataIndex: 'fields.name',
    },{
        title: '邮箱',
        dataIndex: 'fields.email'
    },{
        title: '电话',
        dataIndex: 'fields.phone'
    },{ 
        title: '创建时间',
        dataIndex: 'fields.create_time'
    },{
        title: '操作',
        render: (data) => (
            <div>
                <Row>
                    <Col span={5} style={{color:'#0350CF'}}><DaasSlowQueryUserDetailModel pk={ data.pk } /></Col>
                    <Col span={5} style={{color:'#0350CF'}}><DaasSlowQueryUserEditModel pk={data.pk} /></Col>
                    <Col span={5} style={{color:'#0350CF'}}><DaasSlowQueryUserDeleteModel pk={data.pk} /></Col>
                </Row>
            </div>
        )
    }];
}