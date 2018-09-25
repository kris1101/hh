import React, { Component } from 'react';
import Dockersider from '../../../../../common/LeftSider/dockersider';
import { message, Layout, Form, Input, Button, Select, Table } from 'antd';
import { connect } from 'react-redux';
import BreadcrumbCustom from '../../../../../BreadcrumbCustom';
import { getHelmRelease } from './TableTpl/tabletpl';
import './releasemanage.less';
import { postAjax } from '../../../../utils/axios'
import { generateformdata  } from '../../../../utils/tools_helper'
import { clearData, getClusterNamespaceList } from '../../../../../../containers/Paas/common/paascommon.redux'
import { getHelmReleaseList, getlocalsearch } from '../../../../../../containers/Paas/k8s/k8shelmrelease.redux'
import { combinekeyvalue } from '../../../../utils/tools_helper'
import K8sClusterSelectForm from '../../../common/k8sclusterselect'
import HelmReleaseUpdateForm from './helmreleaseforms/releaseupdateform'
import HelmReleaseDeleteForm from './helmreleaseforms/releasedeleteform'

const { Sider, Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;
const Search = Input.Search;

class HelmReleaseForm extends Component {
    constructor(props) {
        super(props);
        this.columns = getHelmRelease.call(this);
    }
    state = {
        HelmReleaseUpdateVisible: false,
        HelmReleaseUpdateConfirmLoading: false,
        HelmReleaseDeleteVisible: false,
        HelmReleaseDeleteConfirmLoading: false,
        clusterId: ""
    }

    componentDidMount () {
        this.props.clearData();
        message.info("请在右上角选择集群查看");
    }

    //重置表单
    handleReset = () => {
        this.props.form.resetFields();
    }

    showHelmReleaseUpdateModel = (releaseinfo) => {
        console.log(releaseinfo);
        this.setState({HelmReleaseUpdateVisible: true}) 
        this.props.getUserClusterList();
        this.helmchartDeployFormRef.setState({releaseinfo})
    }

    showHelmReleaseDeleteModel = (releaseinfo) => {
        console.log(releaseinfo);
        this.setState({HelmReleaseDeleteVisible: true}) 
        this.helmchartDeleteFormRef.setState({releasename: releaseinfo.name})
    }

    handleHelmReleaseUpdateCancel = () => {
        this.setState({HelmReleaseUpdateVisible: false}) 
        this.setState({HelmReleaseUpdateConfirmLoading: false})
        const form = this.helmchartUpdateFormRef.props.form;
        this.helmchartDeployFormRef.setState({values: false, valuesfile:false})
        form.resetFields();
        this.props.clearData();
    }

    handleHelmReleaseDeleteCancel = () => {
        this.setState({HelmReleaseDeleteVisible: false}) 
        this.setState({HelmReleaseDeleteConfirmLoading: false})
        const form = this.helmchartDeleteFormRef.props.form;
        console.log(this.helmchartDeleteFormRef.state)
        form.resetFields();
    }

    handleHelmReleaseListWithArgs = () => {
       let value = this.props.form.getFieldsValue()
       let query_args ={}
       query_args.namespace = value.namespace !== undefined ? value.namespace : "";
       query_args.status_codes = value.status_codes !== undefined ? value.status_codes.join(",") : "";
       console.log(this.state.clusterId);
       this.props.getHelmReleaseList(query_args, {'Cluster-Id': this.state.clusterId});
    }

    handleHelmReleaseUpdate = () => {
      const form = this.helmchartUpdateFormRef.props.form;
      form.validateFields((err, formvalues) => {
        if (err) {
          return;
        }
      });
    }

    handleHelmReleaseDelete = () => {
      const form = this.helmchartDeleteFormRef.props.form;
      console.log(form.getFieldsValue())
    }

    saveHelmReleaseUpdateFormRef = (formRef) => {
      this.helmchartDeployFormRef = formRef;
    } 

    saveHelmReleaseDeleteFormRef = (formRef) => {
      this.helmchartDeleteFormRef = formRef;
    } 

    saveclusterselectFormRef = (formRef) => {
       this.ClusterSelectFormRef = formRef;
    }

    handleClusterSelect = (value) => { 
        this.props.getHelmReleaseList({},{'Cluster-Id': value}) 
        this.props.getClusterNamespaceList({'Cluster-Id': value}) 
        this.setState({clusterId: value});
    }

    handlelocalsearch = () => {
       let value = this.props.form.getFieldsValue()
       let release_name = value.release_name !== undefined ? value.release_name : "";
       this.props.getlocalsearch(release_name);
    }

    handleReleaseQuery = () => {
       console.log("releasequery");
    }

    handleStateSelect = ( value	) => {
        console.log(value);
    }

  render() {
    const { getFieldDecorator } = this.props.form;
    const stateList = ["DEPLOYED", "UNKNOWN", "DELETED", "SUPERSEDED", "FAILED", "DELETING", "PENDING_INSTALL", "PENDING_UPGRADE", "PENDING_ROLLBACK"];

    return (
      <Layout className="config">
        <Sider>
            <Dockersider/>
        </Sider>
        <Content style={{ padding: 0, margin:10, marginBottom: 0, minHeight: window.innerHeight-84 }}>
            <BreadcrumbCustom first="helm管理" second="release管理" />
            <K8sClusterSelectForm 
              handleSelctEvent={this.handleClusterSelect}
              wrappedComponentRef={this.saveclusterselectFormRef}
            />
            <div className="form-search-box" style={{ background:'#fff',padding:10, }}>
                <Form layout="inline">
                    <FormItem>
                        <FormItem label="">
                            {getFieldDecorator('release_name')(
                                <Search
                                   placeholder="release名称查找"
                                   onSearch={this.handlelocalsearch}
                                   style={{ width: 200 }}
                                />      
                            )}
                        </FormItem>
        				<HelmReleaseUpdateForm
        				  wrappedComponentRef={this.saveHelmReleaseUpdateFormRef}
        				  visible={this.state.HelmReleaseUpdateVisible}
                          confirmLoading={this.state.HelmReleaseUpdateConfirmLoading}
        				  onCancel={this.handleHelmReleaseUpdateCancel}
        				  onCreate={this.handleHelmReleaseUpdate}
        				/>
        				<HelmReleaseDeleteForm
        				  wrappedComponentRef={this.saveHelmReleaseDeleteFormRef}
        				  visible={this.state.HelmReleaseDeleteVisible}
                          confirmLoading={this.state.HelmReleaseDeleteConfirmLoading}
        				  onCancel={this.handleHelmReleaseDeleteCancel}
        				  onCreate={this.handleHelmReleaseDelete}
        				/>
                    </FormItem>
                    <div style={{ float:'right'}}>
                        <FormItem label="">
                            {getFieldDecorator('status_codes')(
                                    <Select 
                                      mode="multiple"
                                      maxTagCount={1}
                                      style={{ width: 255 }} 
                                      placeholder="release状态"
                                      onSelect={this.handleStateSelect}
                                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                      showSearch
                                      >   
                                        {stateList.map(function(value){return (<Option key={value} value={value}>{value}</Option>)})}
                                    </Select>
                            )}
                        </FormItem>
                        <FormItem label="">
                            {getFieldDecorator('namespace')(
                                    <Select 
                                      style={{ width: 255 }} 
                                      placeholder="命名空间"
                                      onSelect={this.handleStateSelect}
                                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                      showSearch
                                      >   
                                        {this.props.namespaceList.map(function(value){return (<Option key={value.id} value={value.text}>{value.text}</Option>)})}
                                    </Select>
                            )}
                        </FormItem>
                    <FormItem style={{marginRight: 0}}>
                        <Button type="primary" className="btn-search" style={{marginRight: 10}} onClick={this.handleHelmReleaseListWithArgs}>查询</Button>
                        <Button className="btn-search" onClick={this.handleReset}>重置</Button>
                    </FormItem>
                    </div>
                </Form>
            </div>

            <div style={{ background:'#fff' }}>
                <Table bordered loading={this.props.loading} rowKey={record => record.id} columns={this.columns} dataSource={this.props.helmReleaseList} />
            </div>
        </Content>
      </Layout>
    );
  }
}


const HelmReleaseManage = Form.create()(HelmReleaseForm);
export default connect(
  state => {return {...state.helmRelease, ...state.PaasCommon}},
  {getlocalsearch, getClusterNamespaceList, getHelmReleaseList, clearData })(HelmReleaseManage);
