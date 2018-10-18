import React from 'react'
import { Card, Switch, message, Form, Input, Drawer, Row, Col, Select, Button, Checkbox, Divider, Icon, Radio } from 'antd';
import { connect  } from 'react-redux';
import './codebuildcreate.less'
import { getCodeBranchTagList, getBaseRepoList, getBaseRepoTagList, getCompileRepoList, getCompileRepoTagList} from '../../../../../../containers/Paas/k8s/paascodebuild.redux'
import { getAjax  } from '../../../../utils/axios'
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/addon/display/autorefresh';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/night.css';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea  } = Input;

let uuid = 1;
const CodeBuildCreateForm = Form.create()(
  class extends React.Component {
    state = { 
      chartinfo:{versions:[]},
      is_compile: false,
      image_tag_type: "codebranch",
      dockerfile_type: "incode",
      code_branch_tag_choice: "branch"
    }   

    componentDidMount () {
    }

    handleCompileChange = (e) => {
      if(e){
          this.props.getCompileRepoList();
      }
      this.setState({is_compile: e})
    }

    handleCodeBranchTagChange = (e) => {
      this.setState({code_branch_tag_choice: e.target.value});
      this.props.form.resetFields(["branch_value"]);
      if(!this.props.form.getFieldValue("codeinfo_id")){
          message.warn("请先选择代码仓库");
          return; 
      }else{
          this.props.getCodeBranchTagList({codeinfo_id: this.props.form.getFieldValue("codeinfo_id"), method: e.target.value})
      }
    }

    handleImageTagTypeChange = (e) => {
      this.setState({image_tag_type: e.target.value})
    }

    handleDockerFileTypeChange = (e) => {
      if (e.target.value == "custom"){
          this.props.getBaseRepoList();
      }
      this.setState({dockerfile_type: e.target.value})
    }

    handleCodeprojectSelect = (value) => {
      this.props.form.resetFields(["branch_value"]);
      this.props.getCodeBranchTagList({codeinfo_id: value, method: this.state.code_branch_tag_choice})
    }

    handleBaserepoSelect = (value) => {
      this.props.form.resetFields(["baseimagetag"]);
      this.props.getBaseRepoTagList({repo_name: value.split("/").slice(1).join("/")})
    }

    handleCompilerepoSelect = (value) => {
      this.props.form.resetFields(["compile_imagetag"]);
      this.props.getCompileRepoTagList({repo_name: value})
    }


    getInstance = (instance) => {
        if (instance) {
          this.codemirror = instance.codemirror;
          this.editor = instance.editor;
        }
    }

    remove = (k) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
          return;
        } 
        form.setFieldsValue({
          keys: keys.filter(key => key !== k),
        });
    }

    add = () => {
      const { form } = this.props;
      // can use data-binding to get
      const keys = form.getFieldValue('keys');
      const nextKeys = keys.concat(uuid);
      uuid++;
      // can use data-binding to set
      // important! notify form to detect changes
      form.setFieldsValue({
        keys: nextKeys,
      });
    }

    render() {
      const { confirmLoading, visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator, getFieldValue } = form;
      const Option = Select.Option;
      getFieldDecorator('keys', { initialValue: [0] });
      const formItemLayout = {
        labelCol: {
          span: 4
        },
        wrapperCol: {
          span: 20 
        },
      };
      const formItemLayoutWithOutLabel = {
        wrapperCol: {
           span: 20, offset: 4 
        },
      }; 
      const keys = getFieldValue('keys');
      const formItems = keys.map((k, index) => {
        return (
          <FormItem className="formitem" 
            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
            label={index === 0 ? '环境变量' : ''}
            required={false}
            key={k}
          >
          <Col span={11}>
          <FormItem className="formitem" >
            {getFieldDecorator(`envkeys[${k}]`)(
              <Input placeholder="key" style={{width: "90%", marginRight: 2 }} />
            )}
          </FormItem>
        </Col>
          <Col span={11}>
            <FormItem className="formitem"> 
            {getFieldDecorator(`envvalues[${k}]`)(
              <Input placeholder="value" style={{ width: "90%", marginRight: 2 }} />
            )}
          </FormItem>
        </Col>
          <Col span={2}>
            <FormItem className="formitem"> 
            {keys.length >= 1 ? (
            <span>
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                disabled={keys.length === 1}
                onClick={() => this.remove(k)}
              />
              <Icon
                className="dynamic-add-button"
                type="plus-circle-o"
                onClick={this.add}
              />
            </span>
            ) : null}
         </FormItem>
        </Col>
         </FormItem>
        );
      });
      
      return (
                <Drawer
                  title="新建构建任务"
                  width="800px"
                  placement="right"
                  onClose={onCancel}
                  maskClosable={false}
                  visible={visible}
                  destroyOnClose={true}
                  style={{
                    padding: 10,
                    height: 'calc(100%- 55px)',
                    overflow: 'auto',
                    paddingBottom: 53,
                  }}
                >
                  <Form  layout="horizontal" hideRequiredMark id="deployform">
                    <Card 
                      title="基础配置"
                      headStyle={{
                                    background: '#F5F5F5'
                                }}
                    >
                        <Form.Item className="formitem" label="任务名称" labelCol={{ span: 4}} disabled={confirmLoading} wrapperCol={{span: 20}}>
							{getFieldDecorator('taskname', {rules: [{required: true, message:"该项不能为空"}]})(
									<Input placeholder="任务名称"/>
                             )}
                        </Form.Item>
                        <Form.Item className="formitem" label="项目代码" labelCol={{ span: 4}} disabled={confirmLoading} wrapperCol={{span: 20}}>
							{getFieldDecorator('codeinfo_id',{rules: [{required: true, message:"该项不能为空"}]})(
                            <Select 
                              showSearch
                              onSelect={this.handleCodeprojectSelect}
                              style={{ width: "100%" }}
                              notFoundContent="未发现代码仓库"
                              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                              placeholder="选择代码仓库"
                            >
                              {this.props.usercodeprojectList.map(function(currentvalue){ return <Option key={currentvalue.id} value={currentvalue.id}>{currentvalue.http_url_to_repo}</Option>})}
                            </Select>
                             )}
                        </Form.Item>
                        <Form.Item className="formitem" label="项目标签" labelCol={{ span: 4}} wrapperCol={{span: 20}}>
                           <Col span={6}>
                             <Form.Item>
                               <RadioGroup 
                                 name="projectbranch" 
                                 defaultValue="branch"
                                 onChange={this.handleCodeBranchTagChange}
                               >
                                            <Radio value="branch">branch</Radio>
                                            <Radio value="tag">tag</Radio>
                                   </RadioGroup>
                             </Form.Item>
                            </Col>
                           <Col span={18}>
                             <Form.Item>
							      {getFieldDecorator('branch_value',{rules: [{required: true, message:"该项不能为空"}]})(
                                  <Select 
                                    showSearch
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    notFoundContent="未发现记录"
                                    style={{ width: "100%" }} 
                                    placeholder="选择分支版本">
                                               {this.props.codeBranchTagList.map(function(currentvalue){ return <Option key={currentvalue} value={currentvalue}>{currentvalue}</Option>})}
                                          </Select>
                                   )}
                             </Form.Item>
                            </Col>
                        </Form.Item>
                        <Form.Item className="formitem" label="编译代码" labelCol={{ span: 4}} disabled={confirmLoading} wrapperCol={{span: 20}}>
							{getFieldDecorator('is_compile',{initialValue: false})(
                            <Switch 
                               onChange={this.handleCompileChange}
                            />
                             )}
                        </Form.Item>
                        <Form.Item className="formitem" label="镜像名称" labelCol={{ span: 4}} disabled={confirmLoading} wrapperCol={{span: 20}}>
							{getFieldDecorator('imagename', {rules: [{required: true, message:"该项不能为空"}]})(
									<Input placeholder="镜像名称"/>
                             )}
                        </Form.Item>
                        <Form.Item className="formitem" label="镜像标签" labelCol={{ span: 4}} wrapperCol={{span: 20}}>
                           <Col span={11}>
                             <Form.Item>
                               <RadioGroup 
                                 name="imagetag" 
                                 defaultValue="codebranch"
                                 onChange={this.handleImageTagTypeChange}
                               >
                                            <Radio value="codebranch">代码分支</Radio>
                                            <Radio value="timestamp">时间戳</Radio>
                                            <Radio value="custom">自定义</Radio>
                                   </RadioGroup>
                             </Form.Item>
                            </Col>
                          {this.state.image_tag_type == "custom" ?
                           <Col span={13}>
                             <Form.Item>
							      {getFieldDecorator('customimagetag', {rules: [{required: true, message:"该项不能为空"}]})(
							      		<Input placeholder="自定义镜像tag"/>
                                   )}
                             </Form.Item>
                            </Col>
                            : null}
                        </Form.Item>
                        <Form.Item className="formitem" label="dockerfile" labelCol={{ span: 4}} wrapperCol={{span: 20}}>
                           <Col span={7}>
                             <Form.Item>
                               <RadioGroup 
                                 name="dockerfiletype" 
                                 defaultValue="incode"
                                 onChange={this.handleDockerFileTypeChange}
                               >
                                            <Radio value="incode">代码库</Radio>
                                            <Radio value="custom">自定义</Radio>
                                   </RadioGroup>
                             </Form.Item>
                            </Col>
                          {this.state.dockerfile_type == "incode" ?
                           <Col span={17}>
                             <Form.Item>
							      {getFieldDecorator('dokerfile_path', {rules: [{required: true, message:"该项不能为空"}]})(
                                  <Input addonBefore="/" placeholder="dockerfile路径"/>
                                   )}
                             </Form.Item>
                            </Col>
                            : null}
                        </Form.Item>
                       </Card>
              {this.state.is_compile ?
                    <div>
                       <Divider />
                    <Card 
                      title="编译配置"
                      headStyle={{
                                    background: '#F5F5F5'
                                }}
                    >
                        <Form.Item className="formitem" label="编译镜像" labelCol={{ span: 4}} wrapperCol={{span: 20}}>
                           <Col span={11}>
                             <Form.Item>
							      {getFieldDecorator('compile_imagename',{rules: [{required: true, message:"该项不能为空"}]})(
                                  <Select 
                                    style={{ width: "100%" }}
                                    onSelect={this.handleCompilerepoSelect}
                                    placeholder="编译镜像名称" 
                                  >
                                             {this.props.compilerepoList.map(function(currentvalue){ return <Option key={currentvalue.name} value={currentvalue.name}>{currentvalue.name}</Option>})}
                                          </Select>
                                   )}
                             </Form.Item>
                            </Col>
                           <Col span={2}>
                             <span style={{ display: 'inline-block', width: '100%', textAlign: 'center'  }}>
                             :
                             </span>
                            </Col>
                           <Col span={11}>
                             <Form.Item>
							      {getFieldDecorator('compile_imagetag',{rules: [{required: true, message:"该项不能为空"}]})(
                                  <Select 
                                    placeholder="编译镜像tag" 
                                    style={{ width: "100%" }}
                                  >
                                             {this.props.compilerepotagList.map(function(currentvalue){ return <Option key={currentvalue.name} value={currentvalue.name}>{currentvalue.name}</Option>})}
                                          </Select>
                                   )}
                             </Form.Item>
                            </Col>
                        </Form.Item>
                        <Form.Item className="formitem" label="源代码目录" labelCol={{ span: 4}} disabled={confirmLoading} wrapperCol={{span: 20}}>
							{getFieldDecorator('code_save_path',{rules: [{required: true, message:"该项不能为空"}]})(
                                 <Input placeholder="镜像内代码存放路径,要求以绝对路径,例如:/code"/>
                             )}
                        </Form.Item>
                        <Form.Item className="formitem" label="编译结果目录" labelCol={{ span: 4}} disabled={confirmLoading} wrapperCol={{span: 20}}>
							{getFieldDecorator('compile_result_path',{rules: [{required: true, message:"该项不能为空"}]})(
                                 <Input placeholder="镜像内编译结果存放路径,要求以绝对路径,例如:/code"/>
                             )}
                        </Form.Item>
                        <Form.Item className="formitem" label="编译脚本" labelCol={{ span: 4}} disabled={confirmLoading} wrapperCol={{span: 20}}>
							 <CodeMirror 
							   value="" 
							   ref={this.getInstance} 
							   options={{ 
							     theme: "night", 
							     keyMap: 'sublime', 
							     mode: "shell", 
							   }}
                             />
                        </Form.Item>
                       </Card>
                   </div>
                       : null}
                   {this.state.dockerfile_type == "custom" ?
                   <div>
                       <Divider />
                    <Card 
                      title="Dockerfile配置"
                      headStyle={{
                                    background: '#F5F5F5'
                                }}
                    >
                        <Form.Item className="formitem" label="基础镜像" labelCol={{ span: 4}} wrapperCol={{span: 20}}>
                           <Col span={11}>
                             <Form.Item>
							      {getFieldDecorator('baseimagename',{rules: [{required: true, message:"该项不能为空"}]})(
                                  <Select 
                                    style={{ width: "100%" }}
                                    onSelect={this.handleBaserepoSelect}
                                    placeholder="基础镜像名称" 
                                  >
                                    {this.props.baserepoList.map(function(currentvalue){ return <Option key={currentvalue} value={currentvalue}>{currentvalue.split("/").slice(1).join("/")}</Option>})}
                                          </Select>
                                   )}
                             </Form.Item>
                            </Col>
                           <Col span={2}>
                             <span style={{ display: 'inline-block', width: '100%', textAlign: 'center'  }}>
                             :
                             </span>
                            </Col>
                           <Col span={11}>
                             <Form.Item>
							      {getFieldDecorator('baseimagetag',{rules: [{required: true, message:"该项不能为空"}]})(
                                  <Select 
                                    style={{ width: "100%" }}
                                    placeholder="基础镜像tag" 
                                  >
                                             {this.props.baserepotagList.map(function(currentvalue){ return <Option key={currentvalue.name} value={currentvalue.name}>{currentvalue.name}</Option>})}
                                          </Select>
                                   )}
                             </Form.Item>
                            </Col>
                        </Form.Item>
                        <Form.Item className="formitem" label="安装依赖" labelCol={{ span: 4}} disabled={confirmLoading} wrapperCol={{span: 20}}>
							{getFieldDecorator('installCmd')(
                                <TextArea rows={2} placeholder="多条命令请用&&连接"/>
                             )}
                        </Form.Item>
                        <Form.Item className="formitem" label="代码路径" labelCol={{ span: 4}} disabled={confirmLoading} wrapperCol={{span: 20}}>
							{getFieldDecorator('codeStoragePath')(
                                 <Input placeholder="镜像内代码存放路径,要求以绝对路径,例如:/code"/>
                             )}
                        </Form.Item>
                        <Form.Item className="formitem" label="编译命令" labelCol={{ span: 4}} disabled={confirmLoading} wrapperCol={{span: 20}}>
							{getFieldDecorator('compileCmd')(
                                <TextArea rows={2} placeholder="多条命令请用&&连接"/>
                             )}
                        </Form.Item>
                        <Form.Item className="formitem" label="工作目录" labelCol={{ span: 4}} disabled={confirmLoading} wrapperCol={{span: 20}}>
							{getFieldDecorator('workDir')(
                                 <Input placeholder="要求绝对目录,默认为根目录"/>
                             )}
                        </Form.Item>
                        <Form.Item className="formitem" label="启动命令" labelCol={{ span: 4}} disabled={confirmLoading} wrapperCol={{span: 20}}>
							{getFieldDecorator('startCmd', {rules: [{required: true, message:"该项不能为空"}]})(
                                <TextArea rows={2} placeholder="多条命令请用&&连接"/>
                             )}
                        </Form.Item>
                        <Form.Item className="formitem" label="User in Docker" labelCol={{ span: 4}} disabled={confirmLoading} wrapperCol={{span: 20}}>
							{getFieldDecorator('dockerUser')(
                                 <Input placeholder="Docker内用户"/>
                             )}
                        </Form.Item>
       						  {formItems}
                       </Card>
                       </div>
                       : null}
                  </Form>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      width: '100%',
                      borderTop: '1px solid #e8e8e8',
                      padding: '10px 16px',
                      textAlign: 'right',
                      left: 0,
                      background: '#fff',
                      borderRadius: '0 0 4px 4px',
                    }}
                  >
                    <Button
                      style={{
                        marginRight: 8,
                      }}
                      onClick={onCancel}
                    >
                      取消
                    </Button>
                    <Button onClick={onCreate} loading={confirmLoading} type="primary">提交</Button>
                  </div>
                </Drawer>
            );
    }
  }
);

export default connect(
  state => state.paasCodeBuild,
  { getCodeBranchTagList, getBaseRepoList, getBaseRepoTagList, getCompileRepoList, getCompileRepoTagList})(CodeBuildCreateForm);
