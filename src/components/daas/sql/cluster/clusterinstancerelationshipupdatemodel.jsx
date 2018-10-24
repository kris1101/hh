import React, { Component } from 'react';
import { Modal, Button, Form } from 'antd';
import { connect } from 'react-redux';
import DaasRdbClusterInstanceRelationshipUpdateForm  from './clusterinstancerelationshipupdateform';
import { rdbClusterInstanceRelationshipUpdate } from '../../../../containers/Daas/actions/rdb_cluster_instance_relationship';

class DaasRdbClusterInstanceRelationshipUpdateModelManager extends Component {
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
                    <DaasRdbClusterInstanceRelationshipUpdateForm clusterId={this.props.pk} />
                </Modal>
            </div>
        );
    }
}

const DaasRdbClusterInstanceRelationshipUpdateModel = Form.create()(DaasRdbClusterInstanceRelationshipUpdateModelManager);
export default connect(state=>state.daasRdbClusterInstanceRelationship, {rdbClusterInstanceRelationshipUpdate}) (DaasRdbClusterInstanceRelationshipUpdateModel);
