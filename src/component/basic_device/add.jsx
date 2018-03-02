import MainPanel from '../mainPanel.jsx';
import { connect } from 'react-redux';
import { push } from "react-router-redux"
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Icon, Row, Col, Button, message } from 'antd';
import DeviceTypeSelect from '../base/device_type_select.jsx';
import MaterialsUnitSelect from '../base/materials_unit_select.jsx';
import DeviceNameSelect from '../base/name_select.jsx';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { post } from '../../utils/http.js';
class DevicesAdd extends React.Component {
  constructor( props ) {
    super( props );
    const { PUSH } = props;
    this.state = {
      materialsName: '',
      brand: '',
      materialsType: '',
      specification: '',
      remark: '',
      pushFunc: PUSH
    }
  }
  __cancel() {
    this.state.pushFunc( '/basic/materials' )
  }
  __submit() {
    const { materialsName, brand, materialsType, specification, remark } = this.state;
    post( '/materials/equipment', {
      typeId: materialsType,
      nameId: materialsName,
      specification: specification,
      remark,
      brand
    } ).then( ( re ) => {
      if ( re.status === 201 ) {
        message.info( '添加成功' );
        this.state.pushFunc( '/basic/device' );
      } else {
        re.json().then( json => message.error( json.msg ) );
      }
    } ).catch( () => message.error( '未知错误' ) );
  }
  render() {
    const nameSelect = this.state.materialsType
      ? <Col span={12}><DeviceNameSelect text="设备名称" typeid={this.state.materialsType} value={this.state.materialsName} onChange={( materialsName ) => this.setState( { materialsName } )}/></Col>
      : null;
    return <MainPanel>
      <Row>
        <Col span={12}><DeviceTypeSelect disabled={true} text={"设备类型"} value={this.state.materialsType} onChange={( materialsType ) => this.setState( { materialsType, materialsName: null } )}/></Col>
        <ReactCSSTransitionGroup transitionName="main-view" transitionAppear={true} transitionAppearTimeout={600} transitionEnterTimeout={600} transitionLeaveTimeout={200}>
          {nameSelect}
        </ReactCSSTransitionGroup>
      </Row>
      <Row>
        <Col span={12}>
          <TextField hintText="品牌" floatingLabelText="品牌" type="text" multiLine={true} value={this.state.brand} onChange={( e ) => this.setState( { brand: e.target.value } )}/></Col>
        <Col span={12}>
          <TextField hintText="规格型号" floatingLabelText="规格型号" type="text" multiLine={true} value={this.state.specification} onChange={( e ) => this.setState( { specification: e.target.value } )}/>
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
} )( DevicesAdd );
