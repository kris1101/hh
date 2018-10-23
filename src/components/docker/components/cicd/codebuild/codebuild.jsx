import React, { Component } from 'react';
import Dockersider from '../../../../common/LeftSider/dockersider';
import { Icon, message, Layout, Form, Input, Button, Table } from 'antd';
import { connect } from 'react-redux';
import BreadcrumbCustom from '../../../../BreadcrumbCustom';
import { getCodeBuildTask } from './TableTpl/tabletpl';
import './codebuild.less';
import {postAjax, putAjax} from '../../../utils/axios'
import {generateformdata, combinekeyvalue} from '../../../utils/tools_helper'
import { getCodeBuildTaskList, getUserCodeProjectList, clearCodeBuildData} from '../../../../../containers/Paas/k8s/paascodebuild.redux' 
import CodeBuildCreateForm from './codebuildforms/codebuildcreate'
import CodeBuildUpdateForm from './codebuildforms/codebuildupdate'
import CodeBuildImageForm from './codebuildforms/codebuildimage'

const { Sider, Content } = Layout;
const FormItem = Form.Item;
const Search = Input.Search;

class PaasCodeBuildForm extends Component {
    constructor(props) {
        super(props);
        this.columns = getCodeBuildTask.call(this);
    }
    state = {
        currentPage: 1,
        pageSize: 10,
        CodeBuildImageVisible: false,
        CodeBuildCreateVisible: false,
        CodeBuildCreateConfirmLoading: false,
        CodeBuildUpdateVisible: false,
        CodeBuildUpdateConfirmLoading: false,
    }

    componentDidMount () {
        this.props.clearCodeBuildData();
        this.props.getCodeBuildTaskList();
    }

    //重置表单
    handleReset = () => {
        this.props.form.resetFields();
    }

    showCodeBuildCreateModel = () => {
        this.setState({CodeBuildCreateVisible: true}) 
        this.props.getUserCodeProjectList();
    }

    showCodeBuildImageModel = (record) => {
        this.setState({CodeBuildImageVisible: true}); 
        this.codeBuildImageFormRef.setState({is_compile: record.is_compile}); 
        this.codeBuildImageFormRef.handleImgeaBuild(record.id);
    }

    showCodeBuildUpdateModel = (record) => {
        this.setState({CodeBuildUpdateVisible: true}) 
        this.codeBuildTaskUpdateFormRef.setState({public: record.is_public ? "true" : "false", id: record.id, name: record.name});
        
    }

    handleCodeBuildCreateCancel = () => {
        this.setState({CodeBuildCreateVisible: false}) 
        this.setState({CodeBuildCreateConfirmLoading: false})
        const form = this.codeBuildTaskCreateFormRef.props.form;
        form.resetFields();
        this.codeBuildTaskCreateFormRef.setState({ 
                      is_compile: false,
                      image_tag_type: "codebranch",
                      dockerfile_type: "incode",
                      code_branch_tag_choice: "branch"
                    }) 
    }

    handleCodeBuildImageCancel = () => {
        this.setState({CodeBuildImageVisible: false}); 
        this.codeBuildImageFormRef.setState({current: 0, codeString: ""});
        if(this.codeBuildImageFormRef.state.timer !== null){
            clearInterval(this.codeBuildImageFormRef.state.timer);
        }
    }

    build_dockerfile = (task_create_args) => {
          const form = this.codeBuildTaskCreateFormRef.props.form;
          let values = form.getFieldsValue();
          let dockerfile_list=[];
          let commanddict = {"installCmd":"RUN","codeStoragePath":"COPY .","compileCmd":"RUN","workDir":"WORKDIR","startCmd":"CMD","dockerUser":"USER"}
          if (this.codeBuildTaskCreateFormRef.state.dockerfile_type === "custom"){
            task_create_args.is_createdockerfile = true;
            dockerfile_list.push(`FROM ${values.baseimagename}:${values.baseimagetag}`);
            for (let item in commanddict){
              if(values[item]){
                dockerfile_list.push(commanddict[item] + " " + values[item]);
              } 
            }
            let env_list = this.build_env(combinekeyvalue(values.envkeys, values.envvalues)[1]);
            dockerfile_list = dockerfile_list.concat(env_list)
          }else{
            task_create_args.is_createdockerfile = false;
          }
          task_create_args.dockerfilecontent = JSON.stringify(dockerfile_list);
          return task_create_args; 
    }
    
