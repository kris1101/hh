import React, { Component } from 'react';
import { Transfer, Form } from 'antd';
import { connect } from 'react-redux';
import { getAjax } from '../../../../utils/daas/newaxios';
import { rdbHostInstanceRelationshipUpdate,rdbHostInstanceRelationshipFetch } from '../../../../containers/Daas/actions/rdb_host_instance_relationship';

class DaasRdbHostInstanceRelationshipUpdateFormManager extends Component {
    constructor(props){
        super(props);
        this.state = {
            mockData: [],
            targetKeys: [],
        }
    }

    componentDidMount() {
        this.getMock();
    }

    componentDidUpdate() {
        let hostInstances = this.state.targetKeys;
        const hostId = this.props.hostId;
        hostInstances = hostInstances.toString();
        const params = {instancelist: hostInstances};
        this.props.rdbHostInstanceRelationshipUpdate(hostId, params);
    }

    getMock = () => {
        const targetKeys = [];
        const mockData = [];
        const hostId=this.props.hostId;
        const _that = this;
        getAjax('/v1/api/rdb/instances', {}, function(response){
            const instances = response.data.data;
            for(let i=0; i<instances.length; i++){
                const instanceDat = instances[i];
                const data = {
                    key: instanceDat.pk,
                    title: instanceDat.fields.name,
                    description: instanceDat.fields.name,
                }
                mockData.push(data);
            }
            getAjax('/v1/api/rdb/host/instance/relationships', {host: hostId}, function(response){
                const hostInstnaceRelationshipDat = response.data.data;
                for(let i=0; i<hostInstnaceRelationshipDat.length; i++){
                    const instanceId=hostInstnaceRelationshipDat[i].fields.instance;
                    targetKeys.push(instanceId);
                }
                _that.setState({ mockData, targetKeys });
            });
        });
    }

    filterOption = (inputValue, option) => {
        return option.description.indexOf(inputValue) > -1;
    }

    handleChange = (targetKeys) => {
        this.setState({ targetKeys });
    }

    render() {
        return (
            <Transfer
            dataSource={this.state.mockData}
            showSearch
            titles={['所有用户', '组用户']}
            operations={['选择', '反选']}
            filterOption={this.filterOption}
            targetKeys={this.state.targetKeys}
            onChange={this.handleChange}
            render={item => item.title}
            />
        );
    }
}

const DaasRdbHostInstanceRelationshipUpdateForm = Form.create()(DaasRdbHostInstanceRelationshipUpdateFormManager);
export default connect(state=>state.daasRdbHostInstanceRelationship, { rdbHostInstanceRelationshipFetch,rdbHostInstanceRelationshipUpdate }) (DaasRdbHostInstanceRelationshipUpdateForm);
