import React, { Component } from 'react';
import { Form, Input, notification,Modal,message } from 'antd';
import * as Ajax from '../../../../utils/ticket/axios';

const FormItem = Form.Item;


class ModalForm extends Component {
    state = {
        confirmLoading: false,
        visible:false,
        autoCompleteResult: [],
        currentId: this.props.currentData && this.props.currentData.id ? this.props.currentData.id : "",
        children:[],
        uuid:'',
    }
    componentDidMount () {
        const data = this.props.currentData;
        if(data) {
            this.setState({uuid: data.uuid});
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
                url = '/ticket/object/'+this.state.uuid;
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
                url = '/ticket/objects';
                let $this = this;
                let data = values;
                this.setState({
                  confirmLoading: false,
                });
                console.log(data)
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
                title={this.props.modalType === 'add' ? '添加工单对象' : '编辑工单对象'}
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

const ObjectModal = Form.create()(ModalForm);
export default ObjectModal;
