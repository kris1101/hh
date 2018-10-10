import React, { Component } from 'react';
import { Form, Input, Modal, Select, notification} from 'antd';
import * as Ajax from '../../../../utils/ticket/axios';

const FormItem = Form.Item;
const Option = Select.Option;

class ModalForm extends Component {
    state = {
        comfirmLoading: false
    }

    componentDidMount () {
        const data = this.props.areaData;
        if(data){
            this.props.form.setFieldsValue({
                username: data.username,
                email: data.email,
                name: data.name,
                password:data.password,
                roleId:data.roleId
            })
        }

    }



    commitInfo = () =>{
        const data = this.props.areaData;

        this.props.form.validateFields((err, values) => {
            let url = '';
            if(data){//编辑
                values.id = data.id;
                url = '/tickets/';
            }
            // else {
            //     url = '/user/addUser';
            // }
            let $this = this;
            let data = values;
            Ajax.postAjax(url,data,function (response) {
                console.log(response);
                if (response.data.errorCode == "0") {
                    $this.props.hideModal();

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
        const { option } = this.props;
        const roleOptions = option?option.map(element => <Option key={element.id} value={element.id}> {element.roleName}</Option>):'';
        return (
            <Modal
                title={this.props.modalType ==='新增工单'}
                visible={this.props.isOpen}
                onOk={this.commitInfo}
                onCancel={this.props.hideModal}
                confirmLoading={this.state.confirmLoading}
                okText="保存"
                cancelText="取消"
            >
                <div className="info-box">
                    <Form className="modal-form" layout="inline" onSubmit={this.commitInfo}>
                        <FormItem label="账号">
                            {getFieldDecorator('username',{ rules:[{required: true, message:'请输入账号'}] })(
                                <Input placeholder="请输入账号"/>
                            )}
                        </FormItem>
                        <FormItem label="邮箱">
                            {getFieldDecorator('email',{ rules:[{required: true, message:'请输入邮箱'}] })(
                                <Input placeholder="用于找回密码"/>
                            )}
                        </FormItem>
                        <FormItem label="姓名">
                            {getFieldDecorator('name',{rules:[{required: true, message:'请输入姓名'}] })(
                                <Input placeholder="请输入真实姓名"/>
                            )}
                        </FormItem>
                        <FormItem label="密码">
                            {getFieldDecorator('password',{rules:[{required: true, message:'请输入密码'}] })(
                                <Input placeholder="6~18位英文字母、数字组合"/>
                            )}
                        </FormItem>
                        <FormItem label="角色">
                            {getFieldDecorator('roleId',{initialValue:''})(
                                <Select style={{ width:120 }}>
                                    <Option key="0" value=""> 选择角色</Option>
                                    {roleOptions}
                                </Select>
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