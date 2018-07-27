import React ,{Component}from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu,Icon } from 'antd';
import './siderlist.less';

const SubMenu = Menu.SubMenu;

class LeftSider extends Component{
    // submenu keys of first level
    rootSubmenuKeys = ['sub1', 'sub2', 'sub3', '4', '5', '6'];
    state = {
        openKeys: [],
        current: ''
    };
    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }
    handleClick = (e) => {
        this.setState({
            current: e.key
        })
    }
    componentWillMount () {
        const { location } = this.props;
        let pathName = location.pathname;
        let openKey = [];
        let current = '';
        if(pathName=="/config/device"){
            openKey = ['sub1'];
            current = 'sub1';
        } else if(pathName=="/config/area"){
            openKey = ['sub2'];
            current = 'sub2';
        } else if(pathName=="/config/event"){
            openKey = ['sub3'];
            current = 'sub3';
        } else if(pathName=="/config/employees"){
            openKey = ['4'];
            current = '4';
        } else if(pathName=="/config/worker"){
            openKey = ['5'];
            current = '5';
        } else if(pathName=="/config/visitors"){
            openKey = ['6'];
            current = '6';
        }
        this.setState({
            current: current,
            openKeys: openKey
        })
    }

    render() {
        return (
            <div>
                <Menu
                    mode="inline"
                    openKeys={this.state.openKeys}
                    onOpenChange={this.onOpenChange}
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    className="siderStyle"
                >
                    <SubMenu key="sub3" title={<span>生产车间一 (0/3)</span>} >
                        <Menu.Item key="1"><Icon type="global"/>IPC01</Menu.Item>
                        <Menu.Item key="2"><Icon type="usergroup-delete"/>IPC02</Menu.Item>
                        <Menu.Item key="3"><Icon type="global"/>IPC03</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub4" title={<span>生产车间二 (0/3)</span>} >
                        <Menu.Item key="4"><Icon type="global"/>IPC01</Menu.Item>
                        <Menu.Item key="5"><Icon type="usergroup-delete"/>IPC02</Menu.Item>
                        <Menu.Item key="6"><Icon type="global"/>IPC03</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub5" title={<span>生产车间三 (0/3)</span>} >
                        <Menu.Item key="7"><Icon type="global"/>IPC01</Menu.Item>
                        <Menu.Item key="8"><Icon type="usergroup-delete"/>IPC02</Menu.Item>
                        <Menu.Item key="9"><Icon type="global"/>IPC03</Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        );
    }


}

export default withRouter(connect((state) => {
    return { ...state };
})(LeftSider));

