import Navbar from "./Navbar";
import { connect } from "react-redux";
import {
  mapDispatchToProps,
} from './props';
export default connect(null, mapDispatchToProps)(Navbar);