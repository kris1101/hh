import React ,{Component}from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { Menu } from 'antd';
import './index.less';

const SubMenu = Menu.SubMenu;

class LeftSider extends Component{
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
      }else if(pathName=="/config/userlist"){
          openKey = ["sub5"];
          current = pathName;
      }else if(pathName=="/config/emaillist"){
          openKey = ["sub6"];
          current = pathName;
      }

      this.setState({current: current,openKeys: openKey});

      /*if(pathName=="/config/device"){
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
      })*/
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
            <Menu.Item key="sub1"><Link to="/config/device"><i className="icon1"></i>设备管理</Link></Menu.Item>
            <Menu.Item key="sub2"><Link to="/config/area"><i className="icon2"></i>区域管理</Link></Menu.Item>
            <SubMenu key="sub3" title={<span><i className="icon3"></i><span>事件管理</span></span>} >
                <Menu.Item key="/config/user"><Link to="/config/user">人数统计</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/config/user">周界入侵</Link></Menu.Item>
                <Menu.Item key="3"><Link to="/config/user">异常事件</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub4" title={<span><i className="icon4"></i><span>人员管理</span></span>} >
                <Menu.Item key="/config/employees"><Link to="/config/employees">正式员工</Link></Menu.Item>
                <Menu.Item key="5"><Link to="/config/worker">施工人员</Link></Menu.Item>
                <Menu.Item key="6"><Link to="/config/visitors">临时访客</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub5" title={<span><i className="icon5"></i><span>用户管理</span></span>} >
                <Menu.Item key="/config/userlist"><Link to="/config/userlist">用户列表</Link></Menu.Item>
                <Menu.Item key="8"><Link to="/config/user">角色管理</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub6" title={<span><i className="icon6"></i><span>系统设置</span></span>}>
                <Menu.Item key="/config/emaillist"><Link to="/config/emaillist">邮箱设置</Link></Menu.Item>
                <Menu.Item key="10"><Link to="/config/alarm">告警设置</Link></Menu.Item>
                <Menu.Item key="11"><Link to="/config/user">考勤设置</Link></Menu.Item>
                <Menu.Item key="12"><Link to="/config/user">存储管理</Link></Menu.Item>
                <Menu.Item key="13"><Link to="/config/user">心跳设置</Link></Menu.Item>
            </SubMenu>
        </Menu>
      </div>
    );
  }


}

/*export default withRouter(connect((state) => {
    return { ...state };
})(LeftSider));*/
export default withRouter(LeftSider);
