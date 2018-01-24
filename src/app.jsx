//redux
import menuStore from './store/reducer.js'
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux'
//Route
import createHistory from 'history/createBrowserHistory'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import {ConnectedRouter, routerReducer, routerMiddleware, push} from 'react-router-redux'
//UI
import {Layout} from 'antd';
const {Content} = Layout;
//component
import Login from './main/login.jsx';
import MainHeader from './main/main.header.jsx';
import MainMenu from './main/main.menu.jsx';
import MainBreadcrumb from './main/main.breadcrumb.jsx';
import TestMain from './component/test2.jsx';
import {menuList, pathMap} from './route/index.jsx'

const history = createHistory();

history.listen((location, action) => {
  console.log(location);
  console.log(action);
})

const middleware = routerMiddleware(history);
const store = createStore(combineReducers(Object.assign(menuStore, {router: routerReducer})), applyMiddleware(middleware));

// class Demo extends React.Component {
//   render() {
//     return <Provider store={store}>
//       <Router>
//         <MuiThemeProvider>
//           <div className="main">
//             <LeftBar/>
//             <MainTopLinearProgress/>
//             <Switch>
//               <Route exact="exact" path='/' component={Hello}/>
//               <Route path='/test1' component={Test1}/>
//               <Route path='/sort' component={Sort}/>
//               <Route path='/contribute' component={ContributePanel}/>
//               <Route path='/offer' component={Offer}/>
//             </Switch>
//           </div>
//         </MuiThemeProvider>
//       </Router>
//     </Provider>;
//   }
// }

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false
    }
  }
  render() {
    const routes = []
    let componentKey = 0;
    for (let path in pathMap) {
      if (pathMap[path].component) 
        routes.push(<Route path={path} exact={true} key={componentKey++} component={pathMap[path].component}/>)
    };
    if (this.state.login) {
      return (<Provider store={store}>
        <ConnectedRouter history={history}>
          <Layout className="mainLayout">
            <MainHeader/>
            <Layout>
              <MainMenu/>
              <Layout style={{
                  marginLeft: 200
                }}>
                <MainBreadcrumb/>
                <Content style={{
                    margin: '0px 16px 0 16px',
                    height: '100%',
                    overflow: 'auto'
                  }}>
                  <Switch>
                    {routes}
                  </Switch>
                </Content>
              </Layout>
            </Layout>
          </Layout>
        </ConnectedRouter>
      </Provider>);
    } else {
      return (<Provider store={store}>
        <ConnectedRouter history={history}>
          <Login loginFun={() => {
              this.setState({login: true});
            }}></Login>
        </ConnectedRouter>
      </Provider>);
    }

  }
}
export default function() {
  react_dom.render(<App/>, document.getElementById('root'));
}
