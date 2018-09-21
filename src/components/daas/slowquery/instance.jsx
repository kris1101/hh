import React, { Component } from 'react';
import Daassider from '../../../components/common/LeftSider/daassider';
import { Layout, Form, Input, Button, Select, Table } from 'antd';
import { connect } from 'react-redux';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import { getinstances } from './TableTpl/instance';
// import './user.less';
import DaasSlowQueryInstanceCreateModel from './instance/instancecreatemodel';
import PropTypes from 'prop-types';
import { slowQueryInstatncesFetch } from '../../../containers/Daas/actions/slow_query_instance';

const { Sider, Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;

class SlowQueryInstatnceManager extends Component {
    
    constructor(props) {
        super(props);
        this.columns = getinstances.call(this);
        this.state = {
            deviceList: [],
            currentPage: 1,
            pageSize: 10,
            total: 0
        }
    }
    

    componentDidMount () {
        this.props.slowQueryInstatncesFetch();
    }

    handleReset = () => {
        this.props.form.resetFields();
        this.props.slowQueryInstatncesFetch();
    }

    handleSubmit = (value) => {
        // this.props.history.push({pathname:'/slowquery/add-user', data:value});
        // console.log(this.props.form.getFieldsValue());
        this.props.slowQueryInstatncesFetch(this.props.form.getFieldsValue());
    }

  render() {
    const { getFieldDecorator } = this.props.form;

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
                        <DaasSlowQueryInstanceCreateModel />
                    </FormItem>
                    <div style={{ float:'right'}}>
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
                <Table bordered rowKey={record => record.pk} columns={this.columns} dataSource={this.props.instancesList.data} />
            </div>
            <div style={{margin: 20}}>
                <span className='num'>共找到 { this.props.total }条结果， 每页显示10条</span>
            </div>
        </Content>
      </Layout>
    );
  }
}

const DassSlowQueryInstance = Form.create()(SlowQueryInstatnceManager);
export default connect(state => state.daasSlowQueryInstance, { slowQueryInstatncesFetch })(DassSlowQueryInstance);
