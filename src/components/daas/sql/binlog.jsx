import React, { Component } from 'react';
import Daassider from '../../../components/common/LeftSider/daassider';
import { Layout, Form, Input, Button, Table } from 'antd';
import { connect } from 'react-redux';
import BreadcrumbCustom from '../../BreadcrumbCustom';
import { getbinlogs } from './TableTpl/binlog';
import './list.less';
import { rdbInstanceBinlogFetch } from '../../../containers/Daas/actions/rdb_binlog_info';
import DaasRdbInstanceCreateModel from './instance/instancecreatemodel';

const { Sider, Content } = Layout;
const FormItem = Form.Item;

class DaasBinlogManageForm extends Component {
    constructor(props) {
        super(props);
        this.columns = getbinlogs.call(this);
    }
    state = {
        deviceList: [],
        currentPage: 1,
        pageSize: 10,
        total: 0
    }
    componentDidMount () {
        this.props.rdbInstanceBinlogFetch();
    }
    //重置表单
    handleReset = () => {
        this.props.form.resetFields();
        this.props.rdbInstanceBinlogFetch();
    }

    openAddDevicePage = (value) => {
        this.props.history.push({pathname:'/config/add-device', data:value});
    }

    handleSubmit = (value) => {
        this.props.rdbInstanceBinlogFetch(this.props.form.getFieldsValue());
    }

  render() {
    const { getFieldDecorator } = this.props.form;
    let _that = this;
    const pagination = {
          current: this.state.currentPage,
          total: this.state.total,
          pageSize: this.state.pageSize,
          showQuickJumper: true,
          //当表格有变化时，如：点击分页  current是当前页面页码
          onChange() {
              let value = _that.props.form.getFieldsValue()
              _that.setState({
                  currentPage: this.current,
              }, () => {
                  _that.getDeviceList(value)
              })
          }
    };

    return (
      <Layout className="config">
        <Sider >
            <Daassider/>
        </Sider>
        <Content style={{ padding: 0, margin:10, marginBottom: 0, minHeight: window.innerHeight-84 }}>
            <BreadcrumbCustom first="关系型数据库" second="二进制文件备份进程列表" />
            <div className="form-search-box" style={{ background:'#fff',padding:10, }}>
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <FormItem>
                      {/*<Button type="primary" onClick={(e) => this.openAddDevicePage('add',e)}>新建实例</Button>*/}

                       <DaasRdbInstanceCreateModel instancelist={this.props.instancesList} />
                    </FormItem>
                    <div style={{ float:'right'}}>

                        <FormItem label="">
                            {getFieldDecorator('host')(
                                <Input placeholder="宿主机ip" />
                            )}
                        </FormItem>
                        <FormItem label="">
                            {getFieldDecorator('port')(
                                <Input placeholder="端口号" />
                            )}
                        </FormItem>
                    <FormItem>
                        <Button type="primary" className="btn-search" onClick={this.handleSubmit} style={{marginRight: 10}}>查询</Button>
                        <Button className="btn-search" onClick={this.handleReset}>重置</Button>
                    </FormItem>
                    </div>
                </Form>
            </div>

            <div style={{ background:'#fff' }}>
                <Table bordered rowKey={record => record.pk} columns={this.columns} dataSource={this.props.binlogsList.data} pagination={pagination} />
            </div>
            <div style={{margin: 20}}>
                <span className='num'>共找到 { this.props.total }条结果， 每页显示10条</span>
            </div>
        </Content>
      </Layout>
    );
  }
}

const DaasBinlogManage = Form.create()(DaasBinlogManageForm);
export default connect((state) => state.RDBInstanceBinlog, {rdbInstanceBinlogFetch})(DaasBinlogManage);
