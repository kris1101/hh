import React, { Component } from 'react';
import Dockersider from '../../../../../common/LeftSider/dockersider';
import { message, Layout, Form, Input, Button, Select, Table } from 'antd';
import { connect } from 'react-redux';
import BreadcrumbCustom from '../../../../../BreadcrumbCustom';
import { getHelmChart } from './TableTpl/tabletpl';
import './chartmanage.less';
import { HelmChartDeployForm } from './helmchartforms/chartdeployform'
import { postAjax } from '../../../../utils/axios'
import { generateformdata  } from '../../../../utils/tools_helper'
import { getHelmChartList, getHelmRepoOptionList, getlocalsearch } from '../../../../../../containers/Paas/k8s/k8shelmchart.redux'

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

    showHelmChartDeployModel = () => {
        this.setState({HelmChartDeployVisible: true}) 
    }

    handleHelmChartDeployCancel = () => {
        this.setState({HelmChartDeployVisible: false}) 
        this.setState({HelmChartDeployConfirmLoading: false})
        const form = this.helmchartCreateFormRef.props.form;
        form.resetFields();
    }

    handleHelmChartListWithArgs = () => {
       let value = this.props.form.getFieldsValue()
       this.setState({
           currentPage: page,
           pageSize: pageSize 
       })
       let query_args ={}
       query_args.repo_id = value.repo_id !== undefined ? value.repo_id : "ALL";
       this.props.getHelmChartList(query_args);
    }

    handleHelmChartDeploy = () => {
      const form = this.helmchartCreateFormRef.props.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        this.setState({HelmChartDeployConfirmLoading: true})
        const _that = this;
        postAjax('/helm/helmchart/', generateformdata(values), function(res){
            if(res.data.code == 0){
                message.success("部署成功") 
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
      this.helmchartCreateFormRef = formRef;
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
                <Table bordered loading={this.props.loading} rowKey={record => record.id} columns={this.columns} dataSource={this.props.helmchartList} />
            </div>
        </Content>
      </Layout>
    );
  }
}


const HelmChartManage = Form.create()(HelmChartForm);
export default connect(
  state => state.helmChart,
  { getHelmChartList, getHelmRepoOptionList, getlocalsearch })(HelmChartManage);
