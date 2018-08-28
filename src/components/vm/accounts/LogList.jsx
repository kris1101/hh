import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Layout, Form, Input, Button, Select, Table } from 'antd';

import { getColumes } from './TableTpl/logTabletpl';
// import './list.less';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import VMSider from '../../common/LeftSider/vmsider';
import { fetchData, receiveData } from '../../../services/vm';
import store from '../../../redux/index';

const { Sider, Content } = Layout;


class LogList extends Component {
  constructor(props) {
      super(props);
      this.columns = getColumes.call(this);
  }
  state = {
      userList: [],
      currentPage: 1,
      pageSize: 10,
      total:0
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
    this.getList(0, pagination.current);
  }
  getList = (page=1) => {
    this.setState({ loading: true });
    const { fetchData } = this.props;
    fetchData({funcName: 'logList', stateName: 'logList'});
  };

  render() {
    const httpData = store.getState()['httpData'];
    const userList = (httpData.hasOwnProperty('logList')) ? httpData['logList']['data']['data'] : [];
    return (
      <Layout className="config">
        <Sider>
            <VMSider/>
        </Sider>
        <Content style={{ padding: 0, margin:10,  marginBottom: 0, minHeight: window.innerHeight-84 }}>
            <BreadcrumbCustom first="用户管理" second="操作日志" />
            <div style={{ background:'#fff' }}>
              <Table bordered columns={this.columns} onChange={this.handleTableChange}
                     dataSource={userList} rowKey="id" pagination={this.state.pagination} />
            </div>
            <div style={{margin: 20}}>
                <span className='num'>共找到{this.state.total}条结果，每页显示10条</span>
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
