import {
  getBudgetData,
  addBudgetData,
  createCatgory,
  deleteCategory,
  getAllExpensesAndDate,
} from '../Redux/action';

export const mapDispatchToProps = (dispatch) => ({
  getBudgetData: () => dispatch(getBudgetData()),
  addBudgetData: (budgetName, totalAmount, catagories) => dispatch(addBudgetData(budgetName, totalAmount, catagories)),
  createCatgory: (name,allocatedAmount,budgetId) => dispatch(createCatgory(name,allocatedAmount,budgetId)),
  deleteCategory: (_id) => dispatch(deleteCategory(_id)),
  getAllExpensesAndDate: () => dispatch(getAllExpensesAndDate()),
});

export const mapStateToProps = (state) => ({
  userRegistrationSuccessful: state.userRegistrationSuccessful,
  activeUserDetails: state.activeUserDetails,
  budgetsData: state.budgetsData,
  barChartExpnesesData: state.barChartExpnesesData,
  expensesData: state.expensesData,
});