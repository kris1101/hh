import React from 'react';
import { Row, Col } from 'antd'
import RDBInstanceBinlogDetailModel from '../binlog/binlogdetailmodel'

export function getbinlogs() {
    return [{
        title: '备份主机',
        dataIndex: 'fields.binlog_host',
    },{
        title: '宿主机',
        dataIndex: 'fields.host',
    }, {
        title: '实例端口',
        dataIndex: 'fields.port'
    }, {
        title: '实例id',
        dataIndex: 'fields.instance_id',
    },{
        title: '进程状态',
        dataIndex: 'fields.binlog_status',
    },{
        title: '创建时间',
        dataIndex: 'fields.create_time',
    },{
        title: '操作',
        render: (data, record, index) => (
            <div>
                <Row>
                    <Col span={5} style={{color:'#0350CF'}}><RDBInstanceBinlogDetailModel pk={ data.pk } /></Col>
                </Row>
            </div>
        )
    }];
}
