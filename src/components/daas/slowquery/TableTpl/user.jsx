import React from 'react';
import DaasSlowQueryUserDetailModel from '../user/userdetailmodel';
import DaasSlowQueryUserEditModel from '../user/usereditmodel';
import DaasSlowQueryUserDeleteModel from '../user/userdeletemodel';
import { Row, Col } from 'antd';
import { formatStrDate } from '../../../../utils/daas/time_helper';

export function getusers() {
    return [{
        title: '名称',
        dataIndex: 'fields.name',
    },{
        title: '邮箱',
        dataIndex: 'fields.email',
    },{
        title: '电话',
        dataIndex: 'fields.phone',
    },{ 
        title: '创建时间',
        dataIndex: 'fields.create_time',
        render: (data) => formatStrDate(data),
    },{
        title: '操作',
        render: (data) => (
            <div>
                <Row>
                    <Col span={5} offset={4} style={{color:'#0350CF'}}><DaasSlowQueryUserDetailModel pk={ data.pk } /></Col>
                    <Col span={5} style={{color:'#0350CF'}}><DaasSlowQueryUserEditModel pk={data.pk} /></Col>
                    <Col span={5} style={{color:'#0350CF'}}><DaasSlowQueryUserDeleteModel pk={data.pk} /></Col>
                </Row>
            </div>
        )
    }];
}
