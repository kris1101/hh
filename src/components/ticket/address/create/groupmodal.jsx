import React, { Component } from 'react';
import { Form, Input, Select,notification,Modal,message } from 'antd';
import * as Ajax from '../../../../utils/ticket/axios';

const FormItem = Form.Item;
const Option = Select.Option;

let options=[];

class ModalForm extends Component {
    state = {
        confirmLoading: false,
        visible:false,
        autoCompleteResult: [],
        currentId: this.props.currentData && this.props.currentData.id ? this.props.currentData.id : "",
        children:[],
        uuid:'',
        defaultUsers:[],
        is_private:''
    }
    componentWillMount(){
        let _this = this;
        Ajax.getAjax('/ticket/users',{},function (response) {
            console.log(response.data.objects);
            if (response.data.code === 30000) {
                let data = response.data.objects;
                console.log(data);
                _this.setState({
                    children:data
                });
                options=[];
                _this.state.children.map((item,index) => {
                    return options.push(<Option key={item.uuid} value={item.uuid}>{item.user_name}</Option>)
                })
            }
        })
    }

    componentDidMount () {
        let _this = this;
        Ajax.getAjax('/ticket/users',{},function (response) {
            console.log(response.data.objects);
                    if (response.data.code === 30000) {
                        let data = response.data.objects;
                        console.log(data);
                        _this.setState({
                            children:data
                        });
                        options=[];
                        _this.state.children.map((item,index) => {
                           return options.push(<Option key={item.uuid} value={item.uuid}>{item.user_name}</Option>)
                        })
                    }
                })
        const data = this.props.currentData;
        if(data) {
            this.setState({uuid: data.uuid});
            if(data.is_private==0){
                this.setState({ is_private: "1"})
            }else {
                this.setState({ is_private: "0"})
            }
            let usersList = [];
            data.users.map((item,index) => {
               usersList.push(item.uuid);
            });
            this.setState({ defaultUsers:usersList });
            this.props.form.setFieldsValue({
                name: data.name,
                comments: data.comments,
            })
            console.log(this.state.is_private)
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
                url = '/ticket/group/'+this.state.uuid;
                let $this = this;
                this.setState({
                  confirmLoading: false,
                });
                Ajax.putAjax(url,values,function (response) {
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
                url = '/ticket/groups';
                let $this = this;
                let data = values;
                this.setState({
                  confirmLoading: false,
                });
                Ajax.postAjax(url,data,function (response) {
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
                title={this.props.modalType === 'add' ? '添加用户组' : '编辑用户组'}
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
                  label={(<span>成员&nbsp;</span>)}
                >
                    {getFieldDecorator('users',{initialValue:this.state.defaultUsers})(
                        <Select
                        mode="tags"
                        style={{ width: '100%' }}
                        placeholder="选择成员"
                      >
                        {options}
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
                   label={(<span>是否共享&nbsp;</span>)}
                >
                    {getFieldDecorator('is_private',{initialValue:this.state.is_private})(
                        <Select style={{width: 174}}>
                            <Option key='是' value="0">是</Option>
                            <Option key='否' value="1">否</Option>
                        </Select>
                    )}
                </FormItem>
            </Form>
            </div>
        </Modal>
        )
    }
}

const GroupModal = Form.create()(ModalForm);
export default GroupModal;
