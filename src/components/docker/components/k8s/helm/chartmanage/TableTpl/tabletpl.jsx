import React from 'react';
import { Button, Tooltip } from 'antd';
import { omitstring } from '../../../../../utils/tools_helper'

export function getHelmChart() {
    return [{
        title: 'Repo名称',
        dataIndex: 'repo_name'
    }, {
        title: 'Chart名称',
        dataIndex: 'chart_name'
    }, {
        title: '描述',
        dataIndex: 'description',
        render: (data, record, index) => {

          return  (<Tooltip title={data}>{omitstring(data, 36)}</Tooltip>);
        }
    },{
        title: '操作',
        render: (data, record, index) => {
            return (
            <div>
              <Button size="small" icon="cloud-upload" onClick={() => this.showHelmChartDeployModel(record)}>部署</Button>
            </div>
        )}
    }];
}
