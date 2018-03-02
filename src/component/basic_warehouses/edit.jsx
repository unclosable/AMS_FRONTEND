import MainPanel from '../mainPanel.jsx';
import { connect } from 'react-redux';
import { push } from "react-router-redux"
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Icon, Row, Col, Button, message } from 'antd';
import OrganizationsSelect from '../base/all_organizations_select.jsx';
import { put, get } from '../../utils/http.js';
import queryString from 'query-string';
class WarehosesAdd extends React.Component {
  constructor( props ) {
    super( props );
    const { PUSH, location } = props;
    this.state = {
      organization: '',
      name: '',
      remark: '',
      location: location,
      pushFunc: PUSH
    }
    this.__init();
  }
  __init() {
    const { location, pushFunc } = this.state;
    const query = queryString.parse( location.search );
    if ( !query || !query.id ) {
      pushFunc( '/basic/warehouse' );
      message.error( '无效的查询条件' );
    } else {
      get( `/warehouses/${ query.id }` ).then( re => re.json().then( data => {
        this.setState( { organization: data.orgId, name: data.name, remark: data.remark } )
      } ) )
    }
  }
  __cancel() {
    this.state.pushFunc( '/basic/warehouse' )
  }
  __submit() {
    const { organization, name, remark, location, pushFunc } = this.state;
    const query = queryString.parse( location.search );
    if ( !query || !query.id ) {
      pushFunc( '/basic/warehouse' );
      message.error( '无效的条件' );
    } else {
      put( `/warehouses/${ query.id }`, {
        orgId: organization,
        name,
        remark
      } ).then( re => {
        if ( re.status === 200 ) {
          message.info( "修改成功" );
          pushFunc( '/basic/warehouse' );
        } else {
          re.json().then( json => message.error( json.msg ) );
        }
      } ).catch( () => message.error( '未知错误' ) );
    }
  }
  render() {
    return <MainPanel>
      <Row>
        <Col span={12}><OrganizationsSelect value={this.state.organization} onChange={( value ) => this.setState( { [ 'organization' ]: value } )} disabled={true}/></Col>
        <Col span={12}>
          <TextField hintText="仓库名称" floatingLabelText="仓库名称" type="text" multiLine={true} value={this.state.name} onChange={( e ) => this.setState( { name: e.target.value } )}/>
        </Col>
      </Row>
      <Row>
        <Col span={16}><TextField fullWidth={true} hintText="备注" floatingLabelText="备注" type="text" multiLine={true} value={this.state.remark} onChange={( e ) => this.setState( { remark: e.target.value } )}/></Col>
      </Row>
      <Row>
        <Col span={16}></Col>
        <Col span={8} className="device-query-btn">
          <Button type="primary" onClick={() => this.__submit()}>提交</Button>
          <Button onClick={() => this.__cancel()}>取消</Button>
        </Col>
      </Row>
    </MainPanel>
  }
}

export default connect( state => {
  return { location: state.router.location }
}, ( dispatch, ownProps ) => {
  return {
    PUSH: ( url, search ) => {
      dispatch( push( url, { search } ) )
    }
  }
} )( WarehosesAdd );
