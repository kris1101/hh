import React from 'react'
import { Icon, Button, Upload, message, Modal, Form, Input, Radio, Transfer } from 'antd';
import axios from 'axios'
import { connect } from 'react-redux';

import { getgroups } from '../TableTpl/group';
import { getGroupMembersList } from '../../../../containers/Daas/groupmembers.redux'

const FormItem = Form.Item;
const baseUrl = 'http://127.0.0.1:8000';
var instance = axios.create({
    baseURL: baseUrl,//测试环境
    timeout: 2000,
});
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'


const GroupMemberUpdateForm = Form.create()(
  class extends React.Component {
      constructor(props) {
        super(props);
      }

      state = {
        userData: [],
        groupMembers: [],
        group_id: '', 
      }

      componentDidMount() {
        // this.props.getGroupMembersList({})
      }

      getUsers = (group_id) => {
        const groupMembers = [];
        const userData = [];
        instance.get('/v1/api/slow/query/users')
          .then(function(res){
            if(res.data.code == 0){
              for (let i = 0; i < res.data.data.length; i++) {
                const data = {
                  key: i.toString(),
                  title: res.data.data[i].fields.name,
                  chosen: Math.random() * 2 > 1,
                };
                 // if (data.chosen) {
                   //groupMembers.push(data.key);
                 //}
                 userData.push(data);
                 console.log(userData)
               }
                 //this.setState({ userData, groupMembers });
            }else{
                message.error(res.data.message) 
                notification.error({
                  description: res.data.message,
                  message: "提示"
                })
            }
          })

          instance.get('/v1/api/slow/query/group/user/relationships', {params: {group: group_id}})
          .then(function(res){
            if(res.data.code == 0){
              for (let i = 0; i < res.data.data.length; i++) {
                const data = {
                  key: i.toString(),
                  title: res.data.data[i]["fields"]["user"],
                  chosen: Math.random() * 2 > 1,
                };
                 groupMembers.push(data);
                 console.log(groupMembers)
               }
                 //this.setState({ userData, groupMembers });
            }else{
                message.error(res.data.message) 
            }
          })
             this.setState({ userData, groupMembers });
             console.log(this.setState.userData)
      }

      filterOption = (inputValue, option) => {
        return option.title.indexOf(inputValue) > -1;
      }

      handleChange = (groupMembers) => {
        this.setState({groupMembers });
      }

    render() {
      const { confirmLoading, visible, onCancel, onCreate, groupinfo, form } = this.props;
      const { getFieldDecorator } = form;
      const _that = this;

      return (
        <Modal
           visible={visible}
           title="组成员编辑"
           okText="提交"
           onCancel={onCancel}
           onOk={onCreate}
           centered={true}
           confirmLoading={confirmLoading}
         >
            <Transfer
              dataSource={this.state.userData}
              showSearch
              filterOption={this.filterOption}
              targetKeys={this.state.groupMembers}
              onChange={this.handleChange}
              render={item => item.title}
            />
          </Modal>
        );
      }
   }
);

export { GroupMemberUpdateForm }

// const DaasGroupMembersManage = Form.create()(DaasGroupMembersManageForm) 
export default connect(
 state => state.daasGroupMembers,
 { getGroupMembersList })(GroupMemberUpdateForm)
