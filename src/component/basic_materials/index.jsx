import {
  Table,
  Icon,
  Divider,
  Row,
  Col,
  Button
} from 'antd';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import { push } from "react-router-redux"
import MainPanel from '../mainPanel.jsx';
import queryString from 'query-string';
import '../../../less/component_basic_device.less';
import DeviceTypeSelect from '../base/materials_type_selecter.jsx';
import { get } from '../../utils/http.js';
const { Column, ColumnGroup } = Table;

const columns = [
  {
    title: '序号',
    dataIndex: "id"
  }, {
    title: '物料类型',
    dataIndex: 'dictType'
  }, {
    title: '物料名称',
    dataIndex: 'dictName'
  }, {
    title: '规格型号',
    dataIndex: 'specification'
  }, {
    title: '单位',
    dataIndex: 'unitId'
  }, {
    title: '状态',
    dataIndex: 'enableds'
  }, {
    title: '更新人',
    dataIndex: 'updatedBy'
  }, {
    title: '更新时间',
    dataIndex: 'updatedAt'
  }, {
    title: '备注',
    dataIndex: 'remark'
  }
];

const data = [];
for ( let i = 0; i < 1; i++ ) {
  data.push( { key: i, name: `Edward King ${ i }`, age: 32, address: `London, Park Lane no. ${ i }` } );
}
const paramParse = ( value, defaultValue ) => {
  let re = parseInt( value );
  if ( isNaN( re ) || re === -1 ) {
    re = defaultValue;
  }
  return re;
}
class Materials extends React.Component {
  constructor( props ) {
    super( props );
    const { PUSH, location } = props;
    const { deviceType, deviceState, deviceName } = queryString.parse( location.search );
    this.state = {
      deviceType: paramParse( deviceType ),
      deviceState: paramParse( deviceState, 0 ),
      deviceName: deviceName || "",
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      pushFunc: PUSH,
      data: data
    }
    this.__load_data();
  }
  start() {
    this.setState( { loading: true } );
    setTimeout( () => {
      this.setState( { selectedRowKeys: [], loading: false } );
    }, 1000 );
  }
  onSelectChange( selectedRowKeys ) {
    this.setState( { selectedRowKeys } );
  }
  handleChange_deviceType( { key, name } ) {
    console.log( key );
    console.log( name );
    this.setState( { deviceType: key, deviceTypeName: name } );
  }
  handleChange_deviceState( event, index, deviceState ) {
    this.setState( { deviceState } );
  }

  handleChange_deviceName( e ) {
    this.setState( { deviceName: e.target.value } )
  }

  __query_submit() {
    const { deviceType, deviceState, deviceName } = this.state;
    this.state.pushFunc( queryString.stringify( { deviceType, deviceState, deviceName } ) )
  }
  __reset_query() {
    this.state.pushFunc()
  }
  __load_data() {
    const { deviceType, deviceState, deviceName } = this.state;
    get( '/materials', {
      typeId: deviceType,
      enabled: deviceState,
      dictName: deviceName
    } ).then( ( re ) => {
      if ( re.status === 200 ) {
        re.json().then( ( data ) => {
          this.setState( { data } );
        } )
      }
    } )
  }
  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: ( selectedRowKeys ) => this.onSelectChange( selectedRowKeys )
    };
    const hasSelected = selectedRowKeys.length > 0;
    return <MuiThemeProvider>
      <MainPanel>
        <Row>
          <Col span={8}>
            <DeviceTypeSelect disabled={true} text={this.state.deviceTypeName || "物料类型"} value={this.state.deviceType} onChange={( value ) => this.handleChange_deviceType( value )}/>
          </Col>
          <Col span={8}><TextField hintText="物料名称" floatingLabelText="物料名称" type="text" value={this.state.deviceName} onChange={( e ) => this.handleChange_deviceName( e )}/></Col>
          <Col span={8}>
            <SelectField floatingLabelText="状态" value={this.state.deviceState} onChange={( event, index, value ) => this.handleChange_deviceState( event, index, value )}>
              <MenuItem value={0} primaryText="启用"/>
              <MenuItem value={1} primaryText="废弃"/>
            </SelectField>
          </Col>
        </Row>
        <Row>
          <Col span={16}></Col>
          <Col span={8} className="device-query-btn">
            <Button onClick={() => this.__reset_query()}>重置</Button>
            <Button type="primary" onClick={() => this.__query_submit()}>查询</Button>
          </Col>
        </Row>
        <Row className="device-setting-btn">
          <Button size="small">新增</Button>
          <Button size="small">启用</Button>
          <Button size="small">废弃</Button>
          <Button size="small">导入</Button>
          <Button size="small">导出</Button>
        </Row>
        <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.data}/>
      </MainPanel>
    </MuiThemeProvider>
  }
}
export default connect( state => {
  return { location: state.router.location }
}, ( dispatch, ownProps ) => {
  return {
    PUSH: ( search ) => {
      dispatch( push( { search } ) )
    }
  }
} )( Materials );
