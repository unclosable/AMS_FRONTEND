import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import { Menu, Dropdown, Icon, message } from 'antd';
import { get } from '../../utils/http.js';
const SubMenu = Menu.SubMenu;

const menu = ( <Menu>
  <Menu.Item>1st menu item</Menu.Item>
  <Menu.Item>2nd menu item</Menu.Item>
  <SubMenu title="sub menu">
    <Menu.Item>3rd menu item</Menu.Item>
    <Menu.Item>4th menu item</Menu.Item>
  </SubMenu>
  <SubMenu title="disabled sub menu" disabled="disabled">
    <Menu.Item>5d menu item</Menu.Item>
    <Menu.Item>6th menu item</Menu.Item>
  </SubMenu>
</Menu> );

class DropLay extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      subMenu: [],
      menus0: [
        {
          id: 26,
          name: "工位",
          dictId: 2
        }
      ],
      menus1: [
        {
          id: 26,
          name: "工位",
          dictId: 2
        }
      ],
      menus2: [
        {
          id: 26,
          name: "工位",
          dictId: 2
        }
      ],
      menus3: [
        {
          id: 26,
          name: "工位",
          dictId: 2
        }
      ],
      menus4: [
        {
          id: 26,
          name: "工位",
          dictId: 2
        }
      ],
      menus5: [
        {
          id: 26,
          name: "工位",
          dictId: 2
        }
      ],
      menus6: [
        {
          id: 26,
          name: "工位",
          dictId: 2
        }
      ],
      menus7: [
        {
          id: 26,
          name: "工位",
          dictId: 2
        }
      ],
      menus8: [
        {
          id: 26,
          name: "工位",
          dictId: 2
        }
      ],
      menus9: [
        {
          id: 26,
          name: "工位",
          dictId: 2
        }
      ],
      menus10: [
        {
          id: 26,
          name: "工位",
          dictId: 2
        }
      ],
      menus11: [
        {
          id: 26,
          name: "工位",
          dictId: 2
        }
      ]
    }
    this.__loading();
  }
  __loading() {
    get( '/dicts' ).then( ( response ) => {
      if ( response.status === 200 ) {
        response.json().then( ( json ) => {
          const menus = json.map( ( { id, name } ) => ( { sid: id } ) );
          this.setState( { subMenu: json, menus } );
        } ).then( () => {
          this.state.subMenu.forEach( ( {
            id,
            name
          }, index ) => {
            get( '/dicts/' + id ).then( response => response.json().then( ( json ) => {
              let update = {};
              update['menus' + index] = json;
              this.setState( update );
            } ) )
          } )
        } )
      } else {
        message.error( '加载类型失败' );
      }
    } )
  }
  render() {
    const { selectedKeys, onChange } = this.props;
    return <Menu selectedKeys={[ selectedKeys ]} onClick={( { item, key, keyPath } ) => {
        onChange( { key, name: item.props.children[ 1 ] } )
      }}>
      {
        this.state.subMenu.map( ( {
          id,
          name
        }, index ) => <SubMenu key={id} title={name}>
          {
            this.state['menus' + index].map(( { id, name } ) =>< Menu.Item key = {
              id
            } > {
              name
            } < /Menu.Item>)}
        </SubMenu > )
      }
    </Menu>
  }
}

class DeviceTypeSelect extends React.Component {
  constructor( props ) {
    super( props );
  }
  render() {
    const { text, value, onChange, disabled } = this.props;
    return <Dropdown overlay={<DropLay selectedKeys = {
        value
      }
      onChange = {
        onChange
      } > </DropLay>}>
      <div className="totle-div">
        <label htmlFor="undefined---3804" className="top-label">{text}</label>
        <div className="mid-div">{text}</div>
        <div type="text" id="undefined---3804" className="buttom-div"/>
        <div>
          <hr aria-hidden="true" className="line-hidden-one"/>
          <hr aria-hidden="true" className="line-hidden-two"/></div>
      </div>
    </Dropdown>
  }
}

export default DeviceTypeSelect;
