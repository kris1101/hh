import React, { Component } from 'react';
import Daassider from '../../../../components/common/LeftSider/daassider';
import { Layout, Form, Input, Button, Select, Table } from 'antd';
import { connect } from 'react-redux';
import BreadcrumbCustom from '../../../BreadcrumbCustom';
import { getprojects } from '.././TableTpl/project';
import '.././list.less';
import { rdbProjectFetch } from '../../../../containers/Daas/actions/rdb_project';
import DaasRdbProjectCreateModel from './projectcreatemodel';

const { Sider, Content } = Layout;
const FormItem = Form.Item;

class DaasProjectManageForm extends Component {
    constructor(props) {
        super(props);
        this.columns = getprojects.call(this);
        this.state = {
            deviceList: [],
            currentPage: 1,
            pageSize: 10,
            total: 0
        }
    }
    
    componentDidMount () {
        this.props.rdbProjectFetch();
        this.setState({
            deviceList: this.props.instancesList,
        })
    }
    //重置表单
    handleReset = () => {
        this.props.form.resetFields();
        this.props.rdbProjectFetch();
    }

    handleCheck(){
        const projectObj = this.props.form.getFieldsValue();
        this.props.rdbProjectFetch(projectObj);
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
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <FormItem>
                        <DaasRdbProjectCreateModel />
                    </FormItem>
                    <div style={{ float:'right'}}>
                        <FormItem label="">
                            {getFieldDecorator('name')(
                                <Input placeholder="实例名称" />
                            )}
                        </FormItem>
                    <FormItem>
                        <Button type="primary" className="btn-search" onClick={this.handleCheck.bind(this)} style={{marginRight: 10}}>查询</Button>
                        <Button className="btn-search" onClick={this.handleReset}>重置</Button>
                    </FormItem>
                    </div>
                </Form>
            </div>

            <div style={{ background:'#fff' }}>
                <Table bordered rowKey={record => record.pk} columns={this.columns} dataSource={this.props.projectsList} />
            </div>
            <div style={{margin: 20}}>
                <span className='num'>共找到 { this.props.total }条结果， 每页显示10条</span>
            </div>
        </Content>
      </Layout>
    );
  }
}

const DaasProjectManage = Form.create()(DaasProjectManageForm);
export default connect(state=>state.daasRdbProject,{rdbProjectFetch})(DaasProjectManage);
