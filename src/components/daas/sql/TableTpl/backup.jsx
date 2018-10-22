import React from 'react';
import { Row, Col } from 'antd'
import RDBInstanceBackupDetailModel from '../backup/backupdetailmodel'

export function getbackups() {
    return [{
        title: '宿主机',
        dataIndex: 'fields.host',
    }, {
        title: '实例端口',
        dataIndex: 'fields.port'
    }, {
        title: '实例id',
        dataIndex: 'fields.instance_id',
    },{
        title: '上传状态',
        dataIndex: 'fields.upload_status',
    },{
        title: '创建时间',
        dataIndex: 'fields.create_time',
    },{
        title: '操作',
        render: (data,record, index) => (
            <div>
                <Row>
                    <Col span={5} style={{color:'#0350CF'}}><RDBInstanceBackupDetailModel pk={ data.pk } /></Col>
                </Row>
            </div>
        )
    }];
}
