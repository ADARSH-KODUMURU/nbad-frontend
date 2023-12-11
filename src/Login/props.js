import {
  loginUser,
  submitUser,
} from '../Redux/action'

export const mapDispatchToProps = (dispatch) => ({
  submitUser: (username, email,password,navigate) => dispatch(submitUser(username, email,password, navigate)),
  loginUser: (email,password, navigate) => dispatch(loginUser(email,password,navigate)),
});

export const mapStateToProps = (state) => ({
  userRegistrationSuccessful: state.userRegistrationSuccessful,
  activeUserDetails: state.activeUserDetails,
});