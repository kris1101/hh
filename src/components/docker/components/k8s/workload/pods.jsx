import React, { Component } from 'react';
import Dockersider from '../../../../common/LeftSider/dockersider';
import { message, Layout, Form, Input, Button, Select, Table } from 'antd';
import { connect } from 'react-redux';
import BreadcrumbCustom from '../../../../../components/BreadcrumbCustom';
import { getk8spods } from './TableTpl/tabletpl';
import './pods.less';
import { getK8sPodList } from '../../../../../containers/Paas/k8s/k8scluster.redux'
import { PodCreateForm } from './podsforms/podscreateform'
import { postAjax } from '../../../utils/axios'
import { putAjax } from '../../../utils/axios'
import { generateformdata  } from '../../../utils/tools_helper'

const { Sider, Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;

class K8sPodsForm extends Component {
    constructor(props) {
        super(props);
        this.columns = getk8spods.call(this);
    }
    state = {
        currentPage: 1,
        pageSize: 10,
        PodCreateVisible: false,
        PodCreateConfirmLoading: false,
        PodUpdateVisible: false,
        PodUpdateConfirmLoading: false,
    }

    componentDidMount () {
        this.props.getK8sPodList({});
    }

    //重置表单
    handleReset = () => {
        this.props.form.resetFields();
    }

    showPodCreateModel = () => {
        this.setState({PodCreateVisible: true})
    }

    showPodUpdateModel = () => {
        this.setState({PodUpdateVisible: true})
    }

    handlePodCreateCancel = () => {
        this.setState({PodCreateVisible: false})
        this.setState({PodCreateConfirmLoading: false})
        const form = this.PodCreateFormRef.props.form;
        this.PodCreateFormRef.resetfilelist();
        form.resetFields();
    }

    handlePodUpdateCancel = () => {
        this.setState({PodUpdateVisible: false})
        this.setState({PodUpdateConfirmLoading: false})
        const form = this.PodUpdateFormRef.props.form;
        this.PodUpdateFormRef.resetfilelist();
        form.resetFields();
    }

    handlePodListWithArgs = (page, pageSize) => {
       let value = this.props.form.getFieldsValue()
       this.setState({
           currentPage: page,
           pageSize: pageSize
       })
       let page_args = {page: page, pagesize: pageSize}
       page_args.podname = value.Podname !== undefined ? value.Podname : "";
       this.props.getK8sPodList(page_args);
    }

    handlePodCreate = () => {
      const form = this.PodCreateFormRef.props.form;
      console.log(form.getFieldsValue())
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        this.setState({PodCreateConfirmLoading: true})
        const _that = this;
        postAjax('/workload/pod/', generateformdata(values), function(res){
            if(res.data.code == 0){
                message.success("创建成功")
                message.success(res.data.data)
                _that.setState({PodCreateConfirmLoading: false})
                form.resetFields();
                _that.PodCreateFormRef.resetfilelist();
                _that.setState({ PodCreateVisible: false });
                _that.handlePodListWithArgs(1, 10);
            }else{
                message.error(res.data.msg)
                _that.setState({PodCreateConfirmLoading: false})
            }
        })
      });
    }

    handlePodUpdate = (pod_id) => {
      const form = this.PodUpdateFormRef.props.form;
      console.log(form.getFieldsValue())
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        this.setState({PodUpdateConfirmLoading: true})
        const _that = this;
        values.pod_id = pod_id;
        putAjax('/workload/pod/', generateformdata(values), function(res){
            if(res.data.code == 0){
                message.success("更新成功")
                _that.setState({PodUpdateConfirmLoading: false})
                form.resetFields();
                _that.setState({ PodUpdateVisible: false });
                _that.PodUpdateFormRef.resetfilelist();
                _that.setState({ PodCreateVisible: false });
                _that.handlePodListWithArgs(1, 10);
            }else{
                message.error(res.data.msg)
                _that.setState({PodUpdateConfirmLoading: false})
            }
        })
      });
    }

    savePodCreateFormRef = (formRef) => {
      this.PodCreateFormRef = formRef;
    }

    savePodUpdateFormRef = (formRef) => {
      this.PodUpdateFormRef = formRef;
    }

    handlePodQuery = () => {
      this.handlePodListWithArgs(1, 10);
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
              _that.handlePodListWithArgs(page, pageSize);
          },
          onShowSizeChange(current, size) {
              _that.handlePodListWithArgs(1, size);
          }
    };

    return (
      <Layout className="config">
        <Sider>
            <Dockersider/>
        </Sider>
        <Content style={{ padding: 0, margin:10, marginBottom: 0, minHeight: window.innerHeight-84 }}>
            <BreadcrumbCustom first="平台管理" second="Workload" third="Pods" />
            <div className="form-search-box" style={{ background:'#fff',padding:10, }}>
                <Form layout="inline">
                    <FormItem>
                        <Button type="primary" onClick={this.showPodCreateModel}>增加Pod</Button>
				        <PodCreateForm
        				  wrappedComponentRef={this.savePodCreateFormRef}
        				  visible={this.state.PodCreateVisible}
                          confirmLoading={this.state.PodCreateConfirmLoading}
        				  onCancel={this.handlePodCreateCancel}
        				  onCreate={this.handlePodCreate}
        				/>
                    </FormItem>

                </Form>
            </div>

            <div style={{ background:'#fff' }}>
                <Table bordered loading={this.props.loading} rowKey={record => record.id} columns={this.columns} dataSource={this.props.podList} pagination={pagination} />
            </div>
        </Content>
      </Layout>
    );
  }
}


const K8sPodManage = Form.create()(K8sPodsForm);
export default connect(
  state => state.k8sWorkloadPods,
  { getK8sPodList })(K8sPodManage);
