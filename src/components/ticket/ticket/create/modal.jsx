import React, { Component } from 'react';
import { Form, Input, Select,notification,Modal,message,Upload,Button, Icon } from 'antd';
import * as Ajax from '../../../../utils/ticket/axios';

const FormItem = Form.Item;
const Option = Select.Option;

let options=[];
let objects=[];



class ModalForm extends Component {
    state = {
        confirmLoading: false,
        visible:false,
        autoCompleteResult: [],
        currentId: this.props.currentData && this.props.currentData.id ? this.props.currentData.id : "",
        children:[],
        objects:[],
        uuid:'',
        defaultObject:[],
    };

    componentWillMount(){
        let _this = this;
        Ajax.getAjax('/ticket/types',{},function (response) {
            console.log(response.data.objects);
            if (response.data.code === 30000) {
                let data = response.data.objects;
                console.log(data);
                _this.setState({
                    children:data
                });
                options=[];
                _this.state.children.map((item,index) => {
                    return options.push(<Option key={item.uuid} value={item.uuid}>{item.name}</Option>)
                })
            }
        });

    }
    handleChange = (value) => {
      console.log(`selected ${value}`);
      let _this = this;
      objects = [];
      this.props.form.setFieldsValue({ object_name:""});
      Ajax.getAjax('/ticket/type/'+value,{},function (response) {
            if (response.data.code === 30000) {
                let data = response.data.object.maintainers;
                console.log(data);
                _this.setState({
                    objects:data
                });
                _this.state.objects.map((item,index) => {
                    return objects.push(<Option key={item.uuid} value={item.uuid}>{item.name}</Option>)
                })
            }
        })
    }

    componentDidMount () {
        let _this = this;
        Ajax.getAjax('/ticket/types',{},function (response) {
            console.log(response.data.objects);
            if (response.data.code === 30000) {
                let data = response.data.objects;
                _this.setState({
                    children:data
                });
                options=[];
                _this.state.children.map((item,index) => {
                    return options.push(<Option key={item.uuid} value={item.uuid}>{item.name}</Option>)
                })
            }
        })


        const data = this.props.currentData;
        if(data) {
            this.setState({uuid: data.uuid});
            let objectList = [];
            data.objects.map((item,index) => {
               return objectList.push(item.uuid);
            });
            this.setState({ defaultObject:objectList });

            let groupList = [];
            data.groups.map((item,index) => {
               return groupList.push(item.uuid);
            });
            this.setState({ defaultGroup:groupList });
            this.props.form.setFieldsValue({
                name: data.name,
                comments: data.comments,
            })
        }

    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
                console.log('Received values of form: ', values);
              }
            });
    }

    handleCancel = () => {
        this.setState({
          visible: false,
        });
      }
    commitInfo = () =>{
        this.props.form.validateFields((err, values) => {
            let url = '';
            const data = this.props.currentData;
            if(data){//编辑
                url = '/ticket/'+this.state.uuid+'/detail';
                let $this = this;
                this.setState({
                  confirmLoading: false,
                });
                Ajax.putAjax(url,values,function (response) {
                    console.log(response);
                    if (response.data.code === 30000) {
                        message.success(response.data.message, 3)
                        $this.props.hideModal('ok');

                    } else {
                        notification.error({
                            message: '提示',
                            description: response.data.message,
                            duration: 2
                        })
                    }
                })
            }else {
                url = '/tickets';
                let $this = this;
                let data = values;
                let units=[];
                units.push({object_name:data.object_name,priority:data.priority,purpose:data.purpose,content:data.content});
                data.units=units;
                this.setState({
                  confirmLoading: false,
                });
                Ajax.postAjax(url,data,function (response) {
                    console.log(response);
                    if (response.data.code === 30000) {
                        message.success(response.data.message, 3)
                        $this.props.hideModal('ok');
                    } else {
                        notification.error({
                            message: '提示',
                            description: response.data.message,
                            duration: 2
                        })
                    }
                })
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
              labelCol: {
                xs: { span: 12 },
                sm: { span: 4 },
              },
              wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
              },
            };




        return (
            <Modal
                title={this.props.modalType === 'add' ? '新增工单' : '编辑工单'}
                visible={this.props.isOpen}
                onOk={this.commitInfo}
                onCancel={this.props.hideModal}
                confirmLoading={this.state.confirmLoading}
                okText="保存"
                cancelText="取消"
            >
                <div>
                <Form className="modal-form" onSubmit={this.handleSubmit}>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                      工单标题&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('title', {
                    rules: [{ required: true, message: '请输入工单标题！', whitespace: true }]
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                      抄送邮箱&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('CC_users', {
                    rules: [{ required: false}],initialValue:null
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(<span>工单类型&nbsp;</span>)}
                >
                    {getFieldDecorator('type_id',{rules: [{ required: true}],initialValue:this.state.defaultObject})(
                        <Select
                        style={{ width: '100%' }}
                        placeholder="选择工单类型"
                        onChange={this.handleChange}
                      >
                        {options}
                      </Select>
                    )}

                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(<span>对象名称&nbsp;</span>)}
                >
                    {getFieldDecorator('object_name',{rules: [{ required: true}],initialValue:""})(
                        <Select
                        style={{ width: '100%' }}
                        placeholder="选择工单类型"
                      >
                        {objects}
                      </Select>
                    )}

                </FormItem>
                <FormItem
                 {...formItemLayout}
                   label={(<span>优先级&nbsp;</span>)}
                >
                    {getFieldDecorator('priority',{rules: [{ required: true}],initialValue:""})(
                        <Select style={{width: '100%'}} placeholder="选择优先级">
                            <Option key='低' value="0">低</Option>
                            <Option key='普通' value="1">普通</Option>
                            <Option key='紧急' value="2">紧急</Option>
                            <Option key='严重' value="3">严重</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem
                 {...formItemLayout}
                   label={(<span>对应环境&nbsp;</span>)}
                >
                    {getFieldDecorator('purpose',{rules: [{ required: true}],initialValue:""})(
                        <Select style={{width: '100%'}} placeholder="选择环境">
                            <Option key='开发' value="0">开发</Option>
                            <Option key='测试' value="1">测试</Option>
                            <Option key='生产' value="2">生产</Option>
                            <Option key='其他' value="3">其他</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(<span>备注&nbsp;</span>)}
                >
                  {getFieldDecorator('comments', {
                    rules: [{ required: false,}],initialValue:null
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="上传"
                  extra="上传文件"
                >
                  {getFieldDecorator('upload', {
                    valuePropName: 'fileList',
                    getValueFromEvent: this.normFile,
                  })(
                    <Upload name="logo" action="/upload.do" listType="picture">
                      <Button>
                        <Icon type="upload" /> Click to upload
                      </Button>
                    </Upload>
                  )}
                </FormItem>


            </Form>
            </div>
        </Modal>
        )
    }
}

const UserModal = Form.create()(ModalForm);
export default UserModal;
