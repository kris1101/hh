import React, { Component } from 'react';
import { Form, Input, Modal, Select, notification, message} from 'antd';
import * as Ajax from "../../../utils/axios";

const FormItem = Form.Item;
const Option = Select.Option;

class ChangeModalForm extends Component {
    state = {
        comfirmLoading: false
    }





    commitInfo = () =>{
        const areaData = this.props.areaData;

        this.props.form.validateFields((err, values) => {
            if(values.pwd!=values.password){
                notification.error({
                    message: '提示',
                    description: '两次密码输入不同！',
                    duration: 2
                })
                return;
            }
            let $this = this;
            let data = values;
            data.id = areaData.id;
            Ajax.postAjax('/user/resetPwd',data,function (response) {
                console.log(response);
                if (response.data.errorCode == "0") {
                    $this.props.hidePwdModal();
                    message.success("重置密码成功！");

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
        const option = this.state.options;
        const roleOptions = option?option.map(element => <Option key={element.id} value={element.id}> {element.roleName}</Option>):'';
        return (
            <Modal
                title='修改密码'
                visible={this.props.isPwdOpen}
                onOk={this.commitInfo}
                onCancel={this.props.hidePwdModal}
                confirmLoading={this.state.confirmLoading}
                okText="保存"
                cancelText="取消"
            >
                <div className="info-box">
                    <Form className="modal-form" layout="inline" onSubmit={this.commitInfo}>
                        <FormItem label="设置新密码">
                            {getFieldDecorator('pwd',{ rules:[{required: true, message:'请输入账号'}] })(
                                <Input placeholder="请输入账号"/>
                            )}
                        </FormItem>
                        <FormItem label="确定新密码">
                            {getFieldDecorator('password',{ rules:[{required: true, message:'请输入邮箱'}] })(
                                <Input placeholder="用于找回密码"/>
                            )}
                        </FormItem>

                    </Form>
                </div>
            </Modal>
        )
    }
}

const PasswordModal = Form.create()(ChangeModalForm);
export default PasswordModal;