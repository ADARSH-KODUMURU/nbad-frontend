import {
  submitUser,
} from '../../Redux/action.js';



export const mapDispatchToProps = (dispatch) => ({
  submitUser: (username, email,password) => dispatch(submitUser(username, email,password)),
});

export const mapStateToProps = (state) => ({
  userRegistrationSuccessful: state.userRegistrationSuccessful,
  activeUserDetails: state.activeUserDetails,
});