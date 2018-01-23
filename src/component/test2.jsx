import {connect} from 'react-redux'
class TestMain extends React.Component {
  render() {
    return <div style={{
        height: 800,
        padding: 24,
        background: '#fff',
        textAlign: 'center'
      }}>{this.props.match.path}</div>
  }
}
export default connect(state => {
  return {}
})(TestMain);
