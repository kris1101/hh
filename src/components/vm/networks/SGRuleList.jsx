import React, { Component } from 'react';
import { Layout, Tabs, Table, Row, Col, Card } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

import BreadcrumbCustom from '../../BreadcrumbCustom';
import VMSider from '../../common/LeftSider/vmsider';
import { fetchData, receiveData } from '../../../services/vm';
import { getRuleColumes, getApprovingColumes } from './TableTpl/sgTableTpl';
import SGRuleCreate from './SGRuleCreate'

const TabPane = Tabs.TabPane;
const { Sider, Content } = Layout;


class SGList extends Component {
  constructor(props) {
      super(props);
      this.columns = getRuleColumes.call(this);
      this.approvingColumns = getApprovingColumes.call(this);
  }
  state = {
    activeKey: "1",
    pagination: {total: 0, defaultPageSize: 10, defaultCurrent: 1, pageSize: 10}
  };
  componentDidMount () {
    this.getList();
  }
  onTabChange = (activeKey) => {
    // console.log(activeKey)
    this.setState({
      activeKey: activeKey,
      pagination: {total: 0, defaultPageSize: 10, defaultCurrent: 1, pageSize: 10},
    });
    if (activeKey === '2'){
      this.refresh_approving();
    } else {
      this.refresh();
    }
  }
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    const tab = this.state.activeKey === '2' ? '': 'approving'
    this.getList(pagination.current, tab);
  }
  getList = (page=1, tab='') => {
    const { fetchData } = this.props;
    fetchData({funcName: 'sgRuleList', stateName: 'sgRuleList',
               params: {id: this.props.match.params.id, page: page, tab: tab}});
  };
  refresh = () => {
    this.getList(this.state.pagination.current);
  }
  refresh_approving = () => {
    this.getList(this.state.pagination.current, 'approving');
  }

  render() {
    const httpData = this.props.httpData;
    const dataList = (httpData.hasOwnProperty('sgRuleList')) ? httpData['sgRuleList']['data']['data'] : [];
    const loading = (httpData.hasOwnProperty('sgRuleList')) ? httpData['sgRuleList']['isFetching'] : true;
    const pager = { ...this.state.pagination };
    pager.total = (httpData.hasOwnProperty('sgRuleList')) ? httpData['sgRuleList']['data']['count'] : 0;
    return (
      <Layout className="config">
        <Sider>
            <VMSider/>
        </Sider>
        <Content style={{ padding: 0, margin:10,  marginBottom: 0, minHeight: window.innerHeight-84 }}>
          <BreadcrumbCustom first="网络管理" second="安全组规则列表" />
          <Row gutter={16}>
            <Col className="gutter-row" md={24}>
              <Card title="安全组规则列表" bordered={false} headStyle={{ borderBottom: 0 }} bodyStyle={{ paddingTop: 0 }}>
                <Tabs defaultActiveKey="1" activeKey={this.state.activeKey} onChange={this.onTabChange}>
                  <TabPane tab={<span>规则列表</span>} key="1">
                    <SGRuleCreate sg_id={this.props.match.params.id} refresh={this.refresh} />
                    <Table bordered columns={this.columns} onChange={this.handleTableChange}
                           loading={loading}
                           dataSource={dataList} rowKey="id" pagination={pager} />
                  </TabPane>
                  <TabPane tab={<span>审核列表</span>} key="2">
                    <SGRuleCreate sg_id={this.props.match.params.id} refresh={this.refresh_approving} />
                    <Table bordered columns={this.approvingColumns} onChange={this.handleTableChange}
                           loading={loading}
                           dataSource={dataList} rowKey="id" pagination={pager} />
                  </TabPane>
                </Tabs>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}


const mapStateToPorps = state => {
  return { ...state };
};
const mapDispatchToProps = dispatch => ({
    fetchData: bindActionCreators(fetchData, dispatch),
    receiveData: bindActionCreators(receiveData, dispatch)
});

export default connect(mapStateToPorps, mapDispatchToProps)(SGList);
