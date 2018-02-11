import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { get } from '../../utils/http.js';
class MaterialsUnitSelect extends React.Component {
  constructor( props ) {
    super( props );
    const { typeid } = props;
    this.state = {
      data: []
    }
    this.__loadData( typeid );
  }
  __loadData( typeid ) {
    get( `/dicts/${ typeid }/details` ).then( re => re.json().then( data => this.setState( { data } ) ) );
  }
  render() {
    const { text, value, onChange } = this.props;
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
