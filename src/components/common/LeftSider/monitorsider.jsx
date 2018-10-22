import React ,{Component}from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { Menu,Icon } from 'antd';
import './index.less';

const SubMenu = Menu.SubMenu;

class MonitorSider extends Component{
    // submenu keys of first level
  rootSubmenuKeys = ['sub1', 'sub2', 'sub3', '4', '5', '6'];
  state = {
    openKeys: [],
    current: 'sub1'
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
      let current = pathName;

      if(pathName==="/vm/backup"||pathName==="/vm/snapshot"){
          openKey = ["sub4"];
      }else if(pathName==="/vm/network/ip"||pathName==="/vm/network/load"||pathName==="/vm/network/safety"||pathName==="/vm/network/virtual"){
          openKey = ["sub7"];
      }else if(pathName==="/vm/disk"||pathName==="/vm/disk/backup"){
          openKey = ["sub8"];
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
            <Menu.Item key="sub2"><Link to="/config/device"><Icon type="cloud" />云主机</Link></Menu.Item>
            <Menu.Item key="sub10"><Link to="/config/device"><Icon type="hdd" />物理机</Link></Menu.Item>
            <Menu.Item key="sub3"><Link to="/config/device"><Icon type="safety" />弹性IP</Link></Menu.Item>
            <Menu.Item key="sub4"><Link to="/config/device"><Icon type="switcher" />Redis</Link></Menu.Item>
            <Menu.Item key="sub5"><Link to="/config/device"><Icon type="api" />MongoDB</Link></Menu.Item>
            <Menu.Item key="sub6"><Link to="/config/device"><Icon type="database" />关系型数据库</Link></Menu.Item>
            <Menu.Item key="sub7"><Link to="/config/device"><Icon type="fork" />负载均衡</Link></Menu.Item>
             <SubMenu key="sub8" title={<span><Icon type="wallet" /><span>应用监控</span></span>} >
                <Menu.Item key="/config/user"><Link to="/config/user">HTTP</Link></Menu.Item>
                <Menu.Item key="/config/user"><Link to="/config/user">HTTPS</Link></Menu.Item>
                <Menu.Item key="/config/user"><Link to="/config/user">UDP</Link></Menu.Item>
                <Menu.Item key="/config/user"><Link to="/config/user">TCP</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub9" title={<span><Icon type="link" /><span>容器</span></span>} >
                <Menu.Item key="/config/user"><Link to="/config/user">集群</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/config/user">实例</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/config/user">容器</Link></Menu.Item>
            </SubMenu>
        </Menu>
      </div>
    );
  }


}

/*export default withRouter(connect((state) => {
    return { ...state };
})(LeftSider));*/
export default withRouter(MonitorSider);
