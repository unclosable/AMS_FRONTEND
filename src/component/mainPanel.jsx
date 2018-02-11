import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
class MainPanel extends React.Component {
  render() {
    return <MuiThemeProvider>
      <div style={{
          padding: 24,
          background: '#fff'
        }}>{this.props.children}</div>
    </MuiThemeProvider>
  }
}
export default MainPanel;
