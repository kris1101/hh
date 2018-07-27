import React, { Component } from 'react';
import { Form, Input, Modal, Select, Checkbox} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

const gradeList = ['高级别','中级别','低级别'];
const defaultCheckedList = [];

class ModalForm extends Component {
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
                title={this.props.modalType === 'add' ? '添加邮箱' : '编辑邮箱'}
                visible={this.props.isOpen}
                onOk={this.commitInfo}
                onCancel={this.props.hideModal}
                confirmLoading={this.state.confirmLoading}
                okText="保存"
                cancelText="取消"
            >
                <div className="info-box">
                    <Form className="modal-form" layout="inline" onSubmit={this.commitInfo}>
                        <FormItem label="邮箱名称">
                            {getFieldDecorator('emailName',{ rules:[{required: true, message:'请输入账号'}] })(
                                <Input placeholder="请输入邮箱地址"/>
                            )}
                        </FormItem>
                        <FormItem label="邮件类型">
                            {getFieldDecorator('emailType',{ initialValue:'1'})(
                                <Select style={{ width:120 }}>
                                    <Option value="1">考勤</Option>
                                    <Option value="2">警报</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label="警报级别">
                            {getFieldDecorator('alertGrade',{})(
                                <CheckboxGroup options={this.state.alertGrade} value={this.state.checkedList} onChange={this.onChange} />
                            )}
                        </FormItem>
                    </Form>
                </div>
            </Modal>
        )
    }
}

const EmailModal = Form.create()(ModalForm);
export default EmailModal;