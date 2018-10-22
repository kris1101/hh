import React, { Component } from 'react';
import Dockersider from '../../../../../common/LeftSider/dockersider';
import { message, Layout, Form, Input, Button, Select, Table } from 'antd';
import { connect } from 'react-redux';
import BreadcrumbCustom from '../../../../../BreadcrumbCustom';
import { getHelmChart } from './TableTpl/tabletpl';
import './chartmanage.less';
import HelmChartDeployForm from './helmchartforms/chartdeployform'
import { postAjax } from '../../../../utils/axios'
import { generateformdata  } from '../../../../utils/tools_helper'
import { getHelmChartList, getHelmRepoOptionList, getlocalsearch } from '../../../../../../containers/Paas/k8s/k8shelmchart.redux'
import { clearPaasCommonData, getUserClusterList } from '../../../../../../containers/Paas/common/paascommon.redux'
import { combinekeyvalue } from '../../../../utils/tools_helper.jsx'

const { Sider, Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;

class HelmChartForm extends Component {
    constructor(props) {
        super(props);
        this.columns = getHelmChart.call(this);
    }
    state = {
        HelmChartDeployVisible: false,
        HelmChartDeployConfirmLoading: false,
    }

    componentDidMount () {
        this.props.getHelmChartList({});
        this.props.getHelmRepoOptionList();
    }

    //重置表单
    handleReset = () => {
        this.props.form.resetFields();
    }

    showHelmChartDeployModel = (chartinfo) => {
        console.log(chartinfo);
        this.setState({HelmChartDeployVisible: true}) 
        this.props.getUserClusterList();
        this.helmchartDeployFormRef.setState({chartinfo})
    }

    handleHelmChartDeployCancel = () => {
        this.setState({HelmChartDeployVisible: false}) 
        this.setState({HelmChartDeployConfirmLoading: false})
        const form = this.helmchartDeployFormRef.props.form;
        this.helmchartDeployFormRef.setState({values: false, valuesfile:false})
        form.resetFields();
        this.props.clearPaasCommonData();
    }

    handleHelmChartDeploy = () => {
      const form = this.helmchartDeployFormRef.props.form;
      form.validateFields((err, formvalues) => {
        if (err) {
          return;
        }
        let deploy_args = {};
        deploy_args.values = JSON.stringify({});
        if (this.helmchartDeployFormRef.state.values){
            let values_result = combinekeyvalue(formvalues.chartkeys, formvalues.chartvalues)
            if (values_result[0] === 1){
              message.error("values生成错误")
              return
            }
            deploy_args.values = JSON.stringify(values_result[1])
        }
        deploy_args.valuesfile = '';
        if (this.helmchartDeployFormRef.state.valuesfile){
            deploy_args.valuesfile = this.helmchartDeployFormRef.editor.getValue();
        }
        deploy_args.dry_run = formvalues.dry_run;
        deploy_args.disable_crd_hook = formvalues.disable_crd_hook; 
        deploy_args.disable_hooks = formvalues.disable_hooks; 
        deploy_args.reuse_name = formvalues.reuse_name; 
        deploy_args.repo_id = formvalues.repo_id; 
        deploy_args.chart_name = formvalues.chart_name; 
        deploy_args.version = formvalues.version; 
        deploy_args.release_name = formvalues.release_name; 
        deploy_args.namespace = formvalues.namespace; 
        deploy_args.cluster = formvalues.cluster; 
        const _that = this; 
        this.setState({HelmChartDeployConfirmLoading: true})
        postAjax('/helm/helmchart/', generateformdata(deploy_args), function(res){
            if(res.data.code === 0){
                message.success(res.data.msg); 
                _that.setState({HelmChartDeployConfirmLoading: false})
                form.resetFields();
                _that.setState({ HelmChartDeployVisible: false });
            }else{
                message.error(res.data.msg) 
                _that.setState({HelmChartDeployConfirmLoading: false})
            }
        })
      });
    }

    saveHelmChartDeployFormRef = (formRef) => {
      this.helmchartDeployFormRef = formRef;
    } 

    handlereposelect = (value) => {
        this.props.getHelmChartList({repo_id: value});
    }

    handlelocalsearch = () => {
       let value = this.props.form.getFieldsValue()
       let chartname = value.chartname !== undefined ? value.chartname : "";
       this.props.getlocalsearch(chartname);
    }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Layout className="config">
        <Sider>
            <Dockersider/>
        </Sider>
        <Content style={{ padding: 0, margin:10, marginBottom: 0, minHeight: window.innerHeight-84 }}>
            <BreadcrumbCustom first="helm管理" second="chart管理" />
            <div className="form-search-box" style={{ background:'#fff',padding:10, }}>
                <Form layout="inline">
                    <FormItem>
                        <FormItem label="Repo选择">
                            {getFieldDecorator('repo_id',{initialValue: "ALL"})(
      							<Select
      							  showSearch
      							  placeholder="请选择repo"
                                  style={{ width: 200 }}
 								  optionFilterProp="children"
                                  onSelect={(value) => this.handlereposelect(value)}
                                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      							  notFoundContent="未发现repo信息"
      							>
 									<Option key="ALL">ALL</Option>
 									{this.props.helmrepooptionList.map(d => <Option key={d.id}>{d.name}</Option>)}
      							</Select>
                            )}
                        </FormItem>
        				<HelmChartDeployForm
        				  wrappedComponentRef={this.saveHelmChartDeployFormRef}
        				  visible={this.state.HelmChartDeployVisible}
                          confirmLoading={this.state.HelmChartDeployConfirmLoading}
        				  onCancel={this.handleHelmChartDeployCancel}
        				  onCreate={this.handleHelmChartDeploy}
        				/>
                    </FormItem>
                    <div style={{ float:'right'}}>
                        <FormItem label="">
                            {getFieldDecorator('chartname')(
                                <Input placeholder="Chart名称" />
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


const HelmChartManage = Form.create()(HelmChartForm);
export default connect(
  state => state.helmChart,
  { getHelmChartList, getUserClusterList, getHelmRepoOptionList, getlocalsearch, clearPaasCommonData })(HelmChartManage);
