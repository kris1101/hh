import React ,{Component}from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { Menu } from 'antd';
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
      let current = '';

      if(pathName=="/config/device"){
          openKey = [];
          current = pathName;
      }else if(pathName=="/config/area"){
          openKey = [];
          current = pathName;
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
            <Menu.Item key="sub1"><Link to="/config/device"><i className="dasktop"></i>概述</Link></Menu.Item>
            <Menu.Item key="sub2"><Link to="/config/device"><i className="cloud"></i>云主机</Link></Menu.Item>
            <Menu.Item key="sub10"><Link to="/config/device"><i className="machine"></i>物理机</Link></Menu.Item>
            <Menu.Item key="sub3"><Link to="/config/device"><i className="ip"></i>弹性IP</Link></Menu.Item>
            <Menu.Item key="sub4"><Link to="/config/device"><i className="redis"></i>Redis</Link></Menu.Item>
            <Menu.Item key="sub5"><Link to="/config/device"><i className="mongo"></i>MongoDB</Link></Menu.Item>
            <Menu.Item key="sub6"><Link to="/config/device"><i className="engineroom"></i>关系型数据库</Link></Menu.Item>
            <Menu.Item key="sub7"><Link to="/config/device"><i className="lvs"></i>负载均衡</Link></Menu.Item>
             <SubMenu key="sub8" title={<span><i className="docker_server"></i><span>应用监控</span></span>} >
                <Menu.Item key="/config/user"><Link to="/config/user">HTTP</Link></Menu.Item>
                <Menu.Item key="/config/user"><Link to="/config/user">HTTPS</Link></Menu.Item>
                <Menu.Item key="/config/user"><Link to="/config/user">UDP</Link></Menu.Item>
                <Menu.Item key="/config/user"><Link to="/config/user">TCP</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub9" title={<span><i className="docker_docker"></i><span>容器</span></span>} >
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
