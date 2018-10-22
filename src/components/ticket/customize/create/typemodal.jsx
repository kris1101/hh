import React, { Component } from 'react';
import { Form, Input, Select,notification,Modal,message } from 'antd';
import * as Ajax from '../../../../utils/ticket/axios';

const FormItem = Form.Item;
const Option = Select.Option;

let options=[];
let groups=[];

class ModalForm extends Component {
    state = {
        confirmLoading: false,
        visible:false,
        autoCompleteResult: [],
        currentId: this.props.currentData && this.props.currentData.id ? this.props.currentData.id : "",
        children:[],
        groups:[],
        uuid:'',
        defaultObject:[],
    }

    componentWillMount(){
        let _this = this;
        Ajax.getAjax('/ticket/objects',{},function (response) {
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
        })
        Ajax.getAjax('/ticket/groups',{},function (response) {
            console.log(response.data.objects);
            if (response.data.code === 30000) {
                let data = response.data.objects;
                console.log(data);
                _this.setState({
                    groups:data
                });
                groups=[];
                _this.state.groups.map((item,index) => {
                  return groups.push(<Option key={item.uuid} value={item.uuid}>{item.name}</Option>)
                })
            }
        })
    }

    componentDidMount () {
        let _this = this;
        Ajax.getAjax('/ticket/objects',{},function (response) {
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
        Ajax.getAjax('/ticket/groups',{},function (response) {
            console.log(response.data.objects);
            if (response.data.code === 30000) {
                let data = response.data.objects;
                _this.setState({
                    groups:data
                });
                groups=[];
                _this.state.groups.map((item,index) => {
                    return groups.push(<Option key={item.uuid} value={item.uuid}>{item.name}</Option>)
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
            console.log(this.state.groups)
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

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
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
                url = '/ticket/type/'+this.state.uuid;
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
                url = '/ticket/types';
                let $this = this;
                let data = values;
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
                title={this.props.modalType === 'add' ? '添加工单类型' : '编辑工单类型'}
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
                      名称&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入名称！', whitespace: true }]
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(<span>工单类型&nbsp;</span>)}
                >
                    {getFieldDecorator('objects',{initialValue:this.state.defaultObject})(
                        <Select
                        mode="tags"
                        style={{ width: '100%' }}
                        placeholder="选择工单类型"
                      >
                        {options}
                      </Select>
                    )}

                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(<span>业务组&nbsp;</span>)}
                >
                    {getFieldDecorator('groups',{initialValue:this.state.defaultGroup})(
                        <Select
                        mode="tags"
                        style={{ width: '100%' }}
                        placeholder="选择业务组"
                      >
                        {groups}
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
            </Form>
            </div>
        </Modal>
        )
    }
}

const UserModal = Form.create()(ModalForm);
export default UserModal;
