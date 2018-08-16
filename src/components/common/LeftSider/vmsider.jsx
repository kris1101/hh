import React ,{Component}from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { Menu } from 'antd';
import './index.less';

const SubMenu = Menu.SubMenu;

class VMSider extends Component{
    // submenu keys of first level
  rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'sub6','sub7', 'sub8'];
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
      console.log(e.key);
      this.setState({
          current: e.key
      })
  }
  componentWillMount () {
      const { location } = this.props;
      let pathName = location.pathname;
      console.log(pathName);
      let openKey = [];
      let current = 'sub1';

      if(pathName=="/config/device"){
          openKey = [];
          current = 'sub1';
      }else if(pathName=="/vm/machine"){
          openKey = [];
          current = pathName;
      }else if(pathName=="/vm/recycle"){
          openKey = [];
          current = pathName;
      }else if(pathName=="/vm/backup"||pathName=="/vm/snapshot"){
          openKey = ["sub4"];
          current = pathName;
      }else if(pathName=="/vm/mirror"){
          openKey = [];
          current = pathName;
      }else if(pathName=="/vm/extend"){
          openKey = [];
          current = pathName;
      }else if(pathName=="/vm/network") {
          openKey = ["sub7"];
          current = pathName;
      }else if(pathName=="/vm/disk") {
          openKey = ["sub8"];
          current = pathName;
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
            <Menu.Item key="sub1"><Link to="/config/device"><i className="dasktop"></i>概述</Link></Menu.Item>
            <Menu.Item key="/vm/machine"><Link to="/vm/machine"><i className="cloud"></i>虚拟机管理</Link></Menu.Item>
            <Menu.Item key="/vm/recycle"><Link to="/vm/recycle"><i className="delete"></i>虚拟机回收站</Link></Menu.Item>
            <SubMenu key="sub4" title={<span><i className="camera"></i><span>快照管理</span></span>} >
                <Menu.Item key="/vm/snapshot"><Link to="/vm/snapshot">快照管理</Link></Menu.Item>
                <Menu.Item key="/vm/backup"><Link to="/vm/backup">快照策略</Link></Menu.Item>
            </SubMenu>
            <Menu.Item key="/vm/mirror"><Link to="/vm/mirror"><i className="gold"></i>镜像</Link></Menu.Item>
            <Menu.Item key="/vm/extend"><Link to="/vm/extend"><i className="drag"></i>弹性伸缩</Link></Menu.Item>

            <SubMenu key="sub7" title={<span><i className="wifi"></i><span>网络</span></span>} >
                <Menu.Item key="/vm/network"><Link to="/vm/network">弹性IP</Link></Menu.Item>
                <Menu.Item key="5"><Link to="/config/worker">负载均衡</Link></Menu.Item>
                <Menu.Item key="6"><Link to="/config/visitors">虚拟网络</Link></Menu.Item>
                <Menu.Item key="7"><Link to="/config/visitors">安全组</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub8" title={<span><i className="file"></i><span>硬盘</span></span>} >
                <Menu.Item key="/vm/disk"><Link to="/vm/disk">云硬盘</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/config/user">备份</Link></Menu.Item>
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
