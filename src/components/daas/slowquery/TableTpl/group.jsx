import React, { Component } from 'react';
import { Row, Col} from 'antd';
import DaasSlowQueryGroupDetailModel from '../group/groupdetailmodel';
import DaasSlowQueryGroupEditModel from '../group/groupeditmodel';
import DaasSlowQueryGroupDeleteModel from '../group/groupdeletemodel';
import DaasSlowQueryGroupUserRelationshipEditModel from '../group/groupuserrelationshipeditmodel';


export function getgroups() {
    return [{
        title: '组名',
        dataIndex: 'fields.name',
    }, {
        title: '类型',
        dataIndex: 'fields.type',
    }, {
        title: '创建时间',
        dataIndex: 'fields.create_time',
    }, {
        title: '更新时间',
        dataIndex: 'fields.update_time',
    },{
        title: '操作',
        render: (data, record, index) => (
            <div>
                <Row>
                    <Col span={5} style={{color:'#0350CF'}}><DaasSlowQueryGroupDetailModel pk={ data.pk } /></Col>
                    <Col span={5} style={{color:'#0350CF'}}><DaasSlowQueryGroupEditModel pk={data.pk} /></Col>
                    <Col span={5} style={{color:'#0350CF'}}><DaasSlowQueryGroupDeleteModel pk={data.pk} /></Col>
                    <Col span={5} style={{color:'#0350CF'}}><DaasSlowQueryGroupUserRelationshipEditModel pk={data.pk} /></Col>
                </Row>
            </div>
        )
    }];
}
