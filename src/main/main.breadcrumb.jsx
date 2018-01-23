import {Breadcrumb} from 'antd';
import {connect} from 'react-redux';
import {pathMap} from '../route/index.jsx'

class MainBreadcrumb extends React.Component {
  render() {
    const {location} = this.props;
    const path = pathMap[location.pathname];
    let item;
    if (path && path.parentPath) {
      item = path.parentPath.map(p => {
        return <Breadcrumb.Item key={key++}>
          {pathMap[p].text}
        </Breadcrumb.Item>
      });
    }
    let key = 0;
    return <Breadcrumb style={{
        margin: '10px 16px'
      }}>
      {item}
      <Breadcrumb.Item>
        {path.text}
      </Breadcrumb.Item >
    </Breadcrumb >
  }
}

export default connect(state => {
  return {location: state.router.location}
}, (dispatch, ownProps) => {
  return {
    push: (path) => {
      dispatch({type: 'PUSH', path})
    }
  }
})(MainBreadcrumb);
