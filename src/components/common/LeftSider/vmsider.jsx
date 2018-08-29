import React ,{Component}from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { Menu, Icon } from 'antd';
import './index.less';

const SubMenu = Menu.SubMenu;

class VMSider extends Component{
    // submenu keys of first level
  rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'sub6','sub7', 'sub8', 'accounts'];
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
      console.log(pathName);
      let openKey = [];
      let current = pathName;

      if(pathName=="/vm/backup"||pathName=="/vm/snapshot"){
          openKey = ["sub4"];
      }else if(pathName=="/vm/network/ip"||pathName=="/vm/network/load"||pathName=="/vm/network/safety"||pathName=="/vm/network/virtual"){
          openKey = ["sub7"];
      }else if(pathName=="/vm/disk"||pathName=="/vm/disk/backup"){
          openKey = ["sub8"];
      }else if(pathName.startsWith('/vm/accounts')){
          openKey = ["accounts"];
      }else{
          openKey = [];
      }

      this.setState({current: current,openKeys: openKey});

  }

  render() {
    return (
      <div>
        <Menu
          theme="dark"
          mode="inline"
          openKeys={this.state.openKeys}
          onOpenChange={this.onOpenChange}
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          style={{ width: 200 }}
        >
            <Menu.Item key="sub1"><Link to="/config/device"><Icon type="desktop" />概述</Link></Menu.Item>
            <Menu.Item key="/vm/machine"><Link to="/vm/machine"><Icon type="cloud" />虚拟机管理</Link></Menu.Item>
            <Menu.Item key="/vm/recycle"><Link to="/vm/recycle"><Icon type="delete" />虚拟机回收站</Link></Menu.Item>
            <SubMenu key="sub4" title={<span><Icon type="camera-o" /><span>快照管理</span></span>} >
                <Menu.Item key="/vm/snapshot"><Link to="/vm/snapshot">快照管理</Link></Menu.Item>
                <Menu.Item key="/vm/backup"><Link to="/vm/backup">快照策略</Link></Menu.Item>
            </SubMenu>
            <Menu.Item key="/vm/mirror"><Link to="/vm/mirror"><Icon type="switcher" />镜像</Link></Menu.Item>
            <Menu.Item key="/vm/extend"><Link to="/vm/extend"><Icon type="share-alt" />弹性伸缩</Link></Menu.Item>
            <Menu.Item key="/vm/key"><Link to="/vm/key"><Icon type="key" />密钥管理</Link></Menu.Item>

            <SubMenu key="sub7" title={<span><Icon type="wifi" /><span>网络</span></span>} >
                <Menu.Item key="/vm/network/ip"><Link to="/vm/network/ip">弹性IP</Link></Menu.Item>
                <Menu.Item key="/vm/network/load"><Link to="/vm/network/load">负载均衡</Link></Menu.Item>
                <Menu.Item key="/vm/network/virtual"><Link to="/vm/network/virtual">虚拟网络</Link></Menu.Item>
                <Menu.Item key="/vm/network/safety"><Link to="/vm/network/safety">安全组</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub8" title={<span><Icon type="hdd" /><span>硬盘</span></span>} >
                <Menu.Item key="/vm/disk"><Link to="/vm/disk">云硬盘</Link></Menu.Item>
                <Menu.Item key="/vm/disk/backup"><Link to="/vm/disk/backup">备份</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="accounts" title={<span><Icon type="user" /><span>用户管理</span></span>} >
              <Menu.Item key="/vm/accounts/users"><Link to="/vm/accounts/users">用户列表</Link></Menu.Item>
              <Menu.Item key="/vm/accounts/groups"><Link to="/vm/accounts/groups">用户组</Link></Menu.Item>
              <Menu.Item key="/vm/accounts/projects"><Link to="/vm/accounts/projects">项目列表</Link></Menu.Item>
              <Menu.Item key="/vm/accounts/logs"><Link to="/vm/accounts/logs">操作日志</Link></Menu.Item>
            </SubMenu>
        </Menu>
      </div>
    );
  }


}

/*export default withRouter(connect((state) => {
    return { ...state };
})(LeftSider));*/
export default withRouter(VMSider);
