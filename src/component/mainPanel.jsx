class MainPanel extends React.Component {
  render() {
    return <div style={{
        padding: 24,
        background: '#fff'
      }}>{this.props.children}</div>
  }
}
export default MainPanel;
