import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { get } from '../../utils/http.js';
class MaterialsUnitSelect extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      data: [],
      typeid: null
    }
  }
  __loadData( typeid ) {
    if ( typeid !== this.state.typeid ) 
      get( `/dicts/${ typeid }/details` ).then( re => re.json().then( data => this.setState( { data, typeid } ) ) );
    }
  render() {
    const { text, value, onChange, typeid } = this.props;
    this.__loadData( typeid );
    return <SelectField floatingLabelText={text || "设备名称"} maxHeight={200} value={value} onChange={( event, index, value ) => onChange( value )}>
      {
        this.state.data.map( ( {
          id,
          name
        }, index ) =>< MenuItem key = {
          index
        }
        value = {
          id
        }
        primaryText = {
          name
        } /> )
      }
    </SelectField>
  }
}
export default MaterialsUnitSelect;
