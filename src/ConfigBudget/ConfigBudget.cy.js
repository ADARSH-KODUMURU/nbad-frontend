import React from 'react'
import ConfigBudget from './ConfigBudget'

describe('<ConfigBudget />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ConfigBudget />)
  })
})