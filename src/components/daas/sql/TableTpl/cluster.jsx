import React from 'react';
import { Row, Col} from 'antd';
import DaasRdbClusterDetailModle from '../cluster/clusterdetailmodel';
import DaasRdbClusterUpdateModel from '../cluster/clusterupdatemodel';
import DaasRdbClusterDeleteModel from '../cluster/clusterdeletemodel';
import DaasRdbClusterInstanceRelationshipUpdateModel from '../cluster/clusterinstancerelationshipupdatemodel';

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
    },{
        title: '操作',
        render: (data) => (
            <div>
                <Row>
                    <Col span={6} style={{color:'#0350CF'}}><DaasRdbClusterDetailModle pk={ data.pk } /></Col>
                    <Col span={6} style={{color:'#0350CF'}}><DaasRdbClusterUpdateModel pk={ data.pk } /></Col>
                    <Col span={6} style={{color:'#0350CF'}}><DaasRdbClusterDeleteModel pk={ data.pk } /></Col>
                    <Col span={6} style={{color:'#0350CF'}}><DaasRdbClusterInstanceRelationshipUpdateModel pk={ data.pk } /></Col>
                </Row>
            </div>
        )
    }];
}