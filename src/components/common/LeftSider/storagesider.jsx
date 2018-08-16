import React ,{Component}from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { Menu } from 'antd';
import './index.less';

const SubMenu = Menu.SubMenu;

class StorageSider extends Component{
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
      console.log(pathName);
      let openKey = [];
      let current = '';

      if(pathName=="/vm/backup"||pathName=="/vm/snapshot"){
          openKey = ["sub4"];
          current = pathName;
      }else if(pathName=="/vm/network/ip"||pathName=="/vm/network/load"||pathName=="/vm/network/safety"||pathName=="/vm/network/virtual"){
          openKey = ["sub7"];
          current = pathName;
      }else if(pathName=="/vm/disk"||pathName=="/vm/disk/backup"){
          openKey = ["sub8"];
          current = pathName;
      }else{
          openKey = [];
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
             <SubMenu key="sub2" title={<span><i className="gold"></i><span>集群</span></span>} >
                <Menu.Item key="/config/user"><Link to="/config/user">控制节点</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/config/user">存储节点</Link></Menu.Item>

            </SubMenu>
             <SubMenu key="sub3" title={<span><i className="docker_server"></i><span>服务</span></span>} >
                <Menu.Item key="/config/user"><Link to="/config/user">节点服务</Link></Menu.Item>
            </SubMenu>
        </Menu>
      </div>
    );
  }


}

/*export default withRouter(connect((state) => {
    return { ...state };
})(LeftSider));*/
export default withRouter(StorageSider);
