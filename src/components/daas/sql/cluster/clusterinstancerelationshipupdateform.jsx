import React, { Component } from 'react';
import { Transfer, Form } from 'antd';
import { connect } from 'react-redux';
import { getAjax } from '../../../../utils/daas/newaxios';
import { rdbClusterInstanceRelationshipUpdate,rdbClusterInstanceRelationshipFetch } from '../../../../containers/Daas/actions/rdb_cluster_instance_relationship';

class DaasRdbClusterInstanceRelationshipUpdateFormManager extends Component {
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
		let clusterInstances = this.state.targetKeys;
		const clusterId = this.props.clusterId;
		clusterInstances = clusterInstances.toString();
		const params = {instancelist: clusterInstances};
		this.props.rdbClusterInstanceRelationshipUpdate(clusterId, params);
	}

	getMock = () => {
		const targetKeys = [];
		const mockData = [];
		const clusterId=this.props.clusterId;
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
			getAjax('/v1/api/rdb/cluster/instance/relationships', {cluster: clusterId}, function(response){
				const cluserInstnaceRelationshipDat = response.data.data;
				for(let i=0; i<cluserInstnaceRelationshipDat.length; i++){
					const instanceId=cluserInstnaceRelationshipDat[i].fields.instance;
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

const DaasRdbClusterInstanceRelationshipUpdateForm = Form.create()(DaasRdbClusterInstanceRelationshipUpdateFormManager);
export default connect(state=>state.daasRdbClusterInstanceRelationship, { rdbClusterInstanceRelationshipFetch,rdbClusterInstanceRelationshipUpdate }) (DaasRdbClusterInstanceRelationshipUpdateForm);
