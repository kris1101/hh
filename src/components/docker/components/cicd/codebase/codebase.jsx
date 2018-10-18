import React, { Component } from 'react';
import Dockersider from '../../../../common/LeftSider/dockersider';
import { Icon, message, Layout, Form, Input, Button, Table } from 'antd';
import { connect } from 'react-redux';
import BreadcrumbCustom from '../../../../BreadcrumbCustom';
import { getCodeBase } from './TableTpl/tabletpl';
import { getCodeBaseList, clearCodeBaseData } from '../../../../../containers/Paas/k8s/paascodebase.redux'
import './codebase.less';
import {postAjax, putAjax} from '../../../utils/axios'
import {generateformdata} from '../../../utils/tools_helper'
import CodeInfoCreateForm from './codebaseforms/codebasecreateform'
import CodeInfoUpdateForm from './codebaseforms/codebaseupdateform'

const { Sider, Content } = Layout;
const FormItem = Form.Item;
const Search = Input.Search;

class PaasCodeBaseForm extends Component {
    constructor(props) {
        super(props);
        this.columns = getCodeBase.call(this);
    }
    state = {
        currentPage: 1,
        pageSize: 10,
        CodeInfoCreateVisible: false,
        CodeInfoCreateConfirmLoading: false,
        CodeInfoUpdateVisible: false,
        CodeInfoUpdateConfirmLoading: false,
    }

    componentDidMount () {
      this.props.clearCodeBaseData();
      this.props.getCodeBaseList();
    }

    //重置表单
    handleReset = () => {
        this.props.form.resetFields();
    }

    showCodeInfoCreateModel = () => {
        this.setState({CodeInfoCreateVisible: true}) 
    }

    showCodeInfoUpdateModel = (record) => {
        this.setState({CodeInfoUpdateVisible: true}) 
        this.codeInfoUpdateFormRef.setState({public: record.is_public ? "true" : "false", id: record.id, name: record.name});
        
    }

    handleCodeInfoCreateCancel = () => {
        this.setState({CodeInfoCreateVisible: false}) 
        this.setState({CodeInfoCreateConfirmLoading: false})
        const form = this.codeInfoCreateFormRef.props.form;
        form.resetFields();
    }

    handleCodeInfoUpdateCancel = () => {
        this.setState({CodeInfoUpdateVisible: false}) 
        this.setState({CodeInfoUpdateConfirmLoading: false})
        const form = this.codeInfoUpdateFormRef.props.form;
        form.resetFields();
    }

