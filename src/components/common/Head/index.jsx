import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { Avatar, Menu, Dropdown, Icon} from 'antd';
import './index.less';

// const menu = (
//     <Menu>
//       <Menu.Item key="10">
//           <Link to='/config/device'>设备</Link>
//       </Menu.Item>
//       <Menu.Item key="11">
//           <Link to='/config/area'>区域管理</Link>
//       </Menu.Item>
//       <Menu.Item key="13"><Link to='/config/event'>事件管理</Link></Menu.Item>
//       <Menu.Item key="14"><Link to='/config/member'>人员管理</Link></Menu.Item>
//       <Menu.Item key="15"><Link to='/config/user'>用户管理</Link></Menu.Item>
//       <Menu.Item key="16"><Link to='/config/system'>系统设置</Link></Menu.Item>
//     </Menu>
//   )
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
       if(pathName=='/'){
            currentKey = 'index';
       }else if(pathName.indexOf("config")>0){
            currentKey = '6';
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
                    <Menu.Item key="index"><Link to='/'>虚拟机</Link></Menu.Item>
                    <Menu.Item key="2"><Link to='/'>物理机</Link></Menu.Item>
                    <Menu.Item key="3"><Link to='/'>容器</Link></Menu.Item>
                    <Menu.Item key="4"><Link to='/attendance'>存储</Link></Menu.Item>
                    <Menu.Item key="5"><Link to='/'>工单</Link></Menu.Item>
                    <Menu.Item key="6"><Link to='/config/device'>监控</Link></Menu.Item>
                    <Menu.Item key="7"><Link to='/'>数据库</Link></Menu.Item>
                </Menu>
                <div className="right">
                    <div className="invade-alert">
                        <Icon type="bell" />
                    </div>
                    <div className="device-alert">
                        <Icon type="notification" />
                    </div>
                    {/*<div className="setting">*/}
                        {/*<Dropdown overlay={menu} trigger={['click']}>*/}
                            {/*<span><Icon type="setting" /></span>*/}
                        {/*</Dropdown>*/}
                    {/*</div>*/}
                    <div className="login-out">
                        <Avatar icon="user" />
                        <span> 张三 </span>
                    </div>
                </div>
            </div>
		);
	}
}

/*export default Head;*/
export default withRouter(Head);
