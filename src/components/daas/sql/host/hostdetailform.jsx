import React, { Component } from 'react';
import { List } from 'antd';
import { BASE_URL } from '../../../../containers/Daas/constants';
import { getAjax } from '../../../../utils/daas/newaxios';
import { formatStrDate } from '../../../../utils/daas/time_helper'

class DaasRdbHostDetailForm extends Component {
    constructor(props) {
    super(props);
    this.state = {
      data: [
            {
                title: '名称',
                dataIndex: '数据加载中...',
            },{
                title: 'IP',
                dataIndex: '数据加载中...',
            },{
                title: 'CPU(个)',
                dataIndex: '数据加载中...',
            },{
                title: '内存(M)',
                dataIndex: '数据加载中...',
            },{
                title: '硬盘(G)',
                dataIndex: '数据加载中...',
            },{
                title: '主机类型',
                dataIndex: '数据加载中...',
            },{
                title: '创建时间',
                dataIndex: '数据加载中...',
            },{
                title: '更新时间',
                dataIndex: '数据加载中...',
            },{
                title: '描述',
                dataIndex: '数据加载中...',
            },
      ]
    }
    }

    componentDidMount(){
        const _that = this;
        const pk = this.props.hostId;
        getAjax(BASE_URL + '/v1/api/rdb/hosts/' + pk, {}, function(response){
            const hostObj = response.data.data[0];
            console.log(hostObj)
            _that.setState({
                data: [
                    {
                        title: '名称',
                        dataIndex: hostObj.fields.name,
                    },{
                        title: 'IP',
                        dataIndex: hostObj.fields.host_ip,
                    },{
                        title: 'CPU(个)',
                        dataIndex: hostObj.fields.cpu,
                    },{
                        title: '内存(M)',
                        dataIndex: hostObj.fields.memory,
                    },{
                        title: '硬盘(G)',
                        dataIndex: hostObj.fields.capacity,
                    },{
                        title: '主机类型',
                        dataIndex: hostObj.fields.host_type_name,
                    },{
                        title: '创建时间',
                        dataIndex: formatStrDate(hostObj.fields.create_time),
                    },{
                        title: '更新时间',
                        dataIndex: formatStrDate(hostObj.fields.update_time),
                    },{
                        title: '描述',
                        dataIndex: hostObj.fields.description,
                    },
                ]
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
                  title={<a href="https://ant.design">{item.title}</a>}
                  description={ item.dataIndex }
                />
              </List.Item>
            )}
          />
        );
    }
}

export default DaasRdbHostDetailForm;
