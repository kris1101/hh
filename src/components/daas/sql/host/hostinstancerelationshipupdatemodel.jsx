import React, { Component } from 'react';
import { Modal, Button, Form } from 'antd';
import { connect } from 'react-redux';
import DaasRdbHostInstanceRelationshipUpdateForm  from './hostinstancerelationshipupdateform';
import { rdbHostInstanceRelationshipUpdate } from '../../../../containers/Daas/actions/rdb_host_instance_relationship';

class DaasRdbHostInstanceRelationshipUpdateModelManager extends Component {
    constructor(props){
        super(props);
        this.state = {
            ModalText: 'Content of the modal',
            visible: false,
            confirmLoading: false,
        }
    }


    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = () => {
        this.setState({
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 2000);
    }

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    }

    render() {
        const { visible, confirmLoading } = this.state;
        return (
            <div>
                <Button onClick={this.showModal}>
                  编辑成员
                </Button>
                <Modal title="编辑成员"
                    visible={visible}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <DaasRdbHostInstanceRelationshipUpdateForm hostId={this.props.pk} />
                </Modal>
            </div>
        );
    }
}

const DaasRdbHostInstanceRelationshipUpdateModel = Form.create()(DaasRdbHostInstanceRelationshipUpdateModelManager);
export default connect(state=>state.daasRdbHostInstanceRelationship, {rdbHostInstanceRelationshipUpdate}) (DaasRdbHostInstanceRelationshipUpdateModel);
