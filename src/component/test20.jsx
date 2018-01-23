import {connect} from 'react-redux'
class TestMain extends React.Component {
  render() {
    console.log(this.props);
    return <div>urururu{this.props.match.path}</div>
  }
}
export default connect(state => {
  console.log(state);
  return {}
})(TestMain);
