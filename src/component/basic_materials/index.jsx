import {
  Table,
  Icon,
  Divider,
  Row,
  Col,
  Button,
  Modal,
  message
} from 'antd';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import { push } from "react-router-redux"
import MainPanel from '../mainPanel.jsx';
import queryString from 'query-string';
import '../../../less/component_basic_device.less';
import MaterialTypeSelect from '../base/materials_type_select.jsx';
import MaterialsNameSelect from '../base/name_select.jsx';
import { get, put } from '../../utils/http.js';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import dateformat from 'dateformat';
const { Column, ColumnGroup } = Table;

const columns = ( push ) => [
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
    dataIndex: 'unitName'
  }, {
    title: '状态',
    dataIndex: 'enableds'
  }, {
    title: '更新人',
    dataIndex: 'updatedBy'
  }, {
    title: '更新时间',
    dataIndex: 'updateTime',
    render: ( text, record ) => {
      return <span>
        {dateformat( new Date( text ), 'yyyy-mm-dd HH:MM' )}
      </span>
    }
  }, {
    title: '备注',
    dataIndex: 'remark'
    // }, {
    //   title: '操作',
    //   key: 'action',
    //   render: ( text, record ) => {
    //     return <span>
    //       <a onClick={() => push( '/basic/materials/edit', queryString.stringify( { id: record.id } ) )}>
    //         修改
    //       </a>
    //     </span>
    //   }
  }
];

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
    const { deviceType, deviceState, deviceName, pageNum } = queryString.parse( location.search );
    this.state = {
      deviceType: paramParse( deviceType ),
      deviceState: paramParse( deviceState, 0 ),
      deviceName: paramParse( deviceName ),
      pageNum: paramParse( pageNum ),
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      pushFunc: PUSH,
      pageEnable: deviceState || 0,
      modalVisible: false,
      pageInfo: {
        current: 1,
        total: 0,
        pageSize: 10
      },
      data: []
    }
    this.__load_data();
  }

  onSelectChange( selectedRowKeys ) {
    this.setState( { selectedRowKeys } );
  }
  handleChange_deviceType( deviceType ) {
    this.setState( { deviceType } );
  }
  handleChange_deviceState( event, index, deviceState ) {
    this.setState( { deviceState } );
  }

  handleChange_deviceName( e ) {
    this.setState( { deviceName: e.target.value } )
  }

  __query_submit( actNum ) {
    const { deviceType, deviceState, deviceName } = this.state;
    this.state.pushFunc( '/basic/materials', queryString.stringify( { deviceType, deviceState, deviceName, pageNum: actNum } ) )
  }
  __reset_query() {
    this.state.pushFunc()
  }
  __load_data() {
    const { deviceType, deviceState, deviceName, pageNum } = this.state;
    get( '/materials', {
      pageNum,
      typeId: deviceType,
      enabled: deviceState,
      nameId: deviceName
    } ).then( ( re ) => {
      if ( re.status === 200 ) {
        re.json().then( ( data ) => {
          const { list, total, pageSize, pageNum } = data;
          this.setState( {
            data: list,
            pageInfo: {
              total,
              pageSize,
              current: pageNum
            }
          } );
        } )
      }
    } )
  }
  __enable_btn() {
    const { selectedRowKeys, pageEnable } = this.state;
    if ( selectedRowKeys.length <= 0 ) {
      message.error( '未选择操作数据' );
    } else {
      this.setState( { modalVisible: true } );
    }
  }
  __enable_act() {
    const { selectedRowKeys, pageEnable } = this.state;
    put( `/materials/${ selectedRowKeys.join( ',' ) }`, {
      enabled: pageEnable === 0
        ? 1
        : 0
    } ).then( re => {
      if ( re.status === 200 ) {
        message.info( '操作成功' );
        this.__query_submit();
      } else {
        message.error( '未知错误' );
      }
    } );
    this.setState( { modalVisible: false } );
  }
  __pageChange( pageNum, pageSize ) {
    this.__query_submit( pageNum );
  }
  render() {
    const { loading, selectedRowKeys, pageEnable, pushFunc, pageInfo } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: ( selectedRowKeys ) => this.onSelectChange( selectedRowKeys )
    };
    const hasSelected = selectedRowKeys.length > 0;
    const nameSelect = this.state.deviceType
      ? <Col span={8}><MaterialsNameSelect text="物料名称" typeid={this.state.deviceType} value={this.state.deviceName} onChange={( deviceName ) => this.setState( { deviceName } )}/></Col>
      : null;
    return <MainPanel>
      <Row>
        <Col span={8}>
          <MaterialTypeSelect value={this.state.deviceType} onChange={( value ) => this.handleChange_deviceType( value )}/>
        </Col>
        <ReactCSSTransitionGroup transitionName="main-view" transitionAppear={true} transitionAppearTimeout={600} transitionEnterTimeout={600} transitionLeaveTimeout={200}>
          {nameSelect}
        </ReactCSSTransitionGroup>
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
        <Button size="small" onClick={() => this.state.pushFunc( '/basic/materials/add' )}>新增</Button>
        <Button size="small" onClick={() => this.__enable_btn()}>{
            parseInt( pageEnable ) === 0
              ? '废弃'
              : '启用'
          }</Button>
        <Modal title="确认" visible={this.state.modalVisible} onOk={() => this.__enable_act()} onCancel={() => this.setState( { modalVisible: false } )}>
          <p>确认将要{
              parseInt( pageEnable ) === 0
                ? '废弃'
                : '启用'
            }{selectedRowKeys.length}条数据？</p>
        </Modal>
        <Button size="small">导入</Button>
        <Button size="small">导出</Button>
      </Row>
      <Table rowSelection={rowSelection} loading={false} columns={columns( pushFunc )} dataSource={this.state.data} rowKey={record => record.id} pagination={Object.assign( {}, pageInfo, {
          size: "small",
          showTotal: ( total ) => `共 ${ total } 条`,
          onChange: ( pageNum, pageSize ) => this.__pageChange( pageNum, pageSize )
        } )}/>
    </MainPanel>
  }
}
export default connect( state => {
  return { location: state.router.location }
}, ( dispatch, ownProps ) => {
  return {
    PUSH: ( pathname, search ) => {
      dispatch( push( { pathname, search } ) )
    }
  }
} )( Materials );
