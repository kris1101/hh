import React, { Component } from 'react';
import { Form, Input, Select, AutoComplete,notification,Modal } from 'antd';
import * as Ajax from '../../../../utils/ticket/axios';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
const AutoCompleteOption = AutoComplete.Option;

class ModalForm extends Component {
    state = {
        confirmDirty: false,
        visible:false,
        autoCompleteResult: [],
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

    handleWebsiteChange = (value) => {
        let autoCompleteResult;
        if (!value) {
          autoCompleteResult = [];
        } else {
          autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    }

    handleCancel = () => {
        this.setState({
          visible: false,
        });
      }
    commitInfo = () =>{
        const data = this.props.areaData;

        this.props.form.validateFields((err, values) => {
            let url = '';
            if(data){//编辑
                values.id = data.uuid;
                url = '/ticket/user/'+values.id;
            }else {
                url = '/ticket/users';
            }
            let $this = this;
            let data = values;
            console.log(data)
            console.log(url)
            this.setState({
              confirmLoading: false,
            });
            Ajax.postAjax(url,data,function (response) {
                console.log(response);
                if (response.data.code == 30000) {
                    $this.hideModal();

                } else {
                    notification.error({
                        message: '提示',
                        description: response.data.msg,
                        duration: 2
                    })
                }
            })
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;
        const { option } = this.props;
        const roleOptions = option?option.map(element => <Option key={element.id} value={element.id}> {element.roleName}</Option>):'';
        const formItemLayout = {
              labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
              },
              wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
              },
            };
            const tailFormItemLayout = {
              wrapperCol: {
                xs: {
                  span: 24,
                  offset: 0,
                },
                sm: {
                  span: 16,
                  offset: 8,
                },
              },
            };
            const prefixSelector = getFieldDecorator('prefix', {
              initialValue: '86',
            })(
              <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
              </Select>
            );
         const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));
        return (
            <Modal
                title={this.props.modalType === 'add' ? '添加用户' : '编辑用户'}
                visible={this.props.isOpen}
                onOk={this.commitInfo}
                onCancel={this.props.hideModal}
                confirmLoading={this.state.confirmLoading}
                okText="保存"
                cancelText="取消"
            >
                <div>
                <Form onSubmit={this.handleSubmit}>
                <FormItem
                  {...formItemLayout}
                  label={(
                    <span>
                      姓名&nbsp;
                    </span>
                  )}
                >
                  {getFieldDecorator('user_name', {
                    rules: [{ required: true, message: '请输入姓名！', whitespace: true }]
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(<span>部门&nbsp;</span>)}
                >
                  {getFieldDecorator('department', {
                    rules: [{ required: false,}],initialValue:null
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label={(<span>职位&nbsp;</span>)}
                >
                  {getFieldDecorator('duty', {
                    rules: [{ required: false,}],initialValue:null
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="邮箱"
                >
                  {getFieldDecorator('email', {
                    rules: [{
                      type: 'email', message: '请输入正确的邮箱地址!',
                    }, {
                      required: true, message: '请输入邮箱地址!',
                    }],
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="手机"
                >
                  {getFieldDecorator('telephone', {
                    rules: [{ required: false, message: '请输入正确的手机号码!' }],initialValue:null
                  })(
                    <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
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
