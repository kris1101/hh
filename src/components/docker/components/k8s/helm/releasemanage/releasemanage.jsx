import React, { Component } from 'react';
import Dockersider from '../../../../../common/LeftSider/dockersider';
import { message, Layout, Form, Input, Button, Select, Table } from 'antd';
import { connect } from 'react-redux';
import BreadcrumbCustom from '../../../../../BreadcrumbCustom';
import { getHelmRelease } from './TableTpl/tabletpl';
import './releasemanage.less';
import { putAjax, postAjax, deleteAjax } from '../../../../utils/axios'
import { generateformdata  } from '../../../../utils/tools_helper'
import { clearPaasCommonData, getClusterNamespaceList } from '../../../../../../containers/Paas/common/paascommon.redux'
import { getHelmReleaseList, getlocalsearch, getHelmReleaseVersionList, clearReleaseData } from '../../../../../../containers/Paas/k8s/k8shelmrelease.redux'
import { getHelmRepoOptionList } from '../../../../../../containers/Paas/k8s/k8shelmchart.redux'
import { combinekeyvalue } from '../../../../utils/tools_helper'
import K8sClusterSelectForm from '../../../common/k8sclusterselect'
import HelmReleaseUpdateForm from './helmreleaseforms/releaseupdateform'
import HelmReleaseRollBackForm from './helmreleaseforms/releaserollbackform'
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
        HelmReleaseRollBackVisible: false,
        HelmReleaseRollBackConfirmLoading: false,
        HelmReleaseDeleteVisible: false,
        HelmReleaseDeleteConfirmLoading: false,
        clusterId: ""
    }

    componentDidMount () {
        this.props.clearPaasCommonData();
        this.props.clearReleaseData();
        message.info("请在右上角选择集群查看");
    }

    //重置表单
    handleReset = () => {
        this.props.form.resetFields();
    }

    showHelmReleaseUpdateModel = (releaseinfo) => {
        console.log(releaseinfo);
        this.setState({HelmReleaseUpdateVisible: true}) 
        this.props.getHelmRepoOptionList();        
        this.helmReleaseUpdateFormRef.setState({chartinfo: releaseinfo.chart, releasename: releaseinfo.name})
    }

    showHelmReleaseRollBackModel = (releaseinfo) => {
        this.setState({HelmReleaseRollBackVisible: true}) 
        this.props.getHelmReleaseVersionList({release_name: releaseinfo.name}, {'Cluster-Id': this.state.clusterId});        
        this.helmReleaseRollBackFormRef.setState({releasename: releaseinfo.name, releaseversion: releaseinfo.revision})
    }

    showHelmReleaseDeleteModel = (releaseinfo) => {
        console.log(releaseinfo);
        this.setState({HelmReleaseDeleteVisible: true}) 
        this.helmReleaseDeleteFormRef.setState({releasename: releaseinfo.name})
    }

    handleHelmReleaseUpdateCancel = () => {
        this.setState({HelmReleaseUpdateVisible: false}) 
        this.setState({HelmReleaseUpdateConfirmLoading: false})
        const form = this.helmReleaseUpdateFormRef.props.form;
        this.helmReleaseUpdateFormRef.setState({values: false, valuesfile:false})
        form.resetFields();
    }

    handleHelmReleaseRollBackCancel = () => {
        this.setState({HelmReleaseRollBackVisible: false}) 
        this.setState({HelmReleaseRollBackConfirmLoading: false})
        const form = this.helmReleaseRollBackFormRef.props.form;
        form.resetFields();
    }

    handleHelmReleaseDeleteCancel = () => {
        this.setState({HelmReleaseDeleteVisible: false}) 
        this.setState({HelmReleaseDeleteConfirmLoading: false})
        const form = this.helmReleaseDeleteFormRef.props.form;
        console.log(this.helmReleaseDeleteFormRef.state)
        form.resetFields();
    }

    handleHelmReleaseListWithArgs = () => {
       if(!this.state.clusterId){
         message.info("请在右上角选择集群查看");
         return;   
       }
       let value = this.props.form.getFieldsValue()
       let query_args ={}
       query_args.namespace = value.namespace !== undefined ? value.namespace : "";
       query_args.status_codes = value.status_codes !== undefined ? value.status_codes.join(",") : "";
       console.log(this.state.clusterId);
       this.props.getHelmReleaseList(query_args, {'Cluster-Id': this.state.clusterId});
    }

    handleHelmReleaseUpdate = () => {
      const form = this.helmReleaseUpdateFormRef.props.form;
      form.validateFields((err, formvalues) => {
        if (err) {
          return;
        }   
        let update_args = {}; 
        update_args.values = JSON.stringify({});
        if (this.helmReleaseUpdateFormRef.state.values){
            let values_result = combinekeyvalue(formvalues.chartkeys, formvalues.chartvalues)
            if (values_result[0] === 1){ 
              message.error("values生成错误")
              return
            }   
            update_args.values = JSON.stringify(values_result[1])
        }   
        update_args.valuesfile = ''; 
        if (this.helmReleaseUpdateFormRef.state.valuesfile){
            update_args.valuesfile = this.helmReleaseUpdateFormRef.editor.getValue();
        }   
        if(formvalues.chartname !== this.helmReleaseUpdateFormRef.state.chartinfo.split(" ")[0]){
                message.error("chart名称不匹配"); 
                return;
        }
        update_args.dry_run = formvalues.dry_run;
        update_args.releasename = this.helmReleaseUpdateFormRef.state.releasename;
        update_args.force = formvalues.force; 
        update_args.recreate = formvalues.recreate; 
        update_args.reset_values = formvalues.reset_values; 
        update_args.reuse_values = formvalues.reuse_values; 
        update_args.repo_id = formvalues.repo_id; 
        update_args.chartname = formvalues.chartname; 
        update_args.chartversions = formvalues.chartversions; 
        const _that = this; 
        this.setState({HelmReleaseUpdateConfirmLoading: true})
        postAjax('/helm/helmrelease/', generateformdata(update_args), function(res){
            if(res.data.code === 0){ 
                message.success(res.data.msg); 
                _that.setState({HelmReleaseUpdateConfirmLoading: false})
                form.resetFields();
                _that.setState({ HelmReleaseUpdateVisible: false }); 
                _that.handleHelmReleaseListWithArgs();
            }else{
                message.error(res.data.msg) 
                _that.setState({HelmReleaseUpdateConfirmLoading: false})
            }   
        }, {'Cluster-Id': _that.ClusterSelectFormRef.props.form.getFieldsValue().clustername})  
      }); 
    }

    handleHelmReleaseRollBack = () => {
      const form = this.helmReleaseRollBackFormRef.props.form;
      form.validateFields((err, formvalues) => {
        if (err) {
          return;
        }   
        let rollback_args = {}; 
        if(formvalues.version === this.helmReleaseRollBackFormRef.state.releaseversion){
                message.error("版本未发生变化"); 
                return;
        }
        rollback_args.dry_run = formvalues.dry_run;
        rollback_args.release_name = this.helmReleaseRollBackFormRef.state.releasename;
        rollback_args.force = formvalues.force; 
        rollback_args.recreate = formvalues.recreate; 
        rollback_args.disable_hooks = formvalues.disable_hooks; 
        rollback_args.version = formvalues.version; 
        const _that = this; 
        this.setState({HelmReleaseRollBackConfirmLoading: true})
        putAjax('/helm/helmrelease/', generateformdata(rollback_args), function(res){
            if(res.data.code === 0){ 
                message.success(res.data.msg); 
                _that.setState({HelmReleaseRollBackConfirmLoading: false})
                form.resetFields();
                _that.setState({ HelmReleaseRollBackVisible: false }); 
                _that.handleHelmReleaseListWithArgs();
            }else{
                message.error(res.data.msg) 
                _that.setState({HelmReleaseRollBackConfirmLoading: false})
            }   
        }, {'Cluster-Id': _that.ClusterSelectFormRef.props.form.getFieldsValue().clustername})  
      }); 
    }

    handleHelmReleaseDelete = () => {
      const form = this.helmReleaseDeleteFormRef.props.form;
      let purge = form.getFieldsValue().purge;
      let name = this.helmReleaseDeleteFormRef.state.releasename; 
      this.setState({HelmReleaseDeleteConfirmLoading: true})
      const _that = this;
      deleteAjax('/helm/helmrelease/', "name=" + name +"&purge=" + purge, function(res){
          if(res.data.code === 0){ 
              _that.setState({HelmReleaseDeleteConfirmLoading: false})
              form.resetFields();
              _that.setState({ HelmReleaseDeleteVisible: false }); 
              _that.handleHelmReleaseListWithArgs();
          }else{
              message.error(res.data.msg) 
              _that.setState({HelmReleaseDeleteConfirmLoading: false})
          }   
      }, {'Cluster-Id': _that.ClusterSelectFormRef.props.form.getFieldsValue().clustername})
    }

    saveHelmReleaseUpdateFormRef = (formRef) => {
      this.helmReleaseUpdateFormRef = formRef;
    } 

    saveHelmReleaseRollBackFormRef = (formRef) => {
      this.helmReleaseRollBackFormRef = formRef;
    } 

    saveHelmReleaseDeleteFormRef = (formRef) => {
      this.helmReleaseDeleteFormRef = formRef;
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
        				<HelmReleaseRollBackForm
        				  wrappedComponentRef={this.saveHelmReleaseRollBackFormRef}
        				  visible={this.state.HelmReleaseRollBackVisible}
                          confirmLoading={this.state.HelmReleaseRollBackConfirmLoading}
        				  onCancel={this.handleHelmReleaseRollBackCancel}
        				  onCreate={this.handleHelmReleaseRollBack}
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
                <Table className="table-margin" bordered loading={this.props.loading} rowKey={record => record.id} columns={this.columns} dataSource={this.props.helmReleaseList} />
            </div>
        </Content>
      </Layout>
    );
  }
}


const HelmReleaseManage = Form.create()(HelmReleaseForm);
export default connect(
  state => {return {...state.helmRelease, ...state.PaasCommon}},
  {clearReleaseData, getHelmReleaseVersionList, getHelmRepoOptionList, getlocalsearch, getClusterNamespaceList, getHelmReleaseList, clearPaasCommonData })(HelmReleaseManage);
