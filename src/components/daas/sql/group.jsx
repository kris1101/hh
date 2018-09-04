import React, { Component } from 'react';
import { Layout, Form, Input, Button, Select, Table } from 'antd';
import { connect } from 'react-redux';

import Daassider from '../../../components/common/LeftSider/daassider';
import { getGroupsList } from '../../../containers/Daas/groups.redux'
import BreadcrumbCustom from '../../BreadcrumbCustom';
import { getgroups } from './TableTpl/group';
import './list.less';

const { Sider, Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;

class DaasGroupManageForm extends Component {
    constructor(props) {
        super(props);
        this.columns = getgroups.call(this);
        console.log(this.props)
    }
    state = {
        currentPage: 1,
        pageSize: 10,
    }
    componentDidMount () {
        this.props.getGroupsList({});
    }
    //重置表单
    handleReset = () => {
        this.props.form.resetFields();
    }

    handleGroupsQuery = () => {
        let value = this.props.form.getFieldsValue()
        this.setState({
            currentPage: 1,
            pageSize: 10 
        })
        let page_args = {page: 1, pagesize: 10}
        page_args.name = value.name !== undefined  ? value.name : "";
        page_args.repository = value.repository !== undefined  ? value.repository : "";
        page_args.tag = value.tag !== undefined  ? value.tag : "";
        page_args.operation = value.operation  !== undefined  ? value.operation : "";
    }


    openAddDevicePage = (value) => {
        this.props.history.push({pathname:'/config/add-device', data:value});
    }

  render() {
    const { getFieldDecorator } = this.props.form;
    let _that = this;
    const pagination = {
          current: this.state.currentPage,
          total: this.props.total,
          pageSize: this.state.pageSize,
          showSizeChanger: true,
          showTotal:(total, range) => `${range[0]}-${range[1]} of ${total} items`,
          showQuickJumper: true,
          //当表格有变化时，如：点击分页  current是当前页面页码
          onChange() {
              let value = _that.props.form.getFieldsValue()
              _that.setState({
                  currentPage: page,
                  pageSize: pageSize
              })
              let page_args = {page, page_size: pageSize}
              page_args.name = value.name !== undefined  ? value.name : "";
              page_args.repository = value.repository !== undefined  ? value.repository : "";
              page_args.tag = value.tag !== undefined  ? value.tag : "";
              page_args.operation = value.operation  !== undefined  ? value.operation : "";
              
          },

          onShowSizeChange(current, size) {
              let value = _that.props.form.getFieldsValue()
              _that.setState({
                  currentPage: 1,
                  pageSize: size 
              })
              let page_args = {page: 1, page_size: size}
              page_args.name = value.name !== undefined  ? value.name : "";
              page_args.repository = value.repository !== undefined  ? value.repository : "";
              page_args.tag = value.tag !== undefined  ? value.tag : "";
              page_args.operation = value.operation  !== undefined  ? value.operation : "";
           
          }
    };

    return (
      <Layout className="config">
        <Sider >
            <Daassider/>
        </Sider>
        <Content style={{ padding: 0, margin:10, marginBottom: 0, minHeight: window.innerHeight-84 }}>
            <BreadcrumbCustom first="关系型数据库" second="慢日志查询组列表" />
            <div className="form-search-box" style={{ background:'#fff',padding:10, }}>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <FormItem>
                        <Button type="primary" onClick={(e) => this.openAddDevicePage('add',e)}>创建邮件组</Button>
                    </FormItem>
                    <div style={{ float:'right'}}>

                        <FormItem label="">
                            {getFieldDecorator('name')(
                                <Input placeholder="组名" />
                            )}
                        </FormItem>
                    <FormItem>
                        <Button type="primary" className="btn-search" htmlType="submit" style={{marginRight: 10}}>查询</Button>
                        <Button className="btn-search" onClick={this.handleReset}>重置</Button>
                    </FormItem>
                    </div>
                </Form>
            </div>

            <div style={{ background:'#fff' }}>
                <Table bordered rowKey={record => record.pk} columns={this.columns} dataSource={this.props.groupsList} pagination={pagination} loading={this.props.loading}/>
            </div>
            <div style={{margin: 20}}>
                <span className='num'>共找到 { this.state.total }条结果， 每页显示10条</span>
            </div>
        </Content>
      </Layout>
    );
  }
}

const DaasGroupManage = Form.create()(DaasGroupManageForm);
export default connect(
  state => state.daasGroups,
  { getGroupsList })(DaasGroupManage);
