import React, { Component } from 'react';
import Dockersider from '../../../../../common/LeftSider/dockersider';
import { message, Layout, Form, Input, Button, Select, Table } from 'antd';
import { connect } from 'react-redux';
import BreadcrumbCustom from '../../../../../BreadcrumbCustom';
import { getHelmRepo } from './TableTpl/tabletpl';
import './repomanage.less';
import { HelmRepoCreateForm } from './helmrepoforms/repocreateform'
import { postAjax } from '../../../../utils/axios'
import { generateformdata  } from '../../../../utils/tools_helper'
import { getHelmRepoList } from '../../../../../../containers/Paas/k8s/k8shelmrepo.redux'

const { Sider, Content } = Layout;
const FormItem = Form.Item;
const Option = Select.Option;

class HelmRepoForm extends Component {
    constructor(props) {
        super(props);
        this.columns = getHelmRepo.call(this);
    }
    state = {
        currentPage: 1,
        pageSize: 10,
        HelmRepoCreateVisible: false,
        HelmRepoCreateConfirmLoading: false,
    }

    componentDidMount () {
        this.props.getHelmRepoList({});
    }

    //重置表单
    handleReset = () => {
        this.props.form.resetFields();
    }

    showHelmRepoCreateModel = () => {
        this.setState({HelmRepoCreateVisible: true}) 
    }

    handleHelmRepoCreateCancel = () => {
        this.setState({HelmRepoCreateVisible: false}) 
        this.setState({HelmRepoCreateConfirmLoading: false})
        const form = this.helmrepoCreateFormRef.props.form;
        form.resetFields();
    }

    handleHelmRepoListWithArgs = (page, pageSize) => {
       let value = this.props.form.getFieldsValue()
       this.setState({
           currentPage: page,
           pageSize: pageSize 
       })
       let page_args = {page: page, pagesize: pageSize}
       page_args.reponame = value.reponame !== undefined ? value.reponame : "";
       this.props.getHelmRepoList(page_args);
    }

    handleHelmRepoCreate = () => {
      const form = this.helmrepoCreateFormRef.props.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        this.setState({HelmRepoCreateConfirmLoading: true})
        const _that = this;
        postAjax('/helm/helmrepo/', generateformdata(values), function(res){
            if(res.data.code == 0){
                message.success("创建成功") 
                _that.setState({HelmRepoCreateConfirmLoading: false})
                form.resetFields();
                _that.setState({ HelmRepoCreateVisible: false });
                _that.handleHelmRepoListWithArgs(1, 10);
            }else{
                message.error(res.data.msg) 
                _that.setState({HelmRepoCreateConfirmLoading: false})
            }
        })
      });
    }

    saveHelmRepoCreateFormRef = (formRef) => {
      this.helmrepoCreateFormRef = formRef;
    } 

    handleHelmRepoQuery = () => {
      this.handleHelmRepoListWithArgs(1, 10);
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
              _that.handleHelmRepoListWithArgs(page, pageSize);
          },
          onShowSizeChange(current, size) {
              _that.handleHelmRepoListWithArgs(1, size);
          }
    };

    return (
      <Layout className="config">
        <Sider>
            <Dockersider/>
        </Sider>
        <Content style={{ padding: 0, margin:10, marginBottom: 0, minHeight: window.innerHeight-84 }}>
            <BreadcrumbCustom first="helm管理" second="repo管理" />
            <div className="form-search-box" style={{ background:'#fff',padding:10, }}>
                <Form layout="inline">
                    <FormItem>
                        <Button type="primary" onClick={this.showHelmRepoCreateModel}>新增repo</Button>
        				<HelmRepoCreateForm
        				  wrappedComponentRef={this.saveHelmRepoCreateFormRef}
        				  visible={this.state.HelmRepoCreateVisible}
                          confirmLoading={this.state.HelmRepoCreateConfirmLoading}
        				  onCancel={this.handleHelmRepoCreateCancel}
        				  onCreate={this.handleHelmRepoCreate}
        				/>
                    </FormItem>
                    <div style={{ float:'right'}}>
                        <FormItem label="">
                            {getFieldDecorator('reponame')(
                                <Input placeholder="Repo名称" />
                            )}
                        </FormItem>
                    <FormItem>
                        <Button type="primary" className="btn-search" style={{marginRight: 10}} onClick={this.handleHelmRepoQuery}>查询</Button>
                        <Button className="btn-search" onClick={this.handleReset}>重置</Button>
                    </FormItem>
                    </div>
                </Form>
            </div>

            <div style={{ background:'#fff' }}>
                <Table bordered loading={this.props.loading} rowKey={record => record.id} columns={this.columns} dataSource={this.props.helmrepoList} pagination={pagination} />
            </div>
        </Content>
      </Layout>
    );
  }
}


const HelmRepoManage = Form.create()(HelmRepoForm);
export default connect(
  state => state.helmRepo,
  { getHelmRepoList })(HelmRepoManage);
