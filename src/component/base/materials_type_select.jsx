import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { get } from '../../utils/http.js';
class MaterialsUnitSelect extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      data: []
    }
    this.__loadData();
  }
  __loadData() {
    get( '/dicts', { contain: 23 } ).then( re => re.json().then( data => this.setState( { data } ) ) );
  }
  render() {
    const { value, onChange } = this.props;
    return <SelectField floatingLabelText="物料类型" maxHeight={200} value={value} onChange={( event, index, value ) => onChange( value )}>
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
