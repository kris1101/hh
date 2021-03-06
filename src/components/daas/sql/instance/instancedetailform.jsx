import React, { Component } from 'react';
import { List } from 'antd';
import { BASE_URL } from '../../../../containers/Daas/constants';
import { getAjax } from '../../../../utils/daas/newaxios';
import { formatStrDate } from '../../../../utils/daas/time_helper'
import { instanceRunStatus } from '../../../../utils/daas/rdb_utils'

class DaasRdbInstanceDetailForm extends Component {
    constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          title: '名称',
          indexdata: "数据加载中...",
        },{
          title: 'IP',
          indexdata: "数据加载中...",
        },{
          title: '端口',
          indexdata: "数据加载中...",
        },{
          title: 'cpu',
          indexdata: "数据加载中...",
        },{
          title: '内存',
          indexdata: "数据加载中...",
        },{
          title: '硬盘',
          indexdata: "数据加载中...",
        },{
          title: '项目',
          indexdata: "数据加载中...",
        },{
          title: '高可用',
          indexdata: "数据加载中...",
        },{
          title: '版本',
          indexdata: "数据加载中...",
        },{
          title: '运行状态',
          indexdata: "数据加载中...",
        },{
          title: '创建时间',
          indexdata: "数据加载中...",
        },{
          title:'更新时间',
          indexdata: "数据加载中...",
        },{
          title: '描述',
          indexdata: "数据加载中...",
        },
      ]
    }
    }

    componentDidMount(){
        const _that = this;
        const pk = this.props.instanceId;
        getAjax(BASE_URL + '/v1/api/rdb/instances/' + pk, {}, function(response){
            const instanceObj = response.data.data[0];
            const projectuuid = instanceObj.fields.project_name
            getAjax('/v1/api/rdb/projects/' + projectuuid, {}, function(res){
                    const projectname=res.data.data[0].fields.name;
                    _that.setState({
                        data: [
                            {
                              title: '名称',
                              indexdata: instanceObj.fields.name,
                            },{
                              title: 'IP',
                              indexdata: instanceObj.fields.host,
                            },{
                              title: '端口',
                              indexdata: instanceObj.fields.port,
                            },{
                              title: 'cpu',
                              indexdata: instanceObj.fields.cpu,
                            },{
                              title: '内存',
                              indexdata: instanceObj.fields.memory,
                            },{
                              title: '硬盘',
                              indexdata: instanceObj.fields.capacity,
                            },{
                              title: '项目',
                              indexdata: projectname,
                            },{
                              title: '高可用',
                              indexdata: instanceObj.fields.high_avail.toString(),
                            },{
                              title: '版本',
                              indexdata: instanceObj.fields.db_version,
                            },{
                              title: '运行状态',
                              indexdata: instanceRunStatus(instanceObj.fields.run_status),
                            },{
                              title: '创建时间',
                              indexdata: formatStrDate(instanceObj.fields.create_time),
                            },{
                              title:'更新时间',
                              indexdata: formatStrDate(instanceObj.fields.update_time),
                            },{
                              title: '描述',
                              indexdata: instanceObj.fields.description,
                            },
                        ]
                    });
            });
        });
    }
  
    render() {
        return (
          <List
            itemLayout="horizontal"
            dataSource={this.state.data}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={<a>{item.title}</a>}
                  description={ item.indexdata }
                />
              </List.Item>
            )}
          />
        );
    }
}

export default DaasRdbInstanceDetailForm;
