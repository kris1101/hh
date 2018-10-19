import React, { Component } from 'react';
import { Layout, Table, Row, Col, Card } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

import BreadcrumbCustom from '../../BreadcrumbCustom';
import VMSider from '../../common/LeftSider/vmsider';
import { getMemberColumes } from './TableTpl/groupTabletpl';
import { fetchData, receiveData } from '../../../services/vm';

import GroupMemberAdd from './GroupMemberAdd';

const { Sider, Content } = Layout;


class GroupMemberList extends Component {
  constructor(props) {
      super(props);
      this.columns = getMemberColumes.call(this);
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
    fetchData({funcName: 'groupMemberList', stateName: 'groupMemberList',
               params: {page: page, group_id: this.props.match.params.id}});
  };
  refresh = () => {
    this.getList(this.state.pagination.current);
  }

  render() {
    const httpData = this.props.httpData;
    const dataList = (httpData.hasOwnProperty('groupMemberList')) ? httpData['groupMemberList']['data']['data'] : [];
    const loading = (httpData.hasOwnProperty('groupMemberList')) ? httpData['groupMemberList']['isFetching'] : true;
    const pager = { ...this.state.pagination };
    pager.total = (httpData.hasOwnProperty('groupMemberList')) ? httpData['groupMemberList']['data']['count'] : 0;
    return (
      <Layout className="config">
        <Sider>
            <VMSider/>
        </Sider>
        <Content style={{ padding: 0, margin:10,  marginBottom: 0, minHeight: window.innerHeight-84 }}>
          <BreadcrumbCustom first="用户管理" second="用户组列表" three="组成员列表" />
          <Row gutter={16}>
            <Col className="gutter-row" md={24}>
              <Card title="用户组成员列表" bordered={false}>
                <GroupMemberAdd refresh={this.refresh} group_id={this.props.match.params.id} />
                <Table bordered columns={this.columns} onChange={this.handleTableChange} loading={loading}
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

export default connect(mapStateToPorps, mapDispatchToProps)(GroupMemberList);
