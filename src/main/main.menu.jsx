import {Layout, Menu, Icon} from 'antd';
import {menuList, pathMap} from '../route/index.jsx'
const {SubMenu} = Menu;
const {Sider} = Layout;
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
class MainMenu extends React.Component {
  constructor(props) {
    super(props);
    const {location} = this.props;
    const path = pathMap[location.pathname];

    let leafKey = 0;
    let defaultSelectedKeys = 0,
      defaultOpenKeys = 1;
    const body = menuList.map((menu) => {
      let re = {
        key: leafKey++,
        iconType: menu.icon,
        text: menu.text
      };
      let selected = false;
      if (path && path.parentPath.filter(path => path == menu.path).length != 0) {
        selected = true;
        defaultOpenKeys = re.key;
      }
      re.item = menu.children.map((leaf) => {
        let item = {
          key: leafKey++,
          path: menu.path + leaf.path,
          text: leaf.text
        };
        if (selected && path.path == leaf.path) {
          defaultSelectedKeys = item.key;
        }
        return item;
      });
      return re;
    });
    this.state = {
      path: path,
      body: body,
      defaultSelectedKeys: defaultSelectedKeys,
      defaultOpenKeys: defaultOpenKeys
    }
  }
  render() {
    let leafKey = 0;
    return <Sider width={200} style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0
      }}>
      <Menu mode="inline" defaultSelectedKeys={[this.state.defaultSelectedKeys + '']} defaultOpenKeys={[this.state.defaultOpenKeys + '']} style={{
          height: '100%',
          borderRight: 0,
          minHeight: 280
        }}>
        {
          this.state.body.map((menu) => <SubMenu key={menu.key} title={<span> < Icon type = {
              menu.iconType
            } /> {
              menu.text
            }
            </span>}>{
              menu.item.map((leaf) => <Menu.Item key={leaf.key}>
                <Link to={leaf.path}>{leaf.text}</Link>
              </Menu.Item>)
            }</SubMenu>)
        }
      </Menu >
    </Sider>
  }
}

export default connect(state => {
  return {location: state.router.location}
})(MainMenu);
