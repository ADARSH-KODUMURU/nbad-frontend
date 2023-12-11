import React from 'react'
import ConfigureBudget from './ConfigureBudget'

describe('<ConfigureBudget />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ConfigureBudget />)
  })
})