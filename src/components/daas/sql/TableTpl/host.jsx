import React from 'react';
import { Row, Col} from 'antd';
import DaasRdbHostDetailModle from '../host/hostdetailmodel';
import DaasRdbHostUpdateModel from '../host/hostupdatemodel';
import DaasRdbHostDeleteModel from '../host/hostdeletemodel';
export function gethosts() {
    return [{
        title: '名称',
        dataIndex: 'fields.name'
    },{
        title: 'IP',
        dataIndex: 'fields.host_ip',
    },{
        title: 'CPU(个)',
        dataIndex: 'fields.cpu',
    },{
        title: '内存(M)',
        dataIndex: 'fields.memory',
    },{
        title: '硬盘(G)',
        dataIndex: 'fields.capacity',
    },{
        title: '主机类型',
        dataIndex: 'fields.host_type_name',
    },{
        title: '创建时间',
        dataIndex: 'fields.create_time',
    },{
        title: '操作',
        render: (data) => (
            <div>
                <Row>
                    <Col span={6} offset={2} style={{color:'#0350CF'}}><DaasRdbHostDetailModle pk={data.pk} /></Col>
                    <Col span={6} style={{color:'#0350CF'}}><DaasRdbHostUpdateModel pk={data.pk} /></Col>
                    <Col span={6} style={{color:'#0350CF'}}><DaasRdbHostDeleteModel pk={data.pk} /></Col>
                </Row>
            </div>
        )
    }];
}