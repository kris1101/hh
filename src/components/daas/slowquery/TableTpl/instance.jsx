import React from 'react';
import { Row, Col } from 'antd';
import DaasSlowQueryInstanceDetailModel from '../instance/instancedetailmodel';
import DaasSlowQueryInstanceEditModel from '../instance/instanceeditmodel';
import DaasSlowQueryInstanceDeleteModel from '../instance/instancedeletemodel';
import DaasSlowQueryInstanceGroupRelationshipEditModel from '../instance/instancegrouprelationshipeditmodel';
import { formatStrDate } from '../../../../utils/daas/time_helper'

export function getinstances() {
    return [{
        title: '名称',
        dataIndex: 'fields.name',
    },{
        title: '实例ip',
        dataIndex: 'fields.host_ip',
    },{
        title: '端口号',
        dataIndex: 'fields.port',
    },{ 
        title: '创建时间',
        dataIndex: 'fields.create_time',
        render: (data) => formatStrDate(data),
    },{
        title: '操作',
        render: (data) => (
            <div>
                <Row>
                    <Col span={5} offset={2} style={{color:'#0350CF'}}><DaasSlowQueryInstanceDetailModel pk={data.pk} /></Col>
                    <Col span={5} style={{color:'#0350CF'}}><DaasSlowQueryInstanceEditModel pk={data.pk} /></Col>
                    <Col span={5} style={{color:'#0350CF'}}><DaasSlowQueryInstanceDeleteModel pk={data.pk} /></Col>
                    <Col span={5} style={{color:'#0350CF'}}><DaasSlowQueryInstanceGroupRelationshipEditModel pk={data.pk} /></Col>
                </Row>
            </div>
        )
    }];
}
