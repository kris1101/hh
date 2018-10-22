import React, { Component } from 'react';
import { Transfer, Form } from 'antd';
import { connect } from 'react-redux';
import { getAjax } from '../../../../utils/daas/axios';
import { slowQueryGroupUserRelationshipFetch,slowQueryGroupUserRelationshipUpdate } from '../../../../containers/Daas/actions/slow_query_group_user_relationship';

class DaasSlowQueryGroupUserRelationshipManager extends Component {
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
    const groupUsers = this.state.targetKeys;
    const groupId = this.props.groupId;
    const params = {group: groupId, userlist: groupUsers};
    this.props.slowQueryGroupUserRelationshipUpdate(params);
    // console.log(groupUsers)
    // this.props.slowQueryGroupUserRelationshipFetch(groupUsers);
  }

  getMock = () => {
    const targetKeys = [];
    const mockData = [];
    const groupId=this.props.groupId;
    const _that = this;
    getAjax('/slow/query/users', {}, function(response){
      const users = response.data.data;
      for(let i=0; i<users.length; i++){
        const userDat = users[i];
        const data = {
          key: userDat.pk,
          title: userDat.fields.name,
          description: userDat.fields.name,
        }
        mockData.push(data);
      }
      getAjax('/slow/query/group/user/relationships', {group: groupId}, function(response){
        // console.log(response);
        const users = response.data.data;
        for(let i=0; i<users.length; i++){
          const userId=users[i].fields.user;
          targetKeys.push(userId);
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


const DaasSlowQueryGroupUserRelationshipForm = Form.create()(DaasSlowQueryGroupUserRelationshipManager);
export default connect(state=>state.daasSlowQueryGroupUserRelationship, { slowQueryGroupUserRelationshipFetch,slowQueryGroupUserRelationshipUpdate }) (DaasSlowQueryGroupUserRelationshipForm);
