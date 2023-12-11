import {
  handleLogout,
} from '../Redux/action';

export const mapDispatchToProps = (dispatch) => ({
  handleLogout: () => dispatch(handleLogout()),
});