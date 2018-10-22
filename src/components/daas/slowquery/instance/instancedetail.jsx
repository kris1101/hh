import React, { Component } from 'react';
import { List } from 'antd';
import { BASE_URL } from '../../../../containers/Daas/constants';
import axios from 'axios';


class SlowQueryInstanceDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          title: '名称',
          indexdata: "数据加载中...",
        },
        {
          title: '实例ip',
          indexdata: "数据加载中...",
        },
        {
          title: '端口号',
          indexdata: "数据加载中...",
        },
        {
          title: '创建时间',
          indexdata: "数据加载中...",
        },
        {
          title:'更新时间',
          indexdata: "数据加载中...",
        },
        {
          title: '描述',
          indexdata: "数据加载中...",
        },
      ]
    }
  }

  componentDidMount(){
    const _that = this;
    const pk = this.props.instanceId;
    console.log(pk);
    axios.get(BASE_URL + '/v1/api/slow/query/instances/' + pk)
    .then(function (response) { 
      const instanceobj = response.data.data[0]
      _that.setState({
        data: [
          {
            title: '名称',
            indexdata: instanceobj.fields.name,
          },
          {
            title: '实例ip',
            indexdata: instanceobj.fields.host_ip,
          },
          {
            title: '端口号',
            indexdata: instanceobj.fields.port,
          },
          {
            title: '创建时间',
            indexdata: instanceobj.fields.create_time,
          },
          {
            title:'更新时间',
            indexdata: instanceobj.fields.update_time,
          },
          {
            title: '描述',
            indexdata: instanceobj.fields.description,
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

export default SlowQueryInstanceDetail;