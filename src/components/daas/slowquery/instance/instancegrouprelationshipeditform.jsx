import React, { Component } from 'react';
import { Transfer, Form, Button } from 'antd';
import { connect } from 'react-redux';
import { getAjax } from '../../../../utils/daas/axios';
import { BASE_URL } from '../../../../containers/Daas/constants';
import { slowQueryInstanceGroupRelationshipFetch, slowQueryInstanceGroupRelationshipUpdate } from '../../../../containers/Daas/actions/slow_query_instance_group_relationship';

class DaasSlowQueryInstanceGroupRelationshipManager extends Component {
  constructor(props){
    super(props);
    this.state = {
      mockData: [],
      targetKeys: [],
    }
  }

  componentDidMount() {
    const targetKeys = [];
    const mockData = [];
    const instanceId=this.props.instanceId;
    const _that = this;
    getAjax('/slow/query/groups', {}, function(response){
      const groups = response.data.data;
      for(let i=0; i<groups.length; i++){
        const groupDat = groups[i];
        const data = {
          key: groupDat.pk,
          title: groupDat.fields.name,
          description: groupDat.fields.name,
        }
        mockData.push(data);
      }
      _that.setState({ mockData });
    });
    getAjax('/slow/query/group/instance/relationships', {instance: instanceId}, function(response){
        // console.log(response);
      const instanceGroups = response.data.data;
      console.log(instanceGroups);
      console.log(targetKeys);
      for(let i=0; i<instanceGroups.length; i++){
        const groupId=instanceGroups[i].fields.group;
        targetKeys.push(groupId);
      }
      _that.setState({ targetKeys });
    });
  }

  componentDidUpdate() {
    const InstanceGroups = this.state.targetKeys;
    console.log(InstanceGroups);
    const instanceId = this.props.instanceId;
    console.log(instanceId);
    const params = {instance: instanceId, groupslist: InstanceGroups};
    // this.props.slowQueryInstanceGroupRelationshipFetch(this.state.targetKeys);
    this.props.slowQueryInstanceGroupRelationshipUpdate(params);
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


const DaasSlowQueryInstanceGroupRelationshipForm = Form.create()(DaasSlowQueryInstanceGroupRelationshipManager);
export default connect(state=>state.daasSlowQueryInstanceGroupRelationship, { slowQueryInstanceGroupRelationshipFetch,slowQueryInstanceGroupRelationshipUpdate }) (DaasSlowQueryInstanceGroupRelationshipForm);
