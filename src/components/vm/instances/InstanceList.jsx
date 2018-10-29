import React, { Component } from 'react';
import { Layout, Table, Row, Col, Card } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

import BreadcrumbCustom from '../../BreadcrumbCustom';
import VMSider from '../../common/LeftSider/vmsider';
import { fetchData, receiveData } from '../../../services/vm';
import { getColumes } from './TableTpl/instanceTableTpl';
import InstanceCreate from './InstanceCreate'

const { Sider, Content } = Layout;


class InstanceList extends Component {
  constructor(props) {
      super(props);
      this.columns = getColumes.call(this);
  }
  state = {
    pagination: {total: 0, defaultPageSize: 30, defaultCurrent: 1, pageSize: 30}
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
    fetchData({funcName: 'instanceList', stateName: 'instanceList', params: {page: page}});
  };
  refresh = () => {
    this.getList(this.state.pagination.current);
  }

  render() {
    const httpData = this.props.httpData;
    const dataList = (httpData.hasOwnProperty('instanceList')) ? httpData['instanceList']['data']['data'] : [];
    const loading = (httpData.hasOwnProperty('instanceList')) ? httpData['instanceList']['isFetching'] : true;
    const pager = { ...this.state.pagination };
    pager.total = (httpData.hasOwnProperty('instanceList')) ? httpData['instanceList']['data']['count'] : 0;
    return (
      <Layout className="config">
        <Sider>
            <VMSider/>
        </Sider>
        <Content style={{ padding: 0, margin:10,  marginBottom: 0, minHeight: window.innerHeight-84 }}>
          <BreadcrumbCustom first="虚拟机管理" second="虚拟机列表" />
          <Row gutter={16}>
            <Col className="gutter-row" md={24}>
              <Card title="虚拟机列表" bordered={false}>
                <InstanceCreate refresh={this.refresh} />
                <Table bordered columns={this.columns} onChange={this.handleTableChange}
                       loading={loading}
                       dataSource={dataList} rowKey="id" pagination={pager} />
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

export default connect(mapStateToPorps, mapDispatchToProps)(InstanceList);
