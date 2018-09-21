import React, { Component } from 'react';
import Daassider from '../../../components/common/LeftSider/daassider';
import { Layout, Form, Input, Button, Select, Table } from 'antd';
import { connect } from 'react-redux';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import { getusers } from './TableTpl/user';
import './user.less';
import PropTypes from 'prop-types';
import { slowquery_user, getSlowQueryUsersList } from '../../../containers/Daas/actions/slow_query_user';
import DaasSlowQueryUserCreateModel from './user/usercreate';

const { Sider, Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;

class SlowQueryUserManager extends Component {
    
    constructor(props) {
        super(props);
        this.columns = getusers.call(this);
        this.state = {
            deviceList: [],
            currentPage: 1,
            pageSize: 10,
            total: 0
        }
    }

    componentDidMount () {
        this.props.getSlowQueryUsersList({});
    }

    handleReset = () => {
        this.props.form.resetFields();
        this.props.getSlowQueryUsersList({});
    }

    handleSubmit = (value) => {
        // this.props.history.push({pathname:'/slowquery/add-user', data:value});
        console.log(this.props.form.getFieldsValue());
        this.props.getSlowQueryUsersList(this.props.form.getFieldsValue());
    }

  render() {
    const { getFieldDecorator } = this.props.form;
    let _that = this;
    const { slowquery_user } = this.props;

    return (
      <Layout className="config">
        <Sider >
            <Daassider/>
        </Sider>
        <Content style={{ padding: 0, margin:10, marginBottom: 0, minHeight: window.innerHeight-84 }}>
            <BreadcrumbCustom first="首页" second="慢日志查询用户列表" />
            <div className="form-search-box" style={{ background:'#fff',padding:10, }}>
                <Form layout="inline">
                    <FormItem>
                        <DaasSlowQueryUserCreateModel />
                    </FormItem>
                    <div style={{ float:'right'}}>
                      {/* <FormItem label="">
                            {getFieldDecorator('value')(
                                <Input placeholder="请输入IP地址" />
                            )}
                          </FormItem> */}
                        <FormItem label="">
                            {getFieldDecorator('name')(
                                <Input placeholder="用户名" />
                            )}
                        </FormItem>
                    <FormItem>
                        <Button type="primary" className="btn-search" onClick={this.handleSubmit} style={{marginRight: 10}}>查询</Button>
                        <Button className="btn-search" onClick={ this.handleReset }>重置</Button>
                    </FormItem>
                    </div>
                </Form>
            </div>

            <div style={{ background:'#fff' }}>
                <Table bordered rowKey={record => record.pk} columns={this.columns} dataSource={this.props.usersList.data} />
            </div>
            <div style={{margin: 20}}>
                <span className='num'>共找到 { this.props.total }条结果， 每页显示10条</span>
            </div>
        </Content>
      </Layout>
    );
  }
}

const SlowQueryUser = Form.create()(SlowQueryUserManager);
export default connect(state => state.daasSlowQueryUser, { getSlowQueryUsersList })(SlowQueryUser);
