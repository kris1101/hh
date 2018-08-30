import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Layout, Form, Input, Button, Select, Table } from 'antd';

import { getColumes } from './TableTpl/logTabletpl';
// import './list.less';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import VMSider from '../../common/LeftSider/vmsider';
import { fetchData, receiveData } from '../../../services/vm';

const { Sider, Content } = Layout;


class LogList extends Component {
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
    fetchData({funcName: 'logList', stateName: 'logList', params: {page: page}});
  };

  render() {
    const httpData = this.props.httpData;
    const userList = (httpData.hasOwnProperty('logList')) ? httpData['logList']['data']['data'] : [];
    const loading = (httpData.hasOwnProperty('logList')) ? httpData['logList']['isFetching'] : true;
    const pager = { ...this.state.pagination };
    pager.total = (httpData.hasOwnProperty('logList')) ? httpData['logList']['data']['count'] : 0;

    return (
      <Layout className="config">
        <Sider>
            <VMSider/>
        </Sider>
        <Content style={{ padding: 0, margin:10,  marginBottom: 0, minHeight: window.innerHeight-84 }}>
            <BreadcrumbCustom first="用户管理" second="操作日志" />
            <div style={{ background:'#fff' }}>
              <Table bordered columns={this.columns} onChange={this.handleTableChange} loading={loading}
                     dataSource={userList} rowKey="id" pagination={pager} />
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

export default connect(mapStateToPorps, mapDispatchToProps)(LogList);
