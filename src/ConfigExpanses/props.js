import {
  getBudgetData,
  addBudgetData,
  createCatgory,
  addExpense,
  getExpenses,
  deleteExpense,
} from '../Redux/action';

export const mapDispatchToProps = (dispatch) => ({
  getBudgetData: () => dispatch(getBudgetData()),
  addBudgetData: (budgetName, totalAmount, catagories) => dispatch(addBudgetData(budgetName, totalAmount, catagories)),
  createCatgory: (name,allocatedAmount,budgetId, ) => dispatch(createCatgory(name,allocatedAmount,budgetId)),
  addExpense: (description, amount, categoryId, date) => dispatch(addExpense(description, amount, categoryId, date)),
  getExpenses: (categoryId) => dispatch(getExpenses(categoryId)),
  deleteExpense: (categoryId) => dispatch(deleteExpense(categoryId)),
});

export const mapStateToProps = (state) => ({
  userRegistrationSuccessful: state.userRegistrationSuccessful,
  activeUserDetails: state.activeUserDetails,
  budgetsData: state.budgetsData,
  expensesData: state.expensesData,
});