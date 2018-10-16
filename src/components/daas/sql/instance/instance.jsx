import React, { Component } from 'react';
import Daassider from '../../../../components/common/LeftSider/daassider';
import { Layout, Form, Input, Button, Select, Table } from 'antd';
import { connect } from 'react-redux';
import BreadcrumbCustom from '../../../BreadcrumbCustom';
import { getinstances } from '.././TableTpl/instance';
import '.././list.less';
import { rdbInstanceFetch } from '../../../../containers/Daas/actions/rdb_instance';
import DaasRdbInstanceCreateModel from './instancecreatemodel';

const { Sider, Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;

class DaasInstanceManageForm extends Component {
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
        this.props.rdbInstanceFetch();
        this.setState({
            deviceList: this.props.instancesList,
        })
    }

    handleSubmit(){
        const instanceObj = this.props.form.getFieldsValue();
        this.props.rdbInstanceFetch(instanceObj)
    }
    //重置表单
    handleReset = () => {
        this.props.form.resetFields();
        this.props.rdbInstanceFetch();
    }

    openAddDevicePage = (value) => {
        this.props.history.push({pathname:'/config/add-device', data:value});
    }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Layout className="config">
        <Sider >
            <Daassider/>
        </Sider>
        <Content style={{ padding: 0, margin:10, marginBottom: 0, minHeight: window.innerHeight-84 }}>
            <BreadcrumbCustom first="关系型数据库" second="实例" />
            <div className="form-search-box" style={{ background:'#fff',padding:10, }}>
                <Form layout="inline">
                    <FormItem>
                        <DaasRdbInstanceCreateModel instancelist={this.props.instancesList} />
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={(e) => this.openAddDevicePage('add',e)}>新建主从</Button>
                    </FormItem>
                    <div style={{ float:'right'}}>
                        <FormItem label="">
                            {getFieldDecorator('name')(
                                <Input placeholder="实例名称" />
                            )}
                        </FormItem>
                    <FormItem>
                        <Button type="primary" className="btn-search" onClick={this.handleSubmit.bind(this)} style={{marginRight: 10}}>查询</Button>
                        <Button className="btn-search" onClick={this.handleReset}>重置</Button>
                    </FormItem>
                    </div>
                </Form>
            </div>

            <div style={{ background:'#fff' }}>
                <Table bordered rowKey={record => record.pk} columns={this.columns} dataSource={this.props.instancesList} />
            </div>
            <div style={{margin: 20}}>
                <span className='num'>共找到 { this.props.total }条结果， 每页显示10条</span>
            </div>
        </Content>
      </Layout>
    );
  }
}

const DaasInstanceManage = Form.create()(DaasInstanceManageForm);
export default connect(state=>state.daasRdbInstance,{rdbInstanceFetch})(DaasInstanceManage);
