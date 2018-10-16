import React, { Component } from 'react';
import Daassider from '../../../../components/common/LeftSider/daassider';
import { Layout, Form, Input, Button, Select, Table } from 'antd';
import { connect } from 'react-redux';
import BreadcrumbCustom from '../../../BreadcrumbCustom';
import { getclusters } from '../TableTpl/cluster';
import DaasRdbClusterCreateModel from './clustercreatemodel';
import '../list.less';
import { rdbClusterFetch } from '../../../../containers/Daas/actions/rdb_cluster';

const { Sider, Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;

class DaasRdbClusterManage extends Component {
    constructor(props) {
        super(props);
        this.columns = getclusters.call(this);
        this.state = {
          deviceList: [],
          currentPage: 1,
          pageSize: 10,
          total: 0
        }
    }
    
    componentDidMount () {
        this.props.rdbClusterFetch();
        this.setState({
            deviceList: this.props.clustersList,
        })
    }

    handleSubmit(){
      const clusterCheck=this.props.form.getFieldsValue();
      this.props.rdbClusterFetch(clusterCheck);
    }
    //重置表单
    handleReset = () => {
        this.props.form.resetFields();
        this.props.rdbClusterFetch();
    }


  render() {
    const { getFieldDecorator } = this.props.form;
    let _that = this;

    return (
      <Layout className="config">
        <Sider >
            <Daassider/>
        </Sider>
        <Content style={{ padding: 0, margin:10, marginBottom: 0, minHeight: window.innerHeight-84 }}>
            <BreadcrumbCustom first="关系型数据库" second="集群管理" />
            <div className="form-search-box" style={{ background:'#fff',padding:10, }}>
                <Form layout="inline" >
                    <FormItem>
                        <DaasRdbClusterCreateModel />
                    </FormItem>
                    <div style={{ float:'right'}}>

                        <FormItem label="">
                            {getFieldDecorator('name')(
                                <Input placeholder="集群名称或端口" />
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
                <Table bordered rowKey={record => record.pk} columns={this.columns} dataSource={this.props.clustersList} />
            </div>
            <div style={{margin: 20}}>
                <span className='num'>共找到 { this.props.total }条结果， 每页显示10条</span>
            </div>
        </Content>
      </Layout>
    );
  }
}

const DaasRdbCluster = Form.create()(DaasRdbClusterManage);
export default connect(state=>state.daasRdbCluster,{rdbClusterFetch})(DaasRdbCluster);
