import {
  Table,
  Icon,
  Divider,
  Row,
  Col,
  Button
} from 'antd';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import { push } from "react-router-redux"
import MainPanel from '../mainPanel.jsx';
import queryString from 'query-string';
import '../../../less/component_basic_device.less';
import DeviceTypeSelect from '../base/device_type_select.jsx';
import DeviceNameSelect from '../base/name_select.jsx';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
const { Column, ColumnGroup } = Table;

const columns = [
  {
    title: '序号',
    dataIndex: "id"
  }, {
    title: '设备类型',
    dataIndex: 'name'
  }, {
    title: '设备名称',
    dataIndex: 'age'
  }, {
    title: '品牌',
    dataIndex: 'address'
  }, {
    title: '规格型号',
    dataIndex: 'specification'
  }, {
    title: '状态',
    dataIndex: 'enabled'
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
for ( let i = 0; i < 46; i++ ) {
  data.push( { key: i, name: `Edward King ${ i }`, age: 32, address: `London, Park Lane no. ${ i }` } );
}
const paramParse = ( value ) => {
  let re = parseInt( value );
  if ( !re || re === -1 ) {
    re = null;
  }
  return re;
}
class Device extends React.Component {
  constructor( props ) {
    super( props );
    const { PUSH, location } = props;
    const { deviceType, deviceState, deviceName } = queryString.parse( location.search );
    this.state = {
      deviceType: paramParse( deviceType ),
      deviceState: paramParse( deviceState ),
      deviceName: paramParse( deviceName ),
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      pushFunc: PUSH
    }
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
  handleChange_deviceType( value ) {
    this.setState( { deviceType: value, deviceName: null } );
  }
  handleChange_deviceState( event, index, deviceState ) {
    this.setState( { deviceState } );
  }

  __query_submit() {
    const { deviceType, deviceState, deviceName } = this.state;
    this.state.pushFunc( queryString.stringify( { deviceType, deviceState, deviceName } ) )
  }
  __reset_query() {
    this.state.pushFunc()
  }

  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: ( selectedRowKeys ) => this.onSelectChange( selectedRowKeys )
    };
    const hasSelected = selectedRowKeys.length > 0;
    const nameSelect = this.state.deviceType
      ? <Col span={8}><DeviceNameSelect text="物料名称" typeid={this.state.deviceType} value={this.state.deviceName} onChange={( deviceName ) => this.setState( { deviceName } )}/></Col>
      : null;
    return <MainPanel>
      <Row>
        <Col span={8}>
          <DeviceTypeSelect value={this.state.deviceType} onChange={( value ) => this.handleChange_deviceType( value )}/>
        </Col>
        <ReactCSSTransitionGroup transitionName="main-view" transitionAppear={true} transitionAppearTimeout={600} transitionEnterTimeout={600} transitionLeaveTimeout={200}>
          {nameSelect}
        </ReactCSSTransitionGroup>
        <Col span={8}>
          <SelectField floatingLabelText="状态" value={this.state.deviceState} onChange={( event, index, value ) => this.handleChange_deviceState( event, index, value )}>
            <MenuItem value={-1} primaryText=""/>
            <MenuItem value={1} primaryText="启用"/>
            <MenuItem value={2} primaryText="废弃"/>
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
      <Table rowSelection={rowSelection} columns={columns} dataSource={data}/>
    </MainPanel>
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
} )( Device );
