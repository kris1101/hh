import React, { Component } from 'react';
import Dockersider from '../../../../common/LeftSider/dockersider';
import {message,  Layout, Form, Input, Button, Table } from 'antd';
import K8sClusterSelectForm from '../../common/k8sclusterselect'
import { connect } from 'react-redux';
import BreadcrumbCustom from '../../../../BreadcrumbCustom';
import { getNode } from './TableTpl/tabletpl';
import { getNodeList, clearNodeData } from '../../../../../containers/Paas/k8s/k8snodemanagement.redux';
import './nodemanagement.less';

const { Sider, Content } = Layout;
const FormItem = Form.Item;

class NodeForm extends Component {
    constructor(props) {
        super(props);
        this.columns = getNode.call(this);
    }

    state = {
    }

    componentDidMount () {
      this.props.clearNodeData();
      message.info("请右上角选择集群");
    }

    //重置表单
    handleReset = () => {
        this.props.form.resetFields();
        this.ClusterSelectFormRef.handleReset();
    }

    saveclusterselectFormRef = (formRef) => {
       this.ClusterSelectFormRef = formRef;
    }

    handleClusterSelect = (value) => { 
        console.log(value);
        this.props.getNodeList({}, {'Cluster-Id': value});
    }


  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Layout className="config">
        <Sider>
            <Dockersider/>
        </Sider>
        <Content style={{ padding: 0, margin:10, marginBottom: 0, minHeight: window.innerHeight-84 }}>
            <BreadcrumbCustom first="基础设施" second="节点治理" />
            <K8sClusterSelectForm 
              handleSelctEvent={this.handleClusterSelect}
              wrappedComponentRef={this.saveclusterselectFormRef}
            />
            <div className="form-search-box" style={{ background:'#fff',padding:10, overflow: 'hidden'}}>
                <Form layout="inline">
                    <div style={{ float:'right'}}>
                        <FormItem label="">
                            {getFieldDecorator('nodename')(
                                <Input placeholder="节点名称" />
                            )}
                        </FormItem>
                    <FormItem style={{marginRight: 0}}>
                        <Button type="primary" className="btn-search" style={{marginRight: 10}}>查询</Button>
                        <Button className="btn-search" onClick={this.handleReset}>重置</Button>
                    </FormItem>
                    </div>
                </Form>
            </div>

            <div style={{ background:'#fff' }}>
                <Table className="table-margin"  bordered loading={this.props.loading} rowKey={record => record.metadata.name} columns={this.columns} dataSource={this.props.nodeList} />
            </div>
        </Content>
      </Layout>
    );
  }
}


const NodeManagementForm = Form.create()(NodeForm);
export default connect(
  state => state.k8sNode,
  { getNodeList, clearNodeData })(NodeManagementForm);
