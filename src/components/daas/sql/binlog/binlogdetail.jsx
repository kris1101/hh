import React, { Component } from 'react';
import { List, Avatar } from 'antd';
import { BASE_URL } from '../../../../containers/Daas/constants';
import axios from 'axios';
import { formatStrDate } from '../../../docker/utils/time_helper';

const axios_instance = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    timeout: 2000
})

class RDBInstanceBinlogDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          title: '备份服务器ip',
          indexdata: "数据加载中...",
        },{
          title: '实例主机ip',
          indexdata: "数据加载中...",
        },{
          title: '实例端口',
          indexdata: "数据加载中...",
        },{
          title: '实例编号',
          indexdata: "数据加载中...",
        },{
          title:'进程状态',
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
    const pk = this.props.binlogId;
    console.log(pk)
    //axios_instance.get('/v1/api/rdb/instance/backups' + '/' + pk)
    axios.get(BASE_URL + '/v1/api/rdb/instance/binlogs' + '/' + pk)
    .then(function (response) {
      const binlogobj = response.data.data[0]
      console.log(response.data)
      _that.setState({
        data: [
          {
              title: '备份服务器ip',
              indexdata: binlogobj.fields.binlog_host,
          },  {
              title: '实例主机ip',
              indexdata: binlogobj.fields.host,
          },  {
              title: '实例端口',
              indexdata: binlogobj.fields.port,
          },  {
              title: '实例编号',
              indexdata: binlogobj.fields.instance_id,
          },  {
              title:'进程状态',
              indexdata: binlogobj.fields.binlog_status.toString(),
          }, {
              title: '创建时间',
              indexdata: binlogobj.fields.create_time,
          },  {
              title:'更新时间',
              indexdata: binlogobj.fields.update_time,
          },  {
              title: '描述',
              indexdata: binlogobj.fields.description,
          },   
        ]
      });
    })
    .catch(function (error) {
      console.log(error);
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
              description={ item.indexdata }
            />
          </List.Item>
        )}
      />
    );
  }
}

export default RDBInstanceBinlogDetail;
