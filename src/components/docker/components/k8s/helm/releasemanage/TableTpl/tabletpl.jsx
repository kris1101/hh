import React, { Component } from 'react';
import { Button, Row, Col } from 'antd';

export function getHelmRelease() {
    return [{
        title: '名称',
        dataIndex: 'name'
    }, {
        title: 'REVISION',
        dataIndex: 'revision'
    }, {
        title: '状态',
        dataIndex: 'status'
    }, {
        title: 'CHART',
        dataIndex: 'chart'
    }, {
        title: '命名空间',
        dataIndex: 'namespace'
    }, {
        title: '更新时间',
        dataIndex: 'updated'
    },{
        title: '操作',
        render: (data, record, index) => {
            return (
            <div>
              <Row gutter={10}>
                <Col span={8}>
                  <Button size="small" icon="delete" onClick={() => this.showHelmReleaseDeleteModel(record)}>删除</Button>
                </Col>
                <Col span={8}>
                  <Button size="small" icon="rollback" onClick={() => this.showHelmReleaseRollBackModel(record)}>回滚</Button>
                </Col>
                <Col span={8}>
                  <Button size="small" icon="up-square" onClick={() => this.showHelmReleaseUpdateModel(record)}>升级</Button>
                </Col>
              </Row>
            </div>
        )}
    }];
}
