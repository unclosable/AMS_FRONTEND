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
import { get } from '../../utils/http.js';
import OrganizationsSelect from '../base/all_organizations_select.jsx';
import { Redirect } from 'react-router-dom';
const { Column, ColumnGroup } = Table;

const columns = ( push ) => {
  return [
    {
      title: '序号',
      dataIndex: "id"
    }, {
      title: '所属组织',
      dataIndex: 'orgName'
    }, {
      title: '仓库名称',
      dataIndex: 'name'
    }, {
      title: '更新人',
      dataIndex: 'updatedBy'
    }, {
      title: '更新时间',
      dataIndex: 'updatedAt'
    }, {
      title: '备注',
      dataIndex: 'remark'
    }, {
      title: '操作',
      key: 'action',
      render: ( text, record ) => {
        return <span>
          <a onClick={() => push( '/basic/warehouse/edit', queryString.stringify( { id: record.id } ) )}>
            修改
          </a>
        </span>
      }
    }
  ];
}

const paramParse = ( value ) => {
  let re = parseInt( value );
  if ( !re || re === -1 ) {
    re = null;
  }
  return re;
}
class Warehouse extends React.Component {
  constructor( props ) {
    super( props );
    const { PUSH, location } = props;
    const { organization, warehouseName } = queryString.parse( location.search );
    this.state = {
      organization: paramParse( organization ),
      warehouseName: warehouseName || "",
      data: [],
      selectedRowKeys: [],
      loading: false,
      pushFunc: PUSH
    }
    this.__load_data();
  }

  __query_submit() {
    const { organization, warehouseName } = this.state;
    this.state.pushFunc( '/basic/warehouse', queryString.stringify( { organization, warehouseName } ) )
  }
  __reset_query() {
    this.state.pushFunc()
  }
  __load_data() {
    const { organization, warehouseName } = this.state;
    get( '/warehouses', {
      name: warehouseName,
      orgId: organization
    } ).then( re => re.json().then( data => this.setState( { data } ) ) );
  }
  render() {
    const { loading, selectedRowKeys, pushFunc } = this.state;
    const theColumns = columns( pushFunc );
    const rowSelection = {
      selectedRowKeys,
      onChange: ( selectedRowKeys ) => this.setState( { selectedRowKeys } )
    };
    const hasSelected = selectedRowKeys.length > 0;
    return <MainPanel>
      <Row>
        <Col span={8}><OrganizationsSelect value={this.state.organization} onChange={( value ) => this.setState( { [ 'organization' ]: value } )}/></Col>
        <Col span={8}>
          <TextField hintText="仓库名称" floatingLabelText="仓库名称" type="text" value={this.state.warehouseName} onChange={( e ) => this.setState( { [ 'warehouseName' ]: e.target.value } )}/>
        </Col>
        <Col span={8}></Col>
      </Row>
      <Row>
        <Col span={16}></Col>
        <Col span={8} className="device-query-btn">
          <Button onClick={() => this.__reset_query()}>重置</Button>
          <Button type="primary" onClick={() => this.__query_submit()}>查询</Button>
        </Col>
      </Row>
      <Row className="device-setting-btn">
        <Button size="small" onClick={() => this.state.pushFunc( '/basic/warehouse/add' )}>新增</Button>
        <Button size="small">修改</Button>
      </Row>
      <Table rowSelection={rowSelection} columns={theColumns} dataSource={this.state.data} rowKey={record => record.id}/>
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
} )( Warehouse );
