import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { Avatar, Menu, Dropdown,Badge,Layout, Icon} from 'antd';
import './index.less';
import avater from '../../../static/img/b1.jpg';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class Head extends React.Component {
    state = {
        current: 'index',
    }

    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            currentKey: e.key,
        });
    }

    componentWillMount (){
        const { match, location, history } = this.props;


       let pathName = location.pathname;
       let currentKey = 'index';
       if(pathName.indexOf('vm')>0){
            currentKey = 'index';
       }else if(pathName.indexOf("machine")>0){
            currentKey = '2';
       }else if(pathName.indexOf("daas")>0){
            currentKey = '7';
       }else if(pathName.indexOf("paas")>0){
            currentKey = '3';
       }else if(pathName.indexOf("storage")>0){
            currentKey = '4';
       }else if(pathName.indexOf("ticket")>0){
            currentKey = '5';
       }else if(pathName.indexOf("monitor")>0){
            currentKey = '6';
       }else {
           currentKey = 'index';
       }
             this.setState({currentKey: currentKey});
     }

	render() {
		return (
            <div className="clearfix">
                <div className="logo">中化云管理平台</div>
                <Menu
                    mode="horizontal"
                    style={{ lineHeight: '64px ' }}
                    selectedKeys={[this.state.currentKey]}
                    onClick={this.handleClick}
                >
                    <Menu.Item key="index"><Link to='/vm/machine'>虚拟机</Link></Menu.Item>
                    {/*<Menu.Item key="2"><Link to='/machine/machine'>物理机</Link></Menu.Item>*/}
                    <Menu.Item key="3"><Link to='/paas/'>容器</Link></Menu.Item>
                    {/*<Menu.Item key="4"><Link to='/storage/server'>存储</Link></Menu.Item>*/}
                    <Menu.Item key="5"><Link to='/ticket/wait'>工单</Link></Menu.Item>
                    {/*<Menu.Item key="6"><Link to='/monitor/machine'>监控</Link></Menu.Item>*/}
                    <Menu.Item key="7"><Link to='/daas/instance'>数据库</Link></Menu.Item>
                </Menu>
                <div className="right">
                   <Menu
                       mode="horizontal"
                       style={{ lineHeight: '64px ' }}
                       selectedKeys={[this.state.currentKey]}
                       onClick={this.handleClick}
                   >
                    <Menu.Item key="1">
                        <Badge count={25} overflowCount={20} style={{marginLeft: 10}}>
                            <Icon type="notification" />
                        </Badge>
                    </Menu.Item>
                    <SubMenu title={<span className="avatar"><img src={avater} alt="头像" /><i className="on bottom b-white" /></span>}>
                        <MenuItemGroup title="用户中心">
                            <Menu.Item key="setting:1">你好 - 超级管理员</Menu.Item>
                            <Menu.Item key="setting:2">个人资料</Menu.Item>
                            <Menu.Item key="logout"><span onClick={this.logout}>退出登录</span></Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                </Menu>

                    </div>
                </div>
		);
	}
}

/*export default Head;*/
export default withRouter(Head);
