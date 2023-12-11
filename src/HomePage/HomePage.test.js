import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from "@cfaester/enzyme-adapter-react-18";
configure({ adapter: new Adapter() });
import HomePage from './HomePage';

describe(`<HomePage/>`, () => {
  it('Should render <HomePage/> component without crashing', () => {
    const component = shallow(<HomePage/>);
    const tree = component.debug();
    expect(tree).toMatchSnapshot();
  });

  it(`Should render EXPENSES and BUDGET LEFT Vs DATE section`, () => {
    const component = shallow(<HomePage/>);
    expect(component.find('.verticalChartContainer').exists()).toBe(true);
  })
  
  it(`Should render TOTAL EXPENSES / TOTAL BUDGET section`, () => {
    const component = shallow(<HomePage/>);
    expect(component.find('.totaExpensesVsIncomeAmountperMonth').exists()).toBe(true);
  })
  
  it(`Should render EXPENSES Per BUDGET CATAGORY section`, () => {
    const component = shallow(<HomePage/>);
    expect(component.find('.pieChartContainer').exists()).toBe(true);
  })
  
  it(`Should render AMOUNT Vs CATAGORIES section`, () => {
    const component = shallow(<HomePage/>);
    expect(component.find('.lineChartContainer').exists()).toBe(true);
  })
});