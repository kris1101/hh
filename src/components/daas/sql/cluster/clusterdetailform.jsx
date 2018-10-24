import React, { Component } from 'react';
import { List } from 'antd';
import { BASE_URL } from '../../../../containers/Daas/constants';
import { getAjax } from '../../../../utils/daas/newaxios';


class DaasRdbClusterDetailForm extends Component {
    constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          title: 'uuid',
          indexdata: "数据加载中...",
        },{
          title: '名称',
          indexdata: "数据加载中...",
        },{
          title: '端口',
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
        const pk = this.props.clusterId;
        getAjax(BASE_URL + '/v1/api/rdb/clusters/' + pk, {}, function(response){
            const instanceObj = response.data.data[0];
            _that.setState({
                data: [
                  {
                    title: 'uuid',
                    indexdata: instanceObj.fields.uuid,
                  },{
                    title: '名称',
                    indexdata: instanceObj.fields.name,
                  },{
                    title: '端口',
                    indexdata: instanceObj.fields.port,
                  },{
                    title: '创建时间',
                    indexdata: instanceObj.fields.create_time,
                  },{
                    title:'更新时间',
                    indexdata: instanceObj.fields.update_time,
                  },{
                    title: '描述',
                    indexdata: instanceObj.fields.description,
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

export default DaasRdbClusterDetailForm;