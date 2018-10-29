import React, { Component } from 'react';
import Dockersider from '../../../../common/LeftSider/dockersider';
import { message, Layout, Form, Input, Button, Table, Icon } from 'antd';
import K8sClusterSelectForm from '../../common/k8sclusterselect'
// import { connect } from 'react-redux';
import BreadcrumbCustom from '../../../../BreadcrumbCustom';
import { getApplication } from './TableTpl/tabletpl';
import './appmanage.less';
import { postAjax } from '../../../utils/axios'
import { generateformdata, combinekeyvalue  } from '../../../utils/tools_helper'
import AppCreateForm from './appmanageforms/appcreateform'

const { Sider, Content } = Layout;
const FormItem = Form.Item;

class AppManageForm extends Component {
    constructor(props) {
        super(props);
        this.columns = getApplication.call(this);
    }
    state = {
        AppCreateVisible: false,
        AppCreateConfirmLoading: false,
    }

    componentDidMount () {
    }

    //重置表单
    handleReset = () => {
        this.props.form.resetFields();
        this.ClusterSelectFormRef.handleReset();
    }

    showAppCreateModel = () => {
        this.setState({AppCreateVisible: true}) 
    }

    handleAppCreateCancel = () => {
        this.setState({AppCreateVisible: false}) 
        this.setState({AppCreateConfirmLoading: false})
        const form = this.appCreateFormRef.props.form;
        this.appCreateFormRef.setState({values: false, valuesfile:false})
        form.resetFields();
    }

    handleAppCreate = () => {
      const form = this.appCreateFormRef.props.form;
      form.validateFields((err, formvalues) => {
        if (err) {
          return;
        }
        let deploy_args = {};
        deploy_args.values = JSON.stringify({});
        if (this.appCreateFormRef.state.values){
            let values_result = combinekeyvalue(formvalues.chartkeys, formvalues.chartvalues)
            if (values_result[0] === 1){
              message.error("values生成错误")
              return
            }
            deploy_args.values = JSON.stringify(values_result[1])
        }
        deploy_args.valuesfile = '';
        if (this.appCreateFormRef.state.valuesfile){
            deploy_args.valuesfile = this.appCreateFormRef.editor.getValue();
        }
        deploy_args.dry_run = formvalues.dry_run;
        deploy_args.disable_crd_hook = formvalues.disable_crd_hook; 
        deploy_args.disable_hooks = formvalues.disable_hooks; 
        deploy_args.reuse_name = formvalues.reuse_name; 
        deploy_args.repo_id = formvalues.repo_id; 
        deploy_args.version = formvalues.version; 
        deploy_args.release_name = formvalues.release_name; 
        deploy_args.namespace = formvalues.namespace; 
        deploy_args.cluster = formvalues.cluster; 
        const _that = this; 
        this.setState({AppCreateConfirmLoading: true})
        postAjax('/helm/helmchart/', generateformdata(deploy_args), function(res){
            if(res.data.code === 0){
                message.success(res.data.msg); 
                _that.setState({AppCreateConfirmLoading: false})
                form.resetFields();
                _that.setState({ AppCreateVisible: false });
            }else{
                message.error(res.data.msg) 
                _that.setState({AppCreateConfirmLoading: false})
            }
        })
      });
    }

    saveAppCreateFormRef = (formRef) => {
      this.appCreateFormRef = formRef;
    } 

    saveclusterselectFormRef = (formRef) => {
       this.ClusterSelectFormRef = formRef;
    }

    handleClusterSelect = (value) => { 
        console.log(value);
    }


  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Layout className="config">
        <Sider>
            <Dockersider/>
        </Sider>
        <Content style={{ padding: 0, margin:10, marginBottom: 0, minHeight: window.innerHeight-84 }}>
            <BreadcrumbCustom first="应用交付" second="应用" />
            <K8sClusterSelectForm 
              handleSelctEvent={this.handleClusterSelect}
              wrappedComponentRef={this.saveclusterselectFormRef}
            />
            <div className="form-search-box" style={{ background:'#fff',padding:10, }}>
                <Form layout="inline">
                    <FormItem>
                        <FormItem label="">
                          <Button type="primary" onClick={this.showAppCreateModel}><Icon type="plus" style={{color: "white"}}/>新增应用</Button>
                        </FormItem>
        				<AppCreateForm
        				  wrappedComponentRef={this.saveAppCreateFormRef}
        				  visible={this.state.AppCreateVisible}
                          confirmLoading={this.state.AppCreateConfirmLoading}
        				  onCancel={this.handleAppCreateCancel}
        				  onCreate={this.handleAppCreate}
        				/>
                    </FormItem>
                    <div style={{ float:'right'}}>
                        <FormItem label="">
                            {getFieldDecorator('appname')(
                                <Input placeholder="应用名称" />
                            )}
                        </FormItem>
                    <FormItem style={{marginRight: 0}}>
                        <Button type="primary" className="btn-search" style={{marginRight: 10}} onClick={this.handlelocalsearch}>查询</Button>
                        <Button className="btn-search" onClick={this.handleReset}>重置</Button>
                    </FormItem>
                    </div>
                </Form>
            </div>

            <div style={{ background:'#fff' }}>
                <Table className="table-margin"  bordered loading={this.props.loading} rowKey={record => record.id} columns={this.columns} dataSource={this.props.helmchartList} />
            </div>
        </Content>
      </Layout>
    );
  }
}


const ApplicationForm = Form.create()(AppManageForm);
// export default connect(
//   state => state.helmChart,
//   { getHelmChartList, getUserClusterList, getHelmRepoOptionList, getlocalsearch, clearPaasCommonData })(ApplicationForm);
export default ApplicationForm
