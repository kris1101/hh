import React from 'react';
import { Row, Col} from 'antd';
import DaasRdbProjectDetailModle from '../project/projectdetailmodel';
import DaasRdbProjectUpdateModel from '../project/projectupdatemodel';
import DaasRdbProjectDeleteModel from '../project/projectdeletemodel';
import { formatStrDate } from '../../../../utils/daas/time_helper'

export function getprojects() {
    return [{
        title: '项目ID',
        dataIndex: 'pk',
    },{
        title: '项目名称',
        dataIndex: 'fields.name',
    },{
        title: '上级项目',
        dataIndex: 'fields.parentname',
    },{
        title: '创建时间',
        dataIndex: 'fields.create_time',
        render: (data) => formatStrDate(data),
    },{
        title: '操作',
        render: (data) => (
            <div>
                <Row>
                    <Col span={6} style={{color:'#0350CF'}}><DaasRdbProjectDetailModle pk={ data.pk } /></Col>
                    <Col span={6} style={{color:'#0350CF'}}><DaasRdbProjectUpdateModel pk={data.pk} /></Col>
                    <Col span={6} style={{color:'#0350CF'}}><DaasRdbProjectDeleteModel pk={data.pk} /></Col>
                </Row>
            </div>
        )
    }];
}
