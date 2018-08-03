import React ,{Component}from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { Menu } from 'antd';
import './index.less';

const SubMenu = Menu.SubMenu;

class VMSider extends Component{
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
      }else if(pathName=="/config/area"){
          openKey = [];
          current = 'sub2';
      }else if(pathName=="/config/user"){
          openKey = ["sub3"];
          current = pathName;
      }else if(pathName=="/config/employees"){
          openKey = ["sub4"];
          current = pathName;
      }else if(pathName=="/config/userlist"||pathName=="/config/userManage"){
          openKey = ["sub5"];
          current = pathName;
      }else if(pathName=="/config/emaillist"){
          openKey = ["sub6"];
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
            <Menu.Item key="sub1"><Link to="/config/device"><i className="icon1"></i>概述</Link></Menu.Item>
            <Menu.Item key="sub2"><Link to="/config/area"><i className="icon2"></i>虚拟机管理</Link></Menu.Item>
            <Menu.Item key="sub3"><Link to="/config/area"><i className="icon3"></i>虚拟机回收站</Link></Menu.Item>
            <SubMenu key="sub4" title={<span><i className="icon4"></i><span>快照管理</span></span>} >
                <Menu.Item key="/config/user"><Link to="/config/user">快照管理</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/config/user">快照策略</Link></Menu.Item>
            </SubMenu>
            <Menu.Item key="sub5"><Link to="/config/area"><i className="icon5"></i>镜像</Link></Menu.Item>
            <Menu.Item key="sub6"><Link to="/config/area"><i className="icon6"></i>弹性伸缩</Link></Menu.Item>

            <SubMenu key="sub7" title={<span><i className="icon7"></i><span>网络</span></span>} >
                <Menu.Item key="/config/employees"><Link to="/config/employees">弹性IP</Link></Menu.Item>
                <Menu.Item key="5"><Link to="/config/worker">负载均衡</Link></Menu.Item>
                <Menu.Item key="6"><Link to="/config/visitors">虚拟网络</Link></Menu.Item>
                <Menu.Item key="6"><Link to="/config/visitors">安全组</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub8" title={<span><i className="icon8"></i><span>硬盘</span></span>} >
                <Menu.Item key="/config/user"><Link to="/config/user">云硬盘</Link></Menu.Item>
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
