import React, { Component } from 'react';
import { List, Avatar } from 'antd';
import { BASE_URL } from '../../../../containers/Daas/constants';
import axios from 'axios';
import { formatStrDate } from '../../../docker/utils/time_helper';

const axios_instance = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    timeout: 2000
})

class RDBInstanceBackupDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          title: '宿主机ip',
          indexdata: "数据加载中...",
        },{
          title: '实例端口',
          indexdata: "数据加载中...",
        },{
          title: '实例编号',
          indexdata: "数据加载中...",
        },{
          title:'备份状态',
          indexdata: "数据加载中...",
        },{
          title: '备份类型',
          indexdata: "数据加载中...",
        },{
          title: '上传状态',
          indexdata: "数据加载中...",
        },{
          title: '备份开始时间',
          indexdata: "数据加载中...",
        },{
          title: '备份结束时间',
          indexdata: "数据加载中...",
        },{
          title:'上传开始时间',
          indexdata: "数据加载中...",
        },{
          title: '上传结束时间',
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
    const pk = this.props.backupId;
    console.log(pk)
    //axios_instance.get('/v1/api/rdb/instance/backups' + '/' + pk)
    axios.get(BASE_URL + '/v1/api/rdb/instance/backups' + '/' + pk)
    .then(function (response) {
      const backupobj = response.data.data[0]
      console.log(response.data)
      _that.setState({
        data: [
          {
            title: '宿主机ip',
            indexdata: backupobj.fields.host,
          },  {
              title: '实例端口',
              indexdata: backupobj.fields.port,
          },  {
              title: '实例编号',
              indexdata: backupobj.fields.instance_id,
          },  {
              title:'备份状态',
              indexdata: backupobj.fields.backup_status.toString(),
          },  {
              title: '备份类型',
              indexdata: backupobj.fields.backup_type.toString(),
          },  {
              title: '上传状态',
              indexdata: backupobj.fields.upload_status.toString(),
          },  {
              title: '备份开始时间',
              indexdata: backupobj.fields.backup_start_time,
          },  {
              title: '备份结束时间',
              indexdata: backupobj.fields.backup_end_time,
          },  {
              title:'上传开始时间',
              indexdata: backupobj.fields.upload_start_time,
          },  {
              title: '上传结束时间',
              indexdata: backupobj.fields.upload_end_time,
          },  {
              title: '创建时间',
              indexdata: backupobj.fields.create_time,
          },  {
              title:'更新时间',
              indexdata: backupobj.fields.update_time,
          },  {
              title: '描述',
              indexdata: backupobj.fields.description,
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

export default RDBInstanceBackupDetail;
