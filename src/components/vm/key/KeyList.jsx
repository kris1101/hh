import React, { Component } from 'react';
import VMSider from '../../common/LeftSider/vmsider';
import { Layout, Form, Input, Button, Select, Table } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BreadcrumbCustom from '../../BreadcrumbCustom';
import { getColumes } from './TableTpl/tabletpl';
import { fetchData, receiveData } from '../../../services/vm';

const { Sider, Content } = Layout;


class KeyList extends Component {
  constructor(props) {
      super(props);
      this.columns = getColumes.call(this);
  }
  state = {
    pagination: {total: 0, defaultPageSize: 10, defaultCurrent: 1, pageSize: 10}
  };
  componentDidMount () {
    this.getList();
  }
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.getList(pagination.current);
  }
  getList = (page=1) => {
    const { fetchData } = this.props;
    fetchData({funcName: 'keypairList', stateName: 'keypairList', params: {page: page}});
  };

  render() {
    const httpData = this.props.httpData;
    const dataList = (httpData.hasOwnProperty('keypairList')) ? httpData['keypairList']['data']['data'] : [];
    const loading = (httpData.hasOwnProperty('keypairList')) ? httpData['keypairList']['isFetching'] : true;
    const pager = { ...this.state.pagination };
    pager.total = (httpData.hasOwnProperty('keypairList')) ? httpData['keypairList']['data']['count'] : 0;
    // this.setState({ pagination: pager, });
    return (
      <Layout className="config">
        <Sider>
            <VMSider/>
        </Sider>
        <Content style={{ padding: 0, margin:10,  marginBottom: 0, minHeight: window.innerHeight-84 }}>
            <BreadcrumbCustom first="用户管理" second="操作日志" />
            <div style={{ background:'#fff' }}>
              <Table bordered columns={this.columns} onChange={this.handleTableChange} loading={loading}
                     dataSource={dataList} rowKey="id" pagination={pager} />
            </div>
        </Content>
      </Layout>
    );
  }
}


const mapStateToPorps = state => {
  // const { auth } = state.httpData;
  // return { auth };
  return { ...state };
};
const mapDispatchToProps = dispatch => ({
    fetchData: bindActionCreators(fetchData, dispatch),
    receiveData: bindActionCreators(receiveData, dispatch)
});

export default connect(mapStateToPorps, mapDispatchToProps)(KeyList);
