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
    console.log(path);
  }
  render() {
    let leafKey = 0;
    return <Sider width={200} style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0
      }}>
      <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} style={{
          height: '100%',
          borderRight: 0,
          minHeight: 280
        }}>
        {
          menuList.map((menus, index) => <SubMenu key={menus.text + index} title={<span> < Icon type = {
              menus.icon
            } /> {
              menus.text
            }
            </span>}>{
              menus.children.map((leaf) => <Menu.Item key={leafKey++}>
                <Link to={menus.path + leaf.path}>{leaf.text}</Link>
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
