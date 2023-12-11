import ConfigureBudget from './ConfigureBudget.js';
import { connect } from 'react-redux';
import {
  mapDispatchToProps,
  mapStateToProps,
} from './props';
export default connect(mapStateToProps, mapDispatchToProps)(ConfigureBudget);