    handleCodeInfoCreate = () => {
      const form = this.codeInfoCreateFormRef.props.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        this.setState({CodeInfoCreateConfirmLoading: true})
        const _that = this;
        console.log(values);
        postAjax('/codebase/repositories/', generateformdata(values), function(res){
            if(res.data.code === 0){
                message.success("创建成功") 
                _that.setState({CodeInfoCreateConfirmLoading: false})
                form.resetFields();
                _that.setState({ CodeInfoCreateVisible: false });
                _that.handleCodeBaseQuery();
            }else{
                message.error(res.data.msg) 
                _that.setState({CodeInfoCreateConfirmLoading: false})
            }
        })
      });
    }

    handleCodeInfoUpdate = () => {
      const form = this.codeInfoUpdateFormRef.props.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        this.setState({CodeInfoUpdateConfirmLoading: true})
        const _that = this;
        values.id = this.codeInfoUpdateFormRef.state.id;
        if(!values.id){
           message.error("未获取到id");
           return;
        }
        putAjax('/codeinfo/codeproject/', generateformdata(values), function(res){
            if(res.data.code === 0){
                message.success("更新成功") 
                _that.setState({CodeInfoUpdateConfirmLoading: false})
                form.resetFields();
                _that.setState({ CodeInfoUpdateVisible: false });
                _that.handleCodeBaseQuery();
            }else{
                message.error(res.data.msg) 
                _that.setState({CodeInfoUpdateConfirmLoading: false})
            }
        })
      });
    }

    saveCodeInfoCreateFormRef = (formRef) => {
      this.codeInfoCreateFormRef = formRef;
    } 

    saveCodeInfoUpdateFormRef = (formRef) => {
      this.codeInfoUpdateFormRef = formRef;
    } 


    handleCodeBaseQuery = () => {
       let value = this.props.form.getFieldsValue()
       this.setState({
           currentPage: 1,
           pageSize: 10 
       })
       let page_args = {page: 1, page_size:10}
       page_args.gitlab_project_name = value.gitlab_project_name !== undefined  ? value.gitlab_project_name : "";
       this.props.getCodeBaseList(page_args);
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
              page_args.gitlab_project_name = value.gitlab_project_name !== undefined  ? value.gitlab_project_name : "";
              _that.props.getCodeBaseList(page_args);
          },
          onShowSizeChange(current, size) {
              let value = _that.props.form.getFieldsValue()
              _that.setState({
                  currentPage: 1,
                  pageSize: size 
              })
              let page_args = {page: 1, page_size: size}
              page_args.gitlab_project_name = value.gitlab_project_name !== undefined  ? value.gitlab_project_name : "";
              _that.props.getCodeBaseList(page_args);
          }
    };

    return (
      <Layout className="config">
        <Sider>
            <Dockersider/>
        </Sider>
        <Content style={{ padding: 0, margin:10, marginBottom: 0, minHeight: window.innerHeight-84 }}>
          <BreadcrumbCustom first="CI/CD" second="持续集成" third="代码仓库"/>
            <div className="form-search-box" style={{ background:'#fff',padding:10, }}>
                <Form layout="inline" style={{ overflow: "hidden" }}>
                    <FormItem label="">
                      <Button type="primary" onClick={this.showCodeInfoCreateModel}>< Icon type="plus" style={{color: "white"}}/>新增仓库</Button>
                    </FormItem>
        				<CodeInfoCreateForm
        				  wrappedComponentRef={this.saveCodeInfoCreateFormRef}
        				  visible={this.state.CodeInfoCreateVisible}
                          confirmLoading={this.state.CodeInfoCreateConfirmLoading}
        				  onCancel={this.handleCodeInfoCreateCancel}
        				  onCreate={this.handleCodeInfoCreate}
        				/>
        				<CodeInfoUpdateForm
        				  wrappedComponentRef={this.saveCodeInfoUpdateFormRef}
        				  visible={this.state.CodeInfoUpdateVisible}
                          confirmLoading={this.state.CodeInfoUpdateConfirmLoading}
        				  onCancel={this.handleCodeInfoUpdateCancel}
        				  onCreate={this.handleCodeInfoUpdate}
        				/>
                    <div style={{ float:'right'}}>
                        <FormItem label="">
                            {getFieldDecorator('gitlab_project_name')(
                                <Search
                                   placeholder="项目名称查找"
                                   onSearch={(value) => {this.handleCodeBaseQuery()}}
                                   style={{ width: 200 }}
                                />      
                            )}
                        </FormItem>
                        <FormItem label="" style={{ marginRight: 0 }}>
                          <Button  onClick={this.handleCodeBaseQuery} type="primary">< Icon type="reload" style={{color: "white"}}/>刷新</Button>
                        </FormItem>
                    </div>
                </Form>
            </div>

            <div style={{ background:'#fff' }}>
                <Table className="table-margin" bordered loading={this.props.loading} rowKey={record => record.id} columns={this.columns} dataSource={this.props.codeBaseList} pagination={pagination}/>
            </div>
        </Content>
      </Layout>
    );
  }
}


const PaasCodeBaseManage = Form.create()(PaasCodeBaseForm);
export default connect(
  state => state.paasCodeBase,
  { getCodeBaseList, clearCodeBaseData })(PaasCodeBaseManage);
