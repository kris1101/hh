import React, { Component } from 'react';
import { List } from 'antd';
import { BASE_URL } from '../../../../containers/Daas/constants';
import axios from 'axios';


class SlowQueryUserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          title: '名称',
          indexdata: "数据加载中...",
        },
        {
          title: '邮箱',
          indexdata: "数据加载中...",
        },
        {
          title: '电话',
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
    const pk = this.props.userId;
    axios.get(BASE_URL + '/v1/api/slow/query/users' + '/' + pk)
    .then(function (response) { 
      const userobj = response.data.data[0]
      _that.setState({
        data: [
          {
            title: '名称',
            indexdata: userobj.fields.name,
          },
          {
            title: '邮箱',
            indexdata: userobj.fields.email,
          },
          {
            title: '电话',
            indexdata: userobj.fields.phone,
          },
          {
            title: '创建时间',
            indexdata: userobj.fields.create_time,
          },
          {
            title:'更新时间',
            indexdata: userobj.fields.update_time,
          },
          {
            title: '描述',
            indexdata: userobj.fields.description,
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

export default SlowQueryUserDetail;