import React, { Component } from 'react';
import { List } from 'antd';
import { BASE_URL } from '../../../../containers/Daas/constants';
import axios from 'axios';
import { formatStrDate } from '../../../../utils/daas/time_helper'


class SlowQueryGroupDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          title: '名称',
          indexdata: "数据加载中...",
        },
        {
          title: '类型',
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
    const pk = this.props.groupId;
    axios.get(BASE_URL + '/v1/api/slow/query/groups/' + pk)
    .then(function (response) {
      const groupobj = response.data.data[0]
      _that.setState({
        data: [
          {
            title: '名称',
            indexdata: groupobj.fields.name,
          },
          {
            title: '类型',
            indexdata: groupobj.fields.type,
          },
          {
            title: '创建时间',
            indexdata: formatStrDate(groupobj.fields.create_time),
          },
          {
            title:'更新时间',
            indexdata: formatStrDate(groupobj.fields.update_time),
          },
          {
            title: '描述',
            indexdata: groupobj.fields.description,
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

export default SlowQueryGroupDetail;
