import React, { Component } from 'react';
import { Layout, Form, Input, Button, notification, message, Checkbox, Modal, Row, Col } from 'antd';
import { withRouter } from 'react-router-dom';
import BreadcrumbCustom from '../BreadcrumbCustom';
import LeftSider from '../../components/common/LeftSider';
import './addrole.less';

const { Sider, Content } = Layout;
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const confirm = Modal.confirm;

const plainOptions = ['添加区域', '编辑区域', '配置', '删除'];
const defaultCheckedList = ['添加区域', '编辑区域'];
const defaultMenuList = [
    {value:'1',name:'人数统计'},
    {value:'2',name:'周界入侵'},
    {value:'3',name:'考勤管理'},
    {value:'4',name:'日志查询'},
]

class  AddRoleForm extends Component {
    state = {
        iconLoading: false,
        checkedList: defaultCheckedList,
        indeterminate: true,
        checkAll: false,
        menuList: defaultMenuList
    }

    onChange = (checkedList) => {
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
            checkAll: checkedList.length === plainOptions.length
        })
    }

    onCheckAllChange = (e) => {
        this.setState({
            checkedList: e.target.checked ? plainOptions : [],
            indeterminate: false,
            checkAll: e.target.checked,
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Layout>
                <Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
                    <LeftSider/>
                </Sider>
                <Content style={{ padding: 0, margin:10, marginLeft:210, marginBottom: 0, minHeight: window.innerHeight-84 }}>
                    <BreadcrumbCustom first="用户管理" second="角色管理" third="添加角色" />
                    <div className="form-search-box" style={{ background:'#fff',padding:10, }}>
                        <Form layout="inline">
                            <FormItem className="role-input" label="角色名称">
                                {getFieldDecorator('roleName',{})(
                                    <Input placeholder="请输入角色名称" />
                                )}
                            </FormItem>
                        </Form>
                    </div>
                    <div className="rolelist" style={{ marginTop:20, background:'#fff',padding:20, }}>
                        <div className="role-label" style={{marginBottom:20}}>角色权限</div>
                        <div className="check-box">
                            <CheckboxGroup style={{width: '100%',marginBottom:20}}>
                                <Row>
                                    {
                                        this.state.menuList.map(data => {
                                            return (
                                                <Col span={3}>
                                                    <Checkbox value={data.value}>{data.name}</Checkbox>
                                                </Col>
                                            )
                                        })
                                    }
                                </Row>
                            </CheckboxGroup>
                            <Checkbox
                                indeterminate={this.state.indeterminate}
                                onChange={this.onCheckAllChange}
                                checked={this.state.checkAll}
                            >区域管理</Checkbox>
                            <br />
                            <CheckboxGroup options={plainOptions} value={this.state.checkedList} onChange={this.onChange} />
                        </div>

                        <div className="btn-save-box">
                            <Button className="btn-save" type="primary" htmlType="submit" loading={this.state.iconLoading}>保存角色</Button>
                            <Button onClick={this.cancelSubmit}>取消</Button>
                        </div>

                    </div>
                </Content>
            </Layout>
        )
    }
}

const AddRole = Form.create()(AddRoleForm);
export default withRouter(AddRole);