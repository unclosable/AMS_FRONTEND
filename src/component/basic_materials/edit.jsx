import MainPanel from '../mainPanel.jsx';
import { connect } from 'react-redux';
import { push } from "react-router-redux"
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Icon, Row, Col, Button, message } from 'antd';
import MaterialsTypeSelect from '../base/materials_type_select.jsx';
import MaterialsUnitSelect from '../base/materials_unit_select.jsx';
import MaterialsNameSelect from '../base/name_select.jsx';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { post } from '../../utils/http.js';
class MaterialsAdd extends React.Component {
  constructor( props ) {
    super( props );
    const { PUSH } = props;
    this.state = {
      materialsName: '',
      materialsUnit: '',
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
    const { materialsName, materialsUnit, materialsType, specification, remark } = this.state;
    post( '/materials', {
      updatedBy: "tester",
      typeId: materialsType,
      nameId: materialsName,
      specification: specification,
      unitId: materialsUnit,
      remark
    } ).then( ( re ) => {
      if ( re.status === 201 ) {
        message.info( '修改成功' );
        this.state.pushFunc( '/basic/materials' );
      } else {
        re.json().then( json => message.error( json.msg ) );
      }
    } )
  }
  render() {
    const nameSelect = this.state.materialsType
      ? <Col span={12}><MaterialsNameSelect text="物料名称" typeid={this.state.materialsType} value={this.state.materialsName} onChange={( materialsName ) => this.setState( { materialsName } )}/></Col>
      : null;
    return <MainPanel>
      <Row>
        <Col span={12}><MaterialsTypeSelect disabled={true} text={"物料类型"} value={this.state.materialsType} onChange={( materialsType ) => this.setState( { materialsType } )}/></Col>
        <ReactCSSTransitionGroup transitionName="main-view" transitionAppear={true} transitionAppearTimeout={600} transitionEnterTimeout={600} transitionLeaveTimeout={200}>
          {nameSelect}
        </ReactCSSTransitionGroup>
      </Row>
      <Row>
        <Col span={12}><MaterialsUnitSelect value={this.state.materialsUnit} onChange={( v ) => this.setState( { materialsUnit: v } )}/></Col>
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
} )( MaterialsAdd );
