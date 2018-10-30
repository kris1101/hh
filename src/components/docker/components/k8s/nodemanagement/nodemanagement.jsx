import React, { Component } from 'react';
import Dockersider from '../../../../common/LeftSider/dockersider';
import {message,  Layout, Form, Input, Button, Table } from 'antd';
import K8sClusterSelectForm from '../../common/k8sclusterselect'
import { connect } from 'react-redux';
import BreadcrumbCustom from '../../../../BreadcrumbCustom';
import { getNode } from './TableTpl/tabletpl';
import { getNodeList, clearNodeData, clearLabelData, getlocalsearch } from '../../../../../containers/Paas/k8s/k8snodemanagement.redux';
import './nodemanagement.less';
import NodeLabelForm from './nodemanagementforms/nodelabel' 
import NodeLabelAddForm from './nodemanagementforms/nodelabeladdform' 
import { putAjax } from '../../../utils/axios'
import { generateformdata } from '../../../utils/tools_helper'

const { Sider, Content } = Layout;
const FormItem = Form.Item;

class NodeForm extends Component {

    constructor(props) {
        super(props);
        this.columns = getNode.call(this);
    }

    state = {
      nodeLabelVisible: false,
      nodeLabelCreateVisibel: false,
      nodeLabelCreateConfirmLoading:false 
    }

    componentDidMount () {
      this.props.clearNodeData();
      message.info("请右上角选择集群");
    }

    //重置表单
    handleReset = () => {
        this.props.form.resetFields();
    }

    saveclusterselectFormRef = (formRef) => {
       this.ClusterSelectFormRef = formRef;
    }

    handleNodeLabelCancel = () => {
        this.props.clearLabelData();
        this.setState({nodeLabelVisible: false}) 
        this.NodeLabelFormRef.setState({nodename: null, clusterid:null});
    }

    handleNodeLabelAddCancel = () => {
        this.setState({nodeLabelCreateVisibel: false}) 
        this.NodeLabelAddFormRef.setState({nodename: null, clusterid:null});
        this.NodeLabelAddFormRef.props.form.resetFields();
        
    }

    handlelabelcreate = () => {
        this.setState({nodeLabelCreateVisibel: true}) 
        this.NodeLabelAddFormRef.setState({nodename: this.NodeLabelFormRef.state.nodename, clusterid: this.NodeLabelFormRef.state.clusterid});
    }

    handlelocalsearch = () => {
       let value = this.props.form.getFieldsValue()
       let nodename = value.nodename !== undefined ? value.nodename : "";
       this.props.getlocalsearch(nodename);
    }

    handlelabeladd = () => {
       const form = this.NodeLabelAddFormRef.props.form;
       console.log(form.getFieldsValue())
       form.validateFields((err, values) => {
         if (err) {
           return;
         }
         this.setState({nodeLabelCreateConfirmLoading: true})
         const _that = this;
         let labeladdargs = {};
         labeladdargs.key = values.key;
         labeladdargs.value = values.value;
         labeladdargs.name = this.NodeLabelAddFormRef.state.nodename;
         putAjax('/k8s/node/label/', generateformdata(labeladdargs), function(res){
             if(res.data.code === 0){
                 message.success("添加成功") 
                 _that.setState({nodeLabelCreateConfirmLoading: false})
                 form.resetFields();
                 _that.setState({ nodeLabelCreateVisibel: false });
                 _that.NodeLabelFormRef.handlegetupdate();
             }else{
                 message.error(res.data.msg) 
                 _that.setState({nodeLabelCreateConfirmLoading: false})
             }
         }, {"Cluster-Id": this.NodeLabelAddFormRef.state.clusterid})
       });
    }

    showNodeLabelModel = (record) => {
        this.setState({nodeLabelVisible: true}) 
        this.NodeLabelFormRef.handleshow(record, this.ClusterSelectFormRef.props.form.getFieldValue("clustername"));
    }
  
    saveNodeLabelFormRef= (formRef) => {
       this.NodeLabelFormRef = formRef;
    }

    saveNodeLabelAddFormRef= (formRef) => {
       this.NodeLabelAddFormRef = formRef;
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
                        <Button type="primary" className="btn-search" style={{marginRight: 10}} onClick={this.handlelocalsearch}>查询</Button>
                        <Button className="btn-search" onClick={this.handleReset}>重置</Button>
                    </FormItem>
                    <NodeLabelForm 
        			   wrappedComponentRef={this.saveNodeLabelFormRef}
                       visible={this.state.nodeLabelVisible} 
                       handleCancel={this.handleNodeLabelCancel}
                       handlecreate={this.handlelabelcreate}
                    />
                    <NodeLabelAddForm 
        			   wrappedComponentRef={this.saveNodeLabelAddFormRef}
                       visible={this.state.nodeLabelCreateVisibel} 
                       confirmloading={this.state.nodeLabelCreateConfirmLoading}
                       handleCancel={this.handleNodeLabelAddCancel}
                       handleok={this.handlelabeladd}
                    />
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
  { clearLabelData, getNodeList, clearNodeData, getlocalsearch })(NodeManagementForm);
