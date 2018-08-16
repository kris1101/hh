import React ,{Component}from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { Menu } from 'antd';
import './index.less';

const SubMenu = Menu.SubMenu;

class MachineSider extends Component{
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
      }else if(pathName=="/machine/machine"){
          openKey = [];
          current = pathName;
      }else if(pathName=="/config/user"){
          openKey = ["sub3"];
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
            <Menu.Item key="sub2"><Link to="/machine/machine"><i className="machine"></i>机器列表</Link></Menu.Item>
            <Menu.Item key="sub3"><Link to="/config/area"><i className="engineroom"></i>机柜列表</Link></Menu.Item>
        </Menu>
      </div>
    );
  }


}

/*export default withRouter(connect((state) => {
    return { ...state };
})(LeftSider));*/
export default withRouter(MachineSider);
