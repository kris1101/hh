import React from 'react';
import { Row, Col} from 'antd';
import DaasRdbInstanceDetailModle from '../instance/instancedetailmodel';
import DaasRdbInstanceUpdateModel from '../instance/instanceupdatemodel';
import DaasRdbInstanceDeleteModel from '../instance/instancedeletemodel';
import DaasRdbInstanceStopModel from '../instance/instancestopmodel';
import DaasRdbInstanceRestartModel from '../instance/instancerestartmodel';
import { formatStrDate } from '../../../../utils/daas/time_helper'
import { runStatus } from '../../../../utils/daas/rdb_utils'

export function getinstances() {
    return [{
        title: '实例名称',
        dataIndex: 'fields.name',
    },{
        title: 'IP',
        dataIndex: 'fields.host'
    },{
        title: '实例端口',
        dataIndex: 'fields.port'
    },{
        title: '运行状态',
        dataIndex: 'fields.run_status',
        render: (data) => runStatus(data)
    },{
        title: '创建时间',
        dataIndex: 'fields.create_time',
        render: (data) => formatStrDate(data)
    },{
        title: '操作',
        render: (data) => (
            <div>
                <Row>
                    <Col span={4} offset={2} style={{color:'#0350CF'}}><DaasRdbInstanceDetailModle pk={ data.pk } /></Col>
                    <Col span={4} style={{color:'#0350CF'}}><DaasRdbInstanceUpdateModel pk={ data.pk } /></Col>
                    <Col span={4} style={{color:'#0350CF'}}><DaasRdbInstanceDeleteModel pk={ data.pk } /></Col>
                    <Col span={4} style={{color:'#0350CF'}}><DaasRdbInstanceStopModel pk={ data.pk } /></Col>
                    <Col span={4} style={{color:'#0350CF'}}><DaasRdbInstanceRestartModel pk={ data.pk } /></Col>
                </Row>
            </div>
        )
    }];
}
