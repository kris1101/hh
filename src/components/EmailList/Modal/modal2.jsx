import React, { Component } from 'react';
import { Form, Input, Modal, Select, Checkbox} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

const gradeList = ['高级别','中级别','低级别'];
const defaultCheckedList = [];

class ModalForm2 extends Component {
    state = {
        comfirmLoading: false,
        alertGrade: gradeList,
        checkedList: defaultCheckedList,
    }
    componentDidMount () {
        const data = this.props.areaData;
        if(data){
            this.props.form.setFieldsValue({
                userName: data.roleName,
                userEmail: data.id,
                name: data.remarks
            })
        }
    }

    onChange = (checkedList) => {
        this.setState({
            checkedList,
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                title='配置发送邮箱'
                visible={this.props.isOpen}
                onOk={this.commitInfo}
                onCancel={this.props.hideModal}
                confirmLoading={this.state.confirmLoading}
                okText="保存"
                cancelText="取消"
            >
                <div className="info-box">
                    <Form className="modal-form" layout="inline" onSubmit={this.commitInfo}>

                        <FormItem label="SMTP服务器">
                            {getFieldDecorator('server',{ rules:[{required: true, message:'请输入SMTP服务器'}] })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="端口号">
                            {getFieldDecorator('portNum',{ rules:[{required: true, message:'请输入端口号'}] })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="用户名">
                            {getFieldDecorator('userName',{ rules:[{required: true, message:'请输入用户名'}] })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="密码">
                            {getFieldDecorator('password',{ rules:[{required: true, message:'请输入密码'}] })(
                                <Input type="password"/>
                            )}
                        </FormItem>
                    </Form>
                </div>
            </Modal>
        )
    }
}

const EmailModal2 = Form.create()(ModalForm2);
export default EmailModal2;