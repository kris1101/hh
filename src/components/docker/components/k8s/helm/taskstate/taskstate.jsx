import React, { Component } from 'react';
import Dockersider from '../../../../../common/LeftSider/dockersider';
import {Icon, message, Layout, Form, Input, Button, Table } from 'antd';
import { connect } from 'react-redux';
import BreadcrumbCustom from '../../../../../BreadcrumbCustom';
import { clearPaasCommonData } from '../../../../../../containers/Paas/common/paascommon.redux'
import { getHelmTaskStateList, clearTaskStateData } from '../../../../../../containers/Paas/k8s/k8shelmtaskstate.redux'
import K8sClusterSelectForm from '../../../common/k8sclusterselect'
import { getTaskState } from './TableTpl/tabletpl';
import './taskstate.less';

const { Sider, Content } = Layout;
const FormItem = Form.Item;
const Search = Input.Search;

class HelmTaskForm extends Component {
    constructor(props) {
        super(props);
        this.columns = getTaskState.call(this);
    }
    state = {
        clusterId: "",
        currentPage: 1,
        pageSize: 10,
    }

    componentDidMount () {
        this.props.clearPaasCommonData();
        this.props.clearTaskStateData();
        message.info("请在右上角选择集群查看");
    }

    //重置表单
    handleReset = () => {
        this.props.form.resetFields();
    }

    handleTaskStateQuery = () => {
       if (!this.state.clusterId){
         message.error("请在右上角选择集群查看");
         return; 
       }
       let value = this.props.form.getFieldsValue()
       this.setState({
           currentPage: 1,
           pageSize: 10 
       })
       let page_args = {page: 1, page_size:10}
       page_args.search = value.search !== undefined  ? value.search : "";
       this.props.getHelmTaskStateList(page_args, {"Cluster-Id": this.state.clusterId});
    }

    handleClusterSelect = (value) => { 

        this.setState({clusterId: value});
        this.props.getHelmTaskStateList({},{'Cluster-Id': value}) 
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
              let value = _that.props.form.getFieldsValue()
              _that.setState({
                  currentPage: page,
                  pageSize: pageSize
              })
              let page_args = {page, page_size: pageSize}
              page_args.search = value.search !== undefined  ? value.search : "";
              _that.props.getHelmTaskStateList(page_args, {"Cluster-Id": _that.state.clusterId});
          },
          onShowSizeChange(current, size) {
              let value = _that.props.form.getFieldsValue()
              _that.setState({
                  currentPage: 1,
                  pageSize: size 
              })
              let page_args = {page: 1, page_size: size}
              page_args.search = value.search !== undefined  ? value.search : "";
              _that.props.getHelmTaskStateList(page_args, {"Cluster-Id": _that.state.clusterId});
          }
    };

    return (
      <Layout className="config">
        <Sider>
            <Dockersider/>
        </Sider>
        <Content style={{ padding: 0, margin:10, marginBottom: 0, minHeight: window.innerHeight-84 }}>
            <BreadcrumbCustom first="helm管理" second="helm任务状态" />
            <K8sClusterSelectForm 
              handleSelctEvent={this.handleClusterSelect}
              wrappedComponentRef={this.saveclusterselectFormRef}
            />
            <div className="form-search-box" style={{ background:'#fff',padding:10, }}>
                <Form layout="inline" style={{ overflow: "hidden" }}>
                   <FormItem label="">
                       {getFieldDecorator('search')(
                           <Search
                              placeholder="release名称查找"
                              onSearch={(value) => {this.handleTaskStateQuery()}}
                              style={{ width: 200 }}
                           />      
                       )}
                   </FormItem>
                    <div style={{ float:'right'}}>
                        <FormItem label="" style={{ marginRight: 0 }}>
                          <Button  onClick={this.handleTaskStateQuery} type="primary">< Icon type="reload" style={{color: "white"}}/>刷新</Button>
                        </FormItem>
                    </div>
                </Form>
            </div>

            <div style={{ background:'#fff' }}>
                <Table className="table-margin" bordered loading={this.props.loading} rowKey={record => record.id} columns={this.columns} dataSource={this.props.helmTaskStateList} pagination={pagination}/>
            </div>
        </Content>
      </Layout>
    );
  }
}


const HelmTaskManage = Form.create()(HelmTaskForm);
export default connect(
  state => state.helmTaskState,
  { getHelmTaskStateList, clearPaasCommonData, clearTaskStateData })(HelmTaskManage);
