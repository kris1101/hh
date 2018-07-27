import React, { Component } from 'react';
import { Form, Input, Modal} from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

class ModalForm extends Component {
    state = {
        comfirmLoading: false
    }
    componentDidMount () {
        const data = this.props.areaData;
        if(data){
            this.props.form.setFieldsValue({
                areaName: data.areaName,
                num: data.planNum,
                remarks: data.remarks
            })
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                title={this.props.modalType === 'add' ? '添加区域' : '区域信息编辑'}
                visible={this.props.isOpen}
                onOk={this.commitInfo}
                onCancel={this.props.hideModal}
                confirmLoading={this.state.confirmLoading}
                okText="保存"
                cancelText="取消"
            >
                <div className="info-box">
                    <Form className="modal-form" layout="inline" onSubmit={this.commitInfo}>
                        <FormItem label="区域名称">
                            {getFieldDecorator('areaName',{ rules:[{required: true, message:'请输入区域名称'}] })(
                                <Input placeholder="请输入区域名称"/>
                            )}
                        </FormItem>
                        <FormItem label="摄像头计划数量">
                            {getFieldDecorator('num',{ rules:[{required: true, message:'请输入计划数量'}] })(
                                <Input placeholder="请输入计划数量"/>
                            )}
                        </FormItem>
                        <FormItem label="区域信息备注">
                            {getFieldDecorator('remarks',{})(
                                <TextArea placeholder="" maxLength={100} />
                            )}
                        </FormItem>
                    </Form>
                </div>
            </Modal>
        )
    }
}

const AreaModal = Form.create()(ModalForm);
export default AreaModal;