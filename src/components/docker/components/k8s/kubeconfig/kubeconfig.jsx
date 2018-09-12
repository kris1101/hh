import React, { Component } from 'react';
import Dockersider from '../../../../common/LeftSider/dockersider';
import { message, Layout, Form, Input, Button, Select, Table } from 'antd';
import { connect } from 'react-redux';
import BreadcrumbCustom from '../../../../../components/BreadcrumbCustom';
import { getk8sclusters } from './TableTpl/tabletpl';
import './kubeconfig.less';
import { getK8sClusterList } from '../../../../../containers/Paas/k8s/k8scluster.redux'
import { ClusterCreateForm } from './kubeconfigforms/kubeconfigcreateform'
import { postAjax } from '../../../utils/axios'
import { putAjax } from '../../../utils/axios'
import { generateformdata  } from '../../../utils/tools_helper'

const { Sider, Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;

class K8sClusterForm extends Component {
    constructor(props) {
        super(props);
        this.columns = getk8sclusters.call(this);
    }
    state = {
        currentPage: 1,
        pageSize: 10,
        ClusterCreateVisible: false,
        ClusterCreateConfirmLoading: false,
        ClusterUpdateVisible: false,
        ClusterUpdateConfirmLoading: false,
    }

    componentDidMount () {
        this.props.getK8sClusterList({});
    }

    //重置表单
    handleReset = () => {
        this.props.form.resetFields();
    }

    showClusterCreateModel = () => {
        this.setState({ClusterCreateVisible: true}) 
    }

    showClusterUpdateModel = () => {
        this.setState({ClusterUpdateVisible: true}) 
    }

    handleClusterCreateCancel = () => {
        this.setState({ClusterCreateVisible: false}) 
        this.setState({ClusterCreateConfirmLoading: false})
        const form = this.ClusterCreateFormRef.props.form;
        this.ClusterCreateFormRef.resetfilelist();
        form.resetFields();
    }

    handleClusterUpdateCancel = () => {
        this.setState({ClusterUpdateVisible: false}) 
        this.setState({ClusterUpdateConfirmLoading: false})
        const form = this.ClusterUpdateFormRef.props.form;
        this.ClusterUpdateFormRef.resetfilelist();
        form.resetFields();
    }

    handleClusterListWithArgs = (page, pageSize) => {
       let value = this.props.form.getFieldsValue()
       this.setState({
           currentPage: page,
           pageSize: pageSize 
       })
       let page_args = {page: page, pagesize: pageSize}
       page_args.clustername = value.Clustername !== undefined ? value.Clustername : "";
       this.props.getK8sClusterList(page_args);
    }

    handleClusterCreate = () => {
      const form = this.ClusterCreateFormRef.props.form;
      console.log(form.getFieldsValue())
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        this.setState({ClusterCreateConfirmLoading: true})
        const _that = this;
        postAjax('/k8s/kubeconfig/', generateformdata(values), function(res){
            if(res.data.code == 0){
                message.success("创建成功") 
                message.success(res.data.data) 
                _that.setState({ClusterCreateConfirmLoading: false})
                form.resetFields();
                _that.ClusterCreateFormRef.resetfilelist();
                _that.setState({ ClusterCreateVisible: false });
                _that.handleClusterListWithArgs(1, 10);
            }else{
                message.error(res.data.msg) 
                _that.setState({ClusterCreateConfirmLoading: false})
            }
        })
      });
    }

    handleClusterUpdate = (cluster_id) => {
      const form = this.ClusterUpdateFormRef.props.form;
      console.log(form.getFieldsValue())
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        this.setState({ClusterUpdateConfirmLoading: true})
        const _that = this;
        values.cluster_id = cluster_id;
        putAjax('/k8s/kubeconfig/', generateformdata(values), function(res){
            if(res.data.code == 0){
                message.success("更新成功") 
                _that.setState({ClusterUpdateConfirmLoading: false})
                form.resetFields();
                _that.setState({ ClusterUpdateVisible: false });
                _that.ClusterUpdateFormRef.resetfilelist();
                _that.setState({ ClusterCreateVisible: false });
                _that.handleClusterListWithArgs(1, 10);
            }else{
                message.error(res.data.msg) 
                _that.setState({ClusterUpdateConfirmLoading: false})
            }
        })
      });
    }

    saveClusterCreateFormRef = (formRef) => {
      this.ClusterCreateFormRef = formRef;
    } 

    saveClusterUpdateFormRef = (formRef) => {
      this.ClusterUpdateFormRef = formRef;
    } 

    handleClusterQuery = () => {
      this.handleClusterListWithArgs(1, 10);
    }

  render() {
    const { getFieldDecorator } = this.props.form;
    let _that = this;
    const pagination = {
          current: this.state.currentPage,
          total: this.props.total,
          pageSize: this.state.pageSize,
          showSizeChanger: true,
          showTotal:(total, range) => `${range[0]}-${range[1]} 共 ${total} 条`,
          showQuickJumper: true,
          //当表格有变化时，如：点击分页  current是当前页面页码
          onChange(page, pageSize) {
              _that.handleClusterListWithArgs(page, pageSize);
          },
          onShowSizeChange(current, size) {
              _that.handleClusterListWithArgs(1, size);
          }
    };

    return (
      <Layout className="config">
        <Sider>
            <Dockersider/>
        </Sider>
        <Content style={{ padding: 0, margin:10, marginBottom: 0, minHeight: window.innerHeight-84 }}>
            <BreadcrumbCustom first="镜像仓库" second="集群配置" />
            <div className="form-search-box" style={{ background:'#fff',padding:10, }}>
                <Form layout="inline">
                    <FormItem>
                        <Button type="primary" onClick={this.showClusterCreateModel}>增加集群</Button>
        				<ClusterCreateForm
        				  wrappedComponentRef={this.saveClusterCreateFormRef}
        				  visible={this.state.ClusterCreateVisible}
                          confirmLoading={this.state.ClusterCreateConfirmLoading}
        				  onCancel={this.handleClusterCreateCancel}
        				  onCreate={this.handleClusterCreate}
        				/>
                    </FormItem>
                    <div style={{ float:'right'}}>
                        <FormItem label="">
                            {getFieldDecorator('Clustername')(
                                <Input placeholder="集群名称" />
                            )}
                        </FormItem>
                    <FormItem>
                        <Button type="primary" className="btn-search" style={{marginRight: 10}} onClick={this.handleClusterQuery}>查询</Button>
                        <Button className="btn-search" onClick={this.handleReset}>重置</Button>
                    </FormItem>
                    </div>
                </Form>
            </div>

            <div style={{ background:'#fff' }}>
                <Table bordered loading={this.props.loading} rowKey={record => record.id} columns={this.columns} dataSource={this.props.clusterList} pagination={pagination} />
            </div>
        </Content>
      </Layout>
    );
  }
}


const K8sClusterManage = Form.create()(K8sClusterForm);
export default connect(
  state => state.k8sCluster,
  { getK8sClusterList })(K8sClusterManage);
