import React, { Component } from 'react';
import Daassider from '../../../../components/common/LeftSider/daassider';
import { Layout, Form, Input, Button, Table } from 'antd';
import { connect } from 'react-redux';
import BreadcrumbCustom from '../../../BreadcrumbCustom';
import { gethosts } from '../TableTpl/host';
import DaasRdbHostCreateModel from './hostcreatemodel';
import '../list.less';
import { rdbHostFetch } from '../../../../containers/Daas/actions/rdb_host';

const { Sider, Content } = Layout;
const FormItem = Form.Item;

class DaasRdbHostManage extends Component {
    constructor(props) {
        super(props);
        this.columns = gethosts.call(this);
        this.state = {
          deviceList: [],
          currentPage: 1,
          pageSize: 10,
          total: 0
        }
    }
    
    componentDidMount () {
        this.props.rdbHostFetch();
        this.setState({
            deviceList: this.props.hostsList,
        })
    }

    //查询
    handleSubmit(){
      const hostCheck=this.props.form.getFieldsValue();
      this.props.rdbHostFetch(hostCheck);
    }
    //重置表单
    handleReset = () => {
        this.props.form.resetFields();
        this.props.rdbHostFetch();
    }


  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout className="config">
        <Sider >
            <Daassider/>
        </Sider>
        <Content style={{ padding: 0, margin:10, marginBottom: 0, minHeight: window.innerHeight-84 }}>
            <BreadcrumbCustom first="关系型数据库" second="主机管理" />
            <div className="form-search-box" style={{ background:'#fff',padding:10, }}>
                <Form layout="inline" >
                    <FormItem>
                        <DaasRdbHostCreateModel />
                    </FormItem>
                    <div style={{ float:'right'}}>

                        <FormItem label="">
                            {getFieldDecorator('name')(
                                <Input placeholder="主机名称或ip" />
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
                <Table bordered rowKey={record => record.pk} columns={this.columns} dataSource={this.props.hostsList} />
            </div>
            <div style={{margin: 20}}>
                <span className='num'>共找到 { this.props.total }条结果， 每页显示10条</span>
            </div>
        </Content>
      </Layout>
    );
  }
}

const DaasRdbHost = Form.create()(DaasRdbHostManage);
export default connect(state=>state.daasRdbHost,{rdbHostFetch})(DaasRdbHost);
