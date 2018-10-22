import React, { Component } from 'react';
import { List } from 'antd';
import { BASE_URL } from '../../../../containers/Daas/constants';
import { getAjax } from '../../../../utils/daas/newaxios';


class DaasRdbProjectDetailForm extends Component {
    constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          title: '项目ID',
          indexdata: "数据加载中...",
        },
        {
          title: '名称',
          indexdata: "数据加载中...",
        },
        {
          title: '上级项目',
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
        const pk = this.props.projectId;
        getAjax(BASE_URL + '/v1/api/rdb/projects/' + pk, {}, function(response){
            const projectObj = response.data.data[0]
            _that.setState({
                data: [
                  {
                    title: '项目ID',
                    indexdata: projectObj.pk,
                  },
                  {
                    title: '名称',
                    indexdata: projectObj.fields.name,
                  },
                  {
                    title: '上级项目',
                    indexdata: projectObj.fields.parentname,
                  },
                  {
                    title: '创建时间',
                    indexdata: projectObj.fields.create_time,
                  },
                  {
                    title:'更新时间',
                    indexdata: projectObj.fields.update_time,
                  },
                  {
                    title: '描述',
                    indexdata: projectObj.fields.description,
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
                  description={ item.indexdata }
                />
              </List.Item>
            )}
          />
        );
    }
}

export default DaasRdbProjectDetailForm;