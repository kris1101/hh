import React from 'react'
import { Icon, Button, Upload, message, Modal, Form, Input, Radio, Transfer } from 'antd';
import axios from 'axios'

const FormItem = Form.Item;
const baseUrl = 'http://127.0.0.1:8000';
var instance = axios.create({
    baseURL: baseUrl,//测试环境
    timeout: 2000,
});
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'


const GroupMemberUpdateForm = Form.create()(
  class extends React.Component {
      state = {
        userData: [],
        groupMembers: [],
      }

      componentDidMount() {
        this.getUsers();
        console.log(this.props.pk);
      }

      getUsers = () => {
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
             this.setState({ userData, groupMembers });
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