    build_compile_config = (task_create_args) => {
      const form = this.codeBuildTaskCreateFormRef.props.form;
      let values = form.getFieldsValue();

      if(task_create_args.is_compile){
          task_create_args.code_save_path = values.code_save_path;
          task_create_args.compile_result_path = values.compile_result_path;
          task_create_args.compile_script = this.codeBuildTaskCreateFormRef.editor.getValue();
      }
      return task_create_args;

    } 

    build_env = (env_dict) => {

          let env_list = [];
          console.log(env_dict);
    
          for (let item in env_dict){
              env_list.push("ENV "+ item +" "+env_dict[item]);
          }
          return env_list;
    }

    handleCodeBuildUpdateCancel = () => {
        this.setState({CodeBuildUpdateVisible: false}) 
        this.setState({CodeBuildUpdateConfirmLoading: false})
        const form = this.codeBuildTaskUpdateFormRef.props.form;
        form.resetFields();
    }

    handleCodeBuildCreate = () => {
      const form = this.codeBuildTaskCreateFormRef.props.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        this.setState({CodeBuildCreateConfirmLoading: true})
        const _that = this;
        let task_create_args = {};
        task_create_args.task_name = values.taskname;
        task_create_args.method = this.codeBuildTaskCreateFormRef.state.code_branch_tag_choice; 
        task_create_args.branch = values.branch_value;
        task_create_args.tag = values.branch_value;
        task_create_args.codeinfo_id = values.codeinfo_id;
        task_create_args.dokerfile_path = this.codeBuildTaskCreateFormRef.state.dockerfile_type ==="incode" ? "/" + values.dokerfile_path : "/"; 
        task_create_args.imagename = values.imagename;
        switch (this.codeBuildTaskCreateFormRef.state.image_tag_type){
          case "codebranch":
            task_create_args.imagetag = values.branch_value;
            break;
          case "timestamp":
            task_create_args.imagetag = new Date().getTime();
            break;
          case "custom":
            task_create_args.imagetag = values.customimagetag;
            break;
          default:
            task_create_args.imagetag = "";
        }
        task_create_args.is_compile = values.is_compile;
        task_create_args = this.build_dockerfile(task_create_args);
        task_create_args = this.build_compile_config(task_create_args);
        postAjax('/codebuild/task/', generateformdata(task_create_args), function(res){
            if(res.data.code === 0){
                message.success("创建成功") 
                _that.setState({CodeBuildCreateConfirmLoading: false})
                form.resetFields();
                _that.setState({ CodeBuildCreateVisible: false });
                _that.handleCodeBuildQuery();
            }else{
                message.error(res.data.msg) 
                _that.setState({CodeBuildCreateConfirmLoading: false})
            }
        })
      });
    }

    handleCodeBuildUpdate = () => {
      const form = this.codeBuildTaskUpdateFormRef.props.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        this.setState({CodeBuildUpdateConfirmLoading: true})
        const _that = this;
        values.id = this.codeBuildTaskUpdateFormRef.state.id;
        if(!values.id){
           message.error("未获取到id");
           return;
        }
        putAjax('/codeinfo/codeproject/', generateformdata(values), function(res){
            if(res.data.code === 0){
                message.success("更新成功") 
                _that.setState({CodeBuildUpdateConfirmLoading: false})
                form.resetFields();
                _that.setState({ CodeBuildUpdateVisible: false });
                _that.handleCodeBuildQuery();
            }else{
                message.error(res.data.msg) 
                _that.setState({CodeBuildUpdateConfirmLoading: false})
            }
        })
      });
    }

    saveCodeBuildCreateFormRef = (formRef) => {
      this.codeBuildTaskCreateFormRef = formRef;
    } 

    saveCodeBuildUpdateFormRef = (formRef) => {
      this.codeBuildTaskUpdateFormRef = formRef;
    } 

    saveCodeBuildImageFormRef = (formRef) => {
      this.codeBuildImageFormRef = formRef;
    } 



    handleCodeBuildQuery = () => {
       let value = this.props.form.getFieldsValue()
       this.setState({
           currentPage: 1,
           pageSize: 10 
       })
       let page_args = {page: 1, page_size:10}
       page_args.search = value.task_name !== undefined  ? value.task_name : "";
       this.props.getCodeBuildTaskList(page_args);
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
              page_args.task_name = value.task_name !== undefined  ? value.task_name : "";
              _that.props.getCodeBuildTaskList(page_args);
          },
          onShowSizeChange(current, size) {
              let value = _that.props.form.getFieldsValue()
              _that.setState({
                  currentPage: 1,
                  pageSize: size 
              })
              let page_args = {page: 1, page_size: size}
              page_args.task_name = value.task_name !== undefined  ? value.task_name : "";
              _that.props.getCodeBuildTaskList(page_args);
          }
    };

    return (
      <Layout className="config">
        <Sider>
            <Dockersider/>
        </Sider>
        <Content style={{ padding: 0, margin:10, marginBottom: 0, minHeight: window.innerHeight-84 }}>
          <BreadcrumbCustom first="CI/CD" second="持续集成" third="构建项目"/>
            <div className="form-search-box" style={{ background:'#fff',padding:10, }}>
                <Form layout="inline" style={{ overflow: "hidden" }}>
                    <FormItem label="">
                      <Button type="primary" onClick={this.showCodeBuildCreateModel}><Icon type="plus" style={{color: "white"}}/>新增构建任务</Button>
                    </FormItem>
                        <CodeBuildCreateForm
                          wrappedComponentRef={this.saveCodeBuildCreateFormRef}
                          visible={this.state.CodeBuildCreateVisible}
                          confirmLoading={this.state.CodeBuildCreateConfirmLoading}
                          onCancel={this.handleCodeBuildCreateCancel}
                          onCreate={this.handleCodeBuildCreate}
                        />
                        <CodeBuildUpdateForm
                          wrappedComponentRef={this.saveCodeBuildUpdateFormRef}
                          visible={this.state.CodeBuildUpdateVisible}
                          confirmLoading={this.state.CodeBuildUpdateConfirmLoading}
                          onCancel={this.handleCodeBuildUpdateCancel}
                          onCreate={this.handleCodeBuildUpdate}
                        />
                        <CodeBuildImageForm
                          wrappedComponentRef={this.saveCodeBuildImageFormRef}
                          visible={this.state.CodeBuildImageVisible}
                          onCancel={this.handleCodeBuildImageCancel}
                        />
                    <div style={{ float:'right'}}>
                        <FormItem label="">
                            {getFieldDecorator('task_name')(
                                <Search
                                   placeholder="构建任务名称查找"
                                   onSearch={(value) => {this.handleCodeBuildQuery()}}
                                   style={{ width: 200 }}
                                />      
                            )}
                       </FormItem>
                        <FormItem label="" style={{ marginRight: 0 }}>
                          <Button  onClick={this.handleCodeBuildQuery} type="primary">< Icon type="reload" style={{color: "white"}}/>刷新</Button>
                        </FormItem>
                    </div>
                </Form>
            </div>

            <div style={{ background:'#fff' }}>
                <Table className="table-margin" bordered loading={this.props.loading} rowKey={record => record.id} columns={this.columns} dataSource={this.props.codeBuildList} pagination={pagination}/>
            </div>
        </Content>
      </Layout>
    );
  }
}


const PaasCodeBuildManage = Form.create()(PaasCodeBuildForm);
export default connect(
  state => state.paasCodeBuild,
  { getCodeBuildTaskList, getUserCodeProjectList, clearCodeBuildData })(PaasCodeBuildManage);